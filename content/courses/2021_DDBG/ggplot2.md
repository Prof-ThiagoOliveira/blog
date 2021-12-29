---
title: The grammar of graphics
date: '2021-09-18'
type: book
weight: 20
highlight: true
---

## Visualization and Data Structure

What is the grammar of graphics? It is a tool that enables us to concisely describe the components of a graphic and provides a strong foundation for understanding a diverse range of graphics. 

### Part I: 

<iframe width="640" height="480" src="https://www.youtube.com/embed/auf38BscwTM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Part II:

<iframe width="640" height="480" src="https://www.youtube.com/embed/XocOulCnUnw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Slides

<iframe src="https://drive.google.com/file/d/1xQPa7TGGAukjnhSDjJv6eGILHj8tJ31r/preview" width="640" height="480" allow="autoplay"></iframe>

### R Code




## Exercises

```{r, include=FALSE, message=FALSE, error=FALSE, warning=FALSE}
#=======================================================================
# Packages
#=======================================================================
if (!require("pacman")) {
  install.packages("pacman")
}
# Include all packages here
pacman::p_load(
  knitr,
  tidyverse,
  kableExtra, 
  prettycode,
  formattable,
  DT,
  AlphaSimR,
  patchwork, # ggplot design
  tufte, # quotes
  ggridges,
  pathwork,
  ggpmisc,
  egg,
  datarium,
  tools
)
prettycode::prettycode()
```


If you're at all familiar with ```ggplot```, you may know the basic structure of a call to the ```ggplot()``` function. For an introduction to the ```ggplot``` package, you can check out the visualization and data structure lecture. When you call ggplot,  you should provide a data source, usually a data frame or ```tibble```. Afterward, you can build a ```ggplot``` by mapping different variables in your data source to different aesthetics. For example, there are ```colour```, ```shape```, ```size``` of points, the ```position``` of the x or y-axis, ans so on. To demonstrate this and even more procedures using ```ggplot```, we will work with different data sets such as:

* **Growth of Orange Trees**: the Orange data frame has 35 rows and 3 columns of records of the growth of orange trees.

```{r}
glimpse(Orange)
```

* **Storm tracks data**: This data is a subset of the NOAA Atlantic hurricane database best track data, https://www.nhc.noaa.gov/data/#hurdat. The data includes the positions and attributes of 198 tropical storms, measured every six hours during the lifetime of a storm.
```{r}
glimpse(storms)
```

* **Carbon Dioxide Uptake in Grass Plants**: The ```CO2``` data frame has 84 rows and 5 columns of data from an experiment on the cold tolerance of the grass species Echinochloa crus-galli.
```{r}
glimpse(CO2)
```

* **Simulated cattle breeding program (cbp)**: the ```cbp``` data frame has 10,000 rows and 7 columns of data from a simulation using the ```AlphaSimR``` package. The data is comprised of founders and phenotyped individuals (on the Milk Yield), where for each one, we have information of parents, sex, and herd. 

```{r}
cbp <- readRDS("./data/animal_sim.RDS")
glimpse(cbp)
```

### Mapping

```{r mapping}
p <- ggplot(data = cbp, aes(x = year, y = phenotype, color = sex))
p + layer(geom = "point", stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE))
```

#### Practice

Use the data CO2 (Biochemical Oxygen Demand) to build a layer with ```geom = "point"``` using ```conc``` as the response variable, ```uptake``` as an explanatory variable, and colour the points by ```Treatment```.

```{r mapping_exercises, eval=FALSE}
data(CO2)
pEx1 <- ggplot(data = , aes(x = , y = , color = ))
pEx1 + layer(geom = , stat = "identity", position = "identity", 
             params = list(shape=1, na.rm = FALSE))
```

### Facets

```{r facets}
# facet_wrap
p + layer(geom = "point", stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE)) +
  facet_wrap(facet = "sex")

# facet_grid
p + layer(geom = "point", stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE)) +
  facet_grid(rows = vars(sex), cols = vars(herd))
```

