import Route from "../src/core/routes.js";
// import Http from "./core/http.js";
import { isAuthenticated } from "./libs/functions.js";

// const userData = {}

// AUTH ROUTE

Route.add("/login", 'views/layouts/auth', function(){
    document.title = 'Login'
}, ['AuthController', 'index'])

Route.add("/forget-password", 'views/layouts/auth', function(){
    document.title = 'Forget Password'
}, ['AuthController', 'forgetPassword'])

// APP ROUTE

Route.add("/", 'views/layouts/app', isAuthenticated, function(){
    document.title = 'Dashboard'
}, ['IndexController', 'index'])

// Route.add('/setting', 'views/layouts/app', isAuthenticated, () => {
//     document.title = 'Setting'
// }, ['IndexController','setting'])

Route.add('/profile/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Profile'
}, ['IndexController','editProfile'])

Route.add('/profile', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Profile'
}, ['IndexController','profile'])

Route.add('/users', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Users'
}, ['UserController','index'])

Route.add('/users/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create User'
}, ['UserController','create'])

Route.add('/users/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit User'
}, ['UserController','edit'])

Route.add('/users/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail User'
}, ['UserController','show'])

Route.add('/roles', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Roles'
}, ['RoleController','index'])

Route.add('/roles/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Role'
}, ['RoleController','create'])

Route.add('/roles/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Role'
}, ['RoleController','edit'])

Route.add('/roles/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Role'
}, ['RoleController','show'])


Route.add('/attendances', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Attendances'
}, ['app/AttendanceController','index'])

Route.add('/attendances/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Attendance'
}, ['app/AttendanceController','create'])

Route.add('/attendances/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Attendance'
}, ['app/AttendanceController','edit'])

Route.add('/attendances/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Attendance'
}, ['app/AttendanceController','show'])


Route.add('/clients', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Clients'
}, ['app/ClientController','index'])

Route.add('/clients/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Client'
}, ['app/ClientController','create'])

Route.add('/clients/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Client'
}, ['app/ClientController','edit'])

Route.add('/clients/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Client'
}, ['app/ClientController','show'])


Route.add('/duties', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Duties'
}, ['app/DutyController','index'])

Route.add('/duties/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Duty'
}, ['app/DutyController','create'])

Route.add('/duties/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Duty'
}, ['app/DutyController','edit'])

Route.add('/duties/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Duty'
}, ['app/DutyController','show'])


Route.add('/employees', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Employees'
}, ['app/EmployeeController','index'])

Route.add('/employees/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Employee'
}, ['app/EmployeeController','create'])

Route.add('/employees/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Employee'
}, ['app/EmployeeController','edit'])

Route.add('/employees/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Employee'
}, ['app/EmployeeController','show'])


Route.add('/leaves', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Leaves'
}, ['app/LeaveController','index'])

Route.add('/leaves/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Leave'
}, ['app/LeaveController','create'])

Route.add('/leaves/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Leave'
}, ['app/LeaveController','edit'])

Route.add('/leaves/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Leave'
}, ['app/LeaveController','show'])


Route.add('/placements', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Placements'
}, ['app/PlacementController','index'])

Route.add('/placements/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Placement'
}, ['app/PlacementController','create'])

Route.add('/placements/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Placement'
}, ['app/PlacementController','edit'])

Route.add('/placements/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Placement'
}, ['app/PlacementController','show'])


Route.add('/schedules', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Schedules'
}, ['app/ScheduleController','index'])

Route.add('/schedules/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Schedule'
}, ['app/ScheduleController','create'])

Route.add('/schedules/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Schedule'
}, ['app/ScheduleController','edit'])

Route.add('/schedules/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Schedule'
}, ['app/ScheduleController','show'])


Route.add('/shifts', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Shifts'
}, ['app/ShiftController','index'])

Route.add('/shifts/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Shift'
}, ['app/ShiftController','create'])

Route.add('/shifts/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Shift'
}, ['app/ShiftController','edit'])

Route.add('/shifts/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Shift'
}, ['app/ShiftController','show'])

export default Route.getRoutes();