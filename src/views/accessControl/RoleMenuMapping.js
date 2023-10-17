import React, { useEffect, useState } from 'react'
import {
  CButton,
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CMultiSelect,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  
} from '@coreui/react'
import styles from '../../components/Styles/FormStyles/FormStyle.module.css'


const RoleMenuMapping = () => {
 const responceData = [
  {
    "id": "1",
    "label": "role access",
    "checked": false,
    "children": [
      {
        "id": "1a",
        "label": "role a",
        "checked": false,
        "children": []
      },
      {
        "id": "1b",
        "label": "role b",
        "checked": false,
        "children": []
      }
    ]
  },
  {
    "id": "2",
    "label": "leave",
    "checked": false,
    "children": [
      {
        "id": "2a",
        "label": "leave request",
        "checked": false,
        "children": []
      },
      {
        "id": "2b",
        "label": "leave limit",
        "checked": false,
        "children": []
      },
      {
        "id": "3b",
        "label": "leave form",
        "checked": false,
        "children": []
      }
    ]
  },
  {
    "id": "3",
    "label": "resource management",
    "checked": false,
    "children": [
      {
        "id": "3a",
        "label": "resource form",
        "checked": false,
        "children": []
      },
      {
        "id": "3b",
        "label": "search employee",
        "checked": false,
        "children": []
      }
    ]
  },
  {
    "id": "4",
    "label": "payroll",
    "checked": false,
    "children": [
      {
        "id": "4a",
        "label": "payrollOne",
        "checked": false,
        "children": []
      },
      {
        "id": "4b",
        "label": "payrollTwo",
        "checked": false,
        "children": []
      }
    ]
  },
]

const [userData, setUserData] = useState([]); 
const [userLevel , setUserLevel] = useState([]);

const [isAll , setIsAll] = useState(false)
const [isAllLevel,setIsAllLevel] = useState(false)

const [selectRadio , setSelectRadio] = useState("all")

// Select menu list child and Individual select
const selectCompanySettings = (e, parentId, childId) => {
  const { checked } = e.target;
  
  const updatedUserData = userData.map(item => {
    if (item.id === parentId) {
      if (childId) {
        return {
          ...item,
          children: item.children.map(child => {
            if (child.id === childId) {
              return {
                ...child,
                checked: checked
              };
            }
            return child;
          })
        };
      } else {
        return {
          ...item,
          checked: checked,
          children: item.children.map(child => ({
            ...child,
            checked: checked
          }))
        };
      }
    }
    return item;
  });
  console.log("update data",updatedUserData)
  setUserData(updatedUserData);
};

// select company level
const selectCompanySettingsLevel = (e, parentId, childId) => {
  const { checked } = e.target;
  
  const updatedUserData = userData.map(item => {
    if (item.id === parentId) {
      if (childId) {
        return {
          ...item,
          children: item.children.map(child => {
            if (child.id === childId) {
              return {
                ...child,
                checked: checked
              };
            }
            return child;
          })
        };
      } else {
        return {
          ...item,
          checked: checked,
          children: item.children.map(child => ({
            ...child,
            checked: checked
          }))
        };
      }
    }
    return item;
  });
  console.log("update data",updatedUserData)
  setUserLevel(updatedUserData);
};
// select all menu list  
const selectAllHandler = (e) => {
  console.log("event",e.target.id)
 setIsAll(e.target.checked)

 if(e.target.id === "selectAllMenuList" || e.target.id === "selectAllLevel")
 {
  const { checked } = e.target;
  const updatedUserData = userData.map(item => ({
    ...item,
    checked: checked,
    children: item.children.map(child => ({
      ...child,
      checked: checked
    }))
  }));
  console.log("update data",updatedUserData)
  setUserData(updatedUserData);
 } 
};

//handler level
const selectAllHandlerLevel = (e) => {
  console.log("event",e.target.id)

 setIsAllLevel(e.target.checked)
 if(e.target.id === "selectAllLevel")
 {
  const { checked } = e.target;
  const updatedUserData = userData.map(item => ({
    ...item,
    checked: checked,
    children: item.children.map(child => ({
      ...child,
      checked: checked
    }))
  }));
  console.log("update data",updatedUserData)
  setUserLevel(updatedUserData);
 } 
};

//selcet radio button
const selectUserResponsibilities=(e)=>{
setSelectRadio(e.target.value)
setIsAll(false)
setUserData([])
// console.log("select radio button",id,checked)
if(e.target.value === "all"){
  setUserData(responceData)
 document.getElementById("allMenuList").style.display="block"
 document.getElementById("level").style.display="none"

}else if(e.target.value === "level1&2"){
  const foundLevelTwo = responceData.find(item => item.id === "2")
  const foundLevelThree = responceData.find(item => item.id === "3")
  setUserData([foundLevelTwo])
  setUserLevel([foundLevelThree])
   document.getElementById("allMenuList").style.display="block"
   document.getElementById("level").style.display="block"
 
}else if(e.target.value === "level2&3"){
  const foundLevelThree = responceData.find(item => item.id === "3")
  const foundLevelFour = responceData.find(item => item.id === "4")
  setUserData([foundLevelThree])
  setUserLevel([foundLevelFour])
  document.getElementById("allMenuList").style.display="block"
  document.getElementById("level").style.display="block"
 
}
}

useEffect(()=>{
  setUserData(responceData)
 document.getElementById("allMenuList").style.display="block"
 document.getElementById("level").style.display="none"

},[])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-dark">
              <h5 className={styles.empSubHeader}>Role Menu Mapping</h5>
            </CCardHeader>
            <CCardBody>   
              <CCol md={7}>
                <CRow>
                  <CCol xs>
                      <CFormLabel htmlFor="inputEmail4">
                        <strong>Company</strong>
                      </CFormLabel>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Company 1</option>
                        <option value="Company 2">Company 2</option>
                        <option value="Company 3">Company 3</option>
                      </select>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="inputEmail4">
                        <strong>Role</strong>
                    </CFormLabel>
                    <select className="form-select" aria-label="Default select example" >
                      <option value="Role 1">Role 1</option>
                      <option value="Role 2">Role 2</option>
                      <option value="Role 3">Role 3</option>
                    </select>
                  </CCol>
                </CRow>
              </CCol>  
               <CCol md={12}>
                  <CRow className='m-5'>
                    <CCol xs={4} className="">
                        <CFormCheck type="radio" 

                        id="selectAll"
                        value="all"
                        name="flexRadioDefault" 
                        checked={selectRadio === "all"}
                        label="All"
                        onChange={(e)=>selectUserResponsibilities(e)}
                         />
                        <CFormCheck type="radio" 
                        
                        id="Level 2"
                        value="level1&2"
                        name="flexRadioDefault"
                        label="Level 1 & 2" 
                        checked={selectRadio === "level1&2"}
                        onChange={(e)=>selectUserResponsibilities(e)}
                        
                        className='mt-3' />
                        <CFormCheck type="radio" 
                         value="level2&3"
                         id="Level 3"
                         name="flexRadioDefault"
                         checked={selectRadio === "level2&3"} 
                      
                        onChange={(e)=>selectUserResponsibilities(e)}
                        label="Level 2 & 3" className='mt-3' />
                    </CCol>
                    <CCol xs={4} className='m-0' id='allMenuList'>
                      <h3 className=''>Menu List</h3>
                      <div className='overflow-x-hidden overflow-y-scroll' style={{ width: 300, height: 120, border: '1px solid gray' }}>
                        <div className='container' style={{ width: 400 }}>
                          <form className='form'>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="selectAllMenuList"
                                checked = {isAll}
                                onChange={selectAllHandler}
                              />
                              <label className="form-check-label">Select All</label>
                            </div>

                            {userData.map(menu => (
                              <div className="form-check" key={menu.id}>
                                <input
                                  className="form-check-input ml-2"
                                  type="checkbox"
                                  name={menu.label}
                                  checked={menu.checked}
                                  onChange={(e) => selectCompanySettings(e, menu.id)}
                                />
                                <label className="form-check-label">{menu.label}</label>
                                {menu.children.map(child => (
                                  <div key={child.id} style={{ marginLeft: '20px' }}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name={child.label}
                                      checked={child.checked}
                                      onChange={(e) => selectCompanySettings(e, menu.id, child.id)}
                                    />
                                    <label className="form-check-label">{child.label}</label>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </form>
                        </div>
                      </div> 
                      </CCol>
                      <CCol xs={4} className='m-0' id='level'>
                      <h3 className=''>Menu List</h3>
                      <div className='overflow-x-hidden overflow-y-scroll' style={{ width: 300, height: 120, border: '1px solid gray' }}>
                        <div className='container' style={{ width: 400 }}>
                          <form className='form'>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="selectAllLevel"
                                checked = {isAllLevel}
                                onChange={selectAllHandlerLevel}
                              />
                              <label className="form-check-label">Select All</label>
                            </div>

                            {userLevel.map(menu => (
                              <div className="form-check" key={menu.id}>
                                <input
                                  className="form-check-input ml-2"
                                  type="checkbox"
                                  name={menu.label}
                                  checked={menu.checked}
                                  onChange={(e) => selectCompanySettingsLevel(e, menu.id)}
                                />
                                <label className="form-check-label">{menu.label}</label>
                                {menu.children.map(child => (
                                  <div key={child.id} style={{ marginLeft: '20px' }}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name={child.label}
                                      checked={child.checked}
                                      onChange={(e) => selectCompanySettingsLevel(e, menu.id, child.id)}
                                    />
                                    <label className="form-check-label">{child.label}</label>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </form>
                        </div>
                      </div> 
                      </CCol>
                  </CRow>
                </CCol>
            </CCardBody>
            <CCardHeader className="text-dark p-3 border border-0">
              <CCol md={12} className="d-flex justify-content-left">
             
                  {/* <CButton onClick={handleSubmitMasterSettings}>Save</CButton> */}
                
                <div className={styles.btnPadding}></div>
              </CCol>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default RoleMenuMapping
