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
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'
import { accessFunctionNew, searchFormsApiCall } from 'src/api/apiConfig'
import TaskFormTable from 'src/components/table-data/TaskFormTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import NewJoiningTable from 'src/components/table-data/NewJoiningTable'

const NewJoineeDetails = () => {
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>Search Candidate</h5>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={12}>
                  <CRow>
                    <CCol xs={3}>
                      <CFormLabel htmlFor="taskNo">
                        <strong>Candidate Name</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="taskNo"
                        placeholder="Name"
                        name="taskNo"
                        // value={values.taskNo}
                        // onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={3}>
                      <CFormLabel htmlFor="taskNo">
                        <strong>Designation</strong>
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="taskNo"
                        placeholder="Designation"
                        name="taskNo"
                        // value={values.taskNo}
                        // onChange={handleInputChange}
                      />
                    </CCol>
                    <CCol xs={3}>
                      <CFormLabel htmlFor="taskNo">
                        <strong>Joining Date</strong>
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        id="taskNo"
                        placeholder="Designation"
                        name="taskNo"
                        // value={values.taskNo}
                        // onChange={handleInputChange}
                      />
                    </CCol>
                    {/* <CCol xs>
                      <CFormLabel htmlFor="status">
                        <strong>Status</strong>
                      </CFormLabel>
                      <CFormSelect
                        id="status"
                        name="status"
                        value={''}
                        required
                        onChange={''}
                      >
                        <option selected="" value="">
                          Select Status
                        </option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </CFormSelect>
                    </CCol> */}
                    <CCol xs></CCol>
                    <CCol xs></CCol>
                  </CRow>
                  <br></br>
                </CCol>
              </CForm>
            </CCardBody>
            <CCardHeader className="text-dark p-3 border border-0">
              <CCol md={12} className="d-flex justify-content-left">
                <CButton className={styles.btnColor} onClick={''}>
                  Search
                </CButton>
                {/* <div className={styles.btnPadding}></div>
                {accessFunctionNew('Task', 'create') ? (
                  <Link to="/forms/task-form">
                    <CButton className={styles.btnColor}>Add Task</CButton>
                  </Link>
                ) : (
                  ''
                )} */}
              </CCol>
            </CCardHeader>
          </CCard>
        </CCol>
        {/* {apiData ? (
          <TaskFormTable
            data={apiData}
            responsibleNameView="Task"
            accessNameView="update"
            responsibleNameDelete="Task"
            accessNameDelete="delete"
          />
        ) : (
          <div className={styles.spiner}>
            <FontAwesomeIcon icon={faSpinner} spin />
            <p>Loading</p>
          </div>
        )} */}
      </CRow>
      <NewJoiningTable />
    </>
  )
}

export default NewJoineeDetails

