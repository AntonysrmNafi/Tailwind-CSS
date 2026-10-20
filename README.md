# Tailwind CSS, Zero to Advanced

A free, class style Tailwind CSS course for people who know **only basic HTML**. You learn the CSS ideas and Tailwind together, see a live result under every example, build three real pages, and edit anything in a built in playground.

[![Open the website](https://img.shields.io/badge/OPEN-THE%20WEBSITE-FFD23F?style=for-the-badge&labelColor=111111)](https://antonysrmnafi.github.io/Tailwind-CSS/)
[![Bangla edition](https://img.shields.io/badge/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE-EDITION-6EC1FF?style=for-the-badge&labelColor=111111)](https://antonysrmnafi.github.io/Tailwind-CSS/bn/)

**Live site:** https://antonysrmnafi.github.io/Tailwind-CSS/

---

## What you will learn

The site has **22 modules** in four levels, written for **Tailwind CSS v4**. Read them in order, like classes.

### Foundations (modules 01 to 06)

| # | Module | You will learn |
|---|--------|----------------|
| 01 | Start Here: What is Tailwind CSS? | What CSS is, what "utility first" means, and your first styled button |
| 02 | Setup: CDN, CLI and Vite | Play CDN, Tailwind CLI, Vite, and installing Node.js on Windows |
| 03 | Core Utilities | Spacing scale, sizing, typography, color, opacity, and what Preflight resets |
| 04 | Borders, Radius, Shadows, Rings | Shapes, hard offset shadows and arbitrary values like `w-[137px]` |
| 05 | Layout Basics | `display`, `container`, `relative` and `absolute`, `sticky`, `z-index`, overflow, aspect ratio |
| 06 | Backgrounds, Gradients, Filters | Linear and radial gradients, background images, `backdrop-blur`, filters |

### Intermediate (modules 07 to 14)

| # | Module | You will learn |
|---|--------|----------------|
| 07 | Flexbox | Rows, columns, alignment, spacing and centering |
| 08 | Grid | Columns, spans, gaps and card layouts |
| 09 | Responsive Design | Mobile first thinking and the `sm:` to `2xl:` breakpoints |
| 10 | States and Variants | `hover:`, `focus:`, `active:`, `group`, `peer`, dark mode |
| 11 | Advanced Variants and Container Queries | `has-`, `aria-`, `data-`, `not-`, `starting:` and `@container` |
| 12 | Transitions, Transforms, Animation | Smooth changes, scale, rotate, built in animations, reduced motion |
| 13 | Forms, Tables and Lists | Styling inputs, tables, lists, and the forms plugin |
| 14 | Text, Media and Content Utilities | `line-clamp`, columns, scroll snap, object fit, 3D transforms |

### Advanced (modules 15 to 21)

| # | Module | You will learn |
|---|--------|----------------|
| 15 | Customization | `@theme`, arbitrary values, `@utility` and `@apply` |
| 16 | Configuration in Depth | `@layer`, `@source`, `prefix`, `important`, plugins, custom variants, a dark mode toggle |
| 17 | Reuse and Accessibility | Components, focus styles, contrast, `sr-only`, reduced motion |
| 18 | Frameworks, Tooling and Production | Vite, React, Next.js, Angular, Laravel, IntelliSense, Prettier, `clsx` with `tailwind-merge`, minified builds |
| 19 | Project: Build a Landing Page | Header, hero and feature cards |
| 20 | Project: Build a Pricing Page | Responsive plan cards with a highlighted plan |
| 21 | Project: Build a Dashboard | Sidebar layout, stat cards, a bar chart and a data table |

### Reference (module 22)

Cheat sheet, v3 to v4 renames, glossary and next steps.

---

## Features

- **Live Result** under every HTML example, rendered with real Tailwind and loaded as it scrolls into view.
- **Playground** with live preview as you type, Phone, Tablet and Desktop widths, and your code saved between visits.
- **Try button** on every HTML example, which sends the code into the playground.
- **Practice questions** with hidden solutions.
- **Two editions.** English and Bangla explanations, with the code always in English.
- **Retro neubrutalism design** with a syllabus sidebar, search, reading progress bar, dark mode and a print stylesheet.

> Live results and the playground load the Tailwind Play CDN from jsDelivr, so they need an internet connection. The Play CDN is for learning and prototyping, not for production websites. Module 02 shows the production setups.

> This course covers the everyday path from beginner to advanced. It is not a list of every utility, so keep the official Tailwind CSS documentation open for the rest.

---

## Project structure

```
.
├── index.html          English edition
├── bn/
│   └── index.html      Bangla edition, served at /bn/
└── assets/
    ├── style.css       Design system
    ├── app.js          Sidebar, theme, progress, copy button, syntax highlighting, live results
    ├── lab.js          Playground
    ├── theme.js        Applies the saved theme before the page paints
    ├── favicon.svg
    ├── favicon.ico
    └── apple-touch-icon.png
```

## Run it locally

No build step and no dependencies.

```bash
git clone https://github.com/AntonysrmNafi/Tailwind-CSS.git
cd Tailwind-CSS
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Host it on GitHub Pages

1. Push the files to the repository root.
2. Open **Settings**, then **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your main branch and the `/ (root)` folder, then save.
4. The site goes live at `https://<username>.github.io/<repository>/`.

---

## Author

Made by **Antonysrm Nafi** ([@AntonysrmNafi](https://github.com/AntonysrmNafi)).

If this course helped you, give the repository a star.
