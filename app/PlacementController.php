<?php

namespace App;

use Libraries\Database as DB;
use Libraries\Request;
use Libraries\Response;
use Libraries\Services\DatabaseService;

class PlacementController
{
    static function config(){
        return [
            'data' => [
                'table' => 'placements',
                'searchable' => [
                    'name', 'position'
                ],
                'filterable' => [
                    'employee_id', 'client_id', 'status',
                    'start_date', 'end_date'
                ],
                'list' => [
                    'placements.id', 'placements.employee_id', 'placements.client_id',
                    'placements.name', 'placements.position', 'placements.lat', 'placements.lng', 'placements.radius',
                    'placements.start_date', 'placements.end_date', 'placements.status',
                    'placements.created_at', 'placements.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                    'employees.name employee_name',
                    'clients.name client_name',
                ],
                'view' => [
                    'placements.id', 'placements.employee_id', 'placements.client_id',
                    'placements.name', 'placements.position', 'placements.lat', 'placements.lng', 'placements.radius',
                    'placements.start_date', 'placements.end_date', 'placements.status',
                    'placements.created_at', 'placements.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                    'employees.name employee_name',
                    'clients.name client_name',
                ],
            ],
            'actions' => [
                'index' => [PlacementController::class, 'index'],
                'show' => [PlacementController::class, 'show'],
            ]
        ];
    }

    public function index(Request $request)
    {
        $config = $request->otherData('crudConfig');
        $query = DB::table($config['table'])->select($config['list'])->withUserStamp()
                ->leftJoin('employees','employees.id','=','placements.employee_id')
                ->leftJoin('clients','clients.id','=','placements.client_id')
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
        $data = DB::table($config['table'])->select($config['view'])->withUserStamp()->where($config['table'].'.id', $id)
                ->leftJoin('employees','employees.id','=','placements.employee_id')
                ->leftJoin('clients','clients.id','=','placements.client_id')
                ->first();

        return Response::json(__('data retrieved'), $data);
    }
}