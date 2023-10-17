import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilGridSlash,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilAssistiveListeningSystem,
  cilUser,
  cilSearch,
  cibHackhands,
  cilList,
  cilTask,
  cilCalendar,
  cilVector,
  cilSettings,
  cibR,
  cilLevelUp,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import {  accessFunctionNew } from './api/apiConfig'
import { MdOutlineFreeBreakfast } from 'react-icons/md';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { BsCalendarEvent, BsPersonBadge, BsBuilding } from 'react-icons/bs';
import { FaCodepen, FaPeopleArrows, FaBusinessTime, FaUsers, FaFileContract, FaSearch } from 'react-icons/fa';
import { MdDesignServices, MdOutlineSettingsInputComponent, MdOutlineHolidayVillage} from 'react-icons/md';
import { RiUserSettingsFill, RiFileEditFill } from 'react-icons/ri';
import { GrDocumentStore} from 'react-icons/gr';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  // {
  //   component: CNavItem,
  //   name: 'Main Page',
  //   to: '/mainpage',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  // },

  {
    component: CNavTitle,
    name: 'Menu',
  },
 
  //accessFunctionNew('Company', 'create') || accessFunctionNew('Department', 'create') || accessFunctionNew('Designation', 'create') ?
  // accessFunctionNew('Department', 'create') ?

  { 
    component: CNavGroup, 
    name: 'Masters Setting',
    to: '/masters',
    icon: <RiUserSettingsFill className="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: accessFunctionNew('Company', 'create') ? 'Company Form' : '',
      //   to:  accessFunctionNew("Company", "create") ? '/forms/company-form' : '',
      //   icon: accessFunctionNew("Company", "create") ? <BsBuilding className="nav-icon" /> : '',
      // },
      {
        component: CNavItem,
        name: 'Company Group',
        to: '/masters/companyGroup',
     
      },
      {
        component: CNavItem,
        name: 'Company',
        to: '/masters/company',
     
      },
      {
        component: CNavItem,
        name: 'Application',
        to: '/masters/application',
     
      },
    
      {
        component: CNavItem,
        name: 'Role',
        to: '/masters/role',
     
      },
      {
        component: CNavItem,
        name: 'Menu',
        to: '/masters/menu',
     
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Access Control',
    icon: <FaFileContract className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Role Menu Mapping',
        to: '/AccessControl/RoleMenuMapping',
        
      },
      {
        component: CNavItem,
        name: 'Role Menu Access Control',
        to: '/AccessControl/RoleMenuAccessControl',
        
      },
     
    ]
  },

  {
    component: CNavGroup,
    name: 'Leave',
    icon: <FaFileContract className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Leave Limit',
        to: '/leave/LeaveLimit',
        
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Shift',
    icon: <FaUsers className="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Shift Form',
        to: '/shift/ShiftForm',
        
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Contract',
    icon: <RiFileEditFill className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Contract',
        to: '/contract/ContractForm',
        
      },
      {
        component: CNavItem,
        name: 'Module Form',
        to: '/contract/ModuleForm',
        
      },
      {
        component: CNavItem,
        name: 'Requirement Form',
        to: '/contract/RequirementForm',
        
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Resource Management',
    icon: <FaUsers className="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Resource Form',
        to: '/Resource/EmployeeForm',
        
      },
    ]
  }
  
]

export default _nav