#### Practice

1. Using the previous exercise as a starting point, add a ```facet_wrap()``` using Plant as a subgroup. 
```{r facet_exercises1, eval=FALSE}
pEx1 + layer(geom = "point", stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE)) +
    facet_wrap() 
```

2. Make a plot using the ```storms``` database considering ```ts_diameter``` as response, ```hu_diameter``` as explanatory variable, and add a ```facet_grid()``` using rows as ```status``` and columns as ```category```. 

```{r facet_exercises2, eval=FALSE}
ggplot(data = , aes(y= , x=)) +
  layer(geom = "point", stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE)) +
  facet_grid(rows = , cols = )
```



### Scale

```{r scale}
p2 <- p + layer(geom = "point", stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE)) +
  facet_grid(rows = vars(sex), cols = vars(herd)) +
  scale_colour_manual(values = c("#00AFBB", "#FC4E07"))
p2

p2 + scale_color_brewer(palette = "Dark2")
```


#### Practice

Make a plot using the ```storms``` database using ```ts_diameter``` as a response, ```pressure``` as an explanatory variable, colored by ``` status```. Also add a ```facet_wrap()``` by ```category``` and do a scale transformation on the ```x``` and ```y``` axis using a ```log10()``` function. 

```{r scales_examples, eval=FALSE}
ggplot(data = storms, aes(y= , x= )) +
  layer(geom = "point", stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE)) +
  facet_wrap(...) +
  scale_y_*() +
  scale_x_*() +
  ylab(expression(log[10]("ts_diameter"))) +
  xlab(expression(log[10]("pressure")))
```


### Statistics

```{r stats}
# facet_wrap
data(Orange)
ggplot(data = Orange, aes(x = age, y = circumference)) +
  layer(geom = "point", stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE)) +
  layer(geom = "line", stat = "smooth", position = "identity",
        params = list(method = "lm", se = FALSE))

ggplot(data = cbp, aes(x = year, y = phenotype, group = year)) + 
  layer(geom = "boxplot", stat = "boxplot", position = "identity",
        params = list(outlier.colour="red", outlier.shape = 1,
                      na.rm = FALSE)) +
  facet_grid(rows = vars(sex), cols = vars(herd))

```


#### Practice

The main difference between the regression line and LOESS is that while the regression line is a straight line representing the relationship between the x and y, a LOESS line is mainly used to identify trends in the data. Faceting allows you to split the data into subgroups, build a plot adding points, a regression line, and a LOESS curve for each ```Tree``` level in the Orange data set. For this, you can use the formula ```circumference ~ age```.
 
```{r statistics_example, eval = FALSE}
ggplot(data = Orange, aes(x = , y = )) +
  layer(geom = , stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE)) +
  layer(geom = , stat = , position = "identity",
        params = list(method = , se = FALSE)) +
  layer(geom = , stat = , position = "identity",
        params = list(method = , se = FALSE, colour = "red")) +
  facet_wrap(...)
```

### Geometries

```{r geom}
ggplot(data = Orange, aes(x = age, y = circumference)) +
  layer(geom = "point", stat = "identity", position = "identity", 
          params = list(shape=1, na.rm = FALSE, width = 0.1, height = 0.1)) +
  layer(geom = "line", stat = "smooth", position = "identity",
        params = list(method = "lm", se = FALSE)) +
  facet_wrap(facet = "Tree")
```

#### Examples

