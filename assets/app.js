(() => {
  const doc = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const RULES = {
    html: [/(<!--[\s\S]*?-->)|(<\/?[a-zA-Z][\w-]*)|(\s[\w:@.-]+(?==))|("[^"]*"|'[^']*')|(\/?>)/g, ["c", "k", "f", "s", "k"]],
    css: [/(\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*')|(@[\w-]+)|(--[\w-]+)|(#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:rem|px|em|%|vh|vw)?\b)/g, ["c", "s", "k", "f", "n"]],
    js: [/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`[^`]*`|"[^"]*"|'[^']*')|(\b(?:import|from|export|default|function|return|const|let|var|if|else|new)\b)|(\b\d+\b)/g, ["c", "s", "k", "n"]],
    sh: [/(#[^\n]*)|(\s--?[a-zA-Z][\w-]*)|(\b(?:npm|npx|mkdir|cd|node|install|create|init)\b)/g, ["c", "n", "k"]],
  };

  function highlight(code) {
    const rule = RULES[code.dataset.lang];
    if (!rule) return;
    const [re, cls] = rule;
    const src = code.textContent ?? "";
    let out = "", last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      const gi = m.slice(1).findIndex((g) => g !== undefined);
      out += `<span class="${cls[gi] ?? ""}">${esc(m[0])}</span>`;
      last = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++;
    }
    code.innerHTML = out + esc(src.slice(last));
  }
  $$("pre code").forEach(highlight);

  // Tailwind Play CDN document used by live results and the playground
  const BASE = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
  window.twSrcdoc = (code, report) => {
    const styles = [];
    const body = code.replace(/<style\s+type=["']text\/tailwindcss["']>[\s\S]*?<\/style>/g, (m) => { styles.push(m); return ""; });
    const rep = report
      ? `<script>new ResizeObserver(() => parent.postMessage({ twh: document.documentElement.scrollHeight }, "*")).observe(document.documentElement);<\/script>`
      : "";
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script src="${BASE}"><\/script>${styles.join("")}<style>body{font-family:system-ui,sans-serif}</style></head><body>${body}${rep}</body></html>`;
  };

  // Live result under each HTML example, loaded when it scrolls into view
  addEventListener("message", (e) => {
    const h = e.data?.twh;
    if (typeof h !== "number") return;
    $$(".demo iframe").forEach((f) => { if (f.contentWindow === e.source) f.style.height = Math.min(Math.max(h, 60), 900) + "px"; });
  });
  const demoObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      demoObs.unobserve(e.target);
      const f = document.createElement("iframe");
      f.setAttribute("sandbox", "allow-scripts");
      f.title = "Result";
      f.srcdoc = window.twSrcdoc(e.target.previousElementSibling.querySelector("code").textContent, true);
      e.target.append(f);
    });
  }, { rootMargin: "300px" });
  $$(".demo").forEach((d) => demoObs.observe(d));

  // Theme
  const themeBtn = $("#theme");
  themeBtn?.addEventListener("click", () => {
    const next = doc.dataset.theme === "dark" ? "light" : "dark";
    doc.dataset.theme = next;
    try { localStorage.setItem("pgdocs-theme", next); } catch (_) { /* storage unavailable */ }
  });

  // Copy buttons
  $$(".copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = $("code", btn.closest(".code"))?.textContent ?? "";
      try {
        await navigator.clipboard.writeText(text);
      } catch (_) {
        const ta = Object.assign(document.createElement("textarea"), { value: text });
        document.body.append(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (__) { /* ignore */ }
        ta.remove();
      }
      const label = btn.textContent;
      btn.textContent = doc.dataset.copied ?? "Copied";
      btn.classList.add("done");
      setTimeout(() => { btn.textContent = label; btn.classList.remove("done"); }, 1600);
    });
  });

  // Reading progress
  const bar = $(".progress");
  let ticking = false;
  const updateBar = () => {
    const max = doc.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(updateBar); } }, { passive: true });
  updateBar();

  // Reveal on scroll
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); } });
  }, { threshold: 0.08 });
  $$(".reveal").forEach((el) => reveal.observe(el));

  // Scroll spy
  const links = new Map($$(".syllabus a").map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.remove("active"));
      const a = links.get(e.target.id);
      a?.classList.add("active");
      a?.scrollIntoView({ block: "nearest" });
    });
  }, { rootMargin: "-35% 0px -60% 0px" });
  $$(".module").forEach((s) => spy.observe(s));

  // Sidebar search
  $("#q")?.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    $$(".syllabus li").forEach((li) => { li.hidden = q !== "" && !li.textContent.toLowerCase().includes(q); });
  });

  // Mobile drawer
  const closeNav = () => document.body.classList.remove("nav-open");
  $("#menu")?.addEventListener("click", () => document.body.classList.toggle("nav-open"));
  $(".scrim")?.addEventListener("click", closeNav);
  links.forEach((a) => a.addEventListener("click", closeNav));
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });
})();
