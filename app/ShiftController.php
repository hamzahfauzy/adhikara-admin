<?php

namespace App;

use Libraries\Database as DB;
use Libraries\Request;
use Libraries\Response;
use Libraries\Services\DatabaseService;

class ShiftController
{
    static function config(){
        return [
            'data' => [
                'table' => 'shifts',
                'searchable' => [
                    'code', 'name'
                ],
                'filterable' => [
                    'status'
                ],
                'list' => [
                    'shifts.id', 'shifts.code', 'shifts.name', 'shifts.start_time',
                    'shifts.end_time', 'shifts.late_tolerance_minutes',
                    'shifts.status', 'shifts.created_at', 'shifts.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                ],
                'view' => [
                    'shifts.id', 'shifts.code', 'shifts.name', 'shifts.start_time',
                    'shifts.end_time', 'shifts.late_tolerance_minutes',
                    'shifts.status', 'shifts.created_at', 'shifts.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                ],
            ],
            'actions' => [
                'index' => [ShiftController::class, 'index'],
                'show' => [ShiftController::class, 'show'],
            ]
        ];
    }

    public function index(Request $request)
    {
        $config = $request->otherData('crudConfig');
        $query = DB::table($config['table'])->select($config['list'])->withUserStamp();

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
        $data = DB::table($config['table'])->select($config['view'])->withUserStamp()->where($config['table'].'.id', $id)->first();

        return Response::json(__('data retrieved'), $data);
    }
}