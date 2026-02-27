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
          I am a statistician with <strong>14+ years of experience</strong> turning experimental, genomic, and farm-system data into decisions. After completing my PhD in Statistics at the University of Sao Paulo, I specialised in advanced mixed-model/Bayesian analytics and in the development of <strong>economic and sustainability selection indices</strong> that keep breeding programmes accountable.

          As a <strong>Consultant Statistician at <a href="https://www.abacusbio.com/">AbacusBio</a></strong>, I lead cross-functional teams that deliver genetic-evaluation pipelines, automated QC/ETL workflows, and decision dashboards for livestock, crop, and agri-tech partners. That work depends on production-grade code in R, C++, bash, and SQL, Docker-based reproducible environments, and early collaboration between domain scientists and data engineers.

          Earlier, I held a Marie Sklodowska-Curie COFUND fellowship at the Roslin Institute (University of Edinburgh), worked with multidisciplinary research and industry teams, and lectured in statistics at USP. Along the way I have published across Nature-branded journals, advised national breeding programmes, and mentored teams on delivering transparent, auditable analyses for agriculture and genomics.

          Whether the brief is accelerating genetic gain, improving farm-system resilience, or strengthening agricultural production systems, my bias is toward rigour, reproducibility, and decision-ready outputs. Browse my recent publications and projects, and get in touch if you would like to collaborate or have a specific challenge in mind.
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
          <p>I focus on advanced statistical modelling, <strong>economic and sustainability selection indices</strong>, interactive dashboards, and reproducible (Dockerised) pipelines that deliver decision-ready insights for agriculture and genomics.</p>

          <h3>Areas of impact</h3>
          <p><strong>Agriculture.</strong> Design and analyse agronomic and farm-systems experiments, including multi-environment trials and spatial models, to optimise yield, resource use, and sustainability.</p>
          <p><strong>Genetics.</strong> Build genetic-evaluation pipelines and <em>economic and sustainability selection indices</em> that maximise genetic gain and inform breeding objectives.</p>
          <p><strong>Agri-tech analytics.</strong> Build practical decision-support tools that connect statistical modelling, data engineering, and stakeholder communication.</p>

          <p>Explore my publications, projects, and recent work. If you are interested in collaborating or would like to learn more, please get in touch.</p>

          <p>Stay connected and follow my work in statistical modelling and data analysis:</p>
          <p><a href="https://scholar.google.com/citations?user=K_MD1nsAAAAJ&hl=en" target="_blank">Google Scholar</a> | <a href="https://github.com/Prof-ThiagoOliveira" target="_blank">GitHub</a></p>

          <a class="github-button" href="https://github.com/Prof-ThiagoOliveira" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star Prof-ThiagoOliveira on GitHub">Star</a>
        </div>
    button:
      text: "Contact Me"
      url: "mailto:thiago.oliveira@ed.ac.uk"
    design:
      card:
        css_class: "bg-primary-700"
        css_style: ""
---


