import React, { useState } from 'react';
import Styles from './Document.module.css';
import { CButton } from '@coreui/react';
import axios from 'axios';


const UploadIcon = (props) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const {
    handleFileChange = () => {},
    fileName = '',
    fileSize = 0,
    uploading = false,
    document = {},
    resourceId = '',
    buttonVisible = true,
    rowId = '',
    data = {},
  } = props;

  const handleFileUpload = (e) => {
    handleFileChange(e, resourceId, document.documentName);
    setFileUploaded(true);
    console.log(fileUploaded); 
  };

  const handleClose = () => {
    setFileUploaded(false);
  };
 
  const handleDownload = () => {
    debugger 
    if (document.documentId && document.documentId.length > 0) {
      const fileId = document.documentId[0];
      const downloadUrl = `http://localhost:8080/api/v1/downloadFile/${fileId}`;
      setDownloadUrl(downloadUrl);
  
      console.log('document.documentId:', document.documentId); 
  
      axios
        .get(downloadUrl, { responseType: 'blob' })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          link.click();
        })
        .catch((error) => {
          console.error('Error downloading file:', error);
        });
    }
  };
  
  console.log(fileUploaded); // Log fileUploaded state
  return (
    <div className="upload-container">
      <label htmlFor={document.documentName + resourceId}>
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/headhunter-front-page/upload-resume.png"
          alt=""
          height="33"
        />
         {fileUploaded ? (
        <div>
          <img
            src="https://th.bing.com/th/id/OIP.mvGH-YuRqdjUQ0DEYhsWsgAAAA?pid=ImgDet&rs=1"
            alt=""
            height="29"
            style={{ marginLeft: '10px', cursor: 'pointer' }}
            onClick={handleDownload}
          />
          {downloadUrl && <a href={downloadUrl} download={fileName} style={{ display: 'none' }}></a>}
        </div>
      ) : null}
      </label>
     
      <input 
      hidden
        className="form-control"
        type="file"
        accept="*"
      id={document.fileId}
      onChange={handleFileUpload}
      />
      <input
        hidden
        className="form-control"
        type="file"
        accept="*"
        id={document.documentName + resourceId}
        onChange={handleFileUpload}
        required
      />
      {fileName && (
        <div className={Styles.loading}>
          {uploading ? (
            <div className={Styles.loadingg}>
              <div className={Styles.spinner}></div>
              <p>Uploading...</p>
            </div>
          ) : (
            <div className={Styles.fileinfo} style={{ display: fileUploaded ? 'block' : 'none' }}>
              <p>
                {fileName} {fileSize} bytes
                <CButton className={Styles.closeButton} color="danger" onClick={handleClose}>
                  X
                </CButton>
              </p>
              <p></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadIcon;
