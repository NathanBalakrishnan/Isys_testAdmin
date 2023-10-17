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
import GetLastid from 'src/components/formComponents/GetLastid'
import TaskTypeDropDown from 'src/components/formComponents/taskForm-components/TaskTypeDropDown'
import ProjectTypeDropDown from 'src/components/formComponents/taskForm-components/ProjectTypeDropDown'
import ResponsibilityDropDown from 'src/components/formComponents/taskForm-components/ResponsibilityDropDown'
import RequirementsDropDown from 'src/components/formComponents/taskForm-components/RequirementsDropDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import DropDownCommon from '../Common-components/DropDownCommon'
import { accessFunctionNew, accessFunctionUser } from 'src/api/apiConfig'

const TaskDataView = () => {
  const initialValues = {
    taskTypeId: '',
    contractId: '',
    responsibilityId: '',
    requirementId: '',
    description: '',
    estimatedHrs: '',
    actualHrs: '',
    comments: '',
    status: '',
  }

  const location = useLocation()
  const taskNo = location.state.taskNo
  const [taskData, setTaskData] = useState({})
  const [isEdit, setIsEdit] = useState(true)
  const [isAlwaysDisabled, setIsAlwaysDisabled] = useState(true)

  const [isTypeSubmitting, setIsTypeSubmitting] = useState(false)
  const [isProviderSubmitting, setIsProviderSubmitting] = useState(false)
  const [isClientSubmitting, setIsClientSubmitting] = useState(false)
  const [isvalidationdrop, setIsValidationdrop] = useState(false)
  const [validated, setValidated] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/get_task/${taskNo}`)
        setTaskData(response.data)
        console.log('responc', response.data)
        // setResourceNum(response.data.resourceNo)
        setValues({
          description: response.data.description,
          estimatedHrs: response.data.estimatedHrs,
          actualHrs: response.data.actualHrs,
          comments: response.data.comments,
          status: response.data.status,

          taskTypeId: {
            id: response.data.taskType.taskTypeId,
            value: response.data.taskType.taskType,
            label: response.data.taskType.taskType,
          },
          contractId: {
            id: response.data.contract.contractId,
            value: response.data.contract.name,
            label: response.data.contract.name,
          },
          responsibilityId: {
            id: response.data.responsibility.responsibilityId,
            value: response.data.responsibility.responsibilityName,
            label: response.data.responsibility.responsibilityName,
          },
          requirementId: {
            id: response.data.requirement.requirementId,
            value: response.data.requirement.requirementItem,
            label: response.data.requirement.requirementItem,
          },
        })
      } catch (error) {
        // console.error(error)
      }
    }
    fetchData()
  }, [taskNo])
  // console.log('Task data', taskData)
  // console.log('Task data', taskData.taskNo)

  // console.log('sepcific id', values.taskTypeId.id)

  const handleSubmitCheck = (event) => {
    const form = event.currentTarget
    if (
      !values.taskTypeId ||
      !values.contractId ||
      !values.responsibilityId ||
      !values.requirementId ||
      !values.description ||
      !values.comments ||
      !values.status ||
      !values.estimatedHrs ||
      !values.actualHrs
    ) {
      alert('please fill all the * required fields')
    } else if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setIsTypeSubmitting(true)
      setIsProviderSubmitting(true)
      setIsClientSubmitting(true)
      setIsValidationdrop(true)
      // console.log('NTOT-submitted', isTypeSubmitting)
    } else {
      setValidated(true)
      setIsTypeSubmitting(true)
      setIsProviderSubmitting(true)
      setIsClientSubmitting(true)
      setIsValidationdrop(true)
      handleSubmit(event)
      // console.log('submitted')
    }
    setValidated(true)
    setIsTypeSubmitting(true)
    setIsProviderSubmitting(true)
    setIsClientSubmitting(true)
    setIsValidationdrop(true)
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    const finalData = {
      ...values,
      taskTypeId: values.taskTypeId.id,
      responsibilityId: values.responsibilityId.id,
      requirementId: values.requirementId.id,
      contractId: values.contractId.id,
      taskId: taskData.taskId,
      taskNo: taskNo,
    }
    console.log('....final', finalData)

    let AccessToken = localStorage.getItem('AccessToken')
    let res = await fetch('http://localhost:8080/api/v1/update_task', {
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
    window.location.href = '#/forms/searchtask-form'
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
      taskTypeId: values,
    }))
  }
  function handleTypeFunciton1(values) {
    setValues((prevState) => ({
      ...prevState,
      contractId: values,
    }))
  }
  function handleTypeFunciton2(values) {
    setValues((prevState) => ({
      ...prevState,
      responsibilityId: values,
    }))
  }
  function handleTypeFunciton3(values) {
    setValues((prevState) => ({
      ...prevState,
      requirementId: values,
    }))
  }
  function handleEditOptions() {
    setIsEdit(prevIsEdit => !prevIsEdit);
    const User = accessFunctionUser('Task');
    if (User !== 'Employee') {
      setIsAlwaysDisabled(prevIsAlwaysDisabled => !prevIsAlwaysDisabled);
    }
  }
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className={styles.empSubHeader}>Task Form</h5>
            <p>Task Id: {taskData.taskId} </p>
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
                      <strong>Task No</strong>
                    </CFormLabel>
                    <CFormInput
                      style={{ opacity: '0.7' }}
                      type="text"
                      id="contractNo"
                      disabled
                      placeholder="Contract No"
                      name="contractNo"
                      value={taskNo}
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="taskTypeId">
                      <strong>Task Type</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>

                    <DropDownCommon
                      disabled={isAlwaysDisabled}
                      style={
                        isAlwaysDisabled
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      selectedOption={values.taskTypeId}
                      isMulti={false}
                      url="get_all_Task_Type?search"
                      id="taskTypeId"
                      keyId="taskTypeId"
                      keyName="taskType"
                      {...(values.taskTypeId && {
                        color: values.taskTypeId ? '' : '1px solid red',
                      })}
                      {...(isClientSubmitting && {
                        color: values.taskTypeId ? '' : '1px solid red',
                      })}
                      handleInputChange={(values) => handleTypeFunciton(values)}
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="contractId">
                      <strong>Project</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>

                    {/* <DropDownCommon
                      disabled={isAlwaysDisabled}
                      style={
                        isAlwaysDisabled
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      selectedOption={values.projectId}
                      isMulti={false}
                      url="get_all_project?search"
                      id="projectId"
                      keyId="projectId"
                      keyName="projectName"
                      {...(values.projectId && {
                        color: values.projectId ? '' : '1px solid red',
                      })}
                      handleInputChange={(values) => handleTypeFunciton1(values)}
                    /> */}
                    <DropDownCommon
                      disabled={isAlwaysDisabled}
                      style={
                        isAlwaysDisabled
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
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
                      {...(isClientSubmitting && {
                        color: values.contractId ? '' : '1px solid red',
                      })}
                      handleInputChange={(values) => handleTypeFunciton1(values)}
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="responsibilityId">
                      <strong>Responsibility</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>

                    <DropDownCommon
                      disabled={isAlwaysDisabled}
                      style={
                        isAlwaysDisabled
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      selectedOption={values.responsibilityId}
                      isMulti={false}
                      url="get_all_responsibility?search"
                      id="responsibilityId"
                      keyId="responsibilityId"
                      keyName="responsibilityName"
                      {...(values.responsibilityId && {
                        color: values.responsibilityId ? '' : '1px solid red',
                      })}
                      {...(isClientSubmitting && {
                        color: values.responsibilityId ? '' : '1px solid red',
                      })}
                      handleInputChange={(values) => handleTypeFunciton2(values)}
                    />
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="requirementId">
                      <strong>Requirement</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <DropDownCommon
                      disabled={isAlwaysDisabled}
                      style={
                        isAlwaysDisabled
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      selectedOption={values.requirementId}
                      isMulti={false}
                      url="get_all_requirement?search"
                      id="requirementId"
                      keyId="requirementId"
                      keyName="requirementItem"
                      {...(values.requirementId && {
                        color: values.requirementId ? '' : '1px solid red',
                      })}
                      {...(isClientSubmitting && {
                        color: values.requirementId ? '' : '1px solid red',
                      })}
                      handleInputChange={(values) => handleTypeFunciton3(values)}
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="description">
                      <strong>Description</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isAlwaysDisabled}
                      style={
                        isAlwaysDisabled
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      title="Enter only letter."
                      pattern="[a-zA-Z0-9-\s]+"
                      type="text"
                      id="description"
                      placeholder="Description"
                      name="description"
                      value={values.description}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="estimatedHrs">
                      <strong>Estimated Hrs</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isAlwaysDisabled}
                      style={
                        isAlwaysDisabled
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="number"
                      id="estimatedHrs"
                      placeholder="Estimated Hrs"
                      name="estimatedHrs"
                      value={values.estimatedHrs}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="actualHrs">
                      <strong>Actual Hrs</strong>
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
                      id="actualHrs"
                      placeholder="Actual Hrs"
                      name="actualHrs"
                      value={values.actualHrs}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                </CRow>
                <br />
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="comments">
                      <strong>Comments</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isAlwaysDisabled}
                      style={
                        isAlwaysDisabled
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="text"
                      id="comments"
                      placeholder="Comments"
                      name="comments"
                      value={values.comments}
                      onChange={handleInputChange}
                      title="Enter only letter."
                      pattern="[a-zA-Z0-9-\s]+"
                      required
                    />
                  </CCol>

                  <CCol xs>
                    <CFormLabel htmlFor="status">
                      <strong>Status</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormSelect
                      disabled={isAlwaysDisabled}
                      style={
                        isAlwaysDisabled
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      id="status"
                      name="status"
                      value={values.status}
                      required
                      onChange={handleInputChange}
                      aria-label="Default select example"
                    >
                      <option selected="" value="">
                        Select Status
                      </option>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </CFormSelect>
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
              <Link to={'/forms/searchtask-form'}>
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
              {accessFunctionNew('Task', 'update') ? (
                <CButton className={styles.btnColor} onClick={handleEditOptions}>
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

export default TaskDataView
