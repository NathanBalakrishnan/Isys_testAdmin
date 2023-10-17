import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
} from '@coreui/react'
// import styles from '../../../components/Styles/FormStyles/FormStyle.module.css'
import { searchFormsApiCall } from 'src/api/apiConfig'
import EmployeeTable from 'src/components/table-data/EmployeeTable'
import NotificationEmployTable from './NotificationEmployTable'
import SearchFormDropdown from 'src/components/formComponents/searchForm-components/SearchFormDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { accessFunctionNew } from 'src/api/apiConfig'
import { components } from 'react-select'

const NotificationTable = () => {
  useEffect(() => {
    handleSubmit()
  }, [])
  const initialValues = {
    resourceNo: '',
    firstName: '',
    jointDateFrom: '',
    jointDateTo: '',
    role: '',
    status: false,
  }
  const [values, setValues] = useState(initialValues)
  const [apiData, setApiData] = useState(null)
  const handleSearchEmployeeApiCall = (response) => {
    setApiData(response)
  }
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault()
    }
    searchFormsApiCall(values, handleSearchEmployeeApiCall, 'resource_search')
  }


  // console.log('values', values)
  return (
    <>
      <CRow>
      
        {apiData ? (
          <NotificationEmployTable 
            data={apiData} 
            // responsibleNameView = 'Resource'
            // accessNameView = 'update'
            // responsibleNameDelete = 'Resource'
            // accessNameDelete = 'delete'
          />
        ) : (
          // <div className={styles.spiner}>
          <div>
            <FontAwesomeIcon icon={faSpinner} spin />
            <p>Loading</p>
          </div>
        )}
      </CRow>
    </>
  )
}

export default NotificationTable
