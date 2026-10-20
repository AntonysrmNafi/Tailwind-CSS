(() => {
  const $ = (s) => document.querySelector(s);
  const ed = $("#lab-sql");
  if (!ed) return;
  const T = JSON.parse($("#lab").dataset.t || "{}");
  const frame = $("#lab-frame");
  const wrap = $("#lab-wrap");
  const KEY = "twdocs-lab";
  const STARTER = `<div class="p-6">
  <h1 class="text-3xl font-black">Hello Tailwind</h1>
  <button class="mt-4 border-4 border-black bg-pink-400 px-6 py-3 font-bold shadow-[6px_6px_0_#111]">
    Edit me
  </button>
</div>`;
  let started = false;
  let timer;

  const render = () => {
    frame.srcdoc = window.twSrcdoc(ed.value, false);
    try { localStorage.setItem(KEY, ed.value); } catch (_) { /* storage unavailable */ }
  };
  const schedule = () => { clearTimeout(timer); timer = setTimeout(render, 400); };
  const open = () => {
    document.body.classList.add("lab-open");
    if (!started) {
      started = true;
      if (!ed.value) {
        try { ed.value = localStorage.getItem(KEY) || STARTER; } catch (_) { ed.value = STARTER; }
      }
      render();
    }
    ed.focus({ preventScroll: true });
  };

  ["#lab-open", "#lab-open2"].forEach((s) => $(s)?.addEventListener("click", open));
  $("#lab-close").addEventListener("click", () => document.body.classList.remove("lab-open"));
  $("#lab-reset").addEventListener("click", () => {
    if (!confirm(T.confirm)) return;
    ed.value = STARTER;
    render();
  });
  document.querySelectorAll("[data-w]").forEach((b) => b.addEventListener("click", () => { wrap.style.width = b.dataset.w; }));
  ed.addEventListener("input", schedule);
  ed.addEventListener("keydown", (e) => {
    if (e.key === "Tab") { e.preventDefault(); ed.setRangeText("  ", ed.selectionStart, ed.selectionEnd, "end"); schedule(); }
  });
  document.querySelectorAll(".tryb").forEach((b) => b.addEventListener("click", () => {
    ed.value = b.closest(".code").querySelector("code").textContent;
    started = true;
    open();
    render();
  }));
})();
