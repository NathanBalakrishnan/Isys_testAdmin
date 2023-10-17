import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'
import { Box, Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { accessFunctionNew } from 'src/api/apiConfig'
import DropDownCompany from '../Common-components/DropDownCompany'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'
const EmployeeTable = (props) => {
  const navigate = useNavigate()
  const handleClick = (resourceNo) => {
    navigate('/forms/employee-data', { state: { resourceNo } })
  }
  const handleClickDelete = (resourceNo) => {
    navigate('/dashboard', { state: { resourceNo } })
  }
  const handleClickCalender = (resourceNo) => {
    navigate('/forms/timesheet-form', { state: { resourceNo } })
  }
  const elementView = <FontAwesomeIcon icon={faEye} />
  const elementDelete = <FontAwesomeIcon icon={faTrash} />
  const elementCalender = <FontAwesomeIcon icon={faCalendarCheck} />
  const data = props
  console.log('data--Props', data?.data)
  console.log('props values', props)
  // console.log('address', data.data.department.departmentName)

  const columns = useMemo(() => [
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
      accessorKey: 'department.departmentName',
      header: 'Department',
    },
    {
      accessorKey: 'designation.designationName',
      header: 'Designation',
    },
    {
      accessorKey: 'resourceType.resourceType',
      header: 'Resource Type',
    },
    // {
    //   accessorKey: 'company.companyName',
    //   header: 'Company Name',
    // },
    // {
    //   accessorKey: 'company.companyAddress',
    //   header: 'Company Address',
    // },
    // {
    //   accessorKey: 'company.companyEmail',
    //   header: 'Company Email',
    // },
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
      accessorKey: 'contactDetails.primaryEmail',
      header: 'Primary Email',
    },
    {
      accessorKey: 'contactDetails.secondaryEmail',
      header: 'Secondary Email',
    },
    {
      accessorKey: 'contactDetails.phoneNumber',
      header: 'Phone Number 1',
    },
    {
      accessorKey: 'contactDetails.alternatePhoneNumber',
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
  ])
  const [visible, setVisible] = useState(false)
  // const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null)

  // const handleAadharFileUpload = (e) => {
  //   setAadharFile(e.target.files[0]);
  // }
  const handlePanFileUpload = (e) => {
    setPanFile(e.target.files[0])
  }
  return (
    <>
      {data?.data?.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={data.data}
          rowId={(row) => row.resourceNo}
          enablePinning
          initialState={{ columnPinning: { left: ['firstName'], right: ['resourceNo'] } }}
          enableRowActions
          renderRowActions={({ row, cell }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              {accessFunctionNew(props.responsibleNameView, props.accessNameView) ? (
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
              ) : (
                ''
              )}
              {accessFunctionNew(props.responsibleNameDelete, props.accessNameDelete) ? (
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
              ) : (
                ''
              )}
              {accessFunctionNew(props.responsibleNameDelete, props.accessNameDelete) ? (
                <Button
                  onClick={() => handleClickCalender(row.original.resourceNo)}
                  style={{
                    backgroundColor: '#e8e8e8',
                    textTransform: 'capitalize',
                    letterSpacing: '1px',
                    color: '#20ab04',
                    minWidth: '35px',
                  }}
                >
                  {elementCalender}
                </Button>
              ) : (
                ''
              )}

              <>
                <CButton color="secondary" onClick={() => setVisible(!visible)}>
                  Doc
                </CButton>
              </>
            </Box>
          )}
        />
      ) : (
        <div>No Data Found</div>
      )}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Employee Document</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Aadhar Card</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>

                      <CFormInput
                        required
                        type="file" onChange={handleAadharFileUpload}
                        // type="text"
                        // placeholder="Department Name"
                        // id="departmentName"
                        // title="Enter only letter."
                        // pattern="[a-zA-Z0-9-\s]+"
                        // name="departmentName"
                        // value={values.departmentName}
                        // onChange={handleInputChange}
                        // result

                      />
                    </CCol> */}
          <CRow>
            <CCol xs>
              <CFormLabel htmlFor="resourceNo">
                <strong>Proof Type</strong>
                <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
              </CFormLabel>
              <DropDownCompany
                // url="get_all_company?search"
                id="companyId"
                // selectedOption={values.companyId}
                type="type"
                keyId="companyId"
                keyName="companyName"
                keyNo="companyNo"
                // {...(isClientSubmitting && {
                //   color: values.companyId ? '' : '1px solid red',
                // })}
                // handleInputChange={(values) => handleTypeFuncitonCompany(values)}
              />
            </CCol>
            <CCol> </CCol>
          </CRow>
          <br />
          <CRow>
            <CCol xs>
              <CFormLabel htmlFor="resourceNo">
                <strong>Select File</strong>
                <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
              </CFormLabel>
              <CFormInput
                required
                type="file"
                onChange={handlePanFileUpload}
                // type="text"
                // placeholder=" Description"
                // id="description"
                // title="Enter only letter."
                // pattern="[a-zA-Z0-9-\s]+"
                // name="description"
                // value={values.description}
                // onChange={handleInputChange}
                // result
              />
            </CCol>
            <CCol></CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="success">Upload</CButton>
          <CButton color="danger" onClick={() => setVisible(false)}>
            Remove
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EmployeeTable
