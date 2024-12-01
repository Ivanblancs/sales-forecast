// Preprocessing function to process and clean the raw CSV data
const Preprocessing = (data) => {
    const products = []; // Array to store unique product descriptions
    const salesData = data.filter(row => {
      const totalSold = parseFloat(row.total_sold); // Convert 'total_sold' to a float
      if (!isNaN(totalSold) && row.short_desc && row.created) { // Check if 'total_sold', 'short_desc', and 'created' exist
        if (!products.includes(row.short_desc)) {
          products.push(row.short_desc); // Collect unique product descriptions
        }
        return true; // Keep the row in salesData
      }
      return false; // Skip invalid rows
    }).map(row => ({
      barcode: row.barcode,
      created: new Date(row.created), // Convert 'created' to a Date object
      short_desc: row.short_desc, // Product description
      total_sold: parseFloat(row.total_sold), // 'total_sold' as a float
    }));
  
    return { products, salesData }; // Return an object with products and cleaned sales data
  };
  
  export default Preprocessing; // Export the Preprocessing function
  