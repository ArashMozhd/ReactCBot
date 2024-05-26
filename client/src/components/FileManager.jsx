import React, { useEffect } from 'react';
import { FileManager } from '@progress/kendo-react-upload';
import '@progress/kendo-theme-default/dist/all.css';

const MyFileManager = () => {
  const token = localStorage.getItem('token');

  const onDataStateChange = (event) => {
    console.log(event.data);
    // Handle data state change
  };

  const onExecute = (event) => {
    const { target, method, requestData } = event;
    console.log('Execute method:', method, 'Request data:', requestData);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestData)
    };

    fetch(target, options)
      .then(response => response.json())
      .then(data => console.log('Response:', data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if (!token) {
      console.error('No token found in local storage.');
    }
  }, [token]);

  return (
    <div>
      <FileManager
        dataUrl="http://localhost:8000/file-operations"
        uploadUrl="http://localhost:8000/upload"
        downloadUrl="http://localhost:8000/download"
        deleteUrl="http://localhost:8000/delete"
        onExecute={onExecute}
        onDataStateChange={onDataStateChange}
      />
    </div>
  );
};

export default MyFileManager;
