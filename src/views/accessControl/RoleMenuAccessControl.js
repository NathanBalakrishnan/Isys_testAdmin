
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CRow,
  CFormInput,
  CFormCheck,
  CTable,
} from '@coreui/react'
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import DropDownCommonNew from 'src/components/Common-components/DropDownCommonNew'
import DropDownCompany from 'src/components/Common-components/DropDownCompany'
const initialValuesone = {
  role: '',
  companyId: '',
  applicationId:'',
}
const RoleMenuAccessControl = () => {
  const [values, setValues] = useState(initialValuesone)
  const [impCompanyNo, setImpCompanyNo] = useState('')
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  const [columns, setColumns] = useState([])
  const [items, setItems] = useState([])
  const [checkedResponsibilities, setCheckedResponsibilities] = useState([])
  const testcol=["Menu","Level Type","Add","Edit","Delete","Approve"]
  const testitems=["Master Setting","Role","Menu","Company","Attendance & Time","Leave Request"]

  const styles = {
    'input[type=checkbox]:disabled': {
      backgroundColor: 'red',
      opacity: 0.3,
    },
    'input[type=checkbox]:disabled::after': {
      content: '"X"',
      color: 'white',
      backgroundColor: 'red',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
      width: '16px',
      height: '16px',
      lineHeight: '16px',
      display: 'inline-block',
      marginLeft: '4px',
    },
  }


  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>Role Menu Access Control</h5>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}>
                <CCol md={12}>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Company</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownCommonNew
                        id="companyId"
                        selectedOption={values.companyId}
                       
                      />
                    </CCol>

                    {/* {impCompanyNo ? (
                      <CCol xs>
                        <CFormLabel htmlFor="inputEmail4">
                          <strong>Role</strong>
                          <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                        </CFormLabel>
                        <DropDownCommonNew
                          selectedOption={values.role}
                          isMulti={false}
                          url={`get_all_role?search=&companyNo=${impCompanyNo}`}
                          id="roleNo"
                          keyId="roleNo"
                          keyName="roleName"
                          // {...(isClientSubmitting && { color: values.role ? '' : '1px solid red' })}
                          handleInputChange={(values) => handleTypefuncitonRole(values)}
                        />
                      </CCol>
                    ) : ( */}
                      <CCol xs={3}>
                        <CFormLabel htmlFor="shiftTypeId">
                          <strong>Role </strong>
                          <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                        </CFormLabel>
                        <CFormInput placeholder="Select Company" value="" 
                        //onClick={checkCompany} 
                        />
                      </CCol>
                    {/* )} */}
                    
                    <CCol xs>
                    <CFormLabel htmlFor="resourceNo">
                        <strong>Application</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownCommonNew
                       // url="get_all_company?search"
                        id="applicationId"
                        selectedOption={values.applicationId}
                        // type="type"
                        // keyId="applicationId"
                        // keyName="applicationName"
                        // keyNo="companyNo"
                        //handleInputChange={(values) => handleTypeFuncitonCompany(values)}
                      />
</CCol>
                    <CCol xs></CCol>
                  </CRow>
                  <br></br>
                </CCol>
                {/* {values.role?.id && values.companyId?.id ? */}
                  <CTable columns={testcol}> 
                  <tr>
                    <td>Master Setting</td>
                    <td> Level 1</td>
                    <td> <input
                    className="form-check-input"
                    type="checkbox"
                    // checked={values.isactive}
                    id="flexCheckDefault"
                    name="isactive"
                   
                  /></td>
                    <td> <input
                    className="form-check-input"
                    type="checkbox"
                    // checked={values.isactive}
                    id="flexCheckDefault"
                    name="isactive"
                   
                  /></td>
                    <td> <input
                    className="form-check-input"
                    type="checkbox"
                    // checked={values.isactive}
                    id="flexCheckDefault"
                    name="isactive"
                   
                  /></td>
                    <td> <input
                    className="form-check-input"
                    type="checkbox"
                    // checked={values.isactive}
                    id="flexCheckDefault"
                    name="isactive"
                   
                  /></td>
                    </tr>
                    </CTable>
                  
                  {/* : ''
                } */}
             
                
              </CForm>
            </CCardBody>
            <CCardHeader className="text-dark p-3 border border-0">
              <CCol md={12} className="d-flex justify-content-left">
                {message ? (
                  <CButton disabled className={styles.btnColorDisabled}>
                    Data Saved &#10004;
                  </CButton>
                ) : (
                  <CButton>Create</CButton>
                )}
                <div className={styles.btnPadding}></div>
              </CCol>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default RoleMenuAccessControl
