import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { accessFunctionNew } from 'src/api/apiConfig';

const BreakFormTable = (props) => {
  const navigate = useNavigate()
  // const handleClick = (contractNo) => {
  //   // navigate('/forms/contract-data', { state: { contractNo } })
  // }
  const handleClickDelete = (contractNo) => {
    navigate('/dashboard', { state: { contractNo } })
  }
  const elementView = <FontAwesomeIcon icon={faEye} />
  const elementDelete = <FontAwesomeIcon icon={faTrash} />
  const data  = props;
  console.log('data--Props', data?.data)
  // console.log('address', data.data.department.departmentName)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'company.companyName', //access nested data with dot notation
        header: 'Company Name',
      },
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'startTime',
        header: 'Start Time',
      },
      {
        accessorKey: 'endTime',
        header: 'End Time',
      },
      {
        accessorKey: 'graceTime',
        header: 'Grace Time',
      },
    ],
  );

  return (
    <>
      {data?.data?.length > 0 ? ( 
        <MaterialReactTable 
          columns={columns} 
          data={data.data}
          rowId={(row) => row.resourceId}
          enablePinning
          initialState={{ columnPinning: { left: ['company.companyName'], right: ['Actions'] } }}
          enableRowActions
          renderRowActions={({ row, cell }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              {accessFunctionNew(props.responsibleNameView, props.accessNameView) ? 
                <Button 
                  onClick={() => handleClick(row.original.contractNo)}
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
                  onClick={() => handleClickDelete(row.original.contractNo)}
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
              }
            </Box>
          )}
        /> ) : (
          <div>
            No Data Found
          </div>
        )
      }
    </> 
  );
};

BreakFormTable.propTypes = {
  responsibleNameView: PropTypes.string.isRequired,
  accessNameView: PropTypes.string.isRequired,
  responsibleNameDelete: PropTypes.string.isRequired,
  accessNameDelete: PropTypes.string.isRequired,
};

export default BreakFormTable;
