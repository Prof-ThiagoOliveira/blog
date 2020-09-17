---
title: "lcc: an R package to estimate the concordance correlation, Pearson correlation, and accuracy over time"
authors:
- admin
- Rafael de Andrade Moral
- Silvio Sandoval Zocchi
- Clarice G. B. Demetrio
- John Hinde

date: "2020-08-13T00:00:00Z"
doi: "10.7717/peerj.9850"

# Schedule page publish date (NOT publication's date).
publishDate: "2020-08-13T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["2"]

# Publication name and optional abbreviated publication name.
publication: "*PeerJ*"
publication_short: "PeerJ"

abstract: <p align="justify"> <b>Background and Objective:</b> Observational studies and experiments in medicine, pharmacology, and agronomy are often concerned with assessing whether different methods or raters produce similar values over the time when measuring a quantitative variable. This paper aims to describe the statistical package lcc, for are, that can be used to estimate the extent of agreement between two (or more) methods over the time, and illustrate the developed methodology using three real examples. <br> <br> <b>Methods:</b> The longitudinal concordance correlation, longitudinal Pearson correlation, and longitudinal accuracy functions can be estimated based on ﬁxed effects and variance components of the mixed-effects regression model. Inference is made through bootstrap conﬁdence intervals and diagnostic can be done via plots, and statistical tests. <br> <br> <b>Results:</b> The main features of the package are estimation and inference about the extent of agreement using numerical and graphical summaries. Moreover, our approach accommodates both balanced and unbalanced experimental designs or observational studies, and allows for different within-group error structures, while allowing for the inclusion of covariates in the linear predictor to control systematic variations in the response. All examples show that our methodology is ﬂexible and can be applied to many different data types. <br> <br> <b>Conclusions:</b> The lcc package, available on the CRAN repository, proved to be a useful tool to describe the agreement between two or more methods over time, allowing the detection of changes in the extent of agreement. The inclusion of different structures for the variance-covariance matrices of random effects and residuals makes the package ﬂexible for working with different types of databases. </p>

# Summary. An optional shortened abstract.
summary: Describe the statistical package lcc using three real examples. Accepedted for publication.

tags:
- Source Themes
featured: TRUE

links:
 - name: "Journal Link"
   url: "https://peerj.com"
 - name: "Dashboard App"
   url: "https://prof-thiagooliveira.shinyapps.io/lccApp/"

url_pdf: https://peerj.com/articles/9850/
url_code: https://github.com/Prof-ThiagoOliveira/lcc
url_dataset: https://link.springer.com/article/10.1007%2Fs13253-018-0321-1
url_poster: ''
url_project: ''
url_slides: files/seminars/2019-seminar.pdf
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Image credit: **Thiago de Paula Oliveira**'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: [R Packages]

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
#slides: 2018-lcc
---

Supplementary notes were added here:

* lcc package
    * Github: https://github.com/Prof-ThiagoOliveira/lcc
    * CRAN: https://CRAN.R-project.org/package=lcc
