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
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import { Link } from 'react-router-dom'
import DropDownCommon from '../Common-components/DropDownCommon'
import { accessFunctionNew } from 'src/api/apiConfig'

const ModuleDataView = () => {
  const initialValuesone = {
    moduleName: '',
    contractId: '',
    moduleId: '',
  }
  const location = useLocation()
  const moduleId = location.state.moduleId
  const [moduleData, setModuleData] = useState({})
  const [isEdit, setIsEdit] = useState(true)
  const [values, setValues] = useState(initialValuesone)
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/get_module/
              ${moduleId}`,
        )
        setModuleData(response.data)

        setValues({
          moduleName: response.data.moduleName,
          moduleId: response.data.moduleId,

          contractId: {
            id: response.data.contract.contractId,
            value: response.data.contract.name,
            label: response.data.contract.name,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [moduleId])
  const handleSubmitCheck = (event) => {
    const form = event.currentTarget
    if (!values.moduleName || !values.contractId) {
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
  let AccessToken = localStorage.getItem('AccessToken')

  let handleSubmit = async (e) => {
    const finalData = {
      ...values,
      contractId: values.contractId.id,
    }

    try {
      let res = await fetch('http://localhost:8080/api/v1/update_module', {
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
    window.location.href = '/#/forms/searchmodule-form'
  }

  function handleTypeFuncitonModule(values) {
    setValues((prevState) => ({
      ...prevState,
      contractId: values,
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
  console.log('....value', values)

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>Module Data View</h5>
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
                        placeholder="Module Name"
                        id="moduleName"
                        title="Enter only letter."
                        pattern="[a-zA-Z0-9-\s]+" 
                        name="moduleName"
                        value={values.moduleName}
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
                        selectedOption={values.contractId}
                        isMulti={false}
                        url="get_all_contract?search"
                        id="contractId"
                        keyId="contractId"
                        keyName="name"
                        {...(values.contractId && {
                          color: values.contractId ? '' : '1px solid red',
                        })}
                        handleInputChange={(values) => handleTypeFuncitonModule(values)}
                      />
                    </CCol>
                    <CCol xs>
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
                <Link to={'/forms/searchmodule-form'}>
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
                {/* <CButton className={styles.btnColor} onClick={() => setIsEdit(!isEdit)}>
                  Edit &nbsp;
                  <FontAwesomeIcon icon={faEdit} />
                </CButton> */}
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

export default ModuleDataView
