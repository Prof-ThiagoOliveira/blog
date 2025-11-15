---
title: "Oliveira–Newell (ON) score pipeline"
date: "2024-05-01"
publishDate: "2024-05-01T00:00:00Z"
summary: "Scripts for the multilevel basketball evaluation framework (Oliveira-Newell score)."
tags:
  - Pipeline
  - Sports Analytics
  - Mixed Models
  - Basketball
links:
  - icon: brands/github
    icon_pack: fab
    name: Repository
    url: https://github.com/Prof-ThiagoOliveira/Oliveira-Newell_Score
---

This repository implements the methodology from “Unlocking Athlete Performance: A multilevel approach for evaluating contributions in basketball.” It combines mixed-effects models and PCA to generate the Oliveira–Newell (ON) score at season, game, and athlete-contribution levels.

### Components

- Data wrangling scripts for NBA play-by-play/box-score data (2015–2019).
- Mixed-effects model fitting that respects the hierarchical (player–team–season) structure.
- PCA-based aggregation of model outputs into a single ON score.
- Validation scripts comparing predictions across seasons/games.

### Why it matters

- Provides a calibrated, reproducible alternative to ad-hoc box-score metrics.
- Fast (restricted likelihood) estimation compared to Bayesian samplers; suitable for season-long dashboards.
- Extensible to other sports with similar hierarchical data structures.

Run the scripts per the README to fit models, compute ON scores, and reproduce the analyses demonstrated in the paper.
