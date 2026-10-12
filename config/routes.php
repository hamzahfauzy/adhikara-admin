<?php

use Libraries\Request;
use Libraries\Route;

/**
 * How to use
 * 
 * Route::{method}({path}, ...{handlers})
 * 
 * example 1
 * Route::get('/', 'modules/index')
 * 
 * example 2
 * Route::get('/', function(\Libraries\Request $request){ return 'Hello World';})
 * 
 * example 3
 * Route::get('/', [\App\Controllers\IndexController::class, 'index'])
 * 
 * example 4
 * Route::get('/', isAuthenticated(), 'modules/index')
 */

Route::get('/', function(){
    return ['message' => "It's Work"];
});

Route::post('/login', validate('modules/auth/validation/login'), 'modules/auth/actions/login');
Route::post('/register', validate('modules/auth/validation/register'), 'modules/auth/actions/register');
Route::get('/me', isAuthenticated(), 'modules/auth/actions/me');
Route::put('/me', isAuthenticated(), validate('modules/auth/validation/update-profile'), 'modules/auth/actions/update-profile');
Route::get('/dashboard', isAuthenticated(), 'modules/dashboard');

/**
 * Alternate Code
 * Route::crud('/roles', [\App\RoleController::class, 'config']); // config was static
 * Route::crud('/roles', function(){
 *    return [
 *      'data' => [
 *        'table' => 'roles'
 *      ]
 *    ];
 * });
 */
Route::crud('/roles', 'modules/roles/config', 'roles.', isAuthenticated());
Route::crud('/permissions', 'modules/permissions/config', 'permissions.', isAuthenticated());
Route::crud('/users', 'modules/users/config', 'users.', isAuthenticated());

Route::crud('/attendances', [\App\AttendanceController::class, 'config'], 'attendances.', isAuthenticated());
Route::put('/attendance-requests/{id}/{status}', isAuthenticated(), permissionMiddleware('attendance-request.actions'), [\App\AttendanceRequestController::class, 'patch']);
Route::crud('/attendance-requests', [\App\AttendanceRequestController::class, 'config'], 'attendance-requests.', isAuthenticated());
Route::crud('/leaves', [\App\AttendanceRequestController::class, 'config'], 'leaves.', isAuthenticated(), function(Request $request){
    $request->setOtherData('record_type','leave');
});
Route::crud('/duties', [\App\AttendanceRequestController::class, 'config'], 'duties.', isAuthenticated(), function(Request $request){
    $request->setOtherData('record_type','duty');
});
Route::crud('/clients', [\App\ClientController::class, 'config'], 'clients.', isAuthenticated(), userStamp());
Route::crud('/employees', [\App\EmployeeController::class, 'config'], 'employees.', isAuthenticated(), userStamp());
Route::crud('/placements', [\App\PlacementController::class, 'config'], 'placements.', isAuthenticated(), userStamp());
Route::crud('/schedules', [\App\ScheduleController::class, 'config'], 'schedules.', isAuthenticated(), userStamp());
Route::crud('/shifts', [\App\ShiftController::class, 'config'], 'shifts.', isAuthenticated(), userStamp());