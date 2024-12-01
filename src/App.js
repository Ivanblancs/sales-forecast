import React, { useState } from 'react'; // Import React and useState hook
import FileUpload from './Components/FileUpload'; // Import the FileUpload component
import Preprocessing from './Components/Preprocessing'; // Import the Preprocessing function
import Model from './Components/Model'; // Import the Model object
import SalesChart from './Components/Chart'; // Import the SalesChart component

// The main App component
const App = () => {
  const [products, setProducts] = useState([]); // State to store the list of products
  const [salesData, setSalesData] = useState([]); // State to store the sales data
  const [selectedProduct, setSelectedProduct] = useState(''); // State to store the selected product
  const [actualSales, setActualSales] = useState([]); // State to store actual sales data for the selected product
  const [predictedSales, setPredictedSales] = useState([]); // State to store predicted sales data

  // Function to handle parsed file data passed from the FileUpload component
  const handleFileData = (data) => {
    const { products, salesData } = Preprocessing(data); // Process the raw data to extract products and sales data
    setProducts(products); // Update the products state
    setSalesData(salesData); // Update the salesData state
  };

  // Function to handle product selection
  const handleProductSelect = (event) => {
    const selectedProduct = event.target.value; // Get the selected product
    setSelectedProduct(selectedProduct); // Update the selected product

    // Filter the sales data for the selected product
    const productSales = salesData.filter(row => row.short_desc === selectedProduct);

    // Calculate actual sales for the last 6 months using the Model
    const actualSales = Model.calculateActualSales(productSales);

    // Predict sales for the next 6 months using the Model
    const predictedSales = Model.predictSales(actualSales);

    setActualSales(actualSales); // Update the actualSales state
    setPredictedSales(predictedSales); // Update the predictedSales state
  };

  return (
    <div className="App">
      <h1>Sales Prediction App</h1>

      {/* File Upload Component */}
      <FileUpload onFileData={handleFileData} />

      {/* If there are products, allow product selection */}
      {products.length > 0 && (
        <div>
          <select onChange={handleProductSelect} value={selectedProduct}>
            <option value="">Select a product</option>
            {products.map((product, index) => (
              <option key={index} value={product}>{product}</option>
            ))}
          </select>

          {/* Display the sales chart if a product is selected and sales data is available */}
          {selectedProduct && actualSales.length > 0 && predictedSales.length > 0 && (
            <div>
              <h3>Sales Data for {selectedProduct}</h3>
              <SalesChart actualData={actualSales} predictedData={predictedSales} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App; // Export the App component
