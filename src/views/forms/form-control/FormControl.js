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
      <h1 className="display-6">Employee Form</h1>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className="text-dark">Personal Information</h5>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/layout#gutters">
              <CForm className="row g-3">
                <CCol md={12}>
                  <CRow>
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
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Middle Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="middleName"
                        placeholder="Middle Name"
                        name="fname"
                        value={values.fname}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputPassword4">
                        <strong>Last Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        name="lname"
                        value={values.lname}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputPassword4">
                        <strong>Date of Birth</strong>
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        id="dob"
                        placeholder="DOB"
                        name="dob"
                        value={values.dob}
                        onChange={handleInputChange}
                      />
                    </CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Aadhaar ID</strong>
                      </CFormLabel>
                      <CFormInput
                        type="number"
                        id="exampleFormControlInput1"
                        placeholder="Aadhaar ID"
                        name="mailid"
                        value={values.mailid}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Pan Card No</strong>
                      </CFormLabel>
                      <CFormInput
                        type="number"
                        id="exampleFormControlInput1"
                        placeholder="Aadhaar ID"
                        name="mailid"
                        value={values.mailid}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Gender</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="resourceImage">
                        <strong>Employee Image</strong>
                      </CFormLabel>
                      <input
                        className="form-control"
                        type="file"
                        id="employeeImage"
                        placeholder="User Image"
                      />
                    </CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Employee No</strong>
                      </CFormLabel>
                      <CFormInput
                        type="number"
                        id="exampleFormControlInput1"
                        placeholder="Employee No"
                        name="mailid"
                        value={values.mailid}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputPassword4">
                        <strong>Joining Date</strong>
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        id="dob"
                        placeholder="Joining Date"
                        name="dob"
                        value={values.dob}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Email ID</strong>
                      </CFormLabel>
                      <CFormInput
                        type="email"
                        id="exampleFormControlInput1"
                        placeholder="mail Id"
                        name="mailid"
                        value={values.mailid}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs></CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Contact No</strong>
                      </CFormLabel>
                      <CFormInput
                        type="tel"
                        id="exampleFormControlInput1"
                        placeholder="Contact No"
                        name="mailid"
                        value={values.mailid}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputPassword4">
                        <strong>Emergency Contact No</strong>
                      </CFormLabel>
                      <CFormInput
                        type="tel"
                        id="dob"
                        placeholder="Emergency Contact"
                        name="dob"
                        value={values.dob}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Official Email</strong>
                      </CFormLabel>
                      <CFormInput
                        type="email"
                        id="exampleFormControlInput1"
                        placeholder="mail Id"
                        name="mailid"
                        value={values.mailid}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs></CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Designation</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select Designation</option>
                        <option value="manager">Manager</option>
                        <option value="developer">Developer</option>
                        <option value="other">Other</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Role</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select Role</option>
                        <option value="promanager">Project Manager</option>
                        <option value="techarchi">Technical Architect</option>
                        <option value="busanalyst">Business Analyst</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Reporting Manager</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select Product</option>
                        <option value="service">Service</option>
                        <option value="finance">Finance</option>
                        <option value="other">Other</option>
                      </select>
                    </CCol>
                    <CCol xs></CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Department</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select Department</option>
                        <option value="service">Service</option>
                        <option value="finance">Finance</option>
                        <option value="other">Other</option>
                      </select>
                    </CCol>
                    <CCol xs></CCol>
                    <CCol xs></CCol>
                    <CCol xs></CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Fathers Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder="Father Name"
                        name="fathername"
                        value={values.mailid}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Mothers Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="contactNo"
                        placeholder="Mother Name"
                        name="mothername"
                        value={values.contact}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Marital Status</strong>
                      </CFormLabel>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Tick if Married
                        </label>
                      </div>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Spouse Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="contactNo"
                        placeholder="Spouse Name"
                        name="spousename"
                        value={values.contact}
                        onChange={handleInputChange}
                      />
                    </CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <p>Permanent Address</p>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Country</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select Country</option>
                        <option value="india">India</option>
                        <option value="singapore">Singapore</option>
                        <option value="japan">Japan</option>
                        <option value="other">Other</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>State</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select State</option>
                        <option value="tn">Tamil Nadu</option>
                        <option value="ka">Karnataka</option>
                        <option value="kl">Kerala</option>
                        <option value="ap">Andhra Pradesh</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>City</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select City</option>
                        <option value="tn">Chennai</option>
                        <option value="ka">Salem</option>
                        <option value="kl">Coimbatore</option>
                        <option value="ap">Madurai</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Address</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="contactNo"
                        placeholder="Door,Stree,Locality,Pincode"
                        name="address"
                        value={values.contact}
                        onChange={handleInputChange}
                      />
                    </CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol xs={3}>
                      <p>Communication Address</p>
                    </CCol>
                    <CCol xs>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Is Communication Same?
                        </label>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Country</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select Country</option>
                        <option value="india">India</option>
                        <option value="singapore">Singapore</option>
                        <option value="japan">Japan</option>
                        <option value="other">Other</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>State</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select State</option>
                        <option value="tn">Tamil Nadu</option>
                        <option value="ka">Karnataka</option>
                        <option value="kl">Kerala</option>
                        <option value="ap">Andhra Pradesh</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>City</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select City</option>
                        <option value="tn">Chennai</option>
                        <option value="ka">Salem</option>
                        <option value="kl">Coimbatore</option>
                        <option value="ap">Madurai</option>
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Address</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="contactNo"
                        placeholder="Door,Stree,Locality,Pincode"
                        name="address"
                        value={values.contact}
                        onChange={handleInputChange}
                      />
                    </CCol>
                  </CRow>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className="text-dark">Family Information</h5>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/layout#gutters">
              <CForm className="row g-3">
                <CCol md={12}>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Fathers Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder="Father Name"
                        name="fathername"
                        value={values.mailid}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Mothers Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="contactNo"
                        placeholder="Mother Name"
                        name="mothername"
                        value={values.contact}
                        onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Marital Status</strong>
                      </CFormLabel>
                      <div className="form-check pt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Tick if Married
                        </label>
                      </div>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Spouse Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="contactNo"
                        placeholder="Spouse Name"
                        name="spousename"
                        value={values.contact}
                        onChange={handleInputChange}
                      />
                    </CCol>
                  </CRow>
                  <br></br>
                </CCol>
                <CCol md={12} className="d-flex justify-content-center">
                  <CButton color="info" onClick={handleSubmit}>
                    Submit
                  </CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
        <FormControl2 />
      </CCol>
    </CRow>
  )
}

export default FormControl
