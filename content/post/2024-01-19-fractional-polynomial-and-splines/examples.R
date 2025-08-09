# Load necessary libraries
library(splines)
library(mfp)
library(ggplot2)
library(dplyr)
library(gridExtra)
library(grid)
library(gganimate)
library(tidyr)
library(caret)

#=======================================================================
# Figure 1
#=======================================================================
# Set seed for reproducibility
set.seed(123)

# Generate data for polynomial models of degrees 1 through 4
data_list <- list()
for (degree in 1:4) {
  x <- seq(-3, 3, length.out = 100)
  y <- 0
  
  # Generating a polynomial of the current degree
  for (i in 1:degree) {
    y <- y + rnorm(1) * x^i
  }
  
  # Adding some noise
  y <- y + rnorm(length(x), mean = 0, sd = 2)
  
  # Storing the dataset
  data_list[[degree]] <- data.frame(x, y, Degree = degree)
}

# Combine all datasets
all_data <- do.call(rbind, data_list)

# Fit polynomial models and predict
predictions <- lapply(1:4, function(degree) {
  model <- lm(y ~ poly(x, degree, raw = TRUE), data = all_data, subset = Degree == degree)
  predict(model, newdata = all_data[all_data$Degree == degree,])
})

# Combine predictions with the data
all_data$Predicted <- unlist(predictions)

# Plot with facet wrap
ggplot(all_data, aes(x = x, y = y)) +
  geom_point() +
  geom_line(aes(y = Predicted), color = "red") +
  facet_wrap(~ Degree, scales = "free", ncol = 2) +
  labs(title = "Polynomial Models of Degrees 1 to 4",
       x = "Explanatory Variable",
       y = "Response Variable") +
  theme_minimal()

ggsave("content/post/2024-01-25-Polynomials-Splines/polynomial.png",
       width = 7, height = 7)
#=======================================================================
# Figure 2
#=======================================================================
# Simulate data
set.seed(42)
x <- runif(100, min = 0, max = 10)
y <- 1.5 * x^2 - 10 * x + 7 + rnorm(100, mean = 0, sd = 10)

data <- data.frame(x, y)

# Fit models
# Parsimonious model (2nd degree polynomial)
parsimonious_model <- lm(y ~ poly(x, 2, raw = TRUE), data = data)

# Overfitted model (10th degree polynomial)
overfit_model <- lm(y ~ poly(x, 10, raw = TRUE), data = data)

# Create a grid for predictions
x_grid <- seq(min(x), max(x), length.out = 200)
grid_data <- data.frame(x = x_grid)

# Predictions for plotting
predictions_parsimonious <- predict(parsimonious_model, newdata = grid_data)
predictions_overfit <- predict(overfit_model, newdata = grid_data)

data2 <- data.frame(x_grid, predictions_parsimonious, predictions_overfit)

# Create plots
ggplot(data, aes(x = x, y = y)) +
  geom_point(color = "black") +
  geom_line(data = data2, 
            aes(x = x_grid, y = predictions_parsimonious), color = "blue",
            size = 1.2) +
  geom_line(data = data2, 
            aes(x = x_grid, y = predictions_overfit), 
            color = "red", linetype = 2, size = 1.2) +
  labs(title = "Comparison of Parsimonious and Overfit Polynomial Models",
       subtitle = "Blue: Parsimonious Model, Red: Overfit Model",
       x = "Explanatory Variable",
       y = "Response Variable") +
  theme_minimal()
ggsave("content/post/2024-01-25-Polynomials-Splines/poly_overfit.png",
       width = 8, height = 6)

#=======================================================================
# Figure 3
#=======================================================================
# Example 1: Parabola Opening Upwards
# y = x^2 - 4x + 3 (a = 1 > 0)
x1 <- seq(-1, 5, by = 0.1)
y1 <- x1^2 - 4*x1 + 3
data1 <- data.frame(x = x1, y = y1)

# Example 2: Parabola Opening Downwards
# y = -x^2 + 4x - 3 (a = -1 < 0)
x2 <- seq(-1, 5, by = 0.1)
y2 <- -x2^2 + 4*x2 - 3
data2 <- data.frame(x = x2, y = y2)

