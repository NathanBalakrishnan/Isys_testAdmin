import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'
import { Box, Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { accessFunctionNew } from 'src/api/apiConfig'

const NewJoiningTable = (props) => {
  const data = [
    {
        "taskId": 782,
        "taskNo": "Gokul",
        "description": "Frontend Ui",
        "estimatedHrs": "HRMS",
        "actualHrs": "05/05/2023",
        "comments": "create task",
        "status": true,
        "taskTypeId": 192,
        "taskType": {
            "taskTypeId": 192,
            "taskType": "task 1",
            "taskTypeNo": "TT00001",
            "createdBy": null,
            "updatedBy": null,
            "createdTime": "2023-01-19T11:56:43.747+00:00",
            "updatedTime": "2023-01-19T11:56:43.747+00:00",
            "company": null
        },
        "contractId": 0,
        "responsibilityId": 1261,
        "requirementId": 0
    },
    {
        "taskId": 783,
        "taskNo": "Priyan",
        "description": "Software Developer",
        "estimatedHrs": "HRMS",
        "actualHrs": "10/05/2023",
        "comments": "cron task",
        "status": true,
        "taskTypeId": 193,
        "taskType": {
            "taskTypeId": 193,
            "taskType": "task 2",
            "taskTypeNo": "TT00002",
            "createdBy": null,
            "updatedBy": null,
            "createdTime": "2023-01-19T11:32:10.088+00:00",
            "updatedTime": "2023-01-19T11:32:10.088+00:00",
            "company": null
        },
        "contractId": 0,
        "responsibilityId": 1263,
        "requirementId": 0
    },
    {
        "taskId": 784,
        "taskNo": "Pavithra",
        "description": "Manual Testing",
        "estimatedHrs": "FNP",
        "actualHrs": "05/06/2023",
        "comments": "no comments",
        "status": true,
        "taskTypeId": 194,
        "taskType": {
            "taskTypeId": 194,
            "taskType": "task 3",
            "taskTypeNo": "TT00003",
            "createdBy": null,
            "updatedBy": null,
            "createdTime": "2023-01-19T11:30:06.819+00:00",
            "updatedTime": "2023-01-19T11:30:06.819+00:00",
            "company": null
        },
        "contractId": 0,
        "responsibilityId": 1264,
        "requirementId": 0
    },
    {
        "taskId": 855,
        "taskNo": "Elavarasan",
        "description": "Backend",
        "estimatedHrs": "FNP",
        "actualHrs": "05/05/2023",
        "comments": "no comments",
        "status": true,
        "taskTypeId": 193,
        "taskType": {
            "taskTypeId": 193,
            "taskType": "task 2",
            "taskTypeNo": "TT00002",
            "createdBy": null,
            "updatedBy": null,
            "createdTime": "2023-01-19T11:32:10.088+00:00",
            "updatedTime": "2023-01-19T11:32:10.088+00:00",
            "company": null
        },
        "contractId": 0,
        "responsibilityId": 1264,
        "requirementId": 0
    },
    {
        "taskId": 856,
        "taskNo": "Mithun",
        "description": "Team lead",
        "estimatedHrs": "HRMS",
        "actualHrs": "10/05/2023",
        "comments": "no comments",
        "status": true,
        "taskTypeId": 193,
        "taskType": {
            "taskTypeId": 193,
            "taskType": "task 2",
            "taskTypeNo": "TT00002",
            "createdBy": null,
            "updatedBy": null,
            "createdTime": "2023-01-19T11:32:10.088+00:00",
            "updatedTime": "2023-01-19T11:32:10.088+00:00",
            "company": null
        },
        "contractId": 0,
        "responsibilityId": 1264,
        "requirementId": 0
    }
]
  const navigate = useNavigate()
  const handleClick = (taskNo) => {
    navigate('/forms/task-data', { state: { taskNo } })
  }
  const handleClickDelete = (contractNo) => {
    navigate('/dashboard', { state: { contractNo } })
  }
  const elementView = <FontAwesomeIcon icon={faEye} />
  const elementDelete = <FontAwesomeIcon icon={faTrash} />
  //   const data  = props;
  console.log('data--Props', data?.data)
  // console.log('address', data.data.department.departmentName)

  const columns = useMemo(() => [
    {
      accessorKey: 'taskNo', //access nested data with dot notation
      header: 'Candidate Name',
    },
    {
      accessorKey: 'description',
      header: 'Designation',
    },
    {
      accessorKey: 'estimatedHrs',
      header: 'Hiring For',
    },
    {
      accessorKey: 'actualHrs',
      header: 'Joining Date',
    },
    // {
    //   accessorKey: 'requirementId',
    //   header: 'Requirement Id',
    // },
  ])

  return (
    <>
      {data?.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={data}
          rowId={(row) => row.taskNo}
          renderRowActions={({ row, cell }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              {accessFunctionNew(props.responsibleNameView, props.accessNameView) ? (
                <Button
                  onClick={() => handleClick(row.original.taskNo)}
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
              ) : (
                ''
              )}
              {accessFunctionNew(props.responsibleNameDelete, props.accessNameDelete) ? (
                <Button
                  onClick={() => handleClickDelete(row.original.taskNo)}
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
              ) : (
                ''
              )}
            </Box>
          )}
        />
      ) : (
        <div>No Data Found</div>
      )}
    </>
  )
}

NewJoiningTable.propTypes = {
  responsibleNameView: PropTypes.string.isRequired,
  accessNameView: PropTypes.string.isRequired,
  responsibleNameDelete: PropTypes.string.isRequired,
  accessNameDelete: PropTypes.string.isRequired,
}

export default NewJoiningTable