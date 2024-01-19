import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import FunctionTransformer
from matplotlib.animation import FuncAnimation
from sklearn.metrics import mean_squared_error

# Generate synthetic data
np.random.seed(0)
x = np.linspace(1, 10, 100)
y = 2 * np.sqrt(x) + np.random.normal(0, 0.5, size=len(x))

# Create a DataFrame
data = pd.DataFrame({'x': x, 'y': y})

# Define a range of fractional powers
powers = np.linspace(0.5, 2, 20)

# Initialize a plot
fig, ax = plt.subplots()
scatter, = ax.plot(data['x'], data['y'], 'o', color='blue', alpha=0.6)
line, = ax.plot([], [], color='red', lw=2)
ax.set_xlim(data['x'].min(), data['x'].max())
ax.set_ylim(data['y'].min(), data['y'].max())
ax.set_title('Fractional Polynomial Model Fit')
ax.set_xlabel('X')
ax.set_ylabel('Y')

# Function to calculate BIC
def calculate_bic(y_true, y_pred, n_params):
    n = len(y_true)
    mse = mean_squared_error(y_true, y_pred)
    bic = n * np.log(mse) + n_params * np.log(n)
    return bic

# Update function for the animation
def update(power):
    transformer = FunctionTransformer(lambda x: x ** power, validate=True)
    x_transformed = transformer.fit_transform(data[['x']])
    model = LinearRegression().fit(x_transformed, data['y'])
    y_pred = model.predict(x_transformed)
    bic = calculate_bic(data['y'], y_pred, 2)  # 2 parameters (intercept and slope)
    line.set_data(data['x'], y_pred)
    ax.set_title(f'Fractional Polynomial Model Fit - Power: {power:.2f}, BIC: {bic:.2f}')
    return line, 

# Create the animation with a slower frame transition
ani = FuncAnimation(fig, update, frames=powers, interval=200, blit=True, repeat=False)

# Save the animation
gif_path = '/mnt/data/fractional_polynomial_fit_with_bic.gif'
ani.save(gif_path, writer='pillow', fps=5)

plt.close(fig)

gif_path
