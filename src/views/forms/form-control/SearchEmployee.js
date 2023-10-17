import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CFormSelect,
  CFormCheck,
  CImage,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import FormControl2 from './FormControl2'
import styles from '../../../components/Styles/FormStyles/FormStyle.module.css'

const FormControl = () => {
  const initialValues = {
    fname: '',
    lname: '',
    dob: '',
    mailid: '',
    contact: '',
  }
  const [values, setValues] = useState(initialValues)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submited-values', values)
  }
  function handleInputChange(e) {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }
  return (
    <CRow>
      <h1 className={styles.empheader}>Search Employee</h1>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className={styles.empSubHeader}>General Form Elements</h5>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
                <CCol md={12}>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Employee No</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="femployeeNo"
                        placeholder="Employee No"
                        name="employeeno"
                        value={values.employeeno}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>First Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        name="fname"
                        value={values.fname}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputPassword4">
                        <strong>Joining Date: From</strong>
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        id="joinDate"
                        name="joinDate"
                        value={values.dob}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputPassword4">
                        <strong>Joining Date: To</strong>
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        id="joinDate"
                        name="joinDate"
                        value={values.dob}
                        onChange={handleInputChange}
                      />
                    </CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Status</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option>Select Status</option>
                        <option selected value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Role</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option>Select Role</option>
                        <option selected value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="developer">Developer</option>
                      </select>
                    </CCol>
                    <CCol xs></CCol>
                    <CCol xs></CCol>
                  </CRow>
                  <br></br>
                </CCol>
            </CForm>
          </CCardBody>
          <CCardHeader className="text-dark p-3 border border-0">
            <CCol md={12} className="d-flex justify-content-left">
                <CButton color="info" onClick={handleSubmit}>
                Submit
                </CButton><br></br>
                <CButton color="info" onClick={handleSubmit}>
                Submit
                </CButton>
            </CCol>
          </CCardHeader>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
