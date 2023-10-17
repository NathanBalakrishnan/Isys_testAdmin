import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CFormLabel,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CFormCheck,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilLockUnlocked, cilUser } from '@coreui/icons'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginStyles from '../../../components/Styles/LoginStyles/LoginStyles.module.css'
import {apiConfig} from '../../../api/apiConfig'
import { useDispatch } from 'react-redux';

const EmployeeAppLogin = () => {

  const dispatch = useDispatch()

  const [emailId, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (emailId && passWord) {
      dispatch(apiConfig(emailId, passWord))
    }
    else {
      console.log('login failed')
      alert('Please enter Username and Password')
    }
  }
  const handleEmailId = (e) => {
    setUserName(e.target.value)
    console.log('usrname', emailId)
  }
  const handlePassWord = (e) => {
    setPassWord(e.target.value)
    console.log('pasword', passWord)
  }
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  // useEffect(()=>{
  //   localStorage.setItem('userName','superadmin')
  //   localStorage.setItem('passWord','admin@123')
  // },[])
  return (
    <div className=" d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol className="col-md-12">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <p className="col-md-12">Sign In To Your Session</p>
                    <div>
                      <CCol md={12}>
                        <CFormLabel htmlFor="validationDefaultUsername">Email Id</CFormLabel>
                        <CInputGroup>
                          <CFormInput
                            type="text"
                            id="validationDefaultUsername"
                            defaultValue=""
                            onChange={handleEmailId}
                            aria-describedby="inputGroupPrepend02"
                            required
                          />{' '}
                          <CInputGroupText id="inputGroupPrepend02">
                            {' '}
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                        </CInputGroup>
                      </CCol>
                    </div>
                    <br />
                    <div>
                    <CCol md={12}>
                      <CFormLabel htmlFor="validationDefaultPassword">Password</CFormLabel>
                      <CInputGroup>
                        <CFormInput
                          type={showPassword ? 'text' : 'password'}
                          id="validationDefaultPassword"
                          defaultValue=""
                          onChange={handlePassWord}
                          aria-describedby="inputGroupPrepend02"
                          required
                        />
                        <CInputGroupText onClick={handleTogglePassword} style={{ cursor: 'pointer' }}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </CInputGroupText>
                      </CInputGroup>
                    </CCol>
                    </div>
                    <br />
                    <div>
                      <CCol xs={12}>
                        <CButton
                          className="text-right offset-md-4 col-md-4"
                          color="primary"
                          type="submit"
                          onClick={handleLoginSubmit}
                        >
                          Sign in
                        </CButton>
                      </CCol>
                      <br />
                    </div>
                    <div>
                      <CRow>
                        <CCol className="offset-md-4 col">
                          <CButton color="link" className={LoginStyles.passAlign}>
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default EmployeeAppLogin
