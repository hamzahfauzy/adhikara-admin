<?php

namespace App;

use Libraries\Request;
use Libraries\Services\DatabaseService;
use Libraries\Database as DB;
use Libraries\Response;

class AttendanceRequestController
{
    static function config(){
        return [
            'data' => [
                'table' => 'attendance_requests',
                'searchable' => [
                    'notes', 'rejection_reason'
                ],
                'filterable' => [
                    'employee_id', 'placement_id', 'schedule_id',
                    'record_type', 'status', 'reviewed_by',
                    'start_at', 'end_at', 'created_at'
                ],
                'list' => [
                    'attendance_requests.id', 'attendance_requests.employee_id', 'attendance_requests.placement_id',
                    'attendance_requests.schedule_id', 'attendance_requests.start_at', 'attendance_requests.end_at',
                    'attendance_requests.record_type', 'attendance_requests.status', 'attendance_requests.reviewed_by',
                    'attendance_requests.reviewed_at', 'attendance_requests.created_at',
                    'employees.name employee_name', 'placements.name placement_name'
                ],
                'view' => [
                    'attendance_requests.id', 'attendance_requests.employee_id', 'attendance_requests.placement_id',
                    'attendance_requests.schedule_id', 'attendance_requests.start_at', 'attendance_requests.end_at',
                    'attendance_requests.record_type', 'attendance_requests.status', 'attendance_requests.reviewed_by',
                    'attendance_requests.reviewed_at', 'attendance_requests.created_at',
                    'employees.name employee_name', 'placements.name placement_name',
                    'attendance_requests.notes', 'attendance_requests.file_url'
                ],
            ],
            'exclude_actions' => ['create','delete','edit'],
            'actions' => [
                'index' => [AttendanceRequestController::class, 'index'],
                'show' => [AttendanceRequestController::class, 'show'],
            ]
        ];
    }

    public function index(Request $request)
    {
        $config = $request->otherData('crudConfig');
        $query = DB::table($config['table'])->select($config['list'])
                ->leftJoin('employees','employees.id','=','attendance_requests.employee_id')
                ->leftJoin('placements','placements.id','=','attendance_requests.placement_id');
        $record_type = $request->otherData('record_type', 'all');

        if($record_type <> 'all')
        {
            $query = $query->where('record_type', '=', $record_type);
        }

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
                ->leftJoin('employees','employees.id','=','attendance_requests.employee_id')
                ->leftJoin('placements','placements.id','=','attendance_requests.placement_id')
                ->where($config['table'].'.id', $id)->first();

        return Response::json(__('data retrieved'), $data);
    }

    public function patch(Request $request)
    {
        $id = $request->params('id');
        $status = $request->params('status');

        DB::table('attendance_requests')->where('id', $id)->update([
            'status' => $status
        ]);

        if($status == 'approved')
        {
            $req = DB::table('attendance_requests')->where('id', $id)->first();
            $startDate = new \DateTime($req->start_at);
            $endDate   = new \DateTime($req->end_at);

            // Modify end date by 1 day to make the range inclusive
            $endDate->modify('+1 day'); 

            $interval  = new \DateInterval('P1D'); // P1D means "Period of 1 Day"
            $dateRange = new \DatePeriod($startDate, $interval, $endDate);

            foreach ($dateRange as $date) {
                // echo $date->format('Y-m-d') . "\n";
                DB::table('attendances')->insert([
                    'request_id' => $req->id,
                    'employee_id' => $req->employee_id,
                    'placement_id' => $req->placement_id,
                    'attendance_date' => $date->format('Y-m-d'),
                    'start_at' => $req->start_at,
                    'end_at' => $req->end_at,
                    'record_type' => $req->record_type,
                    'status' => $req->status,
                    'notes' => $req->notes,
                    'file_url' => $req->file_url,
                    'created_by' => $request->user()->id,
                ]);
            }
        }

        return Response::json(__('data updated'), []);
    }
}