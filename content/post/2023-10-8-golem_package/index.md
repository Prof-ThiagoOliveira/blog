---
title: Navigating the Shiny Universe with Golem
author: Thiago de Paula Oliveira
date: '2023-10-02'
slug: golem package
categories:
  - R
  - shiny
tags:
  - R
  - shiny
  - R package
subtitle: ''
summary: ''
authors: 
- admin
lastmod: '2023-10-02T12:15:54Z'
featured: no
image:
  caption: ''
  focal_point: ''
  preview_only: no
projects: []
output:
  html_document:
    keep_md: yes
    toc: true
---


# The `golem` package


In the world of `R` programming, Shiny applications let us make interactive web apps using R code. The `golem` package (Fay et al. 2021) makes it easier to develop these apps. It brings new tools and methods to this area, helping developers handle complex tasks more simply.


## Making Things with Structure


Think of making a sculpture out of clay. At first, the big lump of clay can be hard to handle. `golem` helps developers, like sculptors, by giving them a clear framework. This means instead of dealing with a big, confusing bunch of code, developers have an organized way to work. It is like having lines drawn on the clay, showing where to shape and smooth it.


## Modular Component


When I first stumbled upon the `golem` package for R's Shiny applications, it was like discovering a secret garden in the world of coding. The stand-out feature for me? Its emphasis on modular coding. Let me break down why this is such a big deal.



Think of building a Shiny app like crafting a beautiful mosaic. Each piece (or module) is unique and serves a specific purpose. When you put them all together, they create a stunning picture - your final application. This modular approach is not just about aesthetics; it is about making your coding life a whole lot easier.


### Why Modules Make All the Difference


1. **Organization**: Breaking down the app into modules is like having a well-organized toolbox. Everything has its place, and you know exactly where to find it. It is incredibly satisfying and efficient.



2. **Teamwork Made Simple**: If you are working in a team, modules are a lifesaver. Imagine each team member painting their part of a large canvas. With modules, you can work independently on different features without stepping on each other's toes.



3. **Debugging**: We have all been there - something is broken, and we have no idea where to start looking. With modular coding, it is like having a map with a big "X" marking the spot of the problem. A big simplication!



4. **Reuse and Recycle**: I love this part. Created a nifty user authentication module? You can plug it into your next project without reinventing the wheel. It is like having a secret recipe you can use over and over with minor adaptations when needed.



5. **Growth Made Easy**: As your app grows, you can just add new modules. It is like adding new rooms to a house. This scalability is one of most helpful feature for any developer.



6. **Testing**: Testing each module separately means you can be super confident that every part of your app works perfectly before you put it all together.



7. **Newbie-Friendly**: If someone new joins your project, it is much easier for them to get up to speed with a modular structure. It is like giving them a well-detailed map instead of a single, overwhelming blueprint.


## A Developer's Toolbox


`golem` is not just about keeping things tidy. It is like a multi-tool for Shiny developers. It helps with JavaScript and CSS, makes app settings simpler, and improves how you work. `golem` also manages updates in `R`, making sure your app stays stable even when other parts of `R` change.



## Deployment and Documentation


Deploying a Shiny app should feel like a victory lap, not a hurdle race. `golem` ensures this by packaging Shiny apps in a deployment-ready format. Be it RStudio Connect, Shinyapps.io, or the containerized world of Docker, your app is prepared and primed to go live.



Now, let's talk about something that does not always get the spotlight but is super crucial: documentation. `golem` knows how important this is. It is not just about coding; it is about leaving a trail of breadcrumbs for those who will follow in your footsteps. `golem` encourages you to document your work thoroughly. Think of it as creating a treasure map for future developers and collaborators who will join your project. Moreover, `golem` aligns seamlessly with the `roxygen2` style of documentation, familiar to many R developers. This integration means that while you are crafting your Shiny app, you can simultaneously create comprehensive, easy-to-understand documentation. It is like having a dual toolkit - one for building your app and another for creating a clear, helpful guide for any future developer or user who ventures into your code. This approach not only saves time but also ensures that your documentation is as robust and user-friendly as the app you are building.


## Conclusion


`golem` truly revolutionizes the way we handle R and Shiny applications. It is like having a GPS for the often complex journey of app development, guiding you with a structured, modular approach. This not only simplifies the process but also injects a sense of fun and creativity, much like piecing together a Lego masterpiece.



Beyond just coding, `golem` makes deploying apps feel like a victory lap and turns documentation into an integral, rewarding part of the development cycle. With the added bonus of a supportive community, `golem` is more than just a tool - it is a companion for any developer venturing into the exciting world of Shiny applications. 🚀🌟


# References

Fay, Colin, Vincent Guyader, Sébastien Rochette, and Cervan Girard. 2021. Golem: A Framework for Robust Shiny Applications. https://github.com/ThinkR-open/golem.


# Additional Material

