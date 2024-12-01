// Model object that contains functions for calculating actual sales and predicting future sales
const Model = {
    // Function to calculate actual sales based on the product sales data for the last 6 months
    calculateActualSales: (productSales) => {
      let salesByMonth = Array(6).fill(0); // Create an array to store sales data for the last 6 months (initialized to 0)
  
      // Loop through the sales data for the product and count sales for each month
      productSales.forEach(row => {
        const monthIndex = new Date(row.created).getMonth(); // Get the month index (0-11)
        if (monthIndex < 6) { // Only include data from the last 6 months
          salesByMonth[monthIndex]++; // Increment the sales count for the corresponding month
        }
      });
  
      // Reverse the array so that the most recent month is the first element
      return salesByMonth.reverse(); 
    },
  
    // Function to predict sales for the next 6 months using linear regression
    predictSales: (actualSales) => {
      const linearRegression = (data) => {
        const n = data.length; // Number of data points (6 months of actual sales)
        const sumX = data.reduce((sum, value, index) => sum + index, 0); // Sum of x (month indices)
        const sumY = data.reduce((sum, value) => sum + value, 0); // Sum of y (actual sales)
        const sumXY = data.reduce((sum, value, index) => sum + (index * value), 0); // Sum of x * y
        const sumX2 = data.reduce((sum, value, index) => sum + (index * index), 0); // Sum of x²
  
        const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX); // Slope of the line
        const b = (sumY - m * sumX) / n; // Y-intercept of the line
  
        return { m, b }; // Return the slope (m) and intercept (b)
      };
  
      const { m, b } = linearRegression(actualSales); // Calculate the regression coefficients
  
      let predicted = [];
      for (let i = 6; i < 12; i++) {  // Predict for the next 6 months
        let predictedSalesForMonth = m * i + b;  // Use the equation y = mx + b to predict sales
        predicted.push(predictedSalesForMonth);
      }
  
      return predicted; // Return the predicted sales for the next 6 months
    }
  };
  
  export default Model; // Export the Model object for use in other components
  