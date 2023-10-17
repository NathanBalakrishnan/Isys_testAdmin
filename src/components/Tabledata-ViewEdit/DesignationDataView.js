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
import { useLocation } from 'react-router-dom'
import DropDownCommon from 'src/components/Common-components/DropDownCommon'
import styles from '../Styles/FormStyles/FormStyle.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import { accessFunctionNew } from 'src/api/apiConfig'

const DesignationDataView = () => {
  const initialValuesone = {
    designationName: '',
    description: '',
    companyId: '',
    designationNo:'',
    designationId:'',
  }
  const location = useLocation()
  const designationNo = location.state.designationNo
  const [isEdit, setIsEdit] = useState(true)
  const [values, setValues] = useState(initialValuesone)
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/get_designation/${designationNo}`,
        )
        setValues(response.data)
        setValues({
          designationName: response.data.designationName,
          description: response.data.description,
           designationNo:response.data.designationNo,
           designationId:response.data.designationId,
          companyId: {
            id: response.data.company.companyId,
            value: response.data.company.companyName,
            label: response.data.company.companyName
          },

        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [designationNo])

  const handleSubmitCheck = (event) => {
    const form = event.currentTarget
    if (!values.designationName || !values.description || !values.companyId) {
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
  let AccessToken = localStorage.getItem('AccessToken')
  let handleSubmit = async (e) => {
    const finalData = {
      ...values,
      companyId: values.companyId.id,
      designationNo:values.designationNo,
      
    }
    console.log("....final", finalData)
    try {
      let res = await fetch('http://localhost:8080/api/v1/update_designation', {
        method: 'PUT',
        headers: {
          Authorization: AccessToken,
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
    } catch (err) {
      console.log(err)
    }
  }

  function pageRedirect() {
    window.location.href = '/#/forms/searchdesignation-form'
  }
  function handleTypeFuncitonCompany(values) {
    setValues((prevState) => ({
      ...prevState,
      companyId: values,
    }))
  }
  function handleInputChange(e) {
    const { name, value } = e.target

    let parsedValue = value.replace(/[^a-zA-Z0-9-\s]/g, '')
    if (parsedValue === 'true') {
      parsedValue = true
    } else if (parsedValue === 'false') {
      parsedValue = false
    }
    if (parsedValue !== value) {
      alert('Should not contain symbols')
    }
    setValues({
      ...values,
      [name]: parsedValue
    })
  }
    return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>Designation Form</h5>
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
                        <strong>Company</strong>
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
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="resourceNo">
                        <strong>Designation Name</strong>
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
                        placeholder="Designation Name"
                        id="designationName"
                        title="Enter only letter."
                        pattern="[a-zA-Z0-9-\s]+"
                        name="designationName"
                        value={values.designationName}
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
                        pattern="[a-zA-Z0-9-\s]+"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        result
                      />
                    </CCol>
                    <CCol xs></CCol>
                  </CRow>
                </CCol>
              </CForm>
            </CCardBody>
            <CCardHeader className="text-dark p-3 border border-0">
              <CCol md={12} className="d-flex justify-content-left">
                <Link to={'/forms/searchdesignation-form'}>
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

export default DesignationDataView

