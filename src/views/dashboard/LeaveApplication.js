import React, { useMemo } from 'react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { func } from 'prop-types'

const LeaveApplication = () => {
  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        designation: 'Developer',
        empNo: 'AB0011',
      },
      country: { name: 'USA', flag: cifUs },
      project: 'HRMS',
      usage: {
        comments: 'No Comments',
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
      period: '1 Day',
      reason: 'Sick',
      status: 'Approved',
      fromDate: '23/01/23',
      toDate: '23/01/23',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        designation: 'Developer',
        empNo: 'AB0012',
      },
      country: { name: 'Brazil', flag: cifBr },
      project: 'HRMS',
      usage: {
        comments: 'Home Town Festival',
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
      period: '2 Day',
      reason: 'Festival',
      status: 'Pending',
      fromDate: '06/02/23',
      toDate: '07/02/23',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { 
        name: 'Quintin Ed', 
        designation: 'Backend',
        empNo: 'AB0013', 
        },
      country: { name: 'India', flag: cifIn },
      project: 'FNP',
      usage: {
        comments: 'Not Feeling well today',
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
      period: '1 Day',
      reason: 'Sick',
      status: 'Pending',
      fromDate: '23/01/23',
      toDate: '23/01/23',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        designation: 'Tester',
        empNo: 'AB0016',
      },
      country: { name: 'Poland', flag: cifPl },
      project: 'FNP',
      usage: {
        comments: 'No Comments',
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
      period: '1.5 Day',
      reason: 'Outside',
      status: 'Pending',
      fromDate: '23/01/23',
      toDate: '24/01/23',
    },
  ]
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>Employee Details</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Project</CTableHeaderCell>
                <CTableHeaderCell>Comments</CTableHeaderCell>
                {/* <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell> */}
                <CTableHeaderCell>Reason</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tableExample.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.user.name}</div>
                    <div className="small text-medium-emphasis">
                      <span>{item.user.designation}</span> | Emp No:{' '}
                      {item.user.empNo}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <p>{item.project}</p>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start">
                        <h6>{item.usage.comments}</h6>
                      </div>
                      {/* <div className="float-end">
                        <small className="text-medium-emphasis">{item.usage.period}</small>
                      </div> */}
                    </div>
                    {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                  </CTableDataCell>
                  {/* <CTableDataCell className="text-center">
                    <CIcon size="xl" icon={item.payment.icon} />
                  </CTableDataCell> */}
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">Reason: {item.reason}</div>
                    <p>Days: {item.period}</p>
                  </CTableDataCell>
                  <CTableDataCell>
                    <p style={{marginBottom: '0px'}} className="small text-medium-emphasis">From: {item.fromDate}</p>
                    <p className="small text-medium-emphasis">To: {item.toDate}</p>
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.status == 'Pending' ? 
                        <p style={{color: 'blue'}}><a href="#">{item.status}</a></p>
                        : 
                        <p style={{color: 'green'}}>{item.status}</p>
                    }
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default LeaveApplication
