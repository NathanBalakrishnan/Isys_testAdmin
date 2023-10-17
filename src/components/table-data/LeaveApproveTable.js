import {
  CFormCheck,
  CCardHeader,
  CButton,
  CCol,
} from '@coreui/react'
import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'

const LeaveApproveTable = (props) => {

  const [leaveApprove, setLeaveApprove] = useState(false)
 

  const [message, setMessage] = useState('')

  let handleSubmit = async (e, approved) => {
    e.preventDefault()
    if (!leaveApprove) {
      window.alert('Please select a leave to approve or reject');
      return;
    }

    let AccessToken = localStorage.getItem('AccessToken')
    let res = await fetch(`http://localhost:8080/api/v1/leave_approve_or_reject?leaveNo=${leaveApprove}&approved=${approved}`, {

      method: 'POST',
      headers: {
        Authorization: AccessToken,
        'Content-Type': 'application/json',
      },

    })

    if (res.status === 200) {
      setMessage('Data saved successfully')
      setMessage(approved ? 'approved' : 'rejected');
      setLeaveApprove(!leaveApprove)
      setLeaveApprove(null)
     
    } else {
      handleSubmit(e);
      setMessage('');
      window.alert('Please provide all the valid inputs');
    }
  }


  const data = props;
  console.log('data--Props', data?.data)
  const columns = useMemo(
    () => [
      {
        accessorKey: 'noOfDays',
        header: 'Number Of Days',
      },

      {
        accessorKey: 'startDate',
        header: 'StartDate',
      },
      {
        accessorKey: 'endDate',
        header: 'EndDate',
      },

      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'halfDayDate',
        header: 'HalfDayDate',
      },
      {
        accessorKey: 'halfDayType',
        header: 'HalfDayType',
      },

    ],
  );
  function handleInputCheckBox(id) {
    console.log("id",id);
    setLeaveApprove(id)
  }

  const unapprovedData = data?.dataa?.filter(item => !item.approved);
  return (
    <>
      {data?.data?.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={data.data}
          rowId={(row) => row}
          enablePinning
          enableRowActions
          dataa={unapprovedData}
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>

              <Button>
                <CFormCheck
                  id="flexCheckDefault"
                  onClick={() => {
                    handleInputCheckBox(row.original.leaveNo);
                    setLeaveApprove(!leaveApprove.row.original.leaveNo);

                  }}
                />
              </Button>

            </Box>
          )}
        />) : (
        <div>
          No Data Found
        </div>
      )
      }
      <CCardHeader className="text-dark p-3 border border-0">
        <CCol md={12} className="d-flex justify-content-left">
          <CCol md={12} className="d-flex justify-content-left">
            {message ? (
              <CButton disabled className={styles.btnColorDisabled}>
                Data Saved &#10004;
              </CButton>
            ) : (
              <>
                <CButton color="success" onClick={(e) => {
                  handleSubmit(e, true);
                  setTimeout(() => {
                    setMessage('')
                  }, 1000);
                }}>Approve</CButton>
                <div className={styles.btnPadding}></div>
                <CButton color="danger" onClick={(e) => {
                  handleSubmit(e, false);
                  setTimeout(() => {
                    setMessage('')
                  }, 1000);
                }}>Reject</CButton>
              </>
            )}
            {message === "approved" && (
              <CButton color="success" className={styles.btnPadding}>
                Approved &#10004;
              </CButton>
            )}
            {message === "rejected" && (
              <CButton color="danger" className={styles.btnPadding}>
                Rejected &#10008;
              </CButton>
            )}
          </CCol>
        </CCol>
      </CCardHeader>



    </>

  );
};

export default LeaveApproveTable;

