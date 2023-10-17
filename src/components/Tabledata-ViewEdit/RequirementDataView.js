import React, { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
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
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import RequirementFormTable from 'src/components/table-data/RequirementFormTable'
import { accessFunctionNew, requirementFormApiCall } from 'src/api/apiConfig'
import GetLastid from 'src/components/formComponents/GetLastid'
import RequirementDropDown from 'src/components/formComponents/requirementForm-components/RequirementDropDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import DropDownCommon from '../Common-components/DropDownCommon'

const RequirementDataView = () => {
  const initialValues = {
    requirementItem: '',
    description: '',
    proposalHrs: '',
    proposalAdlHrs: '',
    allocInEtHrs: '',
    allocAdEtHrs: '',
    allocSpentHrs: '',
    status: '',
    moduleId: '',
    requirementTypeId: '',
  }

  const location = useLocation()
  const requirementId = location.state.requirementId
  const [requirementData, setRequirementData] = useState({})
  const [isEdit, setIsEdit] = useState(true)
  const [isClientSubmitting, setIsClientSubmitting] = useState(false)

  const [validated, setValidated] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/get_requirement/${requirementId}`,
        )
        setRequirementData(response.data)
        setValues({
          requirementItem: response.data.requirementItem,
          description: response.data.description,
          // item: response.data.item,
          requirementTypeId: {
            id: response.data.requirementType.requirementTypeId,
            value: response.data.requirementType.requirementType,
            label: response.data.requirementType.requirementType,
          },
          // proposedItem: response.data.proposedItem,
          proposalHrs: response.data.proposalHrs,
          proposalAdlHrs: response.data.proposalAdlHrs,
          allocInEtHrs: response.data.allocInEtHrs,
          allocAdEtHrs: response.data.allocAdEtHrs,
          allocSpentHrs: response.data.allocSpentHrs,
          status: response.data.status,
          moduleId: {
            id: response.data.module.moduleId,
            value: response.data.module.moduleName,
            label: response.data.module.moduleName,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [requirementId])
  // console.log('requirement data', requirementData)
  // console.log('requirement other', requirementData.requirementId)

  const handleSubmitCheck = (event) => {
    const form = event.currentTarget
    if (
      !values.requirementItem ||
      !values.description ||
      !values.requirementTypeId ||
      !values.proposalHrs
    ) {
      alert('please fill all the * required fields')
    } else if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      setIsClientSubmitting(true)
    } else {
      setValidated(true)
      handleSubmit(event)
      setIsClientSubmitting(true)

      console.log('submitted')
    }
    setValidated(true)
    setIsClientSubmitting(true)
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    const finalData = {
      ...values,
      requirementId: requirementData.requirementId,
      requirementItemNo: requirementData.requirementItemNo,
      requirementTypeId: values.requirementTypeId.id,
      moduleId: values.moduleId.id,
    }
    console.log('....final', finalData)

    let AccessToken = localStorage.getItem('AccessToken')
    let res = await fetch('http://localhost:8080/api/v1/update_requirement', {
      method: 'PUT',
      headers: {
        Authorization: AccessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData),
    })

    if (res.status === 200) {
      setIsClientSubmitting(false)
      setValidated(false)
      setValues(initialValues)
      setMessage('Data saved successfully')
      setTimeout(function () {
        setMessage('')
        pageRedirect()
      }, 2000)
    } else {
      setMessage('')
      window.alert('Please provide all the valid inputs')
    }
  }
  function pageRedirect() {
    window.location.href = '#/forms/SearchRequirment-form'
  }
  function handleInputChange(e) {
    const { name, value } = e.target
    let newValue = value.replace(/[^a-zA-Z0-9-\s]/g, '')
    if (newValue !== value) {
      alert('Should not contain symbols')
    }
    if (newValue === 'true') {
      newValue = true
    } else if (newValue === 'false') {
      newValue = false
    }
    setValues({
      ...values,
      [name]: newValue,
    })
  }
  function handleTypeFunciton(values) {
    setValues((prevState) => ({
      ...prevState,
      moduleId: values,
    }))
  }
  function handleTypeFuncitonRequirement(values) {
    setValues((prevState) => ({
      ...prevState,
      requirementTypeId: values,
    }))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className={styles.empSubHeader}>Requirements</h5>
            <p>Requirement Id: {requirementId}</p>
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
                    <CFormLabel htmlFor="requirementNo">
                      <strong>Requirment No</strong>
                    </CFormLabel>
                    <CFormInput
                      style={{ opacity: '0.7' }}
                      type="text"
                      id="requirementNo"
                      disabled
                      placeholder="Requirement No"
                      name="requirementNo"
                      value={requirementData.requirementItemNo}
                      title="Enter only letter."
                      pattern="[a-zA-Z0-9-\s]+"
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="requirementItem">
                      <strong>Requirement Item</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="text"
                      id="requirementItem"
                      placeholder="Requirement Item"
                      name="requirementItem"
                      value={values.requirementItem}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="description">
                      <strong>Description</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="text"
                      id="description"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleInputChange}
                      required
                      title="Enter only letter."
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="type">
                      <strong>Requirement Type </strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <DropDownCommon
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      selectedOption={values.requirementTypeId}
                      isMulti={false}
                      url="get_all_requirement_type?search"
                      id="requirementTypeId"
                      keyId="requirementTypeId"
                      keyName="requirementType"
                      {...(values.requirementTypeId && {
                        color: values.requirementTypeId ? '' : '1px solid red',
                      })}
                      {...(isClientSubmitting && {
                        color: values.requirementTypeId ? '' : '1px solid red',
                      })}
                      handleInputChange={(values) => handleTypeFuncitonRequirement(values)}
                    />
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="proposalHrs">
                      <strong>Proposal Hrs</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="number"
                      id="proposalHrs"
                      placeholder="Proposal Hrs"
                      name="proposalHrs"
                      value={values.proposalHrs}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="proposalAdlHrs">
                      <strong>Proposal Adl Hrs</strong>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="number"
                      id="proposalAdlHrs"
                      placeholder="Proposal Adl Hrs"
                      name="proposalAdlHrs"
                      value={values.proposalAdlHrs}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="allocInEtHrs">
                      <strong>Alloc In Et Hrs</strong>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="number"
                      id="allocInEtHrs"
                      placeholder="alloc In Et Hrs"
                      name="allocInEtHrs"
                      value={values.allocInEtHrs}
                      onChange={handleInputChange}
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="allocAdEtHrs">
                      <strong>Alloc Ad Et Hrs</strong>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="number"
                      id="allocAdEtHrs"
                      placeholder="Alloc Ad Et Hrs"
                      name="allocAdEtHrs"
                      value={values.allocAdEtHrs}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>
                <br />
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="allocSpentHrs">
                      <strong>Alloc Spent Hrs</strong>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="number"
                      id="allocSpentHrs"
                      placeholder="Alloc Spent Hrs"
                      name="allocSpentHrs"
                      value={values.allocSpentHrs}
                      onChange={handleInputChange}
                    />
                  </CCol>

                  <CCol xs={3}>
                    <CFormLabel htmlFor="moduleId">
                      <strong>Module</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <DropDownCommon
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      selectedOption={values.moduleId}
                      isMulti={false}
                      url="get_all_module?search"
                      id="moduleId"
                      keyId="moduleId"
                      keyName="moduleName"
                      {...(values.moduleId && {
                        color: values.moduleId ? '' : '1px solid red',
                      })}
                      {...(isClientSubmitting && { color: values.moduleId ? '' : '1px solid red' })}
                      handleInputChange={(values) => handleTypeFunciton(values)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="status">
                      <strong>Status</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormSelect
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      id="status"
                      name="status"
                      value={values.status}
                      required
                      onChange={handleInputChange}
                    >
                      <option selected="" value="">
                        Select Status
                      </option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </CFormSelect>
                  </CCol>
                  <CCol></CCol>
                </CRow>
                <br></br>
              </CCol>
            </CForm>
          </CCardBody>
          <CCardHeader className="text-dark p-3 border border-0">
            <CCol md={12} className="d-flex justify-content-left">
              <Link to={'/forms/SearchRequirment-form'}>
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
              {accessFunctionNew('Requirement', 'update') ? (
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
  )
}

export default RequirementDataView
