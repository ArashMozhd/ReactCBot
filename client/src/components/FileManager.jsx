import React, { useEffect } from 'react';
import { FileManagerComponent } from '@syncfusion/ej2-react-filemanager';

const FileManager = () => {
  const token = localStorage.getItem('token');
  console.log('Token from local storage:', token); // Debugging line to ensure token is fetched

  const beforeSend = (args) => {
    if (token) {
      args.ajaxSettings.headers = {
        ...args.ajaxSettings.headers,
        'Authorization': `Bearer ${token}`
      };
      console.log('Ajax settings:', args.ajaxSettings); // Debugging line to check ajax settings
    } else {
      console.error('No token found in local storage.');
    }
  };

  useEffect(() => {
    if (!token) {
      console.error('No token found in local storage.');
    }
  }, [token]);

  return (
    <div>
      <FileManagerComponent
        id="file-manager"
        ajaxSettings={{
          url: 'http://localhost:8000/file-operations',
          getImageUrl: 'http://localhost:8000/get-image',
          uploadUrl: 'http://localhost:8000/upload',
          downloadUrl: 'http://localhost:8000/download'
        }}
        beforeSend={beforeSend}
      />
    </div>
  );
};

export default FileManager;
