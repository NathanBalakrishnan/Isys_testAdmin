import React from 'react'
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
import { DocsExample } from 'src/components'

const FormControl2 = () => {
  return
  <CCard className="mb-4">
    <CCardHeader className="text-dark">
      <h5 className="text-dark">Family Information</h5>
    </CCardHeader>
    <CCardBody>
      <DocsExample href="forms/layout#gutters">
        <CForm className="row g-3">
          <CCol md={12}>
            <CRow>
              <CCol xs>
                <CFormLabel htmlFor="exampleFormControlInput1">
                  <strong>Fathers Name</strong>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Father Name"
                  name="fathername"
                 
                />
              </CCol>
              <CCol xs>
                <CFormLabel htmlFor="exampleFormControlInput1">
                  <strong>Mothers Name</strong>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="contactNo"
                  placeholder="Mother Name"
                  name="mothername"
                 
                />
              </CCol>
              <CCol xs>
                <CFormLabel htmlFor="inputEmail4">
                  <strong>Marital Status</strong>
                </CFormLabel>
                <div className="form-check pt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Tick if Married
                  </label>
                </div>
              </CCol>
              <CCol xs>
                <CFormLabel htmlFor="exampleFormControlInput1">
                  <strong>Spouse Name</strong>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="contactNo"
                  placeholder="Spouse Name"
                  name="spousename"
                  
                />
              </CCol>
            </CRow>
            <br></br>
          </CCol>
          <CCol md={12} className="d-flex justify-content-center">
            <CButton color="info">
              Submit
            </CButton>
          </CCol>
        </CForm>
      </DocsExample>
    </CCardBody>
  </CCard>
}

export default FormControl2
