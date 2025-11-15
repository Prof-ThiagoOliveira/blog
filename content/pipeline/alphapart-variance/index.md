---
title: "AlphaPart variance partition pipeline"
date: "2023-07-01"
publishDate: "2023-07-01T00:00:00Z"
summary: "Simulation + MCMC workflow for partitioning trends in genetic mean and variance (Oliveira et al., GSE 2023)."
tags:
  - Pipeline
  - Simulation
  - Genetics
  - AlphaPart
links:
  - icon: brands/github
    icon_pack: fab
    name: Repository
    url: https://github.com/HighlanderLab/toliveira_alphapart_variance
  - icon: link
    name: Paper
    url: https://gsejournal.biomedcentral.com/articles/10.1186/s12711-023-00804-3
---

This repository accompanies Oliveira et al. (2023, Genetics Selection Evolution) and provides the full pipeline behind the paper “A method for partitioning trends in genetic mean and variance to understand breeding practices.” It simulates cattle breeding programmes, runs AlphaPart on true breeding values and on posterior samples (via Gibbs sampling), and produces the figures in the manuscript.

### Structure at a glance

1. **Simulation** (`simulation5Males/`)
   - `globalParameters.R`, `CreateFounders.R`, `burnin.R`, plus scenarios 1 and 2 scripts generate medium- and high-accuracy breeding programmes (via AlphaSimR).
   - `RunME.R` orchestrates the entire simulation.
2. **True trend analysis** (`Analysis/`)
   - `AlphaPart_TruePartition.R` (single replicate) and `AlphaPart_TruePartition30reps.R` (30 replicates) partition true breeding values.
3. **Posterior/MCMC analysis**
   - `gibbs1f90*.R` scripts call the blupf90 suite to sample from \(p(a \mid y)\) with and without inbreeding.
   - `AlphaPart_Gibbs_*` scripts validate medium- and high-accuracy scenarios using phenotypes or TBVs, again with/without inbreeding.
4. **Supplementary runs** (`Analysis/Supplementary/30_Replicates/`)
   - `RUNME.R` executes 30-replicate analyses; `AlphaPart_Results.R` aggregates and plots outputs.

### Prerequisites

- R ≥ 4.0 with packages such as AlphaSimR, AlphaPart, tidyverse, etc. (install via the scripts).
- BLUPF90 family installed under `$HOME/bin/` if you wish to run the Gibbs sampling pieces (`gibbs1f90.R`).
- AlphaSimR-compatible simulation tools for generating founder populations.

### How to run

1. Clone the repo and start with `RunME.R` to generate simulated data.
2. Execute the analysis scripts (true trend, Gibbs/MCMC) inside `Analysis/`.
3. Use the supplementary 30-replicate folder for extended results and `AlphaPart_Results.R` for visualisation.

The pipeline mirrors the GSE publication and serves as a template for partitioning genetic trends in other breeding-programme designs.
