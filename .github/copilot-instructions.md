# AI Coding Agent Instructions for Blog Project

## Project Architecture

This is a **Hugo Blox academic blog** built with:
- **Hugo**: Static site generator (v0.128.2), configured in `config/_default/hugo.yaml`
- **Blogdown**: R package wrapper that processes `.Rmd` files to HTML via Knitr
- **GitHub Hugo Blox Builder**: Modular theme system mounted in `config/_default/module.yaml`
- **Netlify**: CD/CI pipeline with Hugo cache plugin, config in `netlify.toml`
- **Pagefind**: Search indexing layer (runs post-build)

**Key distinction**: Content exists as R Markdown (`.Rmd`) files that compile to static HTML pages. The site is NOT dynamic—Hugo renders everything at build time.

## Content Structure & Conventions

### Post/Publication Frontmatter
All content uses YAML frontmatter with these patterns:
```yaml
---
title: "Post Title"
date: "`r format(Sys.Date(), '%B %d, %Y')`"  # Dynamic date in R posts
slug: kebab-case-slug
categories: [Category1, Category2]
tags: [tag1, tag2]
authors:
  - admin
lastmod: "`r format(as.POSIXct(Sys.time(), tz = 'UTC'), '%Y-%m-%dT%H:%M:%SZ')`"
featured: false
image:
  caption: ""
  focal_point: ""
  preview_only: false
math: true  # Enable KaTeX for equations
output:
  blogdown::html_page:
    toc: true
    number_sections: true
    toc_depth: 3
---
```

- **Slug format**: `YYYY-MM-DD-kebab-case` directories under `content/post/` or `content/publication/`
- **Dynamic dates**: Use R expressions in YAML (wrapped in backticks) to generate current timestamps
- **Math rendering**: Set `math: true` to enable inline `$...$` and block `$$...$$` KaTeX equations

### Directory Organization
- `content/post/`: Blog articles and tutorials (R + statistics focused)
- `content/publication/`: Academic publications with citations
- `content/accomplishments/`: Awards, projects lists
- `content/event/`: Talks and conference presentations
- `content/rpackage/`: R package documentation
- `content/authors/admin/`: Main author profile

### Knitr/R Markdown Patterns
Recent posts use:
```r
knitr::opts_chunk$set(cache = TRUE, autodep = TRUE)  # Enable intelligent caching
```
- **Cache strategy**: `cache = TRUE` speeds rebuilds; dependencies tracked with `autodep = TRUE`
- **Output format**: `blogdown::html_page` wraps Knitr output for Hugo integration
- **Code examples**: Often include `library()` setup, then inline code blocks demonstrating functions

## Build & Deployment Workflow

**Local build** (via Netlify or direct):
```bash
hugo --gc --minify -b https://prof-thiagooliveira.netlify.app/
npx pagefind --source 'public'
```

**Netlify build contexts**:
- **Production**: Standard `hugo --gc --minify` (ignores draft posts)
- **Deploy preview**: `--buildFuture` flag allows posts with future dates
- **Branch deploy**: Same as production

**Environment variables**:
- `HUGO_VERSION=0.128.2` (pinned to avoid breaking changes)
- `HUGO_ENABLEGITINFO=true` (enables git-based `lastmod`)
- `HUGO_ENV=production` (optimizes minification)

**Hugo ignores** (in `hugo.yaml`):
```yaml
ignoreFiles: [\.ipynb$, .ipynb_checkpoints$, \.Rmd$, \.Rmarkdown$, _cache$]
```
Raw `.Rmd` files are NOT copied to public; only compiled HTML. Knitr cache dirs are excluded.

## Styling & Layout Conventions

- **Custom CSS**: `assets/css/custom.css` extends Hugo Blox defaults
- **HTML safety**: `markup.goldmark.renderer.unsafe: true` allows raw HTML in Markdown (e.g., inline `<style>`)
- **Syntax highlighting**: GitHub light theme; auto-switches with system dark mode (no per-block class management needed)
- **Post-specific CSS**: Complex posts embed `<style>` blocks to override Hugo Blox container width, padding

## Critical Files to Know

| File | Purpose |
|------|---------|
| `config/_default/hugo.yaml` | Main Hugo config (title, baseURL, imaging, timeouts) |
| `config/_default/params.yaml` | Theme parameters (colors, analytics, footer, feature flags) |
| `config/_default/module.yaml` | Theme mount points for Hugo Blox components |
| `netlify.toml` | Build commands, environment, cache plugin config |
| `.github/copilot-instructions.md` | This file; guidance for AI agents |
| `blog.Rproj` | R project config (workspace, encoding, build type = Website) |

## Patterns & Pitfalls

1. **Blogdown rebuild cycle**: Changes to `.Rmd` files require running `blogdown::build_site()` in R or triggering Netlify rebuild. Hugo alone won't recompile.
2. **Slug uniqueness**: All posts must have unique `slug` values across the site (no duplicates across post/ and publication/ directories).
3. **Author references**: All authors (except `admin`) must have profiles in `content/authors/{slug}/`.
4. **Date formatting**: Use R expressions in YAML for dynamic dates; hard-coded dates will become stale.
5. **Math blocks**: Equations render only if `math: true` in frontmatter OR page has `$$` blocks (trigger KaTeX globally).
6. **Netlify cache**: The Hugo cache plugin (`netlify-plugin-hugo-cache-resources`) caches compiled assets; clearing cache sometimes needed for CSS/JS changes.

## When to Modify What

| Task | Edit | Process |
|------|------|---------|
| Add new post | Create `content/post/YYYY-MM-DD-slug/index.Rmd` | Run `blogdown::build_site()` locally or push to trigger Netlify build |
| Adjust styling | `assets/css/custom.css` or inline `<style>` in post | Push; Netlify will rebuild |
| Change site title/URL | `config/_default/hugo.yaml` | Test locally with `hugo serve` before pushing |
| Update theme colors | `config/_default/params.yaml` | No rebuild needed for color changes (live update via CSS variables) |
| Modify post metadata | Front matter in `.Rmd` | Change takes effect on next build |
| Add R package docs | Create `content/rpackage/{pkgname}/index.md` | Push and rebuild |
