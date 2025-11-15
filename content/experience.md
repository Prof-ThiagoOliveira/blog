---
title: 'Experience'
date: 2023-10-24
type: landing

design:
  spacing: '5rem'

# Note: `username` refers to the user's folder name in `content/authors/`

# Page sections
sections:
  - block: resume-experience
    content:
      username: admin
    design:
      # Hugo date format
      date_format: 'January 2006'
      # Education or Experience section first?
      is_education_first: false
  - block: resume-skills
    content:
      title: Skills & Hobbies
      username: admin
      text: |-
        <p align="justify">
          I rely on a mix of programming languages, statistical methods, and creative outlets. 
          <strong>Programming:</strong> R (packages, pipelines, Shiny), C++ (performance-critical code), Bash/Python (automation), Docker/CI/git for reproducible stacks. 
          <strong>Statistical tools:</strong> mixed models, Bayesian workflows, spatial/longitudinal analytics, concordance/causal analysis. 
          <strong>Creative balance:</strong> photography, hiking, and travel fuel the observational skills I bring to analytic work.
        </p>
      show_skill_percentage: false
  - block: resume-awards
    content:
      title: Awards
      username: admin
  - block: resume-languages
    content:
      title: Languages
      username: admin
---
