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
import DropDownCompany from 'src/components/Common-components/DropDownCompany'
import DropDownCommon from 'src/components/Common-components/DropDownCommon'
const LeaveLimit = () => {
    const initialValues = {
        yearlyLimit: '',
        companyId: '',
        resourceTypeId: '',
        leaveTypeId: '',
        monthlyLimit: '',
    }
    const [isClientSubmitting, setIsClientSubmitting] = useState(false)
    const [validated, setValidated] = useState(false)
    const [values, setValues] = useState(initialValues)
    const [message, setMessage] = useState('')
    const [impCompanyNo, setImpCompanyNo] = useState("")
    const handleSubmitCheck = (event) => {
        console.log("Submitted Values are",values)
        const form = event.currentTarget
       
        if (
            !values.companyId ||
            !values.resourceTypeId ||
            !values.leaveTypeId ||
            !values.yearlyLimit ||
            !values.monthlyLimit
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
            resourceTypeId: +values.resourceTypeId.id,
            companyId: values.companyId.id,
            leaveTypeId: values.leaveTypeId.id,
            yearlyLimit: +values.yearlyLimit,
            monthlyLimit: +values.monthlyLimit,

        }
        console.log('....final values', values)

        // let AccessToken = localStorage.getItem('AccessToken')
        // let res = await fetch('http://localhost:8080/api/v1/create_leave_limit', {
        //     method: 'POST',
        //     headers: {
        //         Authorization: AccessToken,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(finalData),
        // })

        // if (res.status === 201) {
        //     setIsClientSubmitting(false)
        //     setValidated(false)
        //     setValues(initialValues)
        //     setImpCompanyNo("")
        //     setMessage('Data saved successfully')
        //     setTimeout(function () {
        //         setMessage('')
        //     }, 2000)
        // } else {
        //     setMessage('')
        //     window.alert('Please provide all the valid inputs')
        // }
    }
    function handleTypeFuncitonCompany(val) {
        const dummyValue = { ...values }
        dummyValue.companyId = val;
        setValues(dummyValue)
        setImpCompanyNo(val.companyNo);
    }

    function handleInputChange(e) {
        const { name, value } = e.target
        let newValue = value.replace(/[^a-zA-Z0-9-\s]/g, '')
        if (newValue !== "departmentName") {
            newValue = value;
        } else {
            newValue = value.replace(/[^a-zA-Z0-9-\s]/g, '');
        }
        if (newValue !== value) {
            alert('Should not contain symbols')
        }
        // if (values.monthlyLimit < 0 || value > 31) {
        //     alert("Value must be between 0 and 31 only")
        //     return;
        // }

        setValues({
            ...values,
            [name]: value,
        })
    }

    function handleTypeFuncitonResource(val) {
        const dummyValue = { ...values }
        dummyValue.resourceTypeId = val
        setValues(dummyValue)
    }
    function handleTypeFuncitonLeaveTypeId(val) {
        const dummyValue = { ...values }
        dummyValue.leaveTypeId = val
        setValues(dummyValue)
    }
    console.log("val status===>", values)
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className="text-dark">
                        <h5 className={styles.empSubHeader}>Leave Limit</h5>
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
                                            <strong>Company</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                                        </CFormLabel>
                                        <DropDownCompany
                                            // url="get_all_company?search"
                                            id="companyId"
                                            selectedOption={values.companyId}
                                            type="type"
                                            keyId="companyId"
                                            keyName="companyName"
                                            keyNo="companyNo"
                                            {...(isClientSubmitting && {
                                                color: values.companyId ? '' : '1px solid red',
                                            })}
                                            handleInputChange={(values) => handleTypeFuncitonCompany(values)}
                                        />

                                    </CCol>

                                    <CCol xs>
                                        <>
                                            <CFormLabel htmlFor="inputEmail4">
                                                <strong>ResourceType</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                                            </CFormLabel>
                                            <DropDownCompany
                                                selectedOption={values.resourceTypeId}
                                                isMulti
                                                // url="get_all_resource_type?search"
                                                id="resourceTypeId"
                                                type="type"
                                                keyId="resourceTypeId"
                                                keyName="resourceType"
                                                {...(isClientSubmitting && {
                                                    color: values.resourceTypeId ? '' : '1px solid red',
                                                })}
                                                handleInputChange={(values) => handleTypeFuncitonResource(values)}
                                            />

                                        </>
                                    </CCol>


                                    <CCol xs={3}>
                                        <CFormLabel htmlFor="leaveTypeId">
                                            <strong>Leave Type</strong>
                                            <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                                        </CFormLabel>
                                        <DropDownCompany
                                            selectedOption={values.leaveTypeId}
                                            isMulti={false}
                                            // url="get_all_leave_type?search"
                                            id="leaveTypeId"
                                            keyId="leaveTypeId"
                                            keyName="leaveType"
                                            {...(values.leaveTypeId && {
                                                color: values.leaveTypeId ? '' : '1px solid red',
                                            })}
                                            handleInputChange={(values) => handleTypeFuncitonLeaveTypeId(values)}
                                        />
                                    </CCol>



                                    <CCol xs>
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            <strong>Monthly Limit</strong>
                                            <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                                        </CFormLabel>
                                        <CFormInput
                                            type="number"
                                            maxLength='2'
                                            placeholder="Monthly Limit"
                                            id="monthlyLimit"
                                            name="monthlyLimit"
                                            value={values.monthlyLimit}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </CCol>

                                </CRow>
                                <br />
                                <CRow>
                                    <CCol xs>
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            <strong>Yearly Limit</strong>
                                            <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                                        </CFormLabel>
                                        <CFormInput
                                            type="number"
                                            maxLength='2'
                                            placeholder="Yearly Limit"
                                            id="yearlyLimit"
                                            name="yearlyLimit"
                                            value={values.yearlyLimit}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </CCol>
                                    <CCol></CCol>
                                    <CCol></CCol>
                                    <CCol></CCol>
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
                                <CButton className={styles.btnColor} onClick={handleSubmitCheck}>
                                    save
                                </CButton>
                            )}

                        </CCol>
                    </CCardHeader>
                </CCard>
            </CCol>
        </CRow>

    )
}

export default LeaveLimit

