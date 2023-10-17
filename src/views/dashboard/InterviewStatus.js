import React from 'react'
import styles from '../../components/Styles/DashboardStyles/DashboardStyles.module.css'
import InterviewApplication from './InterviewApplication'

const InterviewStatus = () => {
  return (
    <div className={styles.leaveApplicationBG}>
        <h5 className={styles.leaveApplicationTtl}>Candidate Interview Status</h5>
        <InterviewApplication />
    </div>
  )
}

export default InterviewStatus