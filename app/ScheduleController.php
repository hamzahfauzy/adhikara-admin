<?php

namespace App;

use Libraries\Database as DB;
use Libraries\Request;
use Libraries\Response;
use Libraries\Services\DatabaseService;

class ScheduleController
{
    static function config(){
        return [
            'data' => [
                'table' => 'schedules',
                'searchable' => [],
                'filterable' => [
                    'employee_id', 'placement_id', 'shift_id',
                    'date', 'status'
                ],
                'list' => [
                    'schedules.id', 'schedules.employee_id', 'schedules.placement_id',
                    'schedules.shift_id', 'schedules.date', 'schedules.status',
                    'schedules.created_at', 'schedules.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                    'employees.name employee_name',
                    'placements.name placement_name',
                    'shifts.name shift_name',
                ],
                'view' => [
                    'schedules.id', 'schedules.employee_id', 'schedules.placement_id',
                    'schedules.shift_id', 'schedules.date', 'schedules.status',
                    'schedules.created_at', 'schedules.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                    'employees.name employee_name',
                    'placements.name placement_name',
                    'shifts.name shift_name',
                ],
            ],
            'actions' => [
                'index' => [ScheduleController::class, 'index'],
                'show' => [ScheduleController::class, 'show'],
            ]
        ];
    }

    public function index(Request $request)
    {
        $config = $request->otherData('crudConfig');
        $query = DB::table($config['table'])->select($config['list'])->withUserStamp()
                    ->leftJoin('employees','employees.id','=','schedules.employee_id')
                    ->leftJoin('placements','placements.id','=','schedules.placement_id')
                    ->leftJoin('shifts','shifts.id','=','schedules.shift_id')
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
        $data = DB::table($config['table'])->select($config['view'])->withUserStamp()
                ->leftJoin('employees','employees.id','=','schedules.employee_id')
                ->leftJoin('placements','placements.id','=','schedules.placement_id')
                ->leftJoin('shifts','shifts.id','=','schedules.shift_id')
                ->where($config['table'].'.id', $id)->first();

        return Response::json(__('data retrieved'), $data);
    }
}