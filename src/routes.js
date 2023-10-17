import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const SearchEmployee = React.lazy(() => import('./views/forms/form-control/SearchEmployee'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const NewJoining = React.lazy(() => import('./views/dashboard/NewJoineeDetails'))
const EmployeeReleving = React.lazy(() => import('./views/dashboard/RelevingEmployeeDetails'))
const LeaveApproval = React.lazy(() => import('./views/dashboard/LeaveApproval'))
const InterviewStatus = React.lazy(() => import('./views/dashboard/InterviewStatus'))

const Charts = React.lazy(() => import('./views/charts/Charts'))
// const SearchDepartment = React.lazy(() => import('./views/forms/form-control/SearchDepartment'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notificationsy
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
//masters
const CompanyForm = React.lazy(() => import('./views/masters/Company'))
const ApplicationForm = React.lazy(() => import('./views/masters/Application'))
const RoleForm = React.lazy(() => import('./views/masters/Role'))
const MenuForm=React.lazy(()=>import('./views/masters/Menu'))
const RoleMenuAccessControlForm=React.lazy(()=>import('./views/accessControl/RoleMenuAccessControl'))
const RoleMenuMapping=React.lazy(()=>import('./views/accessControl/RoleMenuMapping'))
const CompanyGroup = React.lazy(() => import('./views/masters/CompanyGroup'))
//Leave
const Leavelimit = React.lazy(() => import('./views/leave/LeaveLimit'))
//Contract
const ModuleForm = React.lazy(() => import('./views/contract/ModuleForm'))
const RequirementForm=React.lazy(() => import('./views/contract/RequirementForm'))
const ContractForm=React.lazy(() => import('./views/contract/ContractForm'))
//shift
const ShiftForm = React.lazy(() => import('./views/shift/ShiftForm'))
//resource
const ResourceForm = React.lazy(() => import('./views/resource/EmployeeForm'))

const CompanyDataView = React.lazy(() => import('./components/Tabledata-ViewEdit/CompanyDataView'))
const CompanyGroupDataView = React.lazy(() => import('./components/Tabledata-ViewEdit/CompanyGroupDataView'))
const RoleDataView=React.lazy(()=>import('./components/Tabledata-ViewEdit/RoleDataView'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },

  { path: '/forms/new-joinee', name: 'New Joinee', element: NewJoining },
  { path: '/forms/employee-releving', name: 'Releving Employee', element: EmployeeReleving },
  { path: '/forms/leave-approval', name: 'Leave Approval', element: LeaveApproval },
  { path: '/forms/interview-status', name: 'Interview Status', element: InterviewStatus },
  
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/search-employee', name: 'Search Employee', element: SearchEmployee },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/masters/company', name: ' Company ', element: CompanyForm },
  { path: '/masters/application', name: ' Application ', element: ApplicationForm },
  { path: '/masters/role', name: 'Role ', element: RoleForm},
  { path: '/masters/menu', name: 'Menu ', element: MenuForm},
  { path: '/masters/companyGroup', name: 'Company Group ', element: CompanyGroup},
  { path: '/accessControl/RoleMenuAccessControl', name: 'Menu ', element: RoleMenuAccessControlForm},
  { path: '/leave/LeaveLimit', name: 'Leave Limit ', element: Leavelimit},
  { path: '/contract/ModuleForm', name: 'Module Form', element: ModuleForm},
  { path: '/contract/RequirementForm', name: 'Requirement Form', element: RequirementForm},
  { path: '/contract/ContractForm', name: 'Contract Form', element: ContractForm},

  { path: '/shift/ShiftForm', name: 'Shift Form', element: ShiftForm},

  { path: '/resource/EmployeeForm', name: 'Employee Form', element: ResourceForm},
  { path: '/accesscontrol/RoleMenuMapping', name: 'Role Menu Mapping', element: RoleMenuMapping},

  

   { path: '/forms/company-data', name: 'Company Data', element: CompanyDataView },
   { path: '/forms/companyGroup-data', name: 'Company Group Data', element: CompanyGroupDataView },
   { path: '/forms/role-data', name: 'Role Data', element: RoleDataView },

  // { path: '/forms/searchdepartment-form', name: 'SearchDepartment', element: SearchDepartment },


  
]

export default routes