```{r examples_geom}
# Density plot
p <- ggplot(data = cbp)
p + geom_density(aes(x=phenotype))

# Density plot per year
p + geom_density_ridges(aes(x = phenotype, y = year, fill = year))

# Histogram - absolute frequency of storms per month and year
ggplot(data = storms, aes(x = year)) +
  facet_wrap(~month)+
  geom_histogram(fill = "lightblue", color = "black")+
  ylab("Absolute Frequency of Tropical Storms") +
  xlab("Year") +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1))

# Histogram - relative frequency of storms per month
ggplot(data = storms, aes(x = year)) +
  geom_histogram(aes(y=stat(count)/sum(..count..)),
                 fill = "lightblue", color = "black")+
  scale_y_continuous(labels=scales::percent) +
  ylab("Relative Frequency of Tropical Storms") +
  xlab("Year") +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1))


# Histogram - absolute frequency of storms per year (stack by month)
ggplot(data = storms, aes(x = year, fill = factor(month))) +
  geom_histogram(color = "black", position = "stack")+
  ylab("Absolute Frequency of Tropical Storms") +
  xlab("Year") +
  labs(fill="Month") +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1))

# Histogram - proportion of storms per month by year
ggplot(data = storms, aes(x = year, fill = factor(month))) +
  geom_histogram(color = "black", position = "fill")+
  ylab("Proportion of Tropical Storms per Month by Year") +
  xlab("Year") +
  labs(fill="Month") +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1))


# Exercise: build a histogram with relative frequency per month within year

# Ribbon and stat_summary - Plot of a time-series
ggplot(data = Orange, aes(x = age, y = circumference)) +
  stat_summary(fun = mean, geom = "ribbon",
               alpha = 0.3, fun.max = function(x) mean(x) + 2*sd(x),
               fun.min = function(x) mean(x) - 2*sd(x), fill = "#00AFBB") +
  stat_summary(fun = mean, geom ="line", colour = "black") +
  stat_summary(fun = mean, geom ="point", colour = "blue",
               size = 2) +
  geom_point(shape=1)
```

#### Practice

A violin plot is a method of plotting numeric data, and it is similar to a box plot but with a rotated kernel density plot on each side. Violin plots can show the probability density of the data at different values, usually smoothed by a kernel density estimator. We can also combine both stories into only one. In this exercise, your task is to build a violin plot adding a box plot internally using the cbp data. Also try to modify the arguments (like ```alpha```, ```coef``` etc) to see how they change the final plot. 

```{r geometries_examples, eval=FALSE}
ggplot(data = cbp, aes(x = year, y = phenotype, group = year)) +
  geom_violin(aes(fill = ), size = 1, alpha = 0.5) +
  geom_boxplot(outlier.alpha = 0, coef =0, 
               colour = "black", width = 0.2)
```


### Coordinates

```{r coordinates}
# Cartesian coordinate
p <- ggplot(data = storms, aes(x = "", fill = factor(category))) +
  geom_bar(aes(y = stat(count)/sum(..count..))) +
  scale_y_continuous(labels=scales::percent) +
  labs(title = "Cartesian Coordinate", fill = "Category", y = "Proportion")
p

# Polar coordinate
p + coord_polar(theta="y") +
  labs(title = "Polar Coordinate")
```

### Themes

```{r standard_themes}
p <- ggplot(data = Orange, aes(x = age, y = circumference)) +
  stat_summary(fun = mean, geom = "ribbon",
               alpha = 0.3, fun.max = max,
               fun.min = min, fill = "#00AFBB") +
  stat_summary(fun = mean, geom ="line", colour = "black") +
  stat_summary(fun = mean, geom ="point", colour = "blue",
               size = 2) +
  geom_point(shape=1)

p + theme_bw()
p + theme_classic()
p + theme_light()
p + theme_grey()
p + theme_minimal()
p + theme_void()
```


