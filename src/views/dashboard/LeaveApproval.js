import React from 'react'
import styles from '../../components/Styles/DashboardStyles/DashboardStyles.module.css'
import LeaveApplication from './LeaveApplication'

const LeaveApproval = () => {
  return (
    <div className={styles.leaveApplicationBG}>
        <h5 className={styles.leaveApplicationTtl}>Pending Leave Approvals</h5>
        <LeaveApplication />
    </div>
  )
}

export default LeaveApproval