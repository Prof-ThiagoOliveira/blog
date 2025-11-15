---
title: "Completed & Discontinued Projects"
summary: "A compilation of projects that have reached completion or were terminated." 
author: "Thiago de Paula Oliveira"
date: "2025-08-09"
type: docs
weight: 10
output:
  html_document:
    keep_md: yes
    toc: false
---

<style>
/* Blog post container */
body {
   font-family: 'Helvetica Neue', Arial, sans-serif;
   font-size: 1rem;
   line-height: 1.8;
   color: #333;
   text-align: justify;
   background-color: #fafafa;
   margin: 0;
   padding: 0 20px;
}

/* Header styling */
h1, 
h2, 
h3, 
h4, 
h5, 
h6 {
  font-weight: 600; /* Semi-bold for a professional look */
  margin-bottom: 0.75em; /* Slightly reduced bottom margin */
  color: #0d0d0d;
  line-height: 1.2;
  margin-top: 1.5em; /* Added top margin for consistency */
}

h1 {
  font-size: 1.75rem; 
  border-bottom: 2px solid #3b80d1;
  padding-bottom: 0.3em; /* Padding for visual separation */
  margin-top: 1em; 
}

h2 {
  font-size: 1.5rem; 
  color: #3b80d1;
  padding-bottom: 0.2em; /* Padding for visual separation */
}

h3 {
  font-size: 1.25rem; 
  color: #333;
}

h4 {
  font-size: 1.125rem; 
  color: #333;
}

h5 {
  font-size: 1rem; 
  color: #333;
}

h6 {
  font-size: 0.875rem; 
  color: #333;
}

/* Link styling */
a {
  color: #3b80d0;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  text-decoration: underline;
  color: #1a57a0;
}

/* Code styling */
pre, 
.code-input {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  margin: 20px 0;
  overflow-x: auto;
}

code {
  font-size: 0.9rem;
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
  text-align: left;
}

th, 
td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  background-color: #3b80d1;
  color: white;
}

/* Div options - color box text */
.div-1 {
  color: black;
  background-color: #d6edd3;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1.5em;
}

.div-2 {
  color: black;
  background-color: #cfbe7e;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1.5em;
}

/* Article content */
.article-content {
  text-align: justify;
}

/* Image styling */
img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 1.5em;
}
</style>


![Project collage](/media/projects-hero.svg)

> **Highlights**
>
> - Benchmarked GBS pipelines (Reads2Map) and delivered reproducible tooling for linkage-map construction.
> - Built sustainability indexes (GHG, methane efficiency) that link emissions targets with breeding goals.
> - Led analytics for sports and public-health applications, from NBA performance metrics to COVID-19 forecasting.



## 2024

### Quantifying the drivers of genetic change in plant breeding

**Summary**:
Plant breeding programmes involve a web of interconnected operations and decisions, making it difficult to pinpoint which levers drive progress. This project extends traditional phenotypic or genetic-trend analyses by partitioning changes in both genetic mean and variance, allowing us to identify the management practices that accelerate—or hinder—genetic gain.

<br>

<hr>

## 2023

### Developing high-performance black soldier fly breeds for the insects-as-feed sector

**Summary**: 
Livestock and aquaculture systems need alternatives to soy and fishmeal, positioning the black soldier fly as a scalable protein source. This work establishes a breeding programme, genetic tools, and decision dashboards that improve the fly’s productivity and resilience for a fast-growing global producer base.

<br>

### A hierarchical approach for evaluating athlete performance  

**Summary**: 
We combined mixed-effects regression and principal component analysis to build the ON score—a holistic indicator of an athlete’s contribution to team performance. Validated on NBA tracking data, the framework helps coaches and analysts compare athletes across games and seasons and understand the drivers of their impact.


**Publications**:

1. [A hierarchical approach for evaluating athlete performance with an application in elite basketball](https://www.nature.com/articles/s41598-024-51232-2)

<br>

### A comparative study of markerless and marker-based systems

**Summary**: 
We evaluate agreement between markerless and marker-based motion-capture systems using 95% functional limits of agreement within a linear mixed-effects framework. The analysis quantifies how close the systems are in biomechanical applications, providing evidence on when markerless solutions can streamline data collection without sacrificing accuracy.

**Publications**:

1. [Comparison of markerless and marker-based motion capture systems using 95% functional limits of agreement in a linear mixed-effects modelling framework](https://www.nature.com/articles/s41598-023-49360-2)

<br>

<hr>

## 2022

### AlphaPart - Partition of Breeding Values by Paths of Information

**Summary**: 
Based on Garcia-Cortés et al. (2008), AlphaPart partitions breeding values by paths of information so breeders can diagnose where gains originate. The R package includes the core partitioning function plus utilities for data wrangling, visualisation, and automated reporting.

**Publications**:

1. [A method for partitioning trends in genetic mean and variance to understand breeding practices](https://doi.org/10.1186/s12711-023-00804-3)

**R Package**:

1. [AlphaPart: Partition/Decomposition of Breeding Values by Paths of Information](https://CRAN.R-project.org/package=AlphaPart)

<br>

### Genomic strategies for optimal crossbreeding in African dairy cattle

**Summary**: 
We design genomic strategies that optimise crossbreeding decisions in East African dairy systems, ensuring that locally adapted cattle benefit from genomic selection while maintaining resilience to regional production constraints.

<br>

<hr>

## 2021

### The use of biostatistics for optimizing athletes performance

**Summary**: 
This work blends data science and sports science to deliver athlete-specific insights, covering readiness monitoring, injury-risk profiling, and performance optimisation for elite teams.

**Publications**:

1. [Modelling menstrual cycle length in athletes using state-space models, 2021](https://www.nature.com/articles/s41598-021-95960-1)

<br>

### Development of predictive models and analytics techniques to forecast historical data-driven outcomes

**Summary**: 
We build predictive-modelling pipelines that ingest historical and streaming data, fit statistical and machine-learning models, and validate forecasts as new data arrives. The work spans infectious-disease forecasting, athlete health monitoring, and other high-frequency decision environments.

**Publications**:

1. [Global short-term forecasting of COVID-19 cases, 2021](https://www.nature.com/articles/s41598-021-87230-x)
2. [Modelling menstrual cycle length in athletes using state-space models, 2021](https://www.nature.com/articles/s41598-021-95960-1)

<br>

### Optimising selection and management of diversity in plant breeding

**Summary**: 
This project quantifies and manages additive genetic variance across the breeding pipeline, ensuring that short-term gains do not erode the diversity needed for long-term competitiveness.

**Publications**: 

1. [Temporal and genomic analysis of additive genetic variance in breeding programmes](https://www.nature.com/articles/s41437-021-00485-y)

<br>

<hr>

## 2020

### The lcc Package

**Summary**: 
Longitudinal concordance correlation (LCC) evaluates agreement between two measurement methods over time by combining precision and accuracy in a single statistic. The package implements this measure with support for within-subject correlation, temporal trends, and reporting tools widely used in medical and agronomic research.

**Publications**:

1. [lcc: Longitudinal Concordance Correlation, 2019](https://cran.r-project.org/web/packages/lcc/lcc.pdf)
2. [lcc: an R package to estimate the concordance correlation, Pearson correlation and accuracy over time, 2020](https://peerj.com/articles/9850/)

**R Package**:

1. [lcc: Longitudinal Concordance Correlation](https://CRAN.R-project.org/package=lcc)

<br>

### Transmission efficiency of *xylella fastidiosa*

**Summary**:
*Xylella fastidiosa* is genetically diverse and transmitted by numerous vector species, yet vector specificity and efficiency across sequence types (STs) remain poorly understood. We combine controlled inoculation trials and behavioural studies to characterise how different ST–vector pairs interact with host plants.

**Publications**:

1. [Transmission efficiency of xylella fastidiosa subsp. Pauca sequence types by sharpshooter vectors after in vitro acquisition, 2018](https://apsjournals.apsnet.org/doi/pdf/10.1094/PHYTO-07-18-0254-FI)
2. [Settling and feeding behavior of sharpshooter vectors on plum genotypes with different susceptibility levels to leaf scald disease (Xylella fastidiosa), 2020](https://link.springer.com/article/10.1007%2Fs10658-020-02104-8)

<br>
<hr>

## 2019

### Sugarcane straw management for bioenergy

**Summary**:
Warming accelerates soil organic-matter turnover, threatening long-term soil health. Sugarcane straw—normally a key residue for nutrient cycling—is increasingly removed for bioenergy, so we evaluated how combined warming and straw removal affect greenhouse-gas emissions and Brazil’s ethanol carbon footprint.

**Publications**:

1. [Sugarcane straw management for bioenergy: effects of global warming on greenhouse gas emissions and soil carbon storage](https://link.springer.com/article/10.1007/s11027-019-09880-7)

<br>

### Measuring color using image analysis

**Summary**: 
Promote the adoption of image-analysis workflows and develop the statistical methodologies required to extract consistent colour metrics from high-throughput phenotyping data.

**Publications**:

1. [Measuring color hue in 'Sunrise Solo' papaya using a flatbed scanner (2017)](https://www.scielo.br/j/rbf/a/X6xRm34btCXNMJYGdxzdcKB/?format=pdf&lang=en)
2. [Longitudinal concordance correlation function based on variance components: an application in fruit color analysis, 2018](https://link.springer.com/article/10.1007%2Fs13253-018-0321-1)

    
