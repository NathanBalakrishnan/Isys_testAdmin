import {
    CFormCheck,
    CCardHeader,
    CButton,
    CCol,
  } from '@coreui/react'
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'

const NotificationEmployTable = (props) => {

    const [resourceId, setResourceId] = useState("")
    
    const [message, setMessage] = useState('')

    let handleSubmit = async (e) => {
        e.preventDefault()
      
        let AccessToken = localStorage.getItem('AccessToken')
        let res = await fetch(`http://localhost:8080/api/v1/resource_approved/${resourceId}`, {
          method: 'POST',
          headers: {
            Authorization: AccessToken,
            'Content-Type': 'application/json',
          },
        //   body: JSON.stringify(),
        })
    console.log("...res",res)
        if (res.status === 200) {
       
    
          setMessage('Data saved successfully')
          console.log({ message })
          console.log({ message })
          setTimeout(function () {
            setMessage('')
          }, 2000)
        } else {
          setMessage('')
          window.alert('Please provide all the valid inputs')
        }
      }

  const navigate = useNavigate()
  const handleClick = (resourceNo) => {
    navigate('/forms/employee-data', { state: { resourceNo } })
  }
  const handleClickDelete = (contractNo) => {
    navigate('/dashboard', { state: { contractNo } })
  }
  const elementView = <FontAwesomeIcon icon={faEye} />
  const elementDelete = <FontAwesomeIcon icon={faTrash} />
  
  const data  = props;
  console.log('data--Props', data?.data)
  console.log('props values', props)
  // console.log('address', data.data.department.departmentName)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'resourceNo', //access nested data with dot notation
        header: 'Resource No',
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        accessorKey: 'firstName',
        header: 'Name',
      },
      {
        accessorKey: 'middleName', 
        header: 'Middle Name',
      },
      {
        accessorKey: 'lastName', 
        header: 'Last Name',
      },
      {
        accessorKey: 'jointDate', 
        header: 'Join Date',
      },
      {
        accessorKey: 'roles', 
        header: 'Role',
      },
      {
        accessorKey: 'department:departmentName', 
        header: 'Department',
      },
      {
        accessorKey: 'designation:designationName', 
        header: 'Designation',
      },
      {
        accessorKey: 'resourceType:resourceType', 
        header: 'Resource Type',
      },
   
      {
        accessorKey: 'gender', 
        header: 'Gender',
      },
      {
        accessorKey: 'aadhaarNumber', 
        header: 'Aadhar Number',
      },
      {
        accessorKey: 'panNumber', 
        header: 'PAN Number',
      },
      {
        accessorKey: 'dateOfBirth', 
        header: 'Date of Birth',
      },
      {
        accessorKey: 'contactDetails:primaryEmail', 
        header: 'Primary Email',
      },
      {
        accessorKey: 'contactDetails:secondaryEmail', 
        header: 'Secondary Email',
      },
      {
        accessorKey: 'contactDetails:phoneNumber', 
        header: 'Phone Number 1',
      },
      {
        accessorKey: 'contactDetails:alternatePhoneNumber', 
        header: 'Phone Number 2',
      },
      {
        accessorKey: 'communicationAddress', 
        header: 'Communication Address',
      },
      {
        accessorKey: 'permanentAddress', 
        header: 'Permanent Address',
      },      
    ],
  );
  function handleInputsetResourceId(id) {
    setResourceId(id)
  }
  console.log("..data",data)
  console.log("..resourceid",resourceId)
  return (
        <>
        {data?.data?.length > 0 ? ( 
            <MaterialReactTable 
              columns={columns} 
              data={data.data}
              rowId={(row) => row.resourceNo}
              enablePinning
              initialState={{ columnPinning: { left: ['firstName','Actions'], right: ['resourceNo'] } }}
              enableRowActions
              renderRowActions={({ row, cell }) => (

                <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                                    {console.log("..roo",row)}
                    <Button 
                      onClick={() => handleClick(row.original.resourceNo)}
                      style={{
                        backgroundColor: '#e8e8e8', 
                        textTransform: 'capitalize', 
                        letterSpacing: '1px',
                        color: '#476fde',
                        minWidth: '35px',
                        }}
                    >
                      {elementView}
                    </Button>
                    <Button 
                      onClick={() => handleClickDelete(row.original.resourceNo)}
                      style={{
                        backgroundColor: '#e8e8e8', 
                        textTransform: 'capitalize', 
                        letterSpacing: '1px',
                        color: '#ff5555',
                        minWidth: '35px',
                        }}
                    >
                      {elementDelete}
                    </Button>
                    <Button>
                    <CFormCheck onClick={()=>handleInputsetResourceId(row.original.resourceId)} id="flexCheckDefault" />

                                        </Button>
                                     
                </Box>
              )}
            /> ) : (
              <div>
                No Data Found
              </div>
            
            )
        }
         <CCardHeader className="text-dark p-3 border border-0">
              <CCol md={12} className="d-flex justify-content-left">
                {message ? (
                  <CButton >
                    Data Saved &#10004;
                  </CButton>
                ) : (
                  <CButton onClick={handleSubmit}>Approve</CButton>
                )}
                <div ></div>
              </CCol>
            </CCardHeader>
          
        </> 
         
    );
};

export default NotificationEmployTable;
