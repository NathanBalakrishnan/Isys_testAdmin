import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol,
} from '@coreui/react'
import styles from '../../components/Styles/DashboardStyles/DashboardStyles.module.css'

const TopMiniCard = (val) => {
    const [values, setValues] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('AccessToken')
            const res = await fetch('http://localhost:8080/api/v1/leave_statistics', {
                method: 'GET',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                },
            })
            if (res.status === 200) {
                const data = await res.json()
                setValues(data)
            } else {
            }
        }
        fetchData()
    }, [val])
    return (
        <div className={styles.TopMiniCardBG} style={{marginBottom: '30px'}}>
            <CRow>
                <CCol sm={6} lg={4}>
                    <div className={styles.bgclr1}>
                        <p className={styles.ttl1}>
                            Leave <br />
                            Balance
                        </p>
                        <p className={styles.ttlValue1}>{values[0] && values[0].leaveBalance}</p>
                    </div>
                </CCol>
                <CCol sm={6} lg={4}>
                    <div className={styles.bgclr2}>
                        <p className={styles.ttl2}>
                            Total <br />
                            Leave
                        </p>
                        <p className={styles.ttlValue2}>{values[0] && values[0].totalLeave}</p>
                    </div>
                </CCol>
                <CCol sm={6} lg={4}>
                    <div className={styles.bgclr3}>
                        <p className={styles.ttl3}>
                            Applied <br />
                            Leave
                        </p>
                        <p className={styles.ttlValue3}>{values[0] && values[0].appliedLeave}</p>
                    </div>
                </CCol>
            </CRow>
        </div>
    )
}

export default TopMiniCard
