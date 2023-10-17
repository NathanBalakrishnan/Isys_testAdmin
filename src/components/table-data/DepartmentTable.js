import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Box } from '@mui/material';
import axios from 'axios';
import {
 CButton,
} from '@coreui/react'
import UploadIcon from './UploadIcon';

const DocumentTable = (props) => {
 const [documents, setDocuments] = useState({});
 const [buttonVisible, setButtonVisible] = useState(true);

const handleUpload = async (curDocument, resId) => {
 
try {
 const formData = new FormData();
 formData.append("resourceId", resId);

const selectedDocuments = [];

curDocument.forEach((doc, i) => {
 const fileInput = document.getElementById(doc.documentName + resId);
 const file = fileInput.files[0];

if (file) {
 formData.append("file", file, file.name);
 console.log("fileid", file.fileId);

const fileId = `fileId_${i}`; // Generate a unique fileId for each file

if (doc.file) {
 formData.append("fileId", fileId);
 formData.append("fileLastModified", doc.file.lastModified);
 formData.append("fileSize", doc.file.size);
 
console.log("fileID1", file);
 }
 selectedDocuments.push({
 ... doc,
 file: {
 fileId: fileId,
 name: file.name,
 size: file.size,
 },
 });
 }
 });

const companyNo = selectedDocuments[0]?. companyNo;
 const documentNos = selectedDocuments.map((doc) => doc.documentId);
 const documentNames = selectedDocuments.map((doc) => doc.documentName);

formData.append("documentId", documentNos.join(","));
 formData.append("companyNo", companyNo);
 formData.append("documentName", documentNames.join(","));

const response = await axios.post(
 "http://localhost:8080/api/v1/upload_document",
 formData
 );

console.log("res fil id", response);

if (response.status === 201) {
 window.alert("Upload successful!");
 setButtonVisible(false)
// Perform additional actions based on the response
 // ...

// Continue with the rest of the code within the handleUpload function if needed
 } else {
 window.alert("Upload failed. Status:", response.status);

// Access the error message, if available
 const errorMessage = response.data?. error;
 if (errorMessage) {
 console.log("Error message:", errorMessage);
 // Display the error message to the user or handle it as needed
 }

// Display a generic error message to the user or handle it as needed
 // ...
 }
 } catch (error) {
 console.error("Error:", error);
 // Handle the error if needed
 // Display a generic error message to the user or handle it as needed
 // ..
 }

};

const data = props;
 console.log("data1..", data)
 console.log("documents1..", documents)

useEffect(() => {
 if (data && data.data && Array.isArray(data.data) && data.data[0] && data.data[0].resources) {
 // Rest of the code

setDocuments(() => {
 const curDocuments = {};
 console.log("hi");
 data.data[0].resources.forEach((resource) => {
 curDocuments[resource.resourceId] = data.data.map((document) => {
 return {
 documentId: document.documentId,
 documentName: document.documentName,
 companyNo: document.companyNo,
 fileName: "",
 fileSize: 0,
 fileId: [],
 uploading: false,
 resourceId: resource.resourceId,
 isButtonDisabled: false, // Add the isButtonDisabled property with initial value as false
 }
 })
 })
 return curDocuments
 })

}
 }, [data]);

function handleFileChange(e, resourceId, documentId) {
 const file = e.target.files[0];
 const fileType = file.type.split('/')[0];
 if (fileType === 'image' || fileType === 'application' || fileType === 'application/pdf') {
 setDocuments((prev) => {
 return {
 ... prev, [resourceId]: prev[resourceId].map((document) => {
 if (document.documentId === documentId) {
 return { ... document, fileName: file.name, fileSize: file.size, uploading: true }
 }

return document
 })
 }
 })

setTimeout(() => {
 setDocuments((prev) => {
 return {
 ... prev, [resourceId]: prev[resourceId].map((document) => {
 if (document.documentId === documentId) {
 return { ... document, uploading: false }
 }

return document
 })
 }
 })

}, 2000);
 } else {
 alert('Invalid file type. Please select an image, document, or PDF file.');
 }
 }

const columns = useMemo(() => {
 const colomArray = [
 {
 accessorKey: 'firstName',
 header: 'FirstName',
 },
 {
 accessorKey: 'resourceNo',
 header: 'ResourceNo',
 },
 ];

if (data && Array.isArray(data.data)) {
 data.data.forEach((document) => {
 colomArray.push({
 accessorKey: document.documentName,
 header: document.documentName,
 });
 });

colomArray.push({
 accessorKey: 'button',
 header: 'Action',
 });
 }

return colomArray;
 }, [data]);

const rows = useMemo(() => {
 const updatedRows = [];

if (data && data.data && data.data.length > 0 && data.data[0].resources && data.data[0].resources.length > 0 && Object.keys(documents).length > 0) {

console.log("documentsss=>", document);
 data.data[0].resources.forEach((resource) => {
 let curDocument = documents[resource.resourceId]
 let rowData = {
 companyNo: curDocument[0].companyNo,
 resourceNo: resource.resourceNo,
 firstName: resource.firstName,
 };
 curDocument.forEach((document) => {
 // console.log("curDocument",curDocument);
 rowData[document.documentName] = (
 <UploadIcon
 handleFileChange={(e) => handleFileChange(e, resource.resourceId, document.documentId)}
 document={document}
 resourceId={resource.resourceId}
 fileName={document.fileName}
 data={data}
 fileSize={document.fileSize}
 uploading={document.uploading}
 buttonVisible= {buttonVisible}
 handleUpload={() => handleUpload(document, resource.resourceId)} />
 );
 rowData['button'] = <CButton
 color="success" onClick={() => handleUpload(curDocument, resource.resourceId)}>
 Upload
 </CButton>
 
})

updatedRows.push({ ... rowData });
 }

)
 }

return [... updatedRows];
 }, [data, documents,buttonVisible]);

return (
 <>
 {data?. data?. length > 0 ? (
 <MaterialReactTable
 columns={columns}
 data={rows}
 rowId={(row) => row.resourceNo}
 enablePinning
 initialState={{ columnPinning: { left: ['resourceNo'], right: ['button'] } }}
 // enableRowActions
 renderRowActions={({ row, cell }) => (
 <Box sx={{ display: 'flex', gap: '0.5rem' }}>
 </Box>
 )}
 />) : (
 <div>
 No Data Found
 </div>
 )
 }
 </>
 );
};

export default DocumentTable; 