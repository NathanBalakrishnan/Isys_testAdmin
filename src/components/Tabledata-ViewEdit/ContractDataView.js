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
  CFormFloating,
} from '@coreui/react'
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import DropDownCommon from '../Common-components/DropDownCommon'
import Constants from 'src/constants/Constants'
import { accessFunctionNew } from 'src/api/apiConfig'
import defalutProfilePic from '../../assets/images/profile-pic.png'

const EndPointImage = 'http://localhost:8080'

const ContractDataView = () => {
  const initialValues = {
    name: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    createdBy: 'xxx',
    updatedBy: 'yyyy',
    termsAndCondition: '',
    contractTypeId: '',
    companyId: '',
    clientId: '',
  }

  const location = useLocation()
  const contractNo = location.state.contractNo
  const [contractData, setContractData] = useState({})
  const [isEdit, setIsEdit] = useState(true)

  const [isTypeSubmitting, setIsTypeSubmitting] = useState(false)
  const [isProviderSubmitting, setIsProviderSubmitting] = useState(false)
  const [isClientSubmitting, setIsClientSubmitting] = useState(false)
  const [validated, setValidated] = useState(false)
  const [file, setFile] = useState('')
  const [values, setValues] = useState(initialValues)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/getByContractId/${contractNo}`,
        )
        setContractData(response.data)
        // setResourceNum(response.data.resourceNo)
        setValues({
          name: response.data.name,
          description: response.data.description,
          status: response.data.status,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          termsAndCondition: response.data.termsAndCondition,

          contractTypeId: {
            id: response.data.contractType.contractTypeId,
            value: response.data.contractType.type,
            label: response.data.contractType.type,
          },
          companyId: {
            id: response.data.company.companyId,
            value: response.data.company.companyName,
            label: response.data.company.companyName,
          },
          clientId: {
            id: response.data.client.clientId,
            value: response.data.client.clientName,
            label: response.data.client.clientName,
          },

        })
        // setThumbnailUrl(`/downloadFile/${response.data.filePath}`)
        setThumbnailUrl(response.data.filePath)
        // setThumbnailUrl(response.data.filePath)
        fetch(EndPointImage + response.data.filePath)
          .then(response => response.blob())
          .then(data => {
            const blob = new Blob([data], { type: 'image/jpeg' });
            setFile(blob);
          })
          .catch(error => {
            console.error(error);
        });
      
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [contractNo])
  // console.log('contracts data', contractData)
  // console.log('created FILE-PATH', Constants.baseURL + contractData.filePath)
  // console.log('contracts FILE', file)

  const finalData = {
    ...values,
    contractNo: contractData.contractNo,
    contractId: contractData.contractId,
    contractTypeId: values.contractTypeId.id,
    companyId: values.companyId.id,
    clientId: values.clientId.id,
    createdBy: 'xxx',
    updatedBy: 'yyyy',
  }
  // console.log('finalData--Values', finalData)
  const json = JSON.stringify(finalData)
  const blob = new Blob([json], {
    type: 'application/*+json',
  })

  let AccessToken = localStorage.getItem('AccessToken')
  let fullFormData = new FormData()
  fullFormData.append('contractDto', blob)
  fullFormData.append('file', file)

  const handleSubmitCheck = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!values.name || 
      !values.status ||
       !values.startDate || 
       !values.endDate) {
      alert('please fill all the * required fields')
    } else if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
      setIsTypeSubmitting(true)
      setIsProviderSubmitting(true)
      setIsClientSubmitting(true)
    } else {
      setIsTypeSubmitting(true)
      setIsProviderSubmitting(true)
      setIsClientSubmitting(true)
      setValidated(true)
      handleSubmit(event)
    }
    setValidated(true)
    setIsTypeSubmitting(true)
    setIsProviderSubmitting(true)
    setIsClientSubmitting(true)
  }
  let handleSubmit = async (e) => {
    try {
      let res = await fetch('http://localhost:8080/api/v1/update_contract', {
        method: 'PUT',
        headers: {
          Authorization: AccessToken,
        },
        body: fullFormData,
        ContentType: 'multipart/mixed',
      })
      if (res.status === 200) {
        setIsTypeSubmitting(false)
        setIsProviderSubmitting(false)
        setIsClientSubmitting(false)
        setValidated(false)
        setValues(initialValues)
        setFile('');
        seAttach(false)
        seteditImage(false)
        fileRefs.current.value = null;
        fileRefs.current = null;
        // if (thumbnailUrl) {
        //   URL.revokeObjectURL(thumbnailUrl);
        // }
        // setThumbnailUrl('');
        setMessage('Data saved successfully')
        setTimeout(function () {
          setMessage('')
          pageRedirect()
        }, 2000)
      } else {
        setMessage('')
        // console.log('Some error occured')
        window.alert('Please provide all the valid inputs')
      }
    } catch (err) {
      // console.log(err)
    }
  }
  function pageRedirect() {
    window.location.href = '/#/forms/search-contract'
  }
  function handleInputChange(e) {
    const { name, value } = e.target
    let newValue = value.replace(/[^a-zA-Z0-9-\s]/g, '')
    if (newValue !== value) {
      alert('Should not contain symbols')
    }
    setValues({
      ...values,
      [name]: newValue,
    })
    if (name === 'endDate' && values.startDate === newValue) {
      alert('Start date and end date should not be the same');
      setValues({
        ...values,
        [name]: '',
      });
    }
    if (name === 'startDate' && values.endDate) {
      let startDate = new Date(newValue);
      let endDate = new Date(values.endDate);
      if (startDate > endDate) {
        alert('Start date should not be greater than end date');
        setValues({
          ...values,
          [name]: '',
        });
      }
    }
    if (name === 'endDate' && values.startDate) {
      let endDate = new Date(newValue);
      let startDate = new Date(values.startDate);
      if (startDate > endDate) {
        alert('End date should be greater than start date');
        setValues({
          ...values,
          [name]: '',
        });
      }
    }
  }
  function handleTypeFunciton(values) {
    console.log('contractTypeId', values)
    setValues((prevState) => ({
      ...prevState,
      contractTypeId: values,
    }))
  }
  function handleTypeFunciton2(values) {
    setValues((prevState) => ({
      ...prevState,
      companyId: values,
    }))
  }
  function handleTypeFunciton3(values) {
    setValues((prevState) => ({
      ...prevState,
      clientId: values,
    }))
  }
  const fileRefs = useRef()
  const [editImage, seteditImage] = useState(false)
  const [attach, seAttach] = useState(false)
console.log("...att",attach)
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
    seAttach(true)
    setFile(file);
    setThumbnailUrl(URL.createObjectURL(file));
    seteditImage(true)
  }
  console.log("thum...",thumbnailUrl)
  console.log(".......file", file)
  console.log(".......file",file)
  console.log("....isedit",isEdit)
  console.log("...editimsg ",editImage)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className={styles.empSubHeader}>Contract Form</h5>
            <p>Contract Id: {contractData.contractId}</p>
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
                  <CCol xs={6}>
                    <CFormLabel htmlFor="name">
                      <strong>Title</strong>
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
                      id="name"
                      title="Enter only letter."
                      pattern="[a-zA-Z0-9-\s]+"
                      placeholder="Title"
                      name="name"
                      required
                      value={values.name}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol xs>
                  <img
                        src={isEdit && editImage?URL.createObjectURL(file):
                          attach ? 
                          `${thumbnailUrl}`:
                        `${EndPointImage}${thumbnailUrl}` || 'https://via.placeholder.com/200x200'}
                        // src={isEdit && editImage?URL.createObjectURL(file):`${EndPointImage}${thumbnailUrl}`}
                        style={{
                          width: '30%',
                          height: '20vh',
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: '10%',

                        }}
                        alt="Selected Image"
                      />
                    {/* {thumbnailUrl ? (
                      <img
                        src={`${EndPointImage}${thumbnailUrl}`}
                        style={{
                          width: '30%',
                          height: '20vh',
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: '10%',

                        }}
                        alt="Selected Image"
                      />
                    ) : (
                      <img

                      
                        // src={thumbnailUrl}

                        style={{
                          width: '30%',
                          height: '20vh',
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: '10%',

                        }}
                        alt="Selected Image"
                      />
                    )}
                   <button onClick={}>Upload</button> */}
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="ContractNo">
                      <strong>Contract No</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      style={{ opacity: '0.7' }}
                      type="text"
                      id="contractNo"
                      disabled
                      placeholder="Contract No"
                      name="contractNo"
                      value={contractData.contractNo}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="contractTypeId">
                      <strong>Type</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <DropDownCommon
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      selectedOption={values.contractTypeId}
                      isMulti={false}
                      url="getAllContractType?search"
                      id="contractTypeId"
                      keyId="contractTypeId"
                      keyName="type"
                      {...(values.contractTypeId && {
                        color: values.contractTypeId ? '' : '1px solid red',
                      })}
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
                      aria-label="select example"
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
                  <CCol xs>
                    <CFormLabel htmlFor="resourceImage">
                      <strong>Attachement</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      hidden
                      ref={fileRefs}
                      onChange={handleFileChange}
                      type="file"
                      accept="image/*"
                      id="attachmentImg"
                      placeholder="User Image"
                      name="attachmentImg"
                      // required
                    />
              <CFormLabel htmlFor="attachmentImg">
                    <img src="https://icons.veryicon.com/png/o/miscellaneous/headhunter-front-page/upload-resume.png" alt=""
                    height="50" />
                    </CFormLabel>
                  </CCol>
                  {/* <p>imag here</p>
                  <input type="image" src={'http://localhost:8080/downloadFile/IDPWfXUH'} onChange={(e)=>setFile(e.target.value)}/>
                  <img src="http://localhost:8080/downloadFile/IDPWfXUH" /> */}

                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="companyId">
                      <strong>Provider</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <DropDownCommon
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
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
                      handleInputChange={(values) => handleTypeFunciton2(values)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="clientId">
                      <strong>Client</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <DropDownCommon
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      selectedOption={values.clientId}
                      isMulti={false}
                      url="get_all_client?search"
                      id="clientId"
                      keyId="clientId"
                      keyName="clientName"
                      {...(values.clientId && {
                        color: values.clientId ? '' : '1px solid red',
                      })}
                      handleInputChange={(values) => handleTypeFunciton3(values)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="startDate">
                      <strong>Start Date:</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={values.startDate}
                      required
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="endDate">
                      <strong>End Date:</strong>
                      <sup style={{ color: 'red', fontSize: '18px' }}>*</sup>
                    </CFormLabel>
                    <CFormInput
                      disabled={isEdit}
                      style={
                        isEdit
                          ? { color: '#999999', backgroundColor: '#f2f2f2', borderColor: '#e6e6e6' }
                          : {}
                      }
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={values.endDate}
                      required
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                  </CCol>
                </CRow>
                <br></br>
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="description">
                      <strong>Brief Description</strong>
                    </CFormLabel>
                    <CFormFloating>
                      <CFormTextarea
                        disabled={isEdit}
                        style={
                          isEdit
                            ? {
                              color: '#999999',
                              backgroundColor: '#f2f2f2',
                              borderColor: '#e6e6e6',
                              height: '100px',
                            }
                            : { height: '100px' }
                        }
                        placeholder="Leave a comment here"
                        id="description"
                        required
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                      ></CFormTextarea>
                      <CFormLabel htmlFor="floatingTextarea2">Enter...</CFormLabel>
                    </CFormFloating>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="termsAndCondition">
                      <strong>Terms and Conditions</strong>
                    </CFormLabel>
                    <CFormFloating>
                      <CFormTextarea
                        disabled={isEdit}
                        style={
                          isEdit
                            ? {
                              color: '#999999',
                              backgroundColor: '#f2f2f2',
                              borderColor: '#e6e6e6',
                              height: '100px',
                            }
                            : { height: '100px' }
                        }
                        required
                        placeholder="Leave a comment here"
                        id="termsAndCondition"
                        name="termsAndCondition"
                        value={values.termsAndCondition}
                        onChange={handleInputChange}
                      ></CFormTextarea>
                      <CFormLabel htmlFor="floatingTextarea2">Enter...</CFormLabel>
                    </CFormFloating>
                  </CCol>
                </CRow>
              </CCol>
            </CForm>
          </CCardBody>
          <CCardHeader className="text-dark p-3 border border-0">
            <CCol md={12} className="d-flex justify-content-left">
              <Link to={'/forms/search-contract'}>
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
              {accessFunctionNew('Contract', 'update') ?
                <CButton className={styles.btnColor} onClick={() => setIsEdit(!isEdit)}>
                  Edit &nbsp;
                  <FontAwesomeIcon icon={faEdit} />
                </CButton>
                : ''
              }
            </CCol>
          </CCardHeader>
          {/* <div className="message">{message ? <p>{message}</p> : <p>this is msg form</p>}</div> */}
        </CCard>
      </CCol>
      
    </CRow>



  )
}

export default ContractDataView