# Plotting
p1 <- ggplot(data1, aes(x, y)) + 
  geom_line(color = "blue", size = 1) + 
  ggtitle("Parabola Opening Upwards") +
  labs(x = "Explanatory Variable",
       y = "Response Variable") +
  theme_minimal() +
  theme(plot.title = element_text(hjust = 0.5))

p2 <- ggplot(data2, aes(x, y)) + 
  geom_line(color = "red", size = 1) + 
  ggtitle("Parabola Opening Downwards") +
  labs(x = "Explanatory Variable",
       y = "Response Variable") +
  theme_minimal() +
  theme(plot.title = element_text(hjust = 0.5))

# Combine the plots
combined_grob <- arrangeGrob(p1, p2, nrow = 1)

# Save the combined plot
ggsave("content/post/2024-01-25-Polynomials-Splines/parabola.png", combined_grob, width = 6, height = 4)


#=======================================================================
# Figure 4
#=======================================================================
# Example 1: Linear relationship with a fractional power of 0.5
set.seed(123)
x1 <- runif(100, 1, 10)
y1 <- 2 * x1^0.5 + rnorm(100)
data1 <- data.frame(x = x1, y = y1)
model1 <- lm(y ~ I(x^0.5), data = data1)

# Example 2: Inverse relationship with a fractional power of -1
x2 <- runif(100, 1, 10)
y2 <- 3 * x2^-1 + rnorm(100)
data2 <- data.frame(x = x2, y = y2)
model2 <- lm(y ~ I(x^-1), data = data2)

# Example 3: Cubic root relationship with a fractional power of 1/3
x3 <- runif(100, 1, 10)
y3 <- 4 * x3^(1/3) + rnorm(100)
data3 <- data.frame(x = x3, y = y3)
model3 <- lm(y ~ I(x^(1/3)), data = data3)

# Example 4: Exponential decay with a fractional power of -0.5
x4 <- runif(100, 1, 10)
y4 <- 5 * x4^-0.5 + rnorm(100)
data4 <- data.frame(x = x4, y = y4)
model4 <- lm(y ~ I(x^-0.5), data = data4)

# Plotting the datasets and their fitted models
plot_model <- function(data, model_formula, title_expression) {
  ggplot(data, aes(x = x, y = y)) +
    geom_point() +
    geom_smooth(method = "lm", formula = model_formula, se = FALSE, color = "blue") +
    labs(title = title_expression) +
    theme_minimal()
}

# Define the model formulas for plotting
formula1 <- y ~ I(x^0.5)
formula2 <- y ~ I(x^-1)
formula3 <- y ~ I(x^(1/3))
formula4 <- y ~ I(x^-0.5)


# Create plots using the corrected formulas with expressions
p1 <- plot_model(data1, formula1, expression(y == 2 * x^0.5))
p2 <- plot_model(data2, formula2, expression(y == 3 * x^-1))
p3 <- plot_model(data3, formula3, expression(y == 4 * x^(1/3)))
p4 <- plot_model(data4, formula4, expression(y == 5 * x^-0.5))

# Displaying the plots
# Combine the plots
combined_grob <- arrangeGrob(p1, p2, p3, p4, nrow = 2)

# Save the combined plot
ggsave("content/post/2024-01-25-Polynomials-Splines/frac_poly.png", combined_grob, width = 6, height = 6)


#=======================================================================
# Figure 6
#=======================================================================
# Create synthetic data
set.seed(123)
x <- seq(0, 10, length.out = 100)
y <- sin(x) + rnorm(100, sd = 0.2)
data <- data.frame(x, y)

# Fit a cubic polynomial
cubic_model <- lm(y ~ poly(x, 3), data = data)

# Fit a fractional polynomial using mfp
frac_poly_model <- mfp(y ~ fp(x), data = data)

# Fit a cubic spline
cubic_spline_basis <- bs(data$x, degree = 3, knots = c(3, 7))
cubic_spline_model <- lm(y ~ cubic_spline_basis, data = data)

