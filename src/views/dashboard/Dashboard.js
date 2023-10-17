import React, { useState } from 'react'

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

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import TopWidgets from './TopWidgets'
import QuickData from './QuickData'
import styles from '../../components/Styles/DashboardStyles/DashboardStyles.module.css'
import LeaveApplication from './LeaveApplication'
import InterviewApplication from './InterviewApplication'
import ProjectData from './ProjectData'
import TopMiniCard from 'src/components/Common-components/TopMiniCard'
import { accessFunctionUser } from 'src/api/apiConfig'
import CalenderViewTwo from './CalenderViewTwo'
import RunningNotifications from './RunningNotifications'

const Dashboard = () => {
  const [applicationSelectedOption, setApplicationSelectedOption] = useState('Option 1');
  const [applicationDiv, setApplicationDiv] = useState(<LeaveApplication />);

  const handleSelectChangeApplication = event => {
    setApplicationSelectedOption(event.target.value);
    setApplicationDiv(event.target.value === 'Option 1' ? <LeaveApplication /> : <InterviewApplication /> );
  };

  return (
    <>
      {accessFunctionUser('Leave') === 'Employee' ? <TopMiniCard /> : <TopWidgets />}
      <CRow>
        <CCol sm={12} lg={7}>
          <div className={styles.quickDataBG}>
          <h5>Calender & Events</h5>
            <CalenderViewTwo />
          </div>
        </CCol>
        <CCol sm={12} lg={5}>
          <div className={styles.quickDataBG}>
          <h5>Notifications</h5>
            <RunningNotifications />
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
