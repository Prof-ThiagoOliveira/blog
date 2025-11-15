---
title: 'R Packages'
date: 2024-11-01
type: landing

design:
  spacing: '5rem'

sections:
  - block: collection
    content:
      title: Maintained R packages
      text: |-
        <p align="justify">
          Tooling I maintain for correlation, agreement, and quantitative-genetics workflows. Each package ships with unit tests, documentation, and benchmarks so teams can adopt them confidently.
        </p>
      filters:
        folders:
          - rpackage
    design:
      view: article-grid
      fill_image: false
      columns: 3

  - block: collection
    content:
      title: Pipelines & Scripts
      text: |-
        <p align="justify">
          Reproducible R workflows (not full packages) that I rely on for simulations, benchmarking, and method demonstrations.
        </p>
      filters:
        folders:
          - pipeline
    design:
      view: article-grid
      fill_image: false
      columns: 3
---
