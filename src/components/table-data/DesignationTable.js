import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'

const DesignationTable = (props) => {
  const navigate = useNavigate()
  const handleClick = (designationNo) => {
    navigate('/forms/designation-data', { state: { designationNo } })
  }
  const handleClickDelete = (contractNo) => {
    navigate('/dashboard', { state: { contractNo } })
  }
  const elementView = <FontAwesomeIcon icon={faEye} />
  const elementDelete = <FontAwesomeIcon icon={faTrash} />
  const data = props;
  console.log('data--Props', data?.data)
  const columns = useMemo(
    () => [
      {
        accessorKey: 'designationName',
        header: 'Designation Name',
      },     //   // accessorKey: 'company.companyName', //access nested data with dot notation

      {
        accessorKey: 'company.companyName', //access nested data with dot notation
        header: 'Company Name',
      },

      {
        accessorKey: 'description', //access nested data with dot notation
        header: 'Description',
      },

    ],
  );

  return (
    <>
      {data?.data?.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={data.data}
          rowId={(row) => row.designationName}
          enablePinning
          initialState={{ columnPinning: { left: ['designationNo'] } }}
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
                  onClick={() => handleClick(row.original.designationNo)}
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
                onClick={() => handleClickDelete(row.original.designationNo)}
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

export default DesignationTable;
