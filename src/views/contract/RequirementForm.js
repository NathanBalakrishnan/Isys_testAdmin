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
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import RequirementFormTable from 'src/components/table-data/RequirementFormTable'
import { requirementFormApiCall } from 'src/api/apiConfig'
// import GetLastid from 'src/components/formComponents/GetLastid'
//import RequirementDropDown from 'src/components/formComponents/requirementForm-components/RequirementDropDown'
import axios from 'axios'
import DropDownCommon from 'src/components/Common-components/DropDownCommon'

const Requirement = () => {
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
  const [isClientSubmitting, setIsClientSubmitting] = useState(false)
  const [validated, setValidated] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [message, setMessage] = useState('')

  const handleSubmitCheck = (event) => {
    const form = event.currentTarget
    if (
      !values.requirementItem ||
      !values.description ||
      !values.requirementTypeId ||
      !values.proposalHrs ||
      !values.status
    ) {
      alert('please fill all the * required fields')
    }
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setIsClientSubmitting(true)
      setValidated(true)
    } else {
      setIsClientSubmitting(true)
      setValidated(true)
      handleSubmit(event)
    }
    setValidated(true)
    setIsClientSubmitting(true)
  }
  let handleSubmit = async (e) => {
    e.preventDefault()
    const finalData = {
      ...values,
      moduleId: values.moduleId.id,
      requirementTypeId: values.requirementTypeId.id,
    }
    console.log('....final', finalData)

    // let AccessToken = localStorage.getItem('AccessToken')
    // let res = await fetch('http://localhost:8080/api/v1/create_requirement', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: AccessToken,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(finalData),
    // })

    // if (res.status === 200) {
    //   setIsClientSubmitting(false)
    //   setValidated(false)
    //   setValues(initialValues)
    //   setMessage('Data saved successfully')
    //   setTimeout(function () {
    //     setMessage('')
    //   }, 2000)
    // } else if (res.status === 400) {
    //   // let error = await res.json();
    //   window.alert('Requirement Item Already Exist')
    // } else {
    //   setMessage('')
    //   window.alert('Please provide all the valid inputs')
    // }
  }
  function handleInputChange(e) {
    const { name, value } = e.target
    let parsedValue = value.replace(/[^a-zA-Z0-9-\s]/g, '')

    if (parsedValue !== value) {
      alert('Should not contain symbols')
    }
    if (parsedValue === 'true') {
      parsedValue = true
    } else if (parsedValue === 'false') {
      parsedValue = false
    }
    setValues({
      ...values,
      [name]: parsedValue,
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
                    <CFormLabel htmlFor="ContractNo">
                      <strong>Requirment No</strong>
                    </CFormLabel>
                    {/* <GetLastid url="get_last_requirement_item_no" /> */}
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="requirementItem">
                      <strong>Requirement Item</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
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
                      type="text"
                      id="description"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>

                  {/* <CCol xs>
                    {/* <CFormLabel htmlFor="item">
                      <strong>Item</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="item"
                      placeholder="Item"
                      name="item"
                      value={values.item}
                      onChange={handleInputChange}
                      required
                    /> */}
                  {/* </CCol> */}
                  <CCol xs>
                    <CFormLabel htmlFor="type">
                      <strong>Requirement Type</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <DropDownCommon
                      selectedOption={values.requirementTypeId}
                      isMulti={false}
                      //url="get_all_requirement_type?search"
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
                  {/* <CCol xs>
                    <CFormLabel htmlFor="proposedItem">
                      <strong>Proposed Item</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="proposedItem"
                      placeholder="Proposed Item"
                      name="proposedItem"
                      value={values.proposedItem}
                      onChange={handleInputChange}
                      required
                      pattern="[a-zA-Z]+"
                    />
                  </CCol> */}

                  <CCol xs>
                    <CFormLabel htmlFor="proposalHrs">
                      <strong>Proposal Hrs</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
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
                      type="number"
                      id="allocSpentHrs"
                      placeholder="Alloc Spent Hrs"
                      name="allocSpentHrs"
                      value={values.allocSpentHrs}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="status">
                      <strong>Status</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <select
                      className="form-select"
                      name="status"
                      value={values.status}
                      onChange={handleInputChange}
                      aria-label="select example"
                      required
                    >
                      <option selected="" value="">
                        Select Status
                      </option>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </CCol>
                  <CCol xs={3}>
                    <CFormLabel htmlFor="moduleId">
                      <strong>Module</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    {/* <RequirementDropDown
                    required
                      url="get_all_module?search"
                      id="moduleId"
                      type="type"
                      handleInputChange={(values) => handleTypeFunciton(values)}
                      {...(isClientSubmitting && { color: values.moduleId ? '' : '1px solid red' })}
                    /> */}
                    <DropDownCommon
                      selectedOption={values.moduleId}
                      isMulti={false}
                      //url="get_all_module?search"
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
                  <CCol></CCol>
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
                <CButton className={styles.btnColor} onClick={handleSubmitCheck}>
                  Add Requirement
                </CButton>
              )}
              <div className={styles.btnPadding}></div>
              <CButton className={styles.btnColor} style={{ marginRight: '5px' }} onClick={''}>
                Search
              </CButton>
            </CCol>
          </CCardHeader>
        </CCard>
      </CCol>
      {/* <RequirementFormTable data={apiData} /> */}
    </CRow>
  )
}

export default Requirement
