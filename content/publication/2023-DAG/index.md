---
title: "Pedigree-based Animal Models Using Directed Acyclic Graphs"
authors:
- admin
- Ivan Pocrnic
- Gregor Gorjanc

date: "2023-06-10T00:00:00Z"
doi: "https://www.researchsquare.com/article/rs-3057436/v1"

# Schedule page publish date (NOT publication's date).
publishDate: "2023-06-10T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["3"]

# Publication name and optional abbreviated publication name.
publication: "*Under consideration in Livestock Science*"

abstract: <p align="justify">This paper introduces a versatile graphical model for animal models, adaptable to various animal model variants in JAGS and NIMBLE using the BUGS language. The proposed model represents the animal model as a directed acyclic graph (DAG), enabling a computationally efficient implementation that is conceptually equivalent to mixed model equations. The model offers several benefits, serving as a foundation for numerous animal model extensions and applicability in other environments. Quantitative geneticists can utilize this graphical model to clarify and discuss ideas about the underlying data generation process and propose novel statistical models or associations. The animal model, frequently employed in quantitative genetics, estimates individual breeding values based on observed phenotypic data and known relationships between individuals. It is especially useful in animal breeding programs aiming to enhance desirable traits, such as milk production in dairy cattle or meat quality in swine, which are often complex and influenced by multiple genes and environmental factors. By incorporating DAGs in the implementation of the animal model, the results become more reproducible, which is vital for constructing animal models and using DAGs to communicate outcomes or justify covariate selection. The model has the potential to improve the accuracy of breeding value estimates and inform breeding programs targeting desirable trait enhancement in animal populations. Additionally, its generic form can be used with MCMC methods to infer changes in additive genetic variance across generations due to the Bulmer effect, applicable in evolutionary studies. However, some initial programming experience is necessary for effective model utilization. In summary, this paper emphasizes the importance of reproducibility in constructing animal models and using DAGs for result communication, crucial for advancing quantitative genetic research. The proposed graphical model offers a flexible environment for quantitative genetics researchers, facilitating a deeper understanding of the underlying data structure and enabling informed decisions about covariate selection and new statistical model development. Moreover, the model has the potential to increase the accuracy of breeding value estimates and inform breeding programs focused on enhancing desirable traits in animal populations.</p>

# Summary. Graphical model using DAGs improves animal model construction in quantitative genetics for better breeding value accuracy and research clarity.

tags:
- Quantitative Genetics
- Animal Model
- Bayesian
- Effective Sample Size
- BUGS Language
- Directed acyclic graph (DAG)
- MCMC methods
- Graphical model

featured: true

links:
 - name: "Journal Link"
   url: "https://www.sciencedirect.com/journal/livestock-science"

url_pdf: ''
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''



# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
#image:
#  caption: 'Image credit: **Thiago de Paula Oliveira**'
#  focal_point: ""
#  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
- genetic-project
---
