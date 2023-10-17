import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CFormSwitch,
  CFormInput,
  CFormLabel,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CContainer,
} from '@coreui/react'
import styles from '../../../components/Styles/MainPageStyles/MainPageStyles.module.css';
import {
  FcLeave,
  FcProcess,
  FcBusinessman,
  FcConferenceCall,
  FcButtingIn,
  FcManager,
  FcPortraitMode,
  FcOrgUnit,
} from 'react-icons/fc'
import EmployeeAppLogin from './EmployeeAppLogin';
import { Container } from '@mui/system';

const MainPage = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div className={styles.MainPageBG2}>
      <CContainer className="justify-content-center" >
        <h3 className={styles.mainTtl}>
          Admin<span className={styles.ttlSpan}>LTE</span>
        </h3>
        <CRow>
          <CCol sm={6} lg={4}>
              <div className={styles.bgclr2} onClick={() => setVisible(!visible)}>
                <FcPortraitMode size={60} />
                <p className={styles.ttl2}>
                  Master <br />
                  Application
                </p>
              </div>
          </CCol>
          <CCol sm={6} lg={4}>
            <div className={styles.bgclr3} onClick={() => setVisible(!visible)}>
              <FcBusinessman size={60} />
              <p className={styles.ttl3}>
                Admin <br />
                Application
              </p>
            </div>
          </CCol>
          <CCol sm={6} lg={4}>
            <div className={styles.bgclr4} onClick={() => setVisible(!visible)}>
              <FcManager size={60} />
              <p className={styles.ttl4}>
                HR<br />
                Application
              </p>
            </div>
          </CCol>
        </CRow>
        <br />
        <CRow>
          <CCol sm={6} lg={4}>
              <div className={styles.bgclr1} onClick={() => setVisible(!visible)}>
                <FcConferenceCall size={60} />
                <p className={styles.ttl1}>
                  Employee <br />
                  Application
                </p>
              </div>
          </CCol>
          <CCol sm={6} lg={4}>
              <div className={styles.bgclr5} onClick={() => setVisible(!visible)}>
                <FcOrgUnit size={60} />
                <p className={styles.ttl5}>
                  Other
                  <br /> Application
                </p>
              </div>
          </CCol>
          <CCol sm={6} lg={4}>
              <div className={styles.bgclr5} onClick={() => setVisible(!visible)}>
                <FcOrgUnit size={60} />
                <p className={styles.ttl5}>
                  Other
                  <br /> Application
                </p>
              </div>
          </CCol>
        </CRow>
      </CContainer>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Login Form</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <EmployeeAppLogin />
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="success">Upload</CButton>
          <CButton color="danger" onClick={() => setVisible(false)}>
            Remove
          </CButton>
        </CModalFooter> */}
      </CModal>
    </div>
  )
}

export default MainPage
