import React, { useEffect, useRef } from 'react'; // Importing React and hooks
import Chart from 'chart.js/auto'; // Importing the Chart.js library for rendering charts

// The SalesChart component receives 'actualData' and 'predictedData' as props
const SalesChart = ({ actualData, predictedData }) => {
  const chartRef = useRef(null); // Create a ref for the chart element

  // useEffect runs when 'actualData' or 'predictedData' changes
  useEffect(() => {
    // If neither actualData nor predictedData has data, log a warning and exit
    if (!actualData.length && !predictedData.length) {
      console.warn('No data available for the chart.');
      return;
    }

    // If the chart already exists, destroy it to avoid rendering multiple charts
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Get the canvas context for the chart
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    // Create a new chart instance
    chartRef.current = new Chart(ctx, {
      type: 'line', // Set chart type to 'line'
      data: {
        // x-axis labels representing months
        labels: Array.from({ length: actualData.length }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Actual Sales', // Label for actual sales data
            data: actualData, // Data for actual sales
            borderColor: 'blue', // Blue color for the actual sales line
            fill: false, // No fill under the line
          },
          {
            label: 'Predicted Sales', // Label for predicted sales data
            data: predictedData, // Data for predicted sales
            borderColor: 'green', // Green color for the predicted sales line
            fill: false, // No fill under the line
          },
        ],
      },
    });

    // Cleanup function to destroy the chart when the component is unmounted
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [actualData, predictedData]); // This effect depends on changes to 'actualData' and 'predictedData'

  // Render a canvas element with the id 'salesChart' where the chart will be drawn
  return <canvas id="salesChart"></canvas>;
};

export default SalesChart; // Export the SalesChart component
