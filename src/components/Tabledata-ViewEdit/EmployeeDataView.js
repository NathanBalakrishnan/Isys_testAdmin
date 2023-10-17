import React, { useRef, useState, useEffect, } from 'react'
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
  CRow,
} from '@coreui/react'
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import EmployeNo from 'src/components/EmployeeForm-components/EmployeNo'
import DropDownEmployDesignation from 'src/components/EmployeeForm-components/DropDownEmployDesignation'
import Role from 'src/components/EmployeeForm-components/Role'
// import defalutProfilePic from '../../assets/images/profile-pic.png'
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import { style } from '@mui/system'
import Constants from 'src/constants/Constants'
import { accessFunctionNew } from 'src/api/apiConfig'
import defalutProfilePic from '../../assets/images/profile-pic.png'
import DropDownCommonNew from '../Common-components/DropDownCommonNew'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const EndPointImage = 'http://localhost:8080'

const EmployeeDataView = () => {
  const location = useLocation()
  const resourceNo = location.state.resourceNo
  const [employeeData, setEmployeeData] = useState({});
  const [resourceNum, setResourceNum] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const pathname = location.pathname;

  const ispageOne = pathname === "/forms/employee-data"
  const ispageTwo = pathname === "/forms/employee-data"

  async function fetchData(id) {
    axios
      .post(`http://localhost:8080/api/v1/resource_approved/${id}`, {
        headers: {
          Authorization: AccessToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("employ is approved")
          // setMessage('Data saved successfully')
          // console.log({ message })
          // console.log({ message })
          // setTimeout(function () {
          //   setMessage('')
          // }, 2000)
        }
      })
      .catch((error) => {
        console.log('errorcountry ' + error)
      })

  }




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/getByResourceNo/${resourceNo}`);
        const { data: addressData } = await axios.get('http://localhost:8080/api/v1/get_all_country?search=India', {
          headers: {
            Authorization: AccessToken,
          },
        })
        const permanentAddress = response.data.contactDetails.address[0]

        const communicationaddress = response.data.contactDetails.address[1]
        if (communicationaddress) {
          const [curCountry] = addressData.filter((country) => country.countryId === communicationaddress.countryId)
          setStateOptionsForPerm(getDropdownOptions(curCountry?.states ?? [], 'stateName', 'stateId'))

          const [curState] = (curCountry?.states ?? []).filter((state) => state.stateId === +communicationaddress.stateId)
          // console.log('curState....', curState)
          setCityOptionsForPerm(getDropdownOptions(curState?.cities ?? [], 'cityName', 'cityId'))

        }

        if (
          permanentAddress

        ) {
          const [curCountry] = addressData.filter((country) => country.countryId === permanentAddress.countryId)
          setStateOptionsForCommunication(
            getDropdownOptions(curCountry?.states ?? [], 'stateName', 'stateId'),
          )
          const [curState] = (curCountry?.states ?? []).filter((state) => state.stateId === permanentAddress.stateId)
          // console.log('curState', curState)
          setCityOptionsForCommunication(
            getDropdownOptions(curState?.cities ?? [], 'cityName', 'cityId'),
          )



        }



        // console.log("...addresData", addressData)

        setEmployeeData(response.data);
        console.log("...RESPO", response.data)
        setResourceNum(response.data.resourceNo)
        setValues({
          firstName: response.data.firstName,
          middleName: response.data.middleName,
          lastName: response.data.lastName,
          dateOfBirth: response.data.dateOfBirth,
          aadhaarNumber: response.data.aadhaarNumber,
          panNumber: response.data.panNumber,
          gender: response.data.gender,
          jointDate: response.data.jointDate,
          isCommunication: response.data.isCommunication,
          departmentId: {
            id: response.data.department.departmentId,
            value: response.data.department.departmentName,
            label: response.data.department.departmentName
          },
          companyId: {
            id: response.data.company.companyId,
            value: response.data.company.companyName,
            label: response.data.company.companyName
          },
          designationId: {
            id: response.data.designation.designationId,
            value: response.data.designation.designationName,
            label: response.data.designation.designationName
          },
          resourceTypeId: {
            id: response.data.resourceType.resourceTypeId,
            value: response.data.resourceType.resourceType,
            label: response.data.resourceType.resourceType
          },
          reportingManger: {
            id: response.data.reportingMangerId,
            value: response.data.reportingManger,
            label: response.data.reportingManger
          },
          role: response.data.roles.map(item => ({ id: item.roleId, value: item.roleName, label: item.roleName }))
        })
        //   reportingManger: {

        //   },
        setcontactDetails({
          contactId: response.data.contactDetails.contactId,
          primaryEmail: response.data.contactDetails.primaryEmail,
          alternatePhoneNumber: response.data.contactDetails.phoneNumber,
          phoneNumber: response.data.contactDetails.alternatePhoneNumber,
          secondaryEmail: response.data.contactDetails.secondaryEmail,
        })
        setcommunicationaddress(
          response.data.contactDetails.address[0]

        )
        setPermanentAddress(
          response.data.contactDetails.address[1]
        )
        setThumbnailUrl(response.data.profilePicturePath)

        // this one method
        // const blob = new Blob([{
        //   "name": "Screenshot (30).png",
        //   "type": "image/png",
        //   "size": 593113,
        //   "webkitRelativePath": "",
        //   "data": `${EndPointImage}`+response.data.profilePicturePath,
        // }], { type: 'image/png' });
        // const newfile = new File([blob], 'Screenshot (30).png', { type: 'image/png' });
        // setFile(`${EndPointImage}`+response.data.profilePicturePath)
        // setThumbnailUrl(URL.createObjectURL(newfile));
        // setFile((`${EndPointImage}`+response.data.profilePicturePath).blob())

        //This is another method
        // fetch(EndPointImage + response.data.profilePicturePath)
        // console.log('fullURL', EndPointImage + response.data.profilePicturePath)
        // .then(response => response.blob())
        // .then(data => {
        //   setFile(data);
        // })
        // .catch(error => {
        //   console.error(error);
        // });

        fetch(EndPointImage + response.data.profilePicturePath)
          .then(response => response.blob())
          .then(data => {
            const blob = new Blob([data], { type: 'image/jpeg' });
            setFile(blob);
          })
          .catch(error => {
            console.error(error);
          });
        setIsLoading(false)
      }
      catch (error) {
      }
    };
    fetchData();
  }, [resourceNo]);



  // console.log('respon..................', resourceNum)









  const getDropdownOptions = (array, keyLabel, keyValue) => {
    return array.map((item) => ({ label: item[keyLabel], value: item[keyValue] }))
  }
  const initialValuesone = {
    resourceId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    companyId: '',
    departmentId: '',
    profilePicturePath: "",
    designationId: '',
    aadhaarNumber: '',
    panNumber: '',
    dateOfBirth: '',
    jointDate: '',
    reportingManger: '',
    role: '',
    roles: [],
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
  const [isEdit, setIsEdit] = useState(true)
  const [resourceId, setResourceId] = useState("")

  const ResourceId = employeeData?.resourceId;
  // console.log('ResourceId', ResourceId)
  //   const ResourceId = 120;
  //   setValues({...values, resourceId: ResourceId})
  //   console.log('initialVlaues', values)

  const fileRefs = useRef()
  const [editImage, seteditImage] = useState(false)
  const [attach, seAttach] = useState(false)
  // console.log("...att", attach)
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log("Function kulla FILE", file)
    if (file.size > MAX_FILE_SIZE) {
      alert(`File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      // Clear the file input value
      event.target.value = "";
      return;
    }
    seAttach(true)
    setFile(file)
    setThumbnailUrl(URL.createObjectURL(file));
    seteditImage(true)
  }
  // console.log("thum...", thumbnailUrl)
  // console.log(".......file", file)
  // console.log('...file refs', fileRefs.current)
  // console.log("....isedit", isEdit)
  // console.log("...editimsg ", editImage)
  const [previousDate, setPreviousDate] = useState(null)
  useEffect(() => {
    const currentDate = new Date()
    const eighteenYearsAgo = currentDate.setFullYear(currentDate.getFullYear() - 18)
    setPreviousDate(new Date(eighteenYearsAgo).toISOString().split('T')[0])
  }, [])
  const handleSubmitCheck = (event) => {
    const form = event.currentTarget
    if (
      !values.firstName ||
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
      alert('please fill all the * required fields')
    } else if (!isValidAadhaarNumber(values.aadhaarNumber)) {
      event.preventDefault()
      event.stopPropagation()
      setIsProviderSubmitting(true)
      setIsClientSubmitting(true)
      setValidated(false)
      window.alert('Please provide a valid 12-digit Aadhaar number')
      // console.log('NOT SUBMITTED')
    } else if (!isValidPanNumber(values.panNumber)) {
      event.preventDefault()
      event.stopPropagation()
      setIsProviderSubmitting(true)
      setIsClientSubmitting(true)
      setValidated(false)
      window.alert('Please provide a valid 10-digit PAN number')
      // console.log('NOT SUBMITTED')
    } else if (!isValidAlterMobileNumber(contactDetails.alternatePhoneNumber)) {
      event.preventDefault()
      event.stopPropagation()
      setIsProviderSubmitting(true)
      setIsClientSubmitting(true)
      setValidated(false)
      window.alert('Please provide a valid 10-digit Mobile number')
      // console.log('NOT SUBMITTED')
    } else if (form.checkValidity() === false) {
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
    // setValidated(true)
  }
  //   console.log('values selected', values)
  const isValidAadhaarNumber = (aadhaarNumber) => {
    const aadhaarNumberRegex = /^\d{12}$/
    if (aadhaarNumberRegex.test(aadhaarNumber)) {
      return true
    } else {
      return false
    }
  }

  const isValidPanNumber = (panNumber) => {
    const panNumberRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/
    if (panNumberRegex.test(panNumber)) {
      return true
    } else {
      return false
    }
  }

  const isValidAlterMobileNumber = (alternatePhoneNumber) => {
    const alterMobileNumberRegex = /^\d{10}$/
    if (alterMobileNumberRegex.test(alternatePhoneNumber)) {
      return true
    } else {
      return false
    }
  }

  {
    // console.log('validated values', validated)
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
          // console.log("...isEdie", isEdit)
          setCountryOptions(getDropdownOptions(finalData, 'countryName', 'countryId'))
        })
        .catch((error) => {
          // console.log('errorcountry ' + error)
        })
    }
    fetchData()
  }, [])

  const fileRef = useRef()
  let handleSubmit = async (e) => {

    const finalData = {
      ...values,
      aadhaarNumber: +values.aadhaarNumber,
      // destinationId: +values.destinationId,
      designationId: values.designationId.id,
      companyId: values.companyId.id,
      departmentId: values.departmentId.id,
      resourceTypeId: +values.resourceTypeId.id,
      reportingManger: (values.reportingManger ? (values.reportingManger.id + '') : ''),
      role: values.role.filter(item => item.id).map(item => item.id + '').join(","),
      resourceNo: resourceNo,
      resourceId: employeeData.resourceId,
      contactDetails: {
        ...contactDetails,
        address: [
          {
            ...permanentAddress,
            addressId: employeeData.contactDetails.address[0].addressId,
            countryId: +permanentAddress.countryId,
            stateId: +permanentAddress.stateId,
            cityId: +permanentAddress.cityId,
          },
          {
            ...communicationaddress,
            addressId: employeeData.contactDetails.address[1].addressId,
            countryId: +communicationaddress.countryId,
            stateId: +communicationaddress.stateId,
            cityId: +communicationaddress.cityId,
          },
        ],
      },
    }
    // {console.log('reporting-manager-VALUES-ONLY', (values.reportingManger))}
    // {console.log('reporting-manager', (values.reportingManger ? (values.reportingManger.id+'') : ''))}
    // console.log('final-data-sending', finalData)
    const json = JSON.stringify(finalData)
    const blob = new Blob([json], {
      type: 'application/*+json',
    })
    let AccessToken = localStorage.getItem('AccessToken')
    let fullFormData = new FormData()
    fullFormData.append('resource', blob)
    fullFormData.append('multipartFile', file)
    try {
      let res = await fetch(`http://localhost:8080/api/v1/update_resource/${employeeData?.resourceId}`, {
        method: 'PUT',
        headers: {
          Authorization: AccessToken,
        },
        body: fullFormData,
        ContentType: 'multipart/mixed',
      })
      if (res.status == 200) {
        setMessage('Data saved successfully')
        setTimeout(function () {
          setMessage('')
          setValidated(false)
          setValues(initialValuesone)
          setcontactDetails(initialContactDetails)
          setPermanentAddress(initialAddressValues)
          setcommunicationaddress(initialAddressValues)
          setFile('')
          seAttach(false)
          seteditImage(false)
          fileRefs.current.value = null;
          fileRefs.current = null;
          // if (thumbnailUrl) {
          //   URL.revokeObjectURL(thumbnailUrl)
          // // }
          // setThumbnailUrl('')
          setIsProviderSubmitting(false)
          setIsClientSubmitting(false)
          pageRedirect()
        }, 2000)
      } else {
        // console.log('final-data-sending', finalData)
        setMessage('')
        // console.log('Some error occured')
        window.alert('Please provide all the valid inputs')
      }
    } catch (err) { }
  }
  // console.log('pre', permanentAddress)
  function pageRedirect() {
    window.location.href = '/#/forms/search-employee'
  }
  function handleInputChange(e) {
    const { name, value } = e.target
    if (name !== 'aadhaarNumber') {
      setValues({
        ...values,
        [name]: value,
      })
      return
    }
    if (!/^\d+$/.test(value)) {
      return
    }
    setValues({
      ...values,
      [name]: value,
    })
  }
  // console.log('valuee..', values)
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

  // console.log('comm', communicationaddress)
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
        // console.log('curState....', curState)
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
        // console.log('Called')
        const [curCountry] = data.filter(
          (country) => country.countryId === +communicationaddress.countryId,
        )
        const [curState] = (curCountry?.states ?? []).filter((state) => state.stateId === +value)
        // console.log('curState', curState)
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

  function handleTypeFuncitonDeprt(values) {
    setValues((prevState) => ({
      ...prevState,
      departmentId: values,
    }))
  }
  function handleTypefuncitonRole(values) {
    setValues((prevState) => ({
      ...prevState,
      role: values,
    }))
    // console.log('ROLE VALprop value', values)
  }

  function handleTypeFuncitonCompany(values) {
    setValues((prevState) => ({
      ...prevState,
      companyId: values,
    }))
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
  function handleInputsetResourceId(id) {
    setResourceId(id)
  }
  console.log('employeeData', employeeData)

  return (
    <CRow className="p-3">
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className={styles.empSubHeader}>Personal Information</h5>
            <p>Resource No: {resourceNo}</p>
            {isLoading ? (
              <div className={styles.spiner}>
                <FontAwesomeIcon icon={faSpinner} spin />
                <p>Loading</p>
              </div>
            ) : (
              ''
            )}
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
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>First Name</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      <strong>Middle Name</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      <strong>Last Name</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                    <img
                      src={isEdit && editImage ? URL.createObjectURL(file) :
                        attach ?
                          `${thumbnailUrl}` :
                          `${EndPointImage}${thumbnailUrl}` || 'https://via.placeholder.com/200x200'}
                      style={{
                        width: '75%',
                        height: '20vh',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: '10%',

                      }}
                      alt="Selected Image"
                    />
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="inputPassword4">
                      <strong>Date of Birth</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      <strong>Aadhaar No</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      <strong>Pan Card No</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder="Pan No"
                      name="panNumber"
                      pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                      maxLength="10"
                      value={values.panNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="resourceImage">
                      <strong>Employee Image</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <input

                      disabled={isEdit}
                      // style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                      ref={fileRefs}
                      hidden
                      onChange={handleFileChange}
                      className="form-control"
                      type="file"
                      accept="image/*"
                      id="employeeImage"
                      placeholder="User Image"
                      required
                    // value={thumbnailUrl}
                    />
                    <CFormLabel htmlFor="employeeImage">
                      <img src="https://icons.veryicon.com/png/o/miscellaneous/headhunter-front-page/upload-resume.png" alt=""
                        height="50" />
                    </CFormLabel>
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Gender</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <select
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      <strong>Joining Date</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      <strong>Email ID</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>ResourceType</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <DropDownEmployDesignation
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      <strong>Contact No</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CCol className={styles.iconAlignment}>
                      <FontAwesomeIcon className={styles.iconStyles} icon={faPhoneFlip} />
                      <CFormInput
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                    <CFormLabel htmlFor="employeNo">
                      <strong>Employee No</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      style={{ opacity: '0.7' }}
                      type="text"
                      id="employeNo"
                      disabled
                      placeholder="Employee No"
                      name="employeNo"
                      value={resourceNum}
                    />
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Designation</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>

                    <DropDownEmployDesignation
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                      selectedOption={values.designationId}
                      url="get_all_designation?search"
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
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Role</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    {/* <Role
                      url="get_all_role?search"
                      id="roleId"
                      type="type"
                      isMulti
                      tooltipFeedback
                      aria-describedby="validationTooltip04Feedback"
                      handleInputChange={handleTypefuncitonRole}
                      {...(isProviderSubmitting && { color: values.role ? '' : '1px solid red' })}
                    /> */}
                    <DropDownCommonNew
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                      selectedOption={values.role}
                      isMulti={true}
                      url="get_all_role?search"
                      id="roleId"
                      keyId="roleId"
                      keyName="roleName"
                      {...(isClientSubmitting && { color: values.role ? '' : '1px solid red' })}
                      handleInputChange={(values) => handleTypefuncitonRole(values)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Reporting Manager</strong>
                    </CFormLabel>
                    <DropDownEmployDesignation
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                      selectedOption={values.reportingManger}
                      url="api/v1/get_resource_all?search"
                      id="resourceId"
                      type="type"
                      keyId="resourceId"
                      keyName="firstName"
                      handleInputChange={(values) => handleTypeFuncitonReport(values)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Company</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>

                    <DropDownEmployDesignation
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                      url="api/v1/get_all_company?search"
                      id="companyId"
                      selectedOption={values.companyId}
                      type="type"
                      keyId="companyId"
                      keyName="companyName"
                      {...(isClientSubmitting && {
                        color: values.companyId ? '' : '1px solid red',
                      })}
                      handleInputChange={(values) => handleTypeFuncitonCompany(values)}
                    />
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                      <strong>Department</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>

                    <DropDownEmployDesignation
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                      selectedOption={values.departmentId}
                      url="get_all_department?search"
                      id="departmentId"
                      type="type"
                      keyId="departmentId"
                      keyName="departmentName"
                      handleInputChange={(values) => handleTypeFuncitonDeprt(values)}
                      {...(isClientSubmitting && {
                        color: values.departmentId ? '' : '1px solid red',
                      })}
                    />
                  </CCol>
                  <CCol xs></CCol>
                  <CCol xs></CCol>
                  <CCol xs></CCol>
                </CRow>
                <br />
                <CRow>
                  <p>Permanent Address</p>
                  <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        <strong>Door</strong>
                      </CFormLabel>
                      <CFormInput
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      {/* {console.log('..commnicat', communicationaddress)
                      }
                      {console.log('..perment', permanentAddress)
                      } */}
                      <select
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                        value={communicationaddress.countryId}
                        required
                        name="countryId"
                        onChange={handleInputsetcommunicationaddress}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="">Select Country</option>
                        {countryOptions.map((country) => (
                          <option key={country.value} value={country.value} selected={country.value === employeeData?.contactDetails?.address[0]?.countryId}>
                            {country.label}
                          </option>
                        ))}
                        {/* {console.log('country options', countryOptions)}
                        {console.log('country stateID', countryOptions.countryId)} */}
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>State</strong>
                      </CFormLabel>
                      <select
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                        value={communicationaddress.stateId}
                        required
                        name="stateId"
                        onChange={handleInputsetcommunicationaddress}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="">Select State</option>
                        {stateOptionsForCommunication.map((state) => (
                          <option key={state.value} value={state.value} >
                            {state.label}
                          </option>
                        ))}
                        {/* {console.log('state options', stateOptionsForCommunication)}
                        {console.log('state stateID', stateOptionsForCommunication.stateId)} */}
                      </select>
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>City</strong>
                      </CFormLabel>
                      <select
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                </CRow>
                <br />
                <br />
                <CRow>
                  <CCol xs={3}>
                    <p>Communication Address</p>
                    <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                  </CCol>
                  <CCol xs>
                    <div className="form-check">
                      <input
                        disabled={isEdit}
                        style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
                      disabled={isEdit}
                      style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
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
              <Link to={'/forms/search-employee'}>
                <CButton className={styles.btnColor}>
                  <FontAwesomeIcon icon={faArrowLeft} />&nbsp; Back
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
                  style={isEdit ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' } : {}}
                  className={styles.btnColor} onClick={handleSubmitCheck}>
                  Save
                </CButton>
              )}
              <div className={styles.btnPadding}></div>
              {accessFunctionNew('Resource', 'update') ?
                <CButton className={styles.btnColor} onClick={() => setIsEdit(!isEdit)}>
                  Edit &nbsp;<FontAwesomeIcon icon={faEdit} />
                </CButton>
                : ''
              }

              <div className={styles.btnPadding}></div>



              {ispageOne && <CButton className={styles.btnColor} onClick={() => fetchData(employeeData.resourceId)}>
                Approve
              </CButton>}
              {ispageTwo && <CButton hidden className={styles.btnColor} onClick={() => fetchData(employeeData.resourceId)}>
                Approve
              </CButton>}

              <div ></div>

            </CCol>

          </CCardHeader>
        </CCard>
        {/* <CCard className="mb-4">
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
        </CCard> */}
      </CCol>
    </CRow>
  )
}

export default EmployeeDataView

