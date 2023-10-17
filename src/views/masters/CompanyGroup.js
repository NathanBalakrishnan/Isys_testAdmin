import React, { useState,useEffect } from 'react'
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
  
} from '@coreui/react'
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import DropDownCommon from 'src/components/Common-components/DropDownCommon'
import CompanyGroupTable from 'src/components/table-data/CompanyGroupTable'
import { searchCompanyGroupApiCall } from 'src/api/apiConfig'
import { useNavigate } from 'react-router-dom'
import Constants from 'src/constants/Constants'

const initialValuesone = {
  code: '',
  description: '',
  status:'',
}
const CompanyGroupForm = () => {
  const navigate = useNavigate()
  const [apiData, setApiData] = useState(null)
  const [values, setValues] = useState(initialValuesone)
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  const handleSubmitCheck = (event) => {
   console.log("submittedvalue",values)
    const form = event.currentTarget
    if (!values.code || !values.status) {
      alert('please fill all the * required fields')
    } else if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      handleSubmit(event)
      console.log('submitted')
    }   
    setValidated(true)
  }
 
  let handleSubmit = async (e) => {
    e.preventDefault()
    const finalData = {
      ...values,
    }
    console.log('....final', finalData)
  //  let AccessToken = localStorage.getItem('AccessToken')
  let FullURL=Constants.URL+'companyGroup/save';
    let res = await fetch(FullURL, {
      method: 'POST',
      headers: {
        //Authorization: AccessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData),
    })

    if (res.status === 200) {
      setValidated(false)
      setValues(initialValuesone)
      setMessage('Data saved successfully')
      console.log({ message })
      console.log({ message })
      setTimeout(function () {
        setMessage('')
      }, 2000)
      pageRedirect();
    } else {
      setMessage('')
      window.alert('Application Name Already Exit')
    }
  }
  
  function pageRedirect() {
    window.location.reload();
     console.log("Reload page woeking")
    // window.location.href = '/masters/companyGroup'
  
  }
//   function handleTypeFuncitonCompany(values) {
//     setValues((prevState) => ({
//       ...prevState,
//       companyId: values,
//     }))
//   }
  function handleInputChange(e) {
    const { name, value } = e.target
    let newValue = value.replace(/[^a-zA-Z0-9-\s]/g, '')
    if (newValue !== value) {
      alert('Should not contain symbols')
    }
    setValues({
      ...values,
      [name]: newValue,

    })
  }
//   function handleInputChangeCheckbox(e) {
//     const { name, checked } = e.target
//     setValues({
//       ...values,
//       [name]: checked,
//     })
//   }
 //grid data

 const handleGetCompanyGroupApiCall = (response) => {
  setApiData(response)
}
http://localhost:8080/adminservices/adminorch/v1/companyGroup/findAll
useEffect(()=>{
   searchCompanyGroupApiCall(handleGetCompanyGroupApiCall, 'companyGroup/findAll')
  //searchCompanyApiCall()
},[])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>Company Group Form</h5>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmitCheck}
              >
                <CCol md={12}>
                  <CRow>
                    {/* <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Company</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownCommon
                        selectedOption={values.companyId}
                        isMulti={false}
                        url="get_all_company?search"
                        id="companyId"
                        keyId="companyId"
                        keyName="companyName"
                        {...(values.companyId && {
                          color: values.companyId ? '' : '1px solid red',
                        })}
                        handleInputChange={(values) => handleTypeFuncitonCompany(values)}
                      />
                    </CCol> */}
                        {/* <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Role Code</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        required
                        type="text"
                        placeholder="Role Code"
                        id="departmentName"
                        title="Enter only letter."
                        pattern="[a-zA-Z0-9-\s]+"
                        name="departmentName"
                        value={values.departmentName}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol> */}
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Company Group Name</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        required
                        type="text"
                        placeholder="Company Group Name"
                        id="code"
                        title="Enter only letter."
                        //pattern="[a-zA-Z0-9-\s]+"
                        name="code"
                        value={values.code}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Description</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        required
                        type="text"
                        placeholder=" Description"
                        id="description"
                        title="Enter only letter."
                        //pattern="[a-zA-Z0-9-\s]+"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs>
                <CFormLabel htmlFor="inputEmail4">
                  <strong>Status</strong>
                </CFormLabel>
                <select
                      value={values.status}
                      required
                      name="status"
                      onChange={handleInputChange}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select Status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">In Active</option>
                    </select>
              </CCol>
              <CCol xs></CCol>
                  </CRow>
                </CCol>
              </CForm>
            </CCardBody>
            <CCardHeader className="text-dark p-3 border border-0">
              <CCol md={12} className="d-flex justify-content-left">
                {message ? (
                  <CButton disabled className={styles.btnColorDisabled}>
                    Data Saved &#10004;
                  </CButton>
                ) : (
                  <CButton onClick={handleSubmitCheck}>Save</CButton>
                )}
                <div className={styles.btnPadding}></div>
              </CCol>
            </CCardHeader>
          </CCard>
        </CCol>
          
           <CompanyGroupTable
            data={apiData}
          />

      </CRow>
    </>
  )
}

export default CompanyGroupForm
