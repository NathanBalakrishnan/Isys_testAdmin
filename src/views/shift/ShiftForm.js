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
  CRow,
} from '@coreui/react'
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import DropDownCommon from '../../components/Common-components/DropDownCommon'
import DropDownCompany from 'src/components/Common-components/DropDownCompany'

const ShiftForm = () => {
  const initialValues = {
    title: '',
    startTime: '',
    endTime: '',
    graceTime: '',
    companyId: '',
    breaks: '',
    shiftTypeId: '',
    id:'',
    name:'',
  }

  const [isClientSubmitting, setIsClientSubmitting] = useState(false)
  const [validated, setValidated] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [message, setMessage] = useState('')
  const [impCompanyNo, setImpCompanyNo] = useState("")

  const handleSubmitCheck = (event) => {
     console.log("Submitted values are", values)
    const form = event.currentTarget
    if (
      !values.title ||
      !values.startTime ||
      !values.endTime ||
      !values.graceTime ||
      !values.companyId ||
      !values.shiftTypeId
    ) {
      alert('please fill all the * required fields')
    } else if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setIsClientSubmitting(true)
      setValidated(true)
    } else {
      setValidated(true)
      setIsClientSubmitting(true)
      handleSubmit(event)
    }
    setValidated(true)
    setIsClientSubmitting(true)
  }
  let handleSubmit = async (e) => {
    e.preventDefault()
    const finalData = {
      ...values,
      startTime: covert12hrss(values.startTime),
      endTime: covert12hrs(values.endTime),
      graceTime: values.graceTime + 'min',
      companyId: values.companyId.id,
      breaks: values.breaks.filter(item => item.id).map(item => item.id + '').join(','),
      shiftTypeId: values.shiftTypeId.id,
    }
  
    console.log("final",finalData)
    let AccessToken = localStorage.getItem('AccessToken')
    let res = await fetch('http://localhost:8080/api/v1/create_shift', {
      method: 'POST',
      headers: {
        Authorization: AccessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData),
    })

    if (res.status === 201) {
      setIsClientSubmitting(false)
      setValidated(false)
      setValues(initialValues)
      setImpCompanyNo("")
      setMessage('Data saved successfully')
      setTimeout(function () {
        setMessage('')
      }, 2000)
    } else {
      setMessage('')
      window.alert('Title Name Already Exit')
    }
  }

  function covert12hrs(time) {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  
  function covert12hrss(time) {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'Am'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  function handleInputChange(e) {
    const { name, value } = e.target
    console.log("name ===>",[name, value]);   
    if (values.graceTime < 0 || value > 60) {
      alert("not vallied allow 60 min only")
      return;
    }
    setValues({
      ...values,
      [name]: value,
    })
  }
  function handleTypeFuncitonCompany(val) {
    const dummyValue = { ...values }
    dummyValue.companyId = val;
    dummyValue.shiftTypeId = "";
    dummyValue.breaks = "";
    setValues(dummyValue)
    setImpCompanyNo(val.companyNo);
  }
  function handleTypeFunciton(val) {
    const dummyValue = { ...values }
    dummyValue.shiftTypeId = val
    setValues(dummyValue)
  }
  function handleTypeFunciton(val) {
    const dummyValue = { ...values }
    dummyValue.shiftTypeId = val
    setValues(dummyValue)
  }
  function handleTypefuncitonBreaks(val) {
    const dummyValue = { ...values }
    dummyValue.breaks = val
    setValues(dummyValue)
  }
  const checkCompany = () => {
    if (!values.companyId) {
      alert(" Please select company first")
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className={styles.empSubHeader}>Shift Form</h5>
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
                  <CCol xs={3}>
                    <CFormLabel htmlFor="companyId">
                      <strong>Company</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>

                    <DropDownCompany
                      url="https://jsonplaceholder.typicode.com/users"
                      id="id"
                      selectedOption={values.id}
                      type="type"
                      keyId="id"
                      keyName="email"
                      keyNo="name"
                      {...(isClientSubmitting && {
                        color: values.companyId ? '' : '1px solid red',
                      })}
                      handleInputChange={(values) => handleTypeFuncitonCompany(values)}
                    />
                  </CCol>

                  <CCol xs={3}>
                    <CFormLabel htmlFor="title">
                      <strong>Title</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="title"
                      placeholder="Title"
                      name="title"
                      value={values.title}
                      onChange={handleInputChange}
                      title="Enter only letter."
                      pattern="[a-zA-Z0-9-\s]+"
                      required
                    />
                  </CCol>
                  <CCol xs={3}>
                    <CFormLabel htmlFor="startTime">
                      <strong>Start Time</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={values.startTime}
                      required
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                  </CCol>
                  <CCol xs={3}>
                    <CFormLabel htmlFor="endTime">
                      <strong>End Time</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={values.endTime}
                      required
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                  </CCol>
                </CRow>
                <br />
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>grace Time (minutes)</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="graceTime"
                      pattern="[0-9-\s]+"
                      maxLength="2"
                      minLength="60"
                      id="graceTime"
                      name="graceTime"
                      value={values.graceTime}
                      required
                      onChange={handleInputChange}
                    />
                  </CCol>
                  {impCompanyNo ?
                    <CCol xs={3}>
                      <CFormLabel htmlFor="breaks">
                        {console.log(".....", impCompanyNo)}

                        <strong>Break</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      {/* <DropDownCommon
                        selectedOption={values.breaks}
                        isMulti={true}
                        url={`get_all_break?search&companyNo=${impCompanyNo}`}
                        id="breakId"
                        keyId="breakId"
                        keyName="title"
                        {...(isClientSubmitting && { color: values.breaks ? '' : '1px solid red' })}
                        handleInputChange={(values) => handleTypefuncitonBreaks(values)}
                      /> */}
                    </CCol>
                    :
                    <CCol xs={3}>
                      <CFormLabel htmlFor="shiftTypeId">
                        <strong>Break </strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>`
                      </CFormLabel>
                      <CFormInput placeholder="Select Company"
                        value=""
                        onClick={checkCompany}
                      />
                    </CCol>
                  }
                  {impCompanyNo ?
                    <CCol xs={3}>
                      <CFormLabel htmlFor="shiftTypeId">
                        <strong>Shift Type</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownCommon
                        selectedOption={values.shiftTypeId}
                        isMulti={false}
                        url={`get_all_shift_type?search&companyNo=${impCompanyNo}`}
                        id="shiftTypeId"
                        keyId="shiftTypeId"
                        keyName="shiftType"
                        keyNo="companyNo"
                        {...(values.shiftTypeId && {
                          color: values.shiftTypeId ? '' : '1px solid red',
                        })}
                        handleInputChange={(values) => handleTypeFunciton(values)}

                      />
                    </CCol>
                    :
                    <CCol xs={3}>

                      <CFormLabel htmlFor="shiftTypeId">
                        <strong>Shift Type </strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput placeholder="Select Company"
                        value=""
                        onClick={checkCompany}
                      />
                    </CCol>
                  }
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
                  Add Shift
                </CButton>
              )}
            </CCol>
          </CCardHeader>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ShiftForm