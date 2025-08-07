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
          I am a seasoned statistician with <strong>over 14 years of 
          experience</strong> in experimental statistics and statistical 
          modelling. 
          I also specialise in the <strong>development of economic and 
          sustainability selection indices</strong> to support breeding and 
          systems optimisation.
          
          My research interests include <strong>statistical modelling</strong>,
          <strong>selection indeces</strong>,
          <strong>agriculture</strong>, <strong>genetics</strong>, and sports.
          
          Currently, I am <strong>Consultant Statistician at 
          <a href="https://www.abacusbio.com/">AbacusBio</a></strong>, 
          where I leverage my expertise in statistical methods and data 
          analysis to drive impactful research and innovative solutions. 
  
          My career has been marked by the application of both qualitative 
          and quantitative methods to explore the role of science and technology 
          across various sectors.

          I am passionate about using data to uncover insights and support 
          decision‑making. Whether it is improving agricultural outcomes or 
          enhancing athletic performance, my goal is to apply rigorous 
          statistical techniques to solve real‑world problems.

          Please review my publications and 
          get in touch if you are interested in 
          collaboration or have any enquiries.
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
    demo: false # This section is not just for the demo site
    content:
      title: "🎓 Connect with an expert statistician"
      text: |-
        <div style="text-align: justify; font-family: Arial, sans-serif; line-height: 1.6;">
          <p>My work focuses on advanced statistical modelling, the development of <strong>economic and sustainability selection indices</strong>, interactive dashboards, and reproducible pipelines (Docker), delivering decision‑ready insights in agriculture and sports performance.</p>

          <h3>Areas of impact:</h3>
          <ul>
          <li><strong>Agriculture:</strong> Designed and analysed agronomic and farm‑systems experiments, including multi‑environment trials and spatial models, to <em>optimise</em> yield, resource use, and sustainability.</li>
          <li><strong>Genetics:</strong> Built genetic evaluation pipelines and <em>economic and sustainability selection indices</em> to maximise genetic gain and inform breeding objectives.</li>
          <li><strong>Sports analytics:</strong> Developed tools and applications that enhance athlete performance through data‑driven insights.</li>
          </ul>

          <p>Explore my publications, upcoming talks, and recent work. If you are interested in collaboration or would like to learn more, please get in touch.</p>

          <p>Stay connected and follow my journey in statistical modelling and data analysis:</p>
          <ul>
            <li><a href="https://scholar.google.com.br/citations?hl=pt-BR&user=KKY2ynUAAAAJ" target="_blank">Google Scholar</a></li>
            <li><a href="https://github.com/Prof-ThiagoOliveira" target="_blank">GitHub</a></li>
          </ul>

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

