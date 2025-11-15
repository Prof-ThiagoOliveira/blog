---
title: "Temporal & genomic additive-variance analysis"
date: "2021-06-01"
publishDate: "2021-06-01T00:00:00Z"
summary: "Scripts for Lara et al. (2021, Heredity) to track additive genetic variance across breeding programme stages."
tags:
  - Pipeline
  - Additive Variance
  - Simulation
  - AlphaSimR
links:
  - icon: brands/github
    icon_pack: fab
    name: Repository
    url: https://github.com/HighlanderLab/llara_additive_genVar
  - icon: link
    name: Paper
    url: https://doi.org/10.1038/s41437-021-00485-y
---

This workflow reproduces Lara et al. (2021, Heredity) “Temporal and genomic analysis of additive genetic variance in breeding programmes.” It simulates a multi-stage wheat breeding programme, partitions additive variance over time, and generates the figures/tables published in the paper.

### Repository layout

- `10simulations/`: optimised scripts for running ten repetitions of the analysis.
- `Result_paper/`: simulation + analysis scripts used in the manuscript, including plotting and table outputs (requires AlphaSimR v0.11.0).
- `Sensitivity_Genetic_Architecture/`: evaluates the framework under different genetic architectures (varying QTL counts, genotype-by-year interactions; uses AlphaSimR v1.0.1).

### Highlights

- Tracks additive variance across pipeline stages and through time, leveraging AlphaSimR outputs and custom partitioning scripts.
- Provides ready-to-run scenarios for assessing breeding programme design choices.
- Documents software requirements (AlphaSimR versions, R dependencies) for reproducibility.

Clone the repo, follow the README instructions for AlphaSimR setup, and execute the scripts in each folder to replicate the analyses from Lara et al. (2021).
