import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
import styles from '../Styles/FormStyles/FormStyle.module.css'
import DropDownCommon from 'src/components/Common-components/DropDownCommon'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import { accessFunctionNew } from 'src/api/apiConfig'
import { useLocation } from 'react-router-dom'
import '../../scss/mystyle.css'
import Constants from 'src/constants/Constants'
const CompanyDataView = () => {
  const initialValuesone = {
    id:'',
    name:'',
   code: '',
  groupCode: '',
  companyGroupId:'',
  }
  const location = useLocation()
  const companyid = location.state.companyid;
  const [errormessage, setErrorMessage] = useState('')
  const [isEdit, setIsEdit] = useState(true)
  const [values, setValues] = useState(initialValuesone)
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
         let FullURL=Constants.URL+'company/'+companyid
        const response = await axios.get(
          FullURL,
        )
        setValues(response.data)
     
        setValues({
          id:companyid,
          name: response.data.name,
          code: response.data.code,
         
          groupCode: response.data.groupCode,
          // companyGroupId:response.data.companyGroupId
          
          // companyGroupId: {
          //   id: response.data.companyGroup.id,
          //   // value: response.data.companyGroup.name,
          //   // label: response.data.companyGroup.name
          // },
          companyGroupId: {
            id: response.data.companyGroupId.id,
            value: response.data.companyGroupId.code,
            label: response.data.companyGroupId.code
          },

        })
       
        
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [companyid])
  const handleSubmitCheck = (event) => {
    const form = event.currentTarget
    if (!values.name || !values.groupCode || !values.companyGroupId||!values.code) {
      alert('please fill all the * required fields')
    } else if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      handleSubmit(event)
    }
    setValidated(true)
  }

  //let AccessToken = localStorage.getItem('AccessToken')

  let handleSubmit = async (e) => {
     
    const finalData = {
      ...values,
      
      companyGroupId: values.companyGroupId.id,
    }
    console.log("....final", finalData)
    let FullURL=Constants.URL+'company/update'
    // const apiUrl='http://localhost:8080/adminservices/adminorch/v1/company/update';
    // Axios.put(apiUrl, finalData)
    // .then((response) => {
    //   console.log('Data updated successfully:', response.data);
    // })
    // .catch((error) => {
    //   console.error('Error updating data:', error);
    // });
    try {
      let res = await fetch(FullURL, {
        method: 'PUT',
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

        setTimeout(function () {
          setMessage('')
          pageRedirect()
        }, 2000)
      } else {
        setMessage('')
        console.log('Some error occured')
       window.alert('Please provide all the valid inputs')
      }
    } catch (error) {
      console.error(error.message)
      setErrorMessage("Error Occured")
    }
  }

  function pageRedirect() {
    window.location.href = '/#/masters/company'
  }
  function handleTypeFuncitonCompany(values) {
  
    setValues((prevState) => ({
      ...prevState,
      companyGroupId: values,
    }))
   
  }
  function handleInputChange(e) {
    const { name, value } = e.target

    // let parsedValue = value.replace(/[^a-zA-Z0-9-\s]/g, '')
    // if (parsedValue === 'true') {
    //   parsedValue = true
    // } else if (parsedValue === 'false') {
    //   parsedValue = false
    // }
    // if (parsedValue !== value) {
    //   alert('Should not contain symbols')
    // }
    setValues({
      ...values,
      [name]: value
    })
  }
 
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>Company Form</h5>
              {/* <p>Code : {companyid}</p> */}

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
                        disabled={isEdit}
                        style={
                          isEdit
                            ? {
                              color: '#999999',
                              backgroundColor: '#f2f2f2',
                              borderColor: '#e6e6e6',
                            }
                            : {}
                        }

                        selectedOption={values.companyGroupId}
                        isMulti={false}
                        url="companyGroup/findAll"
                        id="id"
                        keyId="id"
                        keyName="code"
                        {...(values.companyGroupId && {
                          color: values.companyGroupId ? '' : '1px solid red',
                        })}
                        handleInputChange={(values) => handleTypeFuncitonCompany(values)}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Company Code</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput
                        disabled={isEdit}
                        style={
                          isEdit
                            ? {
                              color: '#999999',
                              backgroundColor: '#f2f2f2',
                              borderColor: '#e6e6e6',
                            }
                            : {}
                        }
                        required
                        type="text"
                        placeholder="Company Code"
                        id="code"
                        title="Enter only letter."
                        pattern="[a-zA-Z0-9-\s]+"
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
                        disabled={isEdit}
                        style={
                          isEdit
                            ? {
                              color: '#999999',
                              backgroundColor: '#f2f2f2',
                              borderColor: '#e6e6e6',
                            }
                            : {}
                        }
                        required
                        type="text"
                        placeholder="Company Name"
                        id="name"
                        title="Enter only letter."
                        pattern="[a-zA-Z0-9-\s]+"
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
                        disabled={isEdit}
                        style={
                          isEdit
                            ? {
                              color: '#999999',
                              backgroundColor: '#f2f2f2',
                              borderColor: '#e6e6e6',
                            }
                            : {}
                        }
                        required
                        type="text"
                        placeholder="groupCode"
                        id="groupCode"
                        title="Enter only letter."
                        pattern="[a-zA-Z0-9-\s]+"
                        name="groupCode"
                        value={values.groupCode}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs></CCol>
                  </CRow>
                </CCol>
                <p className='error'>{errormessage}</p>
              </CForm>
            </CCardBody>
            <CCardHeader className="text-dark p-3 border border-0">
              <CCol md={12} className="d-flex justify-content-left">
                <Link to={'/masters/company'}>
                  <CButton className={styles.btnColor}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    &nbsp; Back
                  </CButton>
                </Link>
                <div className={styles.btnPadding}></div>
                {message ? (
                  <CButton disabled className={styles.btnColorDisabled}>
                    Data Saved &#10004;
                  </CButton>
                ) : (
                  <CButton
                    disabled={isEdit}
                    style={
                      isEdit
                        ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                        : {}
                    }
                    className={styles.btnColor}
                    onClick={handleSubmitCheck}
                  >
                    Save
                  </CButton>
                )}
                <div className={styles.btnPadding}></div>
                <CButton className={styles.btnColor} onClick={() => setIsEdit(!isEdit)}>
                  Edit &nbsp;
                  <FontAwesomeIcon icon={faEdit} />
                </CButton>
                {accessFunctionNew('moduleForm', 'update') ? (
                  <CButton className={styles.btnColor} onClick={() => setIsEdit(!isEdit)}>
                    Edit &nbsp;
                    <FontAwesomeIcon icon={faEdit} />
                  </CButton>
                ) : (
                  ''
                )}
              </CCol>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CompanyDataView
