---
title: "Modelling menstrual cycle length in athletes using state-space models"
authors:
- admin
- Georgie Bruinvels
- Charles Pedlar
- John Newell

date: "2020-12-10T00:00:00Z"
doi: "10.21203/rs.3.rs-122553/v1"

# Schedule page publish date (NOT publication's date).
publishDate: "2020-12-10T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["3"]

# Publication name and optional abbreviated publication name.
publication: "*Nature Scientific Reports*"

abstract: <p align="justify"> The ability to predict menstrual cycle length to a high degree of precision enables female athletes to track their period and tailor their training and nutrition correspondingly knowing when to push harder when to prioritise recovery and how to minimise the impact of menstrual symptoms on performance. Such individualisation is possible if cycle length can be predicted to a high degree of accuracy. To achieve this, a hybrid predictive model was built using data on 16,990 cycles collected from a sample of 2,178women (mean age 33.89 years, range 14.98 - 47.10, number of menstrual cycles ranging from 4 - 53). To capture the within-subject temporal correlation, a mixed-eﬀect state-space model was ﬁtted incorporating a Bayesian approach for process forecasting to predict the duration (in days) of the next menstrual cycle. The modelling procedure was split into three steps(i) a time trend component using a random walk with an overdispersion parameter, (ii) an autocorrelation component using an autoregressive moving-average (ARMA) model, and (iii) a linear predictor to account for covariates (e.g. injury, stomach cramps, training intensity). The inclusion of an overdispersion parameter suggested that 26.81% [24.14%,29.58%] of cycles in the sample were overdispersed where the random walk standard deviation under a non-overdispersed cycle is 1.0530 [1.0060,1.0526] days while under an overdispersed cycle it increased to 4.7386 [4.5379,4.9492] days. To assess the performance and prediction accuracy of the model, each woman’s last observation was used as test data. The Root Mean Square Error (RMSE), Concordance Correlation Coeﬃcient (CCC) and Pearson correlation coeﬃcient (r) between the observed and predicted values were calculated. The model had an RMSE of 1.6126 days, a precision of 0.7501 and overall accuracy of 0.9855. In the absence of hormonal measurements, knowing how aspects of physiology and psychology are changing across the menstrual cycle has the potential to help female athletes personalise their training, nutrition and recovery tailored to their cycle to sustain peak performance at the highest level and gain a competitive edge. In conclusion, the hybrid model presented here is a useful approach for predicting menstrual cycle length which in turn can be used to support female athlete wellness to optimise performance </p>

# Summary. An optional shortened abstract.
summary: Development of an appropriate parametric state-space formulation for the marginal distribution of standard menstrual cycles for female athletes

tags:
- Menstrual cycle
- Longitudinal data
- State-Space Models
- Athletes
- Statistical Modelling
- Hierarchical data

featured: TRUE

links:
 - name: "Journal Link"
   url: "https://www.researchsquare.com/article/rs-122553/v1"

url_pdf: 'https://assets.researchsquare.com/files/rs-122553/v1_stamped.pdf'
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
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
projects:
- sport-project

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
#slides: 2018-lcc
---