# Fit a B-spline model
b_spline_basis <- bs(data$x, degree = 3)
b_spline_model <- lm(y ~ b_spline_basis, data = data)

# Generate predictions
data$pred_cubic <- predict(cubic_model, newdata = data)
data$pred_frac_poly <- predict(frac_poly_model, newdata = data, type = "response")
data$pred_cubic_spline <- predict(cubic_spline_model, newdata = data)

# Generate correct predictions for B-spline model
# Function to perform cross-validation
evaluate_model <- function(knots, data) {
  # Cross-validation setup
  folds <- cut(seq(1, nrow(data)), breaks = 10, labels = FALSE)
  res <- sapply(1:10, function(i){
    testIndexes <- which(folds == i, arr.ind = TRUE)
    testData <- data[testIndexes, ]
    trainData <- data[-testIndexes, ]
    spline_basis <- bs(trainData$x, degree = 3, knots = knots)
    model <- lm(y ~ spline_basis, data = trainData)
    pred <- predict(model, newdata = list(spline_basis = bs(testData$x, degree = 3, knots = knots)))
    return(mean((testData$y - pred)^2))  # Return MSE
  })
  mean(res)
}

# Evaluate models with different knots
# Range of possible knots
knots_range <- 3:10
# Evaluate models with different knots
results <- sapply(knots_range, function(k) {
  knots <- quantile(data$x, probs = seq(0, 1, length.out = k + 2))[-c(1, k + 2)]
  evaluate_model(knots, data)
})

# Find optimal number of knots
optimal_knots <- knots_range[which.min(results)]
optimal_knots_value <- quantile(data$x, probs = seq(0, 1, length.out = optimal_knots + 2))[-c(1, optimal_knots + 2)]

# Fit the model with the optimal number of knots
optimal_b_spline_basis <- bs(data$x, degree = 3, knots = optimal_knots_value)
optimal_b_spline_model <- lm(y ~ optimal_b_spline_basis, data = data)

# Optimal model summary
summary(optimal_b_spline_model)

data$optimal_b_spline_model <- predict(optimal_b_spline_model, newdata = data)

# Convert to long format for ggplot
data_long <- gather(data, key = "model", value = "prediction", 
                    pred_cubic, pred_frac_poly, pred_cubic_spline, optimal_b_spline_model)

# Reorder the factor levels
data_long$model <- factor(data_long$model, 
                          levels = c("pred_cubic", "pred_frac_poly", 
                                     "pred_cubic_spline", "optimal_b_spline_model"))


# Plot the data 
ggplot(data_long, aes(x = x, y = prediction, color = model, linetype = model)) +
  geom_point(aes(y = y), alpha = 0.6, color = "grey40") +
  geom_line(linewidth = 0.8) + 
  labs(title = "Comparison of Different Fitting Models", 
       subtitle = "Cubic Polynomial, Fractional Polynomial, Cubic Spline, and B-Spline",
       x = "Explanatory Variable",
       y = "Response Variable",
       color = "Model",
       linetype = "Model") +
  scale_color_manual(values = c("#E41A1C", "#377EB8", "#4DAF4A", "#984EA3"),
                     labels = c("Cubic Polynomial", "Fractional Polynomial",
                                "Cubic Spline", "B-Spline")) +
  scale_linetype_manual(values = c("solid", "dotted", "dashed", "longdash"),
                        labels = c("Cubic Polynomial", "Fractional Polynomial",
                                   "Cubic Spline", "B-Spline")) +
  theme_minimal() +
  theme(legend.position = "bottom",  
        legend.title.align = 0.5, 
        plot.title = element_text(hjust = 0.5, size = 20, face = "bold"),  
        plot.subtitle = element_text(hjust = 0.5, size = 16),
        axis.text = element_text(size = 12),
        axis.title = element_text(size = 14, face = "bold"), 
        legend.text = element_text(size = 12)) 
# Save the combined plot
ggsave("content/post/2024-01-25-Polynomials-Splines/splines.png", 
       width = 8, height = 6)
