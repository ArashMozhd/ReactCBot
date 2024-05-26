import React from 'react';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';

const FileManager = () => {
  const hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';

  const ajaxSettings = {
    url: `${hostUrl}api/FileManager/FileOperations`,
    getImageUrl: `${hostUrl}api/FileManager/GetImage`,
    uploadUrl: `${hostUrl}api/FileManager/Upload`,
    downloadUrl: `${hostUrl}api/FileManager/Download`
  };

  return (
    <div>
      <FileManagerComponent
        id="file-manager"
        ajaxSettings={ajaxSettings}
        toolbarSettings={{ items: ['NewFolder', 'Upload', 'Delete', 'Download', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'] }}
        contextMenuSettings={{ layout: ['NewFolder', 'Upload', 'Delete', 'Rename', 'Download', 'SortBy', 'Refresh', 'Details', 'View'] }}
        beforeSend={(args) => {
          console.log('Before Send:', args);
        }}
        success={(args) => {
          console.log('Success:', args);
        }}
        failure={(args) => {
          console.error('Failure:', args);
        }}
      >
        <Inject services={[NavigationPane, DetailsView, Toolbar]} />
      </FileManagerComponent>
    </div>
  );
};

export default FileManager;
