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
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CompanyTable from 'src/components/table-data/CompanyTable'
import { searchCompanyApiCall } from 'src/api/apiConfig'
 import constants from 'src/constants/Constants'
const initialValuesone = {
  name:'',
  code: '',
  groupCode: '',
  companyGroupId:'',
  
}

const Company = () => {
  const [apiData, setApiData] = useState(null)
  const [values, setValues] = useState(initialValuesone)
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  const handleSubmitCheck = (event) => {
    const form = event.currentTarget
    // console.log("Submitted values are",values)
    if (!values.code || !values.name || !values.groupCode||!values.companyGroupId) {
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
      
       companyGroupId: values.companyGroupId.id,
      // createdBy: "admin",
      // updatedBy: "admin"
    }
    
    console.log('....final', finalData)
   //let AccessToken = localStorage.getItem('AccessToken')
let Fullurl=constants.URL+'company/save'
    let res = await fetch(Fullurl, {
      method: 'post',
     
      headers: {
       //Authorization: AccessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData),
    }).catch(function(error){
      console.log(error);
    });
      console.log("response status",res.status)
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
      window.alert('Company Name Already Exit')
    }
  }
  function pageRedirect() {
    window.location.reload();
    // window.location.href = '/#/views/masters/company'
  }
  function handleTypeFuncitonCompanyGroup(values) {
    setValues((prevState) => ({
      ...prevState,
      companyGroupId: values,
    }))
  }
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
  function handleInputChangeCheckbox(e) {
    const { name, checked } = e.target
    setValues({
      ...values,
      [name]: checked,
    })
  }


  //grid data

  const handleGetCompanyApiCall = (response) => {
    setApiData(response)
  }
  useEffect(()=>{
     searchCompanyApiCall(handleGetCompanyApiCall, 'company/findAll')
    //searchCompanyApiCall()
  },[])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>Company Form</h5>
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
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Company Group</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownCommon
                        selectedOption={values.companyGroupId}
                        isMulti={false}
                        url="companyGroup/findAll"
                        id="id"
                        keyId="id"
                        keyName="code"
                        {...(values.companyGroupId && {
                          color: values.companyGroupId ? '' : '1px solid red',
                        })}
                        handleInputChange={(values) => handleTypeFuncitonCompanyGroup(values)}
                      />
                    </CCol>
                        <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Company Code</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        required
                        type="text"
                        placeholder="Company Code"
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
                        <strong>Company Name</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        required
                        type="text"
                        placeholder="Company Name"
                        id="name"
                        title="Enter only letter."
                        //pattern="[a-zA-Z0-9-\s]+"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Group Code</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        required
                        type="text"
                        placeholder=" Group Code"
                        id="groupCode"
                        title="Enter only letter."
                        //pattern="[a-zA-Z0-9-\s]+"
                        name="groupCode"
                        value={values.groupCode}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs>
                {/* <CFormLabel htmlFor="inputEmail4">
                  <strong>Is Active</strong>
                </CFormLabel>
                <div className="form-check pt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={values.isActive}
                    name="isActive"
                    id="flexCheckDefault"
                    onChange={handleInputChangeCheckbox}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Yes
                  </label>
                </div> */}
              </CCol>
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

        {/* {apiData ? ( */}
          <CompanyTable
            data={apiData}
          />
{/* 
        ) : (
          <div className={styles.spiner}>
            <FontAwesomeIcon icon={faSpinner} spin />
            <p>Loading</p>
          </div>
        ) */}
        {/* } */}
      </CRow>
    </>
  )
}

export default Company
