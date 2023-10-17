import React, { useState,  } from 'react'
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
const initialValuesone = {
    ModuleName: '',
    Contract: '',
  }
  const ModuleForm = () => {
    const [values, setValues] = useState(initialValuesone)
    const [validated, setValidated] = useState(false)
    const [message, setMessage] = useState('')
    const handleSubmitCheck = (event) => {
      const form = event.currentTarget
      if (!values.ModuleName || !values.Contract) {
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
     // e.preventDefault()
      const finalData = {
        ...values,
        Contract: values.Contract,
        ModuleName: values.ModuleName,
      }
      console.log('....final', finalData)
    //   let AccessToken = localStorage.getItem('AccessToken')
    //   let res = await fetch('http://localhost:8080/api/v1/create_module', {
    //     method: 'POST',
    //     headers: {
    //       Authorization: AccessToken,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(finalData),
    //   })
  
    //   if (res.status === 200) {
    //     setValidated(false)
    //     setValues(initialValuesone)
  
    //     setMessage('Data saved successfully')
    //     console.log({ message })
    //     console.log({ message })
    //     setTimeout(function () {
    //       setMessage('')
    //     }, 2000)
    //   } else {
    //     setMessage('')
    //     window.alert('Please provide all the valid inputs')
    //   }
     }
    function handleTypeFuncitonModule(values) {
      setValues((prevState) => ({
        ...prevState,
        Contract: values,
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
    
    console.log('....value', values)
  
    return (
      <>
        <CRow>

        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>General Form Elements</h5>
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
                          <strong>ModuleName</strong>
                        </CFormLabel>
                        <CFormInput
                          required
                          type="text"
                          placeholder="Module Name"
                          id="ModuleName"
                          title="Enter only letter."
                         // pattern="[a-zA-Z0-9-\s]+"
                          name="ModuleName"
                          value={values.ModuleName}
                          onChange={handleInputChange}
                          result
                        />
                      </CCol>
                      <CCol xs></CCol>
                      <CCol xs></CCol>
                      <CCol xs></CCol>
                    </CRow>
                    <br></br>
                    <CRow>
                      <CCol xs>
                        <CFormLabel htmlFor="resourceNo">
                          <strong>Contract</strong>
                        </CFormLabel>
                        <DropDownCommon
                          selectedOption={values.Contract}
                          isMulti={false}
                          url="get_all_contract?search"
                          id="contract"
                          keyId="Contract"
                          keyName="name"
                          {...(values.Contract && {
                            color: values.Contract ? '' : '1px solid red',
                          })}
                          handleInputChange={(values) => handleTypeFuncitonModule(values)}
                        />
                      </CCol>
                      <CCol xs></CCol>
                      <CCol xs></CCol>
                      <CCol xs></CCol>
                    </CRow>
                    <br></br>
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
                    <CButton onClick={handleSubmitCheck}>Create</CButton>
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
  export default ModuleForm
  