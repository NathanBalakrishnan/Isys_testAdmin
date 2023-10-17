import React, { useState } from 'react'
import {
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CWidgetStatsA,
    CFormSwitch
  } from '@coreui/react'
import styles from '../../components/Styles/DashboardStyles/DashboardStyles.module.css'
import { FcLeave, FcProcess, FcBusinessman, FcConferenceCall, FcButtingIn, FcManager } from 'react-icons/fc';

const TopWidgets = () => {
    const [toggleValue, setToggleValue] = useState(true);

  return (
    <div className={styles.topWidgetsBG2}>
        <div style={{padding: '10px 0px'}}>
            <div className={styles.approvals}>
                <h5>Employee Details</h5>
                <div className={styles.switch}>
                    <CFormSwitch
                    label="Switch between Contract/Permanent staff details"
                    id="staffSwitch"
                    checked={toggleValue}
                    onChange={() => setToggleValue(!toggleValue)}
                    />
                </div>
            </div>
        </div>

        {toggleValue ? (
            <CRow>
                <CCol sm={6} lg={2}>
                    <a href='/#/forms/search-employee' style={{ textDecoration: 'none' }}>
                        <div className={styles.bgclr1}>
                            <FcConferenceCall size={32} />
                            <p className={styles.ttlValue1}>150</p>
                            <p className={styles.ttl1}>Total <br />Employees</p>
                        </div>
                    </a>
                </CCol>
                <CCol sm={6} lg={2}>
                    <a href='/#/forms/new-joinee' style={{ textDecoration: 'none' }}>
                        <div className={styles.bgclr2}>
                            <FcBusinessman size={32} />
                            <p className={styles.ttlValue2}>10</p>
                            <p className={styles.ttl2}>New <br />Joining</p>
                        </div>
                    </a>
                </CCol>
                <CCol sm={6} lg={2}>
                    <a href='/#/forms/employee-releving' style={{ textDecoration: 'none' }}>
                        <div className={styles.bgclr3}>
                            <FcButtingIn size={32} />
                            <p className={styles.ttlValue3}>5</p>
                            <p className={styles.ttl3}>Employee <br />Releving</p>
                        </div>
                    </a>
                </CCol>
                <CCol sm={6} lg={2}>
                    <div className={styles.bgclr4}>
                        <FcManager size={32} />
                        <p className={styles.ttlValue4}>95%</p>
                        <p className={styles.ttl4}>Today&apos;s <br />Attendence</p>
                    </div>
                </CCol>
                <CCol sm={6} lg={2}>
                    <a href="/#/forms/leave-approval" style={{ textDecoration: 'none' }}>
                        <div className={styles.bgclr5}>
                            <FcLeave size={32} />
                            <p className={styles.ttlValue5}>15</p>
                            <p className={styles.ttl5}>Pending<br /> Approvals</p>
                        </div>
                    </a>
                </CCol>
                <CCol sm={6} lg={2}>
                    <a href="/#/forms/interview-status" style={{ textDecoration: 'none' }}>
                        <div className={styles.bgclr5}>
                            <FcProcess size={32} />
                            <p className={styles.ttlValue5}>10</p>
                            <p className={styles.ttl5}>Interview<br /> Process</p>
                        </div>
                    </a>
                </CCol>
            </CRow>
        ) : (
            <CRow>
                <CCol sm={6} lg={4}>
                    <div className={styles.bgclr1}>
                        <p className={styles.ttl1}>Total <br />Employees</p>
                        <p className={styles.ttlValue1}>999</p>
                    </div>
                </CCol>
                <CCol sm={6} lg={4}>
                    <div className={styles.bgclr2}>
                        <p className={styles.ttl2}>New <br />Joining</p>
                        <p className={styles.ttlValue2}>4</p>
                    </div>
                </CCol>
                <CCol sm={6} lg={4}>
                    <div className={styles.bgclr3}>
                        <p className={styles.ttl3}>Today&apos;s <br />Attendence</p>
                        <p className={styles.ttlValue3}>98%</p>
                    </div>
                </CCol>
            </CRow>
        )}
    </div>
  )
}

export default TopWidgets