---
title: Tidyverse
date: '2021-09-18'
type: book
weight: 40
highlight: true
---

## Visualization and Data Structure

Tidy data refers to data arranged to make data processing, analysis, and visualization simpler. Remember that in a tidy data set we should consider:

* Each variable must have its column.
* Each observation must have its row.
* Each value must have its cell.

## Video

<iframe src="https://drive.google.com/file/d/1PYx-z5yD5wreZga0Ug_N7bvSwIzLFU-E/preview" width="100%" height="480" allow="autoplay" allowfullscreen></iframe>

### Slides

<iframe src="https://drive.google.com/file/d/1-nvdnlpIlKK4s976c1PbperCTd4zzOyj/preview" width="100%" height="480" allow="autoplay"></iframe>

## Exercises

#### Exercise 1
Let’s say we want to organize the data ```anscombe```. Below I show how this data looks like:
```{r}
anscombe
```


1. Organize this data set to obtain tidy data. Remember here we have two response variables been measured four times. 

```{r, eval=FALSE}
ex1 <- anscombe %>%
  
```


2. Filter the data set to get replications 2 and 4, and summarise it to 
get the maximum, minimum, and mean values.
```{r, eval=FALSE}
ex2 %>%
  filter() %>%
  summarise(
    
  )
```

#### Exercise 2

Often you do not need the entire data set, but just part of it. 

1. Here, you should make the data ```mtcars``` tidy before making any selection.

```{r}
(dataEx3 <- readRDS("./data/dataEx3.rds"))
```

As you can see, some columns are not variable names but values. Create two new variables calling mpg (for observations) and gear (with column values). 

```{r, eval=FALSE}
dataEx3 <- dataEx3 %>%
  pivot_longer(
    
  )
```

2. Select the columns mpg, hp, gear, and carb, and then make a plot using ggplot2 where ``` mpg``` is the response variable, and ```hp``` is the co-variate in the x-axis. Also include different shapes and colours for ```gear```, and facets for ```carb```. 

```{r, eval=FALSE}
dataEx3 %>%
  select() %>%
  ggplot() %>%
  geom_point() %>%
  facet_wrap() %>%
  theme_bw()
```

#### Exercise 3

The following data represents song rankings for Billboard top 100 in the year 2000. The rank of the song is displayed in each week after it entered.

```{r}
billboard
```

A slightly more complex case where columns have a common prefix and missing missings are structural, so should be dropped. So, make this data tidy.

```{r, eval=FALSE}
billboard %>%
  
```

### Data Structure

#### Exercise 1

1. Make this data tidy by including ```tmin``` and ```tmax``` as variable. Remember that here type is carrying to variables names rather than factors. 

```{r}
(dataEx2 <- as.tibble(readRDS("./data/dataEx2.RDS")))
```

```{r, eval=FALSE}
dataEx2 <- dataEx2 %>%
  pivot_wider()
```

Now, build a new variable called ```tdiff```, which is the difference between ```tmax``` and ```tmin```. Moreover, display a ```ggplot2``` graph that shows ```tdiff``` over time.

```{r, eval=FALSE}
dataEx2 %>%
  
```


#### Exercise 2

Our cattle data data is already in a tidy format.
```{r}
(cbp <- readRDS("./data/animal_sim.RDS"))
```

For this exercise, complete the following tasks with that data set:

1. Calculate the average phenotype per year by sex and herd using the ```summarise()``` function in the dplyr package.
2. Add two columns to cattle data using the ```mutate()``` function: 
    1. Column 1: Phenotype should be rescaled to have a mean of zero and a standard deviation of one. You can call this new variable as ```PhenoStd```.
    2. Column 2: Rank the ```PhenoStd``` using the function ```min_rank()```. 
    3. The output data frame should have only ```PhenoStd > 0```.

```{r, eval=FALSE}
cbp %>%
  summarise(
    
  ) %>%
```


#### Exercise 3

Excerpt of the Gapminder data on life expectancy, GDP per capita, and population by country. This data has 142 countries observed from the year 1952 to 2007 in increments of 5 years. The response variable observed was the life expectancy at birth (in years), population size, and Per capita gross domestic product (GDP). 

Per capita gross domestic product (GDP) measures a country's economic response per person and is calculated by dividing its GDP by its population. It is a global measure for gauging the prosperity of nations as we can analyze the worth of a country based on its economic growth. Thus, countries that have the highest per capita GDP tend to be more developed.


```{r}
gapminder
```

Questions:

1. What are the ten highest ```gpdPercap``` values?

```{r, eval=FALSE}
gapminder %>%
```

2. Find both the median life expectancy (```lifeExp```) and the median and maximum GDP per capita (```gdpPercap```) in 1957, 1982, and 2007, by country and continent. Call them ```medianLifeExp```, ```medianGdpPercap```, and ```maxGdpPercap```, respectively.

```{r, eval=FALSE}
dat <- gapminder %>%
```

3. Use a scatter plot to compare the median GDP and median life expectancy. Use the variables continent and year to produce this plot.

```{r, eval=FALSE}
dat %>%
  
```