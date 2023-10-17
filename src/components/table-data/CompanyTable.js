import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import '../../scss/mystyle.css'
import Constants from 'src/constants/Constants'

const CompanyTable = (props) => {
  const navigate = useNavigate()
  const handleClick = (companyid) => {
    navigate('/forms/company-data', { state: {companyid} })
  }
  const [errormessage, setErrorMessage] = useState('')
  const handleClickDelete = (companyid) => {
    let FullURL = Constants.URL+'deleteCompany/hard/' + `${companyid}`
   axios.delete(FullURL)
   .then(response=>{
    console.log("delete req")
   })
   .catch(error=>{
    console.log("error del data",error)
    setErrorMessage("Error Deleting Data",error);
   })
  }
  const elementView = <FontAwesomeIcon icon={faEye} />
  const elementDelete = <FontAwesomeIcon icon={faTrash} />
  const data = props;
  //  console.log('data--Props', data?.data)
  const columns = useMemo(
    () => [
      {
        accessorKey: 'code',
        header: 'Company Code',
      },     //   // accessorKey: 'company.companyName', //access nested data with dot notation

      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Company Name',
      },

      {
        accessorKey: 'groupCode', //access nested data with dot notation
        header: 'Group Code',
      },

    ],
  );

  return (
    <>
     <p className='error'>{errormessage}</p>
      {data?.data?.length > 0 ? (
      
        <MaterialReactTable
          columns={columns}
          data={data.data}
          rowId={(row) => row.name}
          enablePinning
          initialState={{ columnPinning: { left: ['code'] } }}
          enableRowActions
          renderRowActions={({ row, cell }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              {/* {accessFunctionNew(props.responsibleNameView, props.accessNameView) ? 
                  <Button 
                    onClick={() => handleClick(row.original.moduleId)}
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
                  : ''
                }
                {accessFunctionNew(props.responsibleNameDelete, props.accessNameDelete) ? 
                  <Button 
                    onClick={() => handleClickDelete(row.original.moduleId)}
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
                  : ''
                } */

                <Button
                  onClick={() => handleClick(row.original.id)}
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
              }
              <Button
                onClick={() => handleClickDelete(row.original.id)}
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

export default CompanyTable;
