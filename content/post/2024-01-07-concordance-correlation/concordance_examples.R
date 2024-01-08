# Load necessary libraries
library(MASS)
library(ggplot2)

# Function to calculate Concordance Correlation Coefficient (CCC)
ccc <- function(x, y) {
  # Check if inputs are numeric vectors
  stopifnot(is.numeric(x), is.numeric(y))
  
  # Calculate Pearson's correlation coefficient
  rho <- cor(x, y)
  
  # Calculate means of x and y
  mean_x <- mean(x)
  mean_y <- mean(y)
  
  # Calculate variances of x and y
  var_x <- var(x)
  var_y <- var(y)
  
  # Calculate CCC based on the formula
  ccc_value <- (2 * rho * sqrt(var_x) * sqrt(var_y)) / 
    (var_x + var_y + (mean_x - mean_y)^2)
  
  return(ccc_value)
}

# Set seed for reproducibility
set.seed(123)

# Function to generate and plot data for each scenario
data_plot <- function(mean, cov, scenario_number) {
  data <- mvrnorm(100, mu = mean, Sigma = cov)
  df <- data.frame(x = data[,1], y = data[,2])
  
  title <- ifelse(scenario_number == 3 || scenario_number == 4,
                  paste("Scenario", scenario_number, ": Pearson =", round(cor(df$x, df$y), 2), 
                        "CCC =", round(ccc(df$x, df$y), 2)),
                  paste("Scenario", scenario_number, ": CCC =", round(ccc(df$x, df$y), 2)))
  
  p <- ggplot(df, aes(x = x, y = y)) + 
    geom_point(color = "blue", alpha = 0.6, size = 3) +
    ggtitle(title) +
    xlab("X values") +
    ylab("Y values") +
    theme_minimal() +
    theme(plot.title = element_text(hjust = 0.5, face = "bold", size = 14),
          axis.title.x = element_text(face = "bold", size = 12),
          axis.title.y = element_text(face = "bold", size = 12),
          axis.text.x = element_text(size = 10),
          axis.text.y = element_text(size = 10))
  
  if (scenario_number == 3 || scenario_number == 4) {
    p <- p + geom_smooth(method = "lm", color = "blue", se = FALSE) +
      geom_abline(slope = -1, intercept = 100, linetype = "dashed", color = "black") +
      geom_abline(slope = 1, intercept = 0, linetype = "dashed", color = "red")
  } else {
    p <- p + geom_abline(slope = 1, intercept = 0, linetype = "dashed", color = "red")
  }
  
  print(p)
}

# Scenario 1: High Pearson correlation, modest CCC
data_plot(c(50, 70), matrix(c(100, 0.99 * sqrt(100) * sqrt(150), 0.99 * sqrt(100) * sqrt(150), 150), 2), 1)

ggsave(
  filename = "content/post/2024-01-07-concordance-correlation/scenario1.png", 
  width = 6, height = 4,dpi = 500)


# Scenario 2: High CCC
data_plot(c(50, 50), matrix(c(100, 0.95 * sqrt(100) * sqrt(100), 0.95 * sqrt(100) * sqrt(100), 100), 2), 2)

ggsave(
  filename = "content/post/2024-01-07-concordance-correlation/scenario2.png", 
  width = 6, height = 4,dpi = 500)


# Scenario 3: Negative Pearson and CCC
data_plot(c(50, 50), matrix(c(100, -0.3 * sqrt(100) * sqrt(150), -0.3 * sqrt(100) * sqrt(150), 150), 2), 3)

ggsave(
  filename = "content/post/2024-01-07-concordance-correlation/scenario3.png", 
  width = 6, height = 4,dpi = 500)


# Scenario 4 (previously 5): Perfect inverse agreement
data_plot(c(50, 50), matrix(c(100, -1 * sqrt(100) * sqrt(100), -1 * sqrt(100) * sqrt(100), 100), 2), 4)

ggsave(
  filename = "content/post/2024-01-07-concordance-correlation/scenario5.png", 
  width = 6, height = 4,dpi = 500)


# Scenario 5 (previously 4): No correlation (CCC = 0)
data_plot(c(50, 50), matrix(c(100, 0, 0, 150), 2), 5)

ggsave(
  filename = "content/post/2024-01-07-concordance-correlation/scenario4.png", 
  width = 6, height = 4,dpi = 500)


#=======================================================================
# GIF
#=======================================================================


