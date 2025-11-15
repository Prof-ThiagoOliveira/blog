---
# Leave the homepage title empty to use the site title
title: ""
date: 2.22-10-24
type: landing

design:
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      username: admin
      text: ""
      button:
        text: Download Short CV
        url: uploads/Oliveira_Thiago_Company_CV.pdf
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
      title: '📈 Expertise and Research'
      subtitle: ''
      text: |-
        <div style="text-align: justify;">
          I am a statistician with <strong>14+ years of experience</strong> turning noisy experimental, genomic, and performance data into decisions. After completing my PhD in Statistics at the University of São Paulo, I specialised in advanced mixed-model/Bayesian analytics and in the development of <strong>economic and sustainability selection indices</strong> that keep breeding programmes accountable.
          
          As a <strong>Consultant Statistician at <a href="https://www.abacusbio.com/">AbacusBio</a></strong>, I lead cross-functional teams that deliver genetic-evaluation pipelines, automated QC/ETL workflows, and decision dashboards for livestock, crop, and agri-tech partners. That work depends on production-grade code in R/C++/Bash, Docker-based reproducible environments, and early collaboration between domain scientists and data engineers.
          
          Earlier, I held a Marie Skłodowska-Curie COFUND fellowship at the Roslin Institute (University of Edinburgh), built predictive health and sports-analytics products at the Insight Centre (NUI Galway) and Orreco, and lectured in statistics at USP. Along the way I have published across Nature-branded journals, advised national breeding programmes, and mentored teams on delivering transparent, auditable analyses.

          Whether the brief is accelerating genetic gain, improving farm-system resilience, or supporting athlete health, my bias is toward rigour, reproducibility, and decision-ready outputs. Browse my recent publications and projects, and get in touch if you would like to collaborate or have a specific challenge in mind.
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
        - block: hero
          content:
            title: "Thiago Oliveira"
            subtitle: "Statistician — quantitative genetics, R/C++, dashboards, reproducible workflows"
            text: "I help teams turn experimental and genomic data into decision-ready insights."
            button:
              text: "Download CV"
              url: uploads/Oliveira_Thiago_Company_CV.pdf
          design:
            css_class: hero-compact

        - block: markdown
          content:
            title: '📈 Expertise and Research'
            text: |-
              I focus on applied statistics, model-based inference, and reproducible pipelines. Below you'll find featured publications, recent work, talks, and posts — quick ways to judge fit and recent activity.
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

        - block: markdown
          content:
            title: 'Cited by'
            text: |-
              <div id="cited-by-chart" data-src="/data/citations.json" style="max-width:700px; margin: .5rem 0 1rem;"></div>
              <script defer src="/js/citation-graph.js"></script>
          design:
            columns: '1'

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
            title: "🎓 Connect with an expert statistician"
            text: |-
              <div style="text-align: justify; font-family: Arial, sans-serif; line-height: 1.6;">
                <p>If you'd like to discuss collaborations, consulting, or supervision, please get in touch.</p>
                <p><a class="btn" href="mailto:thiago.oliveira@ed.ac.uk">Contact Me</a></p>
              </div>
          design:
            card:
              css_class: "bg-primary-700"
              css_style: ""
