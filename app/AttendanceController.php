<?php

namespace App;

use Libraries\Request;
use Libraries\Services\DatabaseService;
use Libraries\Database as DB;
use Libraries\Response;

class AttendanceController
{
    static function config(){
        return [
            'data' => [
                'table' => 'attendances',
                'searchable' => [
                    'notes'
                ],
                'filterable' => [
                    'request_id', 'employee_id', 'placement_id',
                    'schedule_id', 'attendance_date',
                    'record_type', 'status', 'start_at', 'end_at',
                    'created_at'
                ],
                'list' => [
                    'attendances.id', 'attendances.request_id', 'attendances.employee_id',
                    'attendances.placement_id', 'attendances.schedule_id',
                    'attendances.attendance_date', 'attendances.start_at', 'attendances.end_at',
                    'attendances.record_type', 'attendances.status',
                    'attendances.created_at', 'attendances.updated_at',
                    'employees.name employee_name', 'placements.name placement_name'
                ],
                'view' => [
                    'attendances.id', 'attendances.request_id', 'attendances.employee_id',
                    'attendances.placement_id', 'attendances.schedule_id',
                    'attendances.attendance_date', 'attendances.start_at', 'attendances.end_at',
                    'attendances.record_type', 'attendances.status',
                    'attendances.created_at', 'attendances.updated_at',
                    'employees.name employee_name', 'placements.name placement_name',
                    'attendances.file_url','attendances.start_lat','attendances.start_lng',
                    'attendances.end_lat','attendances.end_lng',
                    'attendances.start_photo_url','attendances.end_photo_url',
                ],
            ],
            'exclude_actions' => ['create','delete','edit'],
            'actions' => [
                'index' => [AttendanceController::class, 'index'],
                'show' => [AttendanceController::class, 'show'],
            ]
        ];
    }

    public function index(Request $request)
    {
        $config = $request->otherData('crudConfig');
        $query = DB::table($config['table'])->select($config['list'])
                ->leftJoin('employees','employees.id','=','attendances.employee_id')
                ->leftJoin('placements','placements.id','=','attendances.placement_id')
                ;

        $lists = (new DatabaseService)->listing($query, $config['searchable'], $config['filterable'], $config['sortable']);

        return [
            'message' => __('data retrieved'),
            ...$lists,
        ];
    }
    
    public function show(Request $request)
    {
        $config = $request->otherData('crudConfig');
        $id = $request->params('id');
        $data = DB::table($config['table'])->select($config['view'])
                ->leftJoin('employees','employees.id','=','attendances.employee_id')
                ->leftJoin('placements','placements.id','=','attendances.placement_id')
                ->where($config['table'].'.id', $id)->first();

        return Response::json(__('data retrieved'), $data);
    }
}