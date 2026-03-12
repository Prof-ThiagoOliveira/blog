---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      username: admin
      text: ""
    design:
      css_class: dark
      background:
        color: black
        image:
          filename: background.svg
          filters:
            brightness: 1.0
          size: cover
          position: center
          parallax: false

  - block: markdown
    content:
      title: 'Expertise and Research'
      subtitle: ''
      text: |-
        <div style="text-align: justify;">
          I am a statistician and statistical computing specialist with <strong>14+ years of experience</strong> developing reliable analytical workflows, reusable R packages, dashboards, and reproducible reporting across agriculture, genetics, public health, and sports analytics. My work focuses on data quality, analytical reliability, and decision-ready outputs delivered through structured computational workflows, QC/ETL pipelines, and standardised analysis practices.

          As a <strong>Consultant Statistician at <a href="https://www.abacusbio.com/">AbacusBio</a></strong>, I deliver statistical and analytical solutions for plant and animal breeding programmes, lead cross-functional delivery of genetic-evaluation pipelines, and build traceable workflows that link raw data, cleaned datasets, model inputs, and final outputs. That work depends on production-grade code in R, C++, Bash, and SQL, Docker-based environments, and clear technical documentation.

          Earlier, I held a Marie Sklodowska-Curie COFUND fellowship at the Roslin Institute, worked on public-health and sports analytics projects at the National University of Ireland Galway, and taught statistics and quantitative methods at the University of Sao Paulo. Across those roles I developed software, dashboards, and analytical pipelines designed for transparency, reuse, and auditability.

          I combine advanced statistical modelling with reproducible analytical tooling to make complex data more usable for researchers, analysts, and stakeholders. Browse my recent publications and projects, and get in touch if you would like to collaborate.
        </div>
    design:
      columns: '1'

  - block: collection
    id: papers
    content:
      title: Featured Publications
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2

  - block: collection
    content:
      title: Recent Publications
      text: ""
      filters:
        folders:
          - publication
        exclude_featured: false
    design:
      view: citation

  - block: markdown
    content:
      title: 'Cited by'
      text: |-
        <div id="cited-by-chart"
             data-orcid="0000-0002-4555-2584"
             data-years="8"
             data-timeout-ms="7000"
             data-cache-hours="12"
             data-fallback-src="/data/citations.json"
             style="max-width:760px; margin: .5rem 0 1rem;">
          <p style="color:var(--muted)">Loading live citation metrics...</p>
        </div>
        <script defer src="/js/citation-graph.js"></script>

  - block: collection
    id: talks
    content:
      title: Recent & Upcoming Talks
      filters:
        folders:
          - event
    design:
      view: article-grid
      columns: 1

  - block: collection
    id: news
    content:
      title: Recent Posts
      subtitle: ''
      text: ''
      page_type: post
      count: 5
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      offset: 0
      order: desc
    design:
      view: date-title-summary
      spacing:
        padding: [0, 0, 0, 0]

  - block: markdown
    demo: false
    content:
      title: "Connect with an expert statistician"
      text: |-
        <div style="text-align: justify; font-family: Arial, sans-serif; line-height: 1.6;">
          <p>I focus on data quality, statistical modelling, reusable analytical tooling, and reproducible workflows that turn complex datasets into reliable, decision-ready outputs.</p>

          <h3>Areas of impact</h3>
          <p><strong>Data stewardship.</strong> Design reproducible analytical workflows, automated QC/ETL pipelines, and structured computational environments that support reliability and traceability.</p>
          <p><strong>Data quality and usability.</strong> Build dashboards, software packages, and decision-support tools that improve accessibility, consistency, and interpretability of complex data.</p>
          <p><strong>Technical leadership.</strong> Lead cross-functional teams, mentor colleagues, and translate quantitative work into practical outputs for researchers, analysts, and stakeholders.</p>

          <p>Explore my publications, projects, and recent work. If you are interested in collaborating or would like to learn more, please get in touch.</p>

          <p>Stay connected and follow my work in statistical modelling and data analysis:</p>
          <p><a href="https://scholar.google.com/citations?user=K_MD1nsAAAAJ&hl=en" target="_blank">Google Scholar</a> | <a href="https://github.com/Prof-ThiagoOliveira" target="_blank">GitHub</a></p>

          <a class="github-button" href="https://github.com/Prof-ThiagoOliveira" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star Prof-ThiagoOliveira on GitHub">Star</a>
        </div>
    button:
      text: "Contact Me"
      url: "mailto:toliveira@abacusbio.com"
    design:
      card:
        css_class: "bg-primary-700"
        css_style: ""
---