```{r advanced_themes}
p + labs(title = "Modifing themes") +
  theme(axis.title = element_text(size = 13, colour = "blue", 
                                  family="serif",
                                  face = "bold"),
        axis.text = element_text(size=12, colour = "red"))

p + labs(title = "Modifing themes") +
  theme(text = element_text(size = 13, colour = "blue", 
                                  family="serif",
                                  face = "bold"))

p +
  theme(panel.grid = element_blank(),
        panel.grid.minor = element_blank(),
        panel.border = element_rect(fill=NA, color="black", 
                                    size=0.5, linetype="dashed"),
        axis.line = element_line(colour = "darkblue", 
                      size = 1, linetype = "solid"),
        axis.ticks = element_line(color="black", size=1.2),
        panel.background = element_rect(fill = "white"),
        axis.title = element_text(size = 13, colour = "darkblue", 
                                  family="serif",
                                  face = "bold"),
        axis.text = element_text(size=12, colour = "red"))

p <- ggplot(data = cbp, aes(x = year, y = phenotype, color = sex)) +
  geom_point()

p + theme_classic() +
    theme(legend.position="top",
          legend.background = element_rect(fill=NULL,
                                 size=0.5, linetype="solid", 
                                 colour ="darkblue"))
```

#### Practice

Let we start with this initial ```ggplot``` object:

```{r theme_exercise, eval=FALSE}
cbp$year2 <- as.numeric(cbp$year)
p <- ggplot(data = cbp, aes(x = year2, y = phenotype)) +
  geom_smooth(aes(linetype = herd, color = herd), 
              method = "loess", se = FALSE) +
  stat_summary(aes(group = herd,colour = herd),fun = mean, geom ="point",
               size = 1.3, shape = 1) +
  facet_wrap(~sex)
p
```

Now we have some tasks to make this plot looks more professional.

1. Add a new standard theme:

```{r, eval=FALSE}
p2 <- p + theme_*() # suggestion to classic
```

2. Change the legend from right to top, increase text (title and axis) size to ```13```, increase the axis ticks to 1.3, increase legend key width to 1.3 cm, and include a legend key with ```fill = "white"``` and ```colour = "gray40"```:

```{r, eval=FALSE}
p3 <- p2 +
  theme(legend.position = "top",
        axis.* = element_*(size = ),
        axis.* = element_*(size= ),
        axis.* = element_*(size = ),
        legend.* = element_*(fill = "white", colour = "gray40"),
        legend.key.* = unit( , "cm"))
```


3. Change the y label to ```Phenotype```, x label to ```Year```, and legend title from herd to Herd.

```{r eval=FALSE}
p3 + 
  labs(...)
```


### Quick plot

```{r quick_plot}
# Using qplot
qplot( year, phenotype, data = cbp, facets = sex ~ herd)

# using ggplot
ggplot(data = cbp, aes(x = year, y = phenotype)) +
  geom_point() +
  facet_grid(rows = vars(sex), cols = vars(herd))
```


### Annotate

```{r annotate_regression}
# Example 1
ggplot(storms, aes(x = wind, y = pressure, colour = status)) +
  geom_point(shape=1) + 
  annotate("rect", xmin = 63, xmax = 161, ymin = 880, ymax = 1010,
  alpha = .2) +
  annotate("text", x = 110, y = 888, label = "Gilbert (1988)") +
  annotate("text", x = 110, y = 882, label = "Wilma (2005)") +
  geom_segment(aes(x = 135, y = 888, xend = 159, yend = 888),
               arrow = arrow(length = unit(0.2, "cm")),
               show.legend = FALSE)+
  geom_segment(aes(x = 135, y = 882, xend = 159, yend = 882),
               arrow = arrow(length = unit(0.2, "cm")),
               show.legend = FALSE)

### Example 2
colnames(Orange)[2:3] <- c("x","y")
p1 <- ggplot(data = Orange, aes(x = x, y = y)) +
  geom_point(shape=1) +
  geom_smooth(method = "lm", se = FALSE) +
    ggpmisc::stat_poly_eq(
    aes(label =  paste(after_stat(eq.label),
                 after_stat(adj.rr.label),
                 sep = "*\", \"*")),
    formula = y ~ poly(x, 1, raw = TRUE))
p1

# Using the package ggpmisc with facets
p2 <- p1 + facet_wrap(~Tree)

tag_facet(p2, 
          x = 1300, y = -Inf, 
          vjust = -1,
          open = "", close = ")",
          tag_pool = LETTERS)

# Example 3
ex1 <- data.frame(y = 1:3, family = c("sans", "serif", "Roboto"))
ggplot(data=ex1) + 
  geom_text(aes(x=1, y=y, label = family, 
                colour = family, family = family),
            show.legend = FALSE, size = 6)+ 
  geom_label(aes(x=0, y=y, label = family, family = family,
             fontface = c(1:3)))+
  xlim(c(-0.5,1.5)) +
  theme_classic(base_size = 12)
```

