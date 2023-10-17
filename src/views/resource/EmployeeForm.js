import React, { useRef, useState, useEffect } from 'react'
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
  CRow,
  

} from '@coreui/react'
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import EmployeNo from 'src/components/EmployeeForm-components/EmployeNo'
import DropDownEmployDesignation from 'src/components/EmployeeForm-components/DropDownEmployDesignation'
import defalutProfilePic from '../../assets/images/profile-pic.png'
import DropDownCommon from 'src/components/Common-components/DropDownCommon'
import DropDownCommonNew from 'src/components/Common-components/DropDownCommonNew'
import DropDownCompany from 'src/components/Common-components/DropDownCompany'

const getDropdownOptions = (array, keyLabel, keyValue) => {
  return array.map((item) => ({ label: item[keyLabel], value: item[keyValue] }))
}

const initialValuesone = {
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  companyId: '',
  departmentId: '',
  designationId: '',
  aadhaarNumber: '',
  panNumber: '',
  dateOfBirth: '',
  jointDate: '',
  reportingManger: '',
  role: '',
  status: false,
  resourceTypeId: '',
  isCommunication: '',
}
const initialContactDetails = {
  primaryEmail: '',
  secondaryEmail: '',
  phoneNumber: '',
  alternatePhoneNumber: '',
}
const initialAddressValues = {
  doorNo: '',
  street: '',
  locality: '',
  cityId: '',
  stateId: '',
  zipCode: '',
  countryId: '',
}
const EmployeeForm = () => {
  const [file, setFile] = useState('')
  const [values, setValues] = useState(initialValuesone)
  const [permanentAddress, setPermanentAddress] = useState(initialAddressValues)
  const [contactDetails, setcontactDetails] = useState(initialContactDetails)
  const [communicationaddress, setcommunicationaddress] = useState(initialAddressValues)
  const [data, setData] = useState([])
  const [countryOptions, setCountryOptions] = useState([])
  const [stateOptionsForCommunication, setStateOptionsForCommunication] = useState([])
  const [cityOptionsForCommunication, setCityOptionsForCommunication] = useState([])
  const [stateOptionsForPerm, setStateOptionsForPerm] = useState([])
  const [cityOptionsForPerm, setCityOptionsForPerm] = useState([])
  const [message, setMessage] = useState('')
  const [validated, setValidated] = useState(false)
  const [isClientSubmitting, setIsClientSubmitting] = useState(false)
  const [isProviderSubmitting, setIsProviderSubmitting] = useState(false)
  const [companyNo, setCompanyNo] = useState('')

  const [impDepertment, setImpDepertment] = useState("")
  console.log("..Deprrr=>", impDepertment)

  const fileRefs = useRef()
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      alert(`File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      // Clear the file input value
      event.target.value = "";
      return;
    }
    setFile(file);
    setThumbnailUrl(URL.createObjectURL(file));
  }
  const [previousDate, setPreviousDate] = useState(null)
  useEffect(() => {
    const currentDate = new Date()
    const eighteenYearsAgo = currentDate.setFullYear(currentDate.getFullYear() - 18)
    setPreviousDate(new Date(eighteenYearsAgo).toISOString().split('T')[0])
  }, [])
  const handleSubmitCheck = (event) => {
     console.log("Submitted values are",values)
    const form = event.currentTarget
    if (!values.firstName ||
      !values.middleName ||
      !values.lastName ||
      !values.gender ||
      !values.dateOfBirth ||
      !values.aadhaarNumber ||
      !values.panNumber ||
      !values.jointDate ||
      !contactDetails.primaryEmail ||
      !contactDetails.alternatePhoneNumber
    ) {
      alert("please fill all the * required fields");
    }
    else if (!isValidAadhaarNumber(values.aadhaarNumber)) {
      event.preventDefault();
      event.stopPropagation();
      setIsProviderSubmitting(true);
      setIsClientSubmitting(true);
      setValidated(false);
      window.alert("Please provide a valid 12-digit Aadhaar number");
      // console.log("NOT SUBMITTED");
    }
    else if (!isValidPanNumber(values.panNumber)) {
      event.preventDefault();
      event.stopPropagation();
      setIsProviderSubmitting(true);
      setIsClientSubmitting(true);
      setValidated(false);
      window.alert("Please provide a valid 10-digit PAN number");
      // console.log("NOT SUBMITTED");
    }
    else if (!isValidAlterMobileNumber(contactDetails.alternatePhoneNumber)) {
      event.preventDefault();
      event.stopPropagation();
      setIsProviderSubmitting(true);
      setIsClientSubmitting(true);
      setValidated(false);
      window.alert("Please provide a valid 10-digit Mobile number");
      // console.log("NOT SUBMITTED");
    }
    else if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setIsProviderSubmitting(true)
      setIsClientSubmitting(true)
      setValidated(false)
      window.alert('Please provide all the valid input')
      // console.log('NOT SUBMITTED')
    } else {
      setIsProviderSubmitting(true)
      setIsClientSubmitting(true)
      setValidated(true)
      handleSubmit(event)
      // console.log('submitted')
    }

  }

  const isValidAadhaarNumber = (aadhaarNumber) => {
    const aadhaarNumberRegex = /^\d{12}$/;
    if (aadhaarNumberRegex.test(aadhaarNumber)) {
      return true;
    }
    else {
      return false;
    }
  }

  const isValidPanNumber = (panNumber) => {
    const panNumberRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
    if (panNumberRegex.test(panNumber)) {
      return true;
    }
    else {
      return false;
    }
  }

  const isValidAlterMobileNumber = (alternatePhoneNumber) => {
    const alterMobileNumberRegex = /^\d{10}$/;
    if (alterMobileNumberRegex.test(alternatePhoneNumber)) {
      return true;
    }
    else {
      return false;
    }

  }
  let AccessToken = localStorage.getItem('AccessToken')
  useEffect(() => {
    async function fetchData() {
      axios
        .get('http://localhost:8080/api/v1/get_all_country?search=India', {
          headers: {
            Authorization: AccessToken,
          },
        })
        .then((response) => {
          // console.log('reaponse', data)
          const finalData = response.data
          setData(finalData)
          setCountryOptions(getDropdownOptions(finalData, 'countryName', 'countryId'))
        })
        .catch((error) => {
          console.log('errorcountry ' + error)
        })
    }
    fetchData()
  }, [])

  const fileRef = useRef()
  let handleSubmit = async (e) => {
    const finalData = {
      ...values,
      aadhaarNumber: +values.aadhaarNumber,
      designationId: values.designationId.id,
      companyId: values.companyId.id,
      departmentId: values.departmentId.id,
      resourceTypeId: +values.resourceTypeId.id,
      reportingManger: (values.reportingManger.id ? (values.reportingManger.id + '') : ''),
      role: values.role.filter(item => item.id).map(item => item.id + '').join(','),
      contactDetails: {
        ...contactDetails,
        address: [
          {
            ...permanentAddress,
            countryId: +permanentAddress.countryId,
            stateId: +permanentAddress.stateId,
            cityId: +permanentAddress.cityId,
          },
          {
            ...communicationaddress,
            countryId: +communicationaddress.countryId,
            stateId: +communicationaddress.stateId,
            cityId: +communicationaddress.cityId,
          },
        ],
      },
    }
    console.log('final-data-sending', finalData)
    const json = JSON.stringify(finalData)
    const blob = new Blob([json], {
      type: 'application/*+json',
    })
    let AccessToken = localStorage.getItem('AccessToken')
    let fullFormData = new FormData()
    fullFormData.append('resourceDTO', blob)
    fullFormData.append('multipartFile', file)
    try {
      let res = await fetch('http://localhost:8080/api/v1/create_resource', {
        method: 'POST',
        headers: {
          Authorization: AccessToken,
        },
        body: fullFormData,
        ContentType: 'multipart/mixed',
      })
      if (res.status == 200) {
        setMessage('Data saved successfully')
        setTimeout(function () {
          setMessage('');
          setValidated(false);
          setValues(initialValuesone);
          setcontactDetails(initialContactDetails);
          setPermanentAddress(initialAddressValues);
          setcommunicationaddress(initialAddressValues);
          setFile('');
          fileRefs.current.value = null;
          fileRefs.current = null;
          if (thumbnailUrl) {
            URL.revokeObjectURL(thumbnailUrl);
          }
          setThumbnailUrl('');
          setIsProviderSubmitting(false);
          setIsClientSubmitting(false);
        }, 2000);
      } else {
        setMessage('')
        console.log('Some error occured')
        window.alert('Please provide all the valid inputs')
      }
    } catch (err) { }
  }
  function handleInputChange(e) {
    const { name, value } = e.target
    if (name !== 'aadhaarNumber') {
      setValues({
        ...values,
        [name]: value,
      });
      return;
    }
    if (!/^\d+$/.test(value)) {
      return;
    }
    setValues({
      ...values,
      [name]: value,
    })
  }
  function handleInputChangeCheckbox(e) {
    const { name, checked } = e.target
    setValues({
      ...values,
      [name]: checked,
    })

    if (!values.status) {
      setPermanentAddress({ ...communicationaddress })
      setStateOptionsForPerm([...stateOptionsForCommunication])
      setCityOptionsForPerm([...cityOptionsForCommunication])
    } else {
      setPermanentAddress(initialAddressValues)
    }
  }
  function handleInputsetPermanentAddress(e) {
    const { name, value } = e.target

    switch (name) {
      case 'countryId': {
        const [curCountry] = data.filter((country) => country.countryId === +value)
        setStateOptionsForPerm(getDropdownOptions(curCountry?.states ?? [], 'stateName', 'stateId'))
        setCityOptionsForPerm([])
      }
      case 'stateId': {
        const [curCountry] = data.filter(
          (country) => country.countryId === +permanentAddress.countryId,
        )
        const [curState] = (curCountry?.states ?? []).filter((state) => state.stateId === +value)

        setCityOptionsForPerm(getDropdownOptions(curState?.cities ?? [], 'cityName', 'cityId'))
      }
    }
    setPermanentAddress({
      ...permanentAddress,
      [name]: value,
    })
  }
  function handleInputsetcontactDetails(e) {
    const { name, value } = e.target
    setcontactDetails({
      ...contactDetails,
      [name]: value,
    })
  }
  function handleInputsetcommunicationaddress(e) {
    const { name, value } = e.target
    switch (name) {
      case 'countryId': {
        const [curCountry] = data.filter((country) => country.countryId === +value)
        setStateOptionsForCommunication(
          getDropdownOptions(curCountry?.states ?? [], 'stateName', 'stateId'),
        )
        setCityOptionsForCommunication([])
        break
      }
      case 'stateId': {
        const [curCountry] = data.filter(
          (country) => country.countryId === +communicationaddress.countryId,
        )
        const [curState] = (curCountry?.states ?? []).filter((state) => state.stateId === +value)
        setCityOptionsForCommunication(
          getDropdownOptions(curState?.cities ?? [], 'cityName', 'cityId'),
        )
        break
      }
    }
    setcommunicationaddress({
      ...communicationaddress,
      [name]: value,
    })
  }
  function handleTypeFunciton(values) {
    setValues((prevState) => ({
      ...prevState,
      designationId: values,
    }))
  }
  function handleTypeFuncitonDeprt(val) {
    const dummyValue = { ...values }
    dummyValue.departmentId = val;
    dummyValue.reportingManger = "";
    setValues(dummyValue)
    setImpDepertment(val.departmentNo);
  }
  function handleTypefuncitonRole(values) {
    setValues((prevState) => ({
      ...prevState,
      role: values,
    }))
  }

  function handleTypeFuncitonCompany(val) {
    const dummyValue = { ...values }
    dummyValue.companyId = val;
    dummyValue.designationId = "";
    dummyValue.departmentId = "";
    dummyValue.role = "";
    setValues(dummyValue)
    setCompanyNo(val.companyNo);
  }
  function handleTypeFuncitonReport(values) {
    setValues((prevState) => ({
      ...prevState,
      reportingManger: values,
    }))
  }
  function handleTypeFuncitonResource(values) {
    setValues((prevState) => ({
      ...prevState,
      resourceTypeId: values,
    }))
  }
  const checkCompany = () => {
    if (!values.companyId) {
      alert(" Please select company first")
    }
  }
  const checkDepertment = () => {
    if (!values.departmentId) {
      alert(" Please select Department first")
    }
  }

  return (
    <CRow className="p-3">
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className={styles.empSubHeader}>Personal Information</h5>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={12}>
                <CRow>
                  <CCol xs={3}>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Company</strong><sup style={{ color: 'red', fontSize: '18px' }}>**</sup>
                    </CFormLabel>
                    <DropDownCompany
                      url="get_all_company?search"
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
                </CRow>
                <br />
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>First Name</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      name="firstName"
                      pattern="[a-zA-Z]+"
                      value={values.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Middle Name</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="middleName"
                      placeholder="Middle Name"
                      name="middleName"
                      pattern="[a-zA-Z]+"
                      value={values.middleName}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputPassword4">
                      <strong>Last Name</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      name="lastName"
                      pattern="[a-zA-Z]+"
                      value={values.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol xs>
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        style={{
                          width: '50%',
                          height: 'auto',
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto',

                        }}
                        alt="Selected Image"
                      />
                    ) : (
                      <img
                        src={defalutProfilePic}
                        style={{
                          width: '50%',
                          height: 'auto',
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto',

                        }}
                        alt="Selected Image"
                      />
                    )}
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="inputPassword4">
                      <strong>Date of Birth</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="date"
                      max={previousDate}
                      id="dob"
                      placeholder="DOB"
                      name="dateOfBirth"
                      value={values.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Aadhaar No</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Aadhaar ID"
                      name="aadhaarNumber"
                      pattern="^\d{12}$"
                      maxLength="12"
                      value={values.aadhaarNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Pan Card No</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Pan No"
                      name="panNumber"
                      pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                      maxLength='10'
                      value={values.panNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="resourceImage">
                      <strong>Employee Image</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <input
                      ref={fileRefs}
                      onChange={handleFileChange}
                      className="form-control"
                      type="file"
                      accept="image/*"
                      id="employeeImage"
                      placeholder="User Image"
                      required
                    />
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Gender</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <select
                      value={values.gender}
                      required
                      name="gender"
                      onChange={handleInputChange}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputPassword4">
                      <strong>Joining Date</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="date"
                      id="dob"
                      placeholder="Joining Date"
                      name="jointDate"
                      value={values.jointDate}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Email ID</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      type="email"
                      id="exampleFormControlInput1"
                      placeholder="mail Id"
                      name="primaryEmail"
                      value={contactDetails.primaryEmail}
                      onChange={handleInputsetcontactDetails}
                      required
                    />
                  </CCol>

                  <CCol xs>
                    <>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>ResourceType</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownEmployDesignation
                        selectedOption={values.resourceTypeId}
                        isMulti
                        url="get_all_resource_type?search"
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
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Contact No</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CCol className={styles.iconAlignment}>
                      <FontAwesomeIcon className={styles.iconStyles} icon={faPhoneFlip} />
                      <CFormInput
                        className={styles.iconInpStyle}
                        type="text"
                        id="contractNo"
                        name="alternatePhoneNumber"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        value={contactDetails.alternatePhoneNumber}
                        onChange={handleInputsetcontactDetails}
                        required
                      />
                    </CCol>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputPassword4">
                      <strong>Emergency Contact No</strong>
                    </CFormLabel>
                    <CCol className={styles.iconAlignment}>
                      <FontAwesomeIcon className={styles.iconStyles} icon={faPhoneFlip} />
                      <CFormInput
                        className={styles.iconInpStyle}
                        type="text"
                        id="contractNo"
                        name="phoneNumber"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        value={contactDetails.phoneNumber}
                        onChange={handleInputsetcontactDetails}
                      />
                    </CCol>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Official Email</strong>
                    </CFormLabel>
                    <CFormInput
                      type="email"
                      id="exampleFormControlInput1"
                      placeholder="mail Id"
                      name="secondaryEmail"
                      value={contactDetails.secondaryEmail}
                      onChange={handleInputsetcontactDetails}
                    />
                  </CCol>
                  <CCol xs>
                    {' '}
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Employee No</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <EmployeNo url="api/v1/get_last_resource_no" />
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  {companyNo ?
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Department</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownEmployDesignation
                        selectedOption={values.departmentId}
                        url={`get_all_department?search=&companyNo=${companyNo}`}
                        id="departmentId"
                        type="type"
                        keyId="departmentId"
                        keyName="departmentName"
                        keyNo="departmentNo"
                        handleInputChange={(values) => handleTypeFuncitonDeprt(values)}
                        {...(isClientSubmitting && {
                          color: values.departmentId ? '' : '1px solid red',
                        })}
                      />
                    </CCol>
                    :
                    <CCol xs={3}>
                      <CFormLabel htmlFor="shiftTypeId">
                        <strong>Department </strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput placeholder="Select Company"
                        value=""
                        onClick={checkCompany}
                      />
                    </CCol>
                  }
                  {companyNo ?
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Designation</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownEmployDesignation
                        selectedOption={values.designationId}
                        url={`get_all_designation?search=&companyNo=${companyNo}`}
                        id="designationId"
                        type="type"
                        keyId="designationId"
                        {...(isClientSubmitting && {
                          color: values.designationId ? '' : '1px solid red',
                        })}
                        keyName="designationName"
                        handleInputChange={(values) => handleTypeFunciton(values)}
                      />
                    </CCol>
                    :
                    <CCol xs={3}>
                      <CFormLabel htmlFor="shiftTypeId">
                        <strong>Designation </strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput placeholder="Select Company"
                        value=""
                        onClick={checkCompany}
                      />
                    </CCol>
                  }
                  {companyNo ?
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Role</strong><sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <DropDownCommonNew
                        selectedOption={values.role}
                        isMulti={true}
                        url={`get_all_role?search=&companyNo=${companyNo}`}
                        id="roleId"
                        keyId="roleId"
                        keyName="roleName"
                        {...(isClientSubmitting && { color: values.role ? '' : '1px solid red' })}
                        handleInputChange={(values) => handleTypefuncitonRole(values)}
                      />
                    </CCol>
                    :
                    <CCol xs={3}>
                      <CFormLabel htmlFor="shiftTypeId">
                        <strong>Role </strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput placeholder="Select Company"
                        value=""
                        onClick={checkCompany}
                      />
                    </CCol>
                  }
                  {impDepertment ?
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Reporting Manager</strong>
                      </CFormLabel>
                      <DropDownEmployDesignation
                        selectedOption={values.reportingManger}
                        url={`get_all_reporting_manager?search&departmentNo=${impDepertment}`}
                        id="resourceId"
                        type="type"
                        keyId="resourceId"
                        keyName="firstName"
                        // keyNo="departmentNo"
                        handleInputChange={(values) => handleTypeFuncitonReport(values)}
                      />
                    </CCol>
                    :
                    <CCol xs={3}>
                      <CFormLabel htmlFor="shiftTypeId">
                        <strong>Reporting Manager</strong>
                        <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                      </CFormLabel>
                      <CFormInput placeholder="Select Department"
                        value=""
                        onClick={checkDepertment}
                      />
                    </CCol>
                  }
                </CRow>
                <br />
                <br />
                <p>Permanent Address <sup style={{ color: 'red', fontSize: '18px' }}>*</sup></p>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Door</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Door"
                      name="doorNo"
                      pattern="[A-Za-z0-9\s\-\/]+"
                      required
                      value={communicationaddress.doorNo}
                      onChange={handleInputsetcommunicationaddress}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Street</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Street"
                      name="street"
                      pattern="[A-Za-z0-9\s\-\/]+"
                      required
                      value={communicationaddress.street}
                      onChange={handleInputsetcommunicationaddress}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Locality</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Locality"
                      name="locality"
                      pattern="[A-Za-z0-9\s\-\/]+"
                      required
                      value={communicationaddress.locality}
                      onChange={handleInputsetcommunicationaddress}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Pincode</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Pincode"
                      name="zipCode"
                      pattern="^\d{6}$"
                      maxLength="6"
                      required
                      value={communicationaddress.zipCode}
                      onChange={handleInputsetcommunicationaddress}
                    />
                  </CCol>
                </CRow>
                <br />

                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Country</strong>
                    </CFormLabel>

                    <select
                      value={communicationaddress.countryId}
                      required
                      name="countryId"
                      onChange={handleInputsetcommunicationaddress}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select Country</option>
                      {countryOptions.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>State</strong>
                    </CFormLabel>
                    <select
                      value={communicationaddress.stateId}
                      required
                      name="stateId"
                      onChange={handleInputsetcommunicationaddress}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select State</option>
                      {stateOptionsForCommunication.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>City</strong>
                    </CFormLabel>
                    <select
                      value={communicationaddress.cityId}
                      required
                      name="cityId"
                      onChange={handleInputsetcommunicationaddress}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select City</option>
                      {cityOptionsForCommunication.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </CCol>
                  <CCol></CCol>
                </CRow>

                <br />
                <br />
                <CRow>
                  <CCol xs={3}>
                    <p>Communication Address <sup style={{ color: 'red', fontSize: '18px' }}>*</sup></p>
                  </CCol>
                  <CCol xs>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={values.isCommunication}
                        id="flexCheckDefault"
                        name="isCommunication"
                        onChange={handleInputChangeCheckbox}
                        required
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Is Communication Same?
                      </label>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Door</strong>
                    </CFormLabel>
                    <CFormInput
                      required
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Door"
                      name="doorNo"
                      pattern="[A-Za-z0-9\s\-\/]+"
                      value={permanentAddress.doorNo}
                      onChange={handleInputsetPermanentAddress}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Street</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Stree"
                      name="street"
                      pattern="[A-Za-z0-9\s\-\/]+"
                      value={permanentAddress.street}
                      onChange={handleInputsetPermanentAddress}
                      required
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Locality</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Locality"
                      name="locality"
                      pattern="[A-Za-z0-9\s\-\/]+"
                      value={permanentAddress.locality}
                      onChange={handleInputsetPermanentAddress}
                      required
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Pincode</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Pincode"
                      name="zipCode"
                      pattern="^\d{6}$"
                      maxLength="6"
                      value={permanentAddress.zipCode}
                      required
                      onChange={handleInputsetPermanentAddress}
                    />
                  </CCol>
                </CRow>

                <br />
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Country</strong>
                    </CFormLabel>
                    <select
                      value={permanentAddress.countryId}
                      required
                      name="countryId"
                      onChange={handleInputsetPermanentAddress}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select Country</option>
                      {countryOptions.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>State</strong>
                    </CFormLabel>
                    <select
                      value={permanentAddress.stateId}
                      required
                      name="stateId"
                      onChange={handleInputsetPermanentAddress}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select State</option>
                      {stateOptionsForPerm.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>City</strong>
                    </CFormLabel>
                    <select
                      value={permanentAddress.cityId}
                      required
                      name="cityId"
                      onChange={handleInputsetPermanentAddress}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select City</option>
                      {cityOptionsForPerm.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </CCol>
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
                  Save
                </CButton>
              )}
            </CCol>
          </CCardHeader>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className={styles.empSubHeader}>Family Information</h5>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={12}>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Fathers Name</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Father Name"
                      name="fathername"
                      value={values.mailid}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Mothers Name</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="contactNo"
                      placeholder="Mother Name"
                      name="mothername"
                      value={values.contact}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Marital Status</strong>
                    </CFormLabel>
                    <div className="form-check pt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Tick if Married
                      </label>
                    </div>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Spouse Name</strong>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="contactNo"
                      placeholder="Spouse Name"
                      name="spousename"
                      value={values.contact}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <br />
                </CRow>
              </CCol>
            </CForm>
          </CCardBody>

          <CCardHeader className="text-dark p-3 border border-0">
            <CCol md={12} className="d-flex justify-content-left">
              <CButton className={styles.btnColor} onClick={handleSubmit}>
                Save
              </CButton>
            </CCol>
          </CCardHeader>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EmployeeForm
