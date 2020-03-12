---
date: "2018-08-27T09:00:00Z"
draft: false
linktitle: Tips 1-4
menu:
  Workshop:
    parent: Example Topic
    weight: 1
title: R Code
toc: true
type: docs
weight: 1
---

# Tip 1

Example of a completely randomized design

```{r}
############################################################################
#################### Completely andomized Design ###########################
############################################################################

# Type of Rootstock
Trat<- gl(5,1,labels = c("P1", "P2", "P3", "P4", "Controle")) 

# Repetitions
Rep<-  5 


# Draw of treatments to plots
DIC<-function(Trat,Rep){
Trat<-rep(Trat,Rep)
N<-length(levels(Trat))*Rep # Número total de parcelas
Plan<-as.data.frame(
  matrix(
    sample(Trat,N), ncol = length(levels(Trat)), nrow=Rep
    )
  )
colnames(Plan)<-paste("Coluna", c(seq(1:length(levels(Trat)))))
rownames(Plan)<-paste("Linha", c(seq(1:Rep)))
return(Plan)
}

# Experiment Sketch
DIC(Trat,Rep)
```

# Tip 2

Example of a Randomized Block Design.

```{r}
############################################################################
################### Randomized Block Design ################################
############################################################################

# A researcher wishes to evaluate the color, odor and consistency of ruminal
# juice samples from cattle of same breed, who are treated with 3 types of 
# feeds. As a restriction ofexperiment implementation, we can confine up to 
# 4 cattle per sector and the maximum number of sectors available is 5. 
# In addition, those animals were classified into three groups of carcasses: 
# i) light (226-228 kg), ii) medium (241-243 kg) and iii) higher (259-261 Kg).
                            
# Feed
Trat<- gl(3,1,labels = c("Ração 1", "Ração 2", "Ração 3")) 

# Number of Blocks - carcass groups
Bloco<- gl(5,1,labels = c("Bloco I", "Bloco II", "Bloco III", "Bloco IV",
                          "Bloco V"))

# Total number of plots
N<-length(levels(Trat))*length(levels(Bloco))

# Draw of treatments to plots within blocks
DCB<-function(Trat,Bloco){
Trat_Bloco<-list(NA)
  for(i in 1:length(levels(Bloco))){
    Trat_Bloco[[i]]<-matrix(
    sample(Trat,length(levels(Trat))))
  }

Plan<-do.call(cbind.data.frame, Trat_Bloco)
colnames(Plan)<-c(levels(Bloco))
rownames(Plan)<-paste("Linha", c(1:length(levels(Trat))))
return(Plan)
}
# Experiment Sketch
DCB(Trat,Bloco)
```

# Tip 3

Example of a completely randomized designs for factorial structure

```{r}
############################################################################
################## Completely randomized designs ###########################
####################### Factorial structure ################################
############################################################################
# Five soy cultivar
Cultivar<-gl(5,1,labels=c("BRS 1003IPro", "BRS 1007IPro", "BRS 1010IPro", "BRS 1074IPro",
                 "BRS 706IPro"))

# Four nutrient solution with levels of 0.1.2, and 4 mg / liter of manganese.
Solucao<-gl(4,1,labels = c("0", "1", "2", "4"))

# Treatments
Trat<-expand.grid(Cultivar = Cultivar, Solução = Solucao)
Trat$Tratamento<-as.factor(paste(Trat$Cultivar,Trat$Solução))
  
# Repetition
Rep<-  10 


# Draw of treatments to plots
DIC<-function(Trat,Rep){
N<-length(levels(Trat))*Rep # Total number of plots
Trat<-rep(Trat,Rep)
Plan<-as.data.frame(
  matrix(
    sample(Trat,N), ncol = Rep, nrow=length(levels(Trat))
    )
  )
colnames(Plan)<-paste("Coluna", c(seq(1:Rep)))
rownames(Plan)<-paste("Linha", c(seq(1:length(levels(Trat)))))
return(Plan)
}

# Experiment Sketch
DIC(Trat$Tratamento,Rep)
```

# Tip 4

Example of a Latin Square Design

```{r}
############################################################################
######################## Latin Square Design ###############################
############################################################################

L1<-gl(4,1,labels = c("A","B","C","D"))
L2<-gl(4,1,labels = c("B","C","D","A"))
L3<-gl(4,1,labels = c("C","D","A","B"))
L4<-gl(4,1,labels = c("D","A","B","C"))
Trat<-rbind(paste0(L1),paste0(L2),paste0(L3),paste0(L4))

QL<-function(Trat){
  #Sorteando as linhas
  Linha<-Trat[sample(nrow(Trat),size=ncol(Trat)),]
  Coluna<-Linha[, sample(nrow(Linha),size=ncol(Linha))]
  return(Coluna)
  }
QL(Trat)
```