#### Practice

Use the function ```lmNote``` to add the regression equation and $R^2$ to the plot using a label geometry.

```{r annotate_exercise, eval=FALSE}
# Function to extract coefficients lm(y~x)
lmNote <- function(y, x, digits=2) {
  p <- lm(y~x)
  z <- list(beta0 = format(as.numeric(coef(p)[1]), digits = digits),
            beta1 = format(abs(as.numeric(coef(p)[2])), digits = digits),
            r2 = format(summary(p)$r.squared, digits = digits));
  if (coef(p)[2] >= 0) {
    tmp <- substitute(hat(y) == beta0 + beta1 %.% x*","~~R^2~"="~r2,z)
  } else {
    tmp <- substitute(hat(y) == beta0 - beta1 %.% x*","~~R^2~"="~r2,z)  
  }
  as.character(as.expression(tmp))
}

data("Orange")
ggplot(data = Orange, aes(x = age, y = circumference)) +
  geom_point(shape=1) +
  geom_smooth(method = "lm", se = FALSE) +
  geom_*(x=400, y=200, label = lmNote(y = Orange$, x = Orange$),
            parse = TRUE)
```

### Plot Composition

```{r plot_composition_stormData}
p1 <- ggplot(data = storms, aes(x = year, fill = factor(month))) +
  geom_histogram(color = "black", position = "fill")+
  ylab("Proportion of Tropical Storms per Month by Year") +
  xlab("Year") +
  labs(fill="Month") +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1))

p2 <- ggplot(data = storms, aes(x = "", fill = factor(status):factor(category))) +
  geom_bar(aes(y = stat(count)/sum(..count..))) +
  scale_y_continuous(labels=scales::percent) +
  labs(title = "Polar Coordinate", fill = "Category", y = "Proportion") + 
  coord_polar(theta="y")

p3 <- ggplot(data = storms, aes(x = year)) +
  geom_histogram(aes(y=stat(count)/sum(..count..)),
                 fill = "lightblue", color = "black")+
  scale_y_continuous(labels=scales::percent) +
  ylab("Relative Frequency of Tropical Storms") +
  xlab("Year") +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1))

(p3 | p2) +
  plot_annotation(tag_levels = "A")

p1|(p3/p2)
```


```{r plot_composition_OrangeData}
data("Orange")
p1 <- ggplot(data = Orange, aes(x = age, y = circumference)) +
  stat_summary(fun = mean, geom = "ribbon",
               alpha = 0.3, fun.max = max,
               fun.min = min, fill = "#00AFBB") +
  stat_summary(fun = mean, geom ="line", colour = "black") +
  stat_summary(fun = mean, geom ="point", colour = "blue",
               size = 2) +
  geom_point(shape=1)

OrangeSummary <- Orange %>%
  group_by(age) %>%
  summarise(
    Age = unique(age),
    Mean = mean(circumference),
    Median = median(circumference),
    Sd = sd(circumference)
  ) %>%
  round(1)

p1 | gridExtra::tableGrob(OrangeSummary)

text <- paste("The Orange data frame has 35 rows and 3 columns", 
              "of records of the growth of orange trees.", sep = "\n")
p4 <- wrap_elements(ggpubr::text_grob(text, face="bold",color = "blue"))

p4/( p1 | gridExtra::tableGrob(OrangeSummary))
```