* [Engineering Production-Grade Shiny Apps](https://engineering-shiny.org/golem.html)
* [golem: A Framework for Building Robust Shiny Apps](https://rstudio.github.io/cheatsheets/golem.pdf)
* [golem R package](https://cran.r-project.org/web/packages/golem/index.html)

# Citation

1. For attribution, please cite this work as:

<div class="div-1">
Oliveira T.P. (2023, Oct. 02). Navigating the Shiny Universe with Golem
</div>

2. BibTeX citation

```
@misc{oliveira2020golem,
  author = {Oliveira, Thiago},
  title = {Navigating the Shiny Universe with Golem},
  url = {https://prof-thiagooliveira.netlify.app/post/golem-package/},
  year = {2023}
}
```

**Did you find this page helpful? Consider sharing it 🙌**

<style>
/* ====== Post-only layout + typography polish (Hugo Blox / Tailwind) ====== */
/* Place this at the very end of the post so it wins the cascade. */

/* 0) Widen the page shell Hugo Blox uses around articles */
.page-body > .mx-auto,
.page-body .max-w-screen-xl{
  max-width: 100vw !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* 1) Remove the Tailwind max-w cap on the <main> inside <article> */
.page-body article > main{
  max-width: none !important;  /* beats .max-w-6xl */
  width: 100% !important;
}

/* 2) Control the actual reading width (fluid per breakpoint) */
.page-body article .prose{
  /* Base: a touch larger with comfy line height */
  font-size: clamp(1rem, 0.96rem + 0.25vw, 1.12rem);
  line-height: 1.75;
  text-align: left;
  margin-inline: auto;

  /* Reading width: scale up on big screens, but keep lines readable */
  max-width: 86ch !important; /* default desktop */
}
@media (min-width: 1024px){  /* lg */
  .page-body article .prose{ max-width: 96ch !important; }
}
@media (min-width: 1280px){  /* xl */
  .page-body article .prose{ max-width: 102ch !important; }
}
@media (min-width: 1536px){  /* 2xl / very wide */
  .page-body article .prose{ max-width: 108ch !important; }
}

/* 3) Phones/tablets: full width with side padding */
@media (max-width: 768px){
  .page-body article .prose{
    max-width: 100% !important;
    padding-inline: 1rem;
  }
}

/* 4) Give the article more room by slimming sidebars on wide screens */
@media (min-width: 1280px){
  .hb-sidebar-container, .hb-toc { width: 12rem !important; } /* was 16rem */
}
@media (max-width: 1279.98px){
  .hb-sidebar-container{ display:none !important; } /* hide sidebar under xl */
}

/* --------- Clean, professional type polish (scoped to post content) -------- */
.page-body article .prose p{
  margin: 0 0 1.15em;
  text-wrap: pretty;
  hyphens: auto;
}

.page-body article .prose h1{
  font-size: clamp(1.9rem, 1.6rem + 1.2vw, 2.3rem);
  margin: 1.2em 0 .5em;
  padding-bottom: .25em;
  border-bottom: 2px solid #e5e7eb;
}
.page-body article .prose h2{
  font-size: clamp(1.4rem, 1.2rem + 0.6vw, 1.7rem);
  margin: 1.35em 0 .4em;
  padding-bottom: .2em;
  border-bottom: 1px solid #e5e7eb;
}
.page-body article .prose h3{
  font-size: clamp(1.15rem, 1.05rem + 0.35vw, 1.35rem);
  margin: 1.1em 0 .3em;
}

/* Links: subtle underline-on-hover */
.page-body article .prose a{
  color: #2f6ab5;
  text-decoration: none;
  border-bottom: 1px solid rgba(47,106,181,.25);
}
.page-body article .prose a:hover{
  color: #1f4f8f;
  border-bottom-color: currentColor;
}

/* Code blocks & inline code */
.page-body article .prose pre{
  background: #f6f8fa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 14px;
  overflow: auto;
}
.page-body article .prose code{
  background: #f6f8fa;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  padding: .15em .35em;
  font-size: .95em;
}
.page-body article .prose pre code{
  background: none; border: 0; padding: 0; font-size: 0.95em;
}

/* Tables */
.page-body article .prose table{
  width: 100%;
  border-collapse: collapse;
  margin: 1.2rem 0;
  font-variant-numeric: tabular-nums;
}
.page-body article .prose th,
.page-body article .prose td{
  border: 1px solid #e5e7eb;
  padding: .6rem .75rem;
}
.page-body article .prose thead th{
  background: #2f6ab5;
  color: #fff;
  text-align: left;
}

/* Images & figures */
.page-body article .prose img{ border-radius: 6px; }

/* Optional: allow “full-bleed” wide elements
   Add class="wide" to a block (table/pre/img wrapper) to span the viewport. */
.page-body article .prose .wide{
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding-inline: clamp(12px, 4vw, 36px);
}

/* Footer timestamp spacing */
.page-body article time{ margin-top: 2rem; display: block; }

/* Dark mode tweaks */
html.dark .page-body article .prose pre,
html.dark .page-body article .prose code{
  background: #111826;
  border-color: #253041;
}
html.dark .page-body article .prose thead th{ background: #5aa0ff; }
</style>

                       
