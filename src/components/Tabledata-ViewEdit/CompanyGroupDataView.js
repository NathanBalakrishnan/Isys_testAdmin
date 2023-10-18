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
   code: '',
  description: '',
  status:'',
  }
  
  const [rowData, setRowData] = useState({});
  const location = useLocation()
  const id = location.state.id;
  const [errormessage, setErrorMessage] = useState('')
  const [isEdit, setIsEdit] = useState(true)
  const [values, setValues] = useState(initialValuesone)
  const [validated, setValidated] = useState(false)
  
  const [message, setMessage] = useState('')
  useEffect(() => {
    let FullURL=Constants.URL+'companyGroup/findCompanyGroupById/'+id
    
    const fetchData = async () => {
      try {
        const response = await axios.get(FullURL,
        )
        setValues(response.data)
       console.log("Update List Response", response.data)
      //http://localhost:8080/adminservices/adminorch/v1/company/update
        setValues({
          id:id,
          status: response.data.status,
          code: response.data.code,
          description: response.data.description,
         
        //   companyGroupId:response.data.companyGroupId
          
          // companyGroupId: {
          //   id: response.data.companyGroup.id,
          //   // value: response.data.companyGroup.name,
          //   // label: response.data.companyGroup.name
          // },
        })

        console.log("state value", values)
        
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [id])
  const handleSubmitCheck = (event) => {
    const form = event.currentTarget
    if (!values.code || !values.description || !values.status) {
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
      
      
    }
    console.log("....final", finalData)
    
    let FullURL=Constants.URL+'companyGroup/update'
    axios.put(FullURL, finalData)
    .then((response) => {
      console.log("status",response.status)
      console.log('Data updated successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error updating data:', error);
    });
    // try {
    //   let res = await fetch(FullURL, {
    //     method: 'PUT',
    //     headers: {
    //       //Authorization: AccessToken,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(finalData),
    //   })
      // if (response.status === 200) {
      //   setValidated(false)
      //   setValues(initialValuesone)
      //   setMessage('Data saved successfully')

      //   setTimeout(function () {
      //     setMessage('')
      //     pageRedirect()
      //   }, 2000)
      // } else {
      //   setMessage('')
      //   console.log('Some error occured')
      //   window.alert('Please provide all the valid inputs')
      // }
    // } catch (error) {
    //   console.error(error.message)
    //  setErrorMessage("Error Occured")
      
    // }
  }

  function pageRedirect() {
    window.location.href = '/#/masters/companyGroup'
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
              <h5 className={styles.empSubHeader}>Company Group Form</h5>
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
                        <strong>Company Group Name</strong>
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
                        placeholder="Company Group Name"
                        id="code"
                        title="Enter only letter."
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
                        placeholder="Description"
                        id="description"
                        title="Enter only letter."
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>status</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <select
                     style={
                        isEdit
                          ? {
                            color: '#999999',
                            backgroundColor: '#f2f2f2',
                            borderColor: '#e6e6e6',
                          }
                          : {}
                      }
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
                <p className='error'>{errormessage}</p>
              </CForm>
            </CCardBody>
            <CCardHeader className="text-dark p-3 border border-0">
              <CCol md={12} className="d-flex justify-content-left">
                <Link to={'/masters/companyGroup'}>
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
