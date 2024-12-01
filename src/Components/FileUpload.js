import React from 'react'; // Import React
import Papa from 'papaparse'; // Import PapaParse for parsing CSV files

// The FileUpload component accepts a function 'onFileData' to send parsed data back to the parent component (App.js)
const FileUpload = ({ onFileData }) => {
  // Function to handle file upload when a user selects a file
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the first file selected by the user
    if (file) {
      parseFile(file); // If a file is selected, parse it
    }
  };

  // Function to parse the uploaded file using PapaParse
  const parseFile = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        onFileData(result.data); // Pass parsed data to the parent component via 'onFileData'
      },
      header: true, // Use the first row as headers for the CSV
      skipEmptyLines: true, // Skip empty lines
    });
  };

  // Render the file upload input field
  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} /> {/* Only accept .csv files */}
    </div>
  );
};

export default FileUpload; // Export the FileUpload component
