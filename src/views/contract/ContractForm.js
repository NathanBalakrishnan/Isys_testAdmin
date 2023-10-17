import React, { useState, useRef } from 'react'
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
import GetLastid from 'src/components/formcomponents/GetLastid'
import DropDownCommon from 'src/components/Common-components/DropDownCommon'
import defalutProfilePic from '../../assets/images/profile-pic.png'
const ContractForm = () => {
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
    const [isTypeSubmitting, setIsTypeSubmitting] = useState(false);
    const [isProviderSubmitting, setIsProviderSubmitting] = useState(false);
    const [isClientSubmitting, setIsClientSubmitting] = useState(false);
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState("")
    const [values, setValues] = useState(initialValues)
    const [message, setMessage] = useState("");


    const finalData = {
    ...values,
    contractTypeId: values.contractTypeId.id,
    companyId: values.companyId.id,
    clientId: values.clientId.id,
    }
    console.log('finalData--Values', finalData)
    const json = JSON.stringify(finalData)
    const blob = new Blob([json], {
        type: 'application/*+json',
    })

    let AccessToken = localStorage.getItem("AccessToken");
    let fullFormData = new FormData();
    fullFormData.append("contract", blob)
    fullFormData.append("file", file);

    const handleSubmitCheck = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log('form event', form);
        console.log('form.checkValidity', form.checkValidity());
        if( !values.name || 
            !values.status || 
            !values.startDate ||
            !values.endDate) {
            alert("please fill all the * required fields");
        }
        else if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            setIsTypeSubmitting(true);
            setIsProviderSubmitting(true);
            setIsClientSubmitting(true);
            console.log('NTOT-submitted', isTypeSubmitting);
        }
        else  {
            setIsTypeSubmitting(true);
            setIsProviderSubmitting(true);
            setIsClientSubmitting(true);
            setValidated(true);
            handleSubmit(event);
            console.log('submitted');
        }
        setValidated(true)
        setIsTypeSubmitting(true);
        setIsProviderSubmitting(true);
        setIsClientSubmitting(true);
    }

    console.log('validated', validated)

    let handleSubmit = async (e) => {
        try {
            let res = await fetch("http://localhost:8080/api/v1/create_contract", {
                method: "POST",
                headers: {
                    "Authorization": AccessToken, 
                }, 
                body: fullFormData, 
                ContentType: 'multipart/mixed'
            });
            if (res.status === 200) {
                setIsTypeSubmitting(false);
                setIsProviderSubmitting(false);
                setIsClientSubmitting(false);
                setValidated(false)
                setValues(initialValues);
                setFile('');
                fileRefs.current.value = null;
                fileRefs.current = null;
                if (thumbnailUrl) {
                  URL.revokeObjectURL(thumbnailUrl);
                }
                setThumbnailUrl('');
                setMessage("Data saved successfully");
                console.log({message});
                console.log({message});
                setTimeout(function() {
                    setMessage("");
                }, 2000);
            } else {
                setMessage("");
                console.log('Some error occured');
                window.alert('Please provide all the valid inputs')
            }
        } catch (err) {
            console.log(err);
        }
    };
    function handleInputChange(e) {
        const { name, value } = e.target;
        let newValue = value.replace(/[^a-zA-Z0-9-\s]/g, '');
        if(newValue !== value) {
        alert("Should not contain symbols");
        }
        setValues({
        ...values,
        [name]: newValue,
        });
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
        setValues(prevState => ({
            ...prevState,
            contractTypeId: values,
        }))
    }
    function handleTypeFunciton2(values) {
        setValues(prevState => ({
            ...prevState,
            companyId: values,
        }))
    }
    function handleTypeFunciton3(values) {
        setValues(prevState => ({
            ...prevState,
            clientId: values,
        }))
    }
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
  return (
    
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-dark">
            <h5 className={styles.empSubHeader}>Contract Form</h5>
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
                                <strong>Title</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                            </CFormLabel>
                            <CFormInput
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
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
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
                        src={defalutProfilePic}
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
                  </CCol>
                    </CRow>
                    <br></br>
                    <CRow>
                        <CCol xs>
                            <CFormLabel htmlFor="ContractNo">
                                <strong>Contract No</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                            </CFormLabel>
                            <GetLastid
                                url= "get_last_contract_no"
                            />
                        </CCol>
                        <CCol xs>
                            <CFormLabel htmlFor="contractTypeId">
                                <strong>Type</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                            </CFormLabel>
                            <DropDownCommon
                                selectedOption={values.contractTypeId}
                                isMulti={false}
                                url="getAllContractType?search"
                                id="contractTypeId"
                                type="type"
                                keyId="contractTypeId"
                                keyName="type"
                                {...(isTypeSubmitting && { color: values.contractTypeId ? '' : '1px solid red' })}
                                handleInputChange={(values) => handleTypeFunciton(values)}
                            />
                            {console.log('dropdowninps', isTypeSubmitting )}
                        </CCol>
                        <CCol xs>
                            <CFormLabel htmlFor="status">
                                <strong>Status</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                            </CFormLabel>
                            <CFormSelect
                                id="status"
                                name="status"
                                value={values.status}
                                aria-label="select example"
                                required
                                onChange={handleInputChange}
                            >
                                <option selected="" value="">Select Status</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </CFormSelect>
                        </CCol>
                        <CCol xs>
                            <CFormLabel htmlFor="resourceImage">
                                <strong>Attachement</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                            </CFormLabel>
                            <CFormInput
                                ref={fileRefs}
                                onChange={handleFileChange}
                                type="file"
                                accept="image/*"
                                id="attachmentImg"
                                placeholder="User Image"
                                name="attachmentImg"
                                required
                            />
                        </CCol>
                    </CRow>
                    <br></br>
                    <CRow>
                        <CCol xs>
                            <CFormLabel htmlFor="companyId">
                                <strong>Provider</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                            </CFormLabel>
                            <DropDownCommon
                                selectedOption={values.companyId}
                                isMulti={false}
                                url="get_all_company?search"
                                id="companyId"
                                keyId="companyId"
                                keyName="companyName"
                                {...(isProviderSubmitting && { color: values.companyId ? '' : '1px solid red' })}
                                handleInputChange={(values) => handleTypeFunciton2(values)}
                            />
                        </CCol>
                        <CCol xs>
                            <CFormLabel htmlFor="clientId">
                                <strong>Client</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                            </CFormLabel>
                            <DropDownCommon
                                selectedOption={values.clientId}
                                isMulti={false}
                                url="get_all_client?search"
                                id="clientId"
                                keyId="clientId"
                                keyName="clientName"
                                {...(isClientSubmitting && { color: values.clientId ? '' : '1px solid red' })}
                                handleInputChange={(values) => handleTypeFunciton3(values)}
                            />
                        </CCol>
                        <CCol xs>
                            <CFormLabel htmlFor="startDate">
                                <strong>Start Date:</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                            </CFormLabel>
                            <CFormInput
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={values.startDate}
                                required
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}
                            />
                        </CCol>
                        <CCol xs>
                            <CFormLabel htmlFor="endDate">
                                <strong>End Date:</strong><sup style={{color: 'red', fontSize: '18px'}}>*</sup>
                            </CFormLabel>
                            <CFormInput
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={values.endDate}
                                required
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    e.preventDefault();
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
                                placeholder="Leave a comment here"
                                id="description"
                                required
                                style={{ height: '100px' }}
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
                                required
                                placeholder="Leave a comment here"
                                id="termsAndCondition"
                                style={{ height: '100px' }}
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
                {message ? 
                    <CButton disabled className={styles.btnColorDisabled}>
                        Data Saved &#10004;
                    </CButton> 
                    : 
                    <CButton className={styles.btnColor} onClick={handleSubmitCheck}>
                        Save
                    </CButton>
                }
            </CCol>
          </CCardHeader>
          {/* <div className="message">{message ? <p>{message}</p> : <p>this is msg form</p>}</div> */}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ContractForm