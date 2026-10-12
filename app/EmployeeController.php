<?php

namespace App;

use Libraries\Request;
use Libraries\Response;
use Libraries\Database as DB;
use Libraries\Services\DatabaseService;

class EmployeeController
{
    static function config(){
        return [
            'data' => [
                'table' => 'employees',
                'searchable' => [
                    'code', 'identity_number', 'name',
                    'phone', 'username'
                ],
                'filterable' => [
                    'gender', 'status'
                ],
                'list' => [
                    'employees.id', 'employees.code', 'employees.identity_number', 'employees.name',
                    'employees.gender', 'employees.phone', 'employees.join_date', 'employees.status',
                    'employees.username', 'employees.last_login_at',
                    'employees.created_at', 'employees.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                ],
                'view' => [
                    'employees.id', 'employees.code', 'employees.identity_number', 'employees.name',
                    'employees.gender', 'employees.phone', 'employees.join_date', 'employees.status',
                    'employees.username', 'employees.last_login_at',
                    'employees.created_at', 'employees.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                ],
            ],
            'actions' => [
                'index' => [EmployeeController::class, 'index'],
                'show' => [EmployeeController::class, 'show'],
                'store' => [EmployeeController::class, 'store'],
                'update' => [EmployeeController::class, 'update']
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

    public function store(Request $request)
    {
        $config = $request->otherData('crudConfig');
        $payload = $request->body();
        $payload['password'] = password_hash($payload['password'], PASSWORD_DEFAULT);

        $id = DB::table($config['table'])->insert($payload);
        $data = DB::table($config['table'])->where('id', $id)->first();

        return Response::json(__('create data success'), $data);
    }

    public function update(Request $request)
    {
        $config = $request->otherData('crudConfig');
        $id = $request->params('id');

        $payload = $request->body();

        if(empty($payload['password']))
        {
            unset($payload['password']);
        }
        else
        {
            $payload['password'] = password_hash($payload['password'], PASSWORD_DEFAULT);
        }
        
        DB::table($config['table'])->where('id', $id)->update($payload);

        $data = DB::table($config['table'])->where('id', $id)->first();

        return Response::json(__('update data success'), $data);
    }
}