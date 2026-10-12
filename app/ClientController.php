<?php

namespace App;

use Libraries\Request;
use Libraries\Services\DatabaseService;
use Libraries\Database as DB;
use Libraries\Response;

class ClientController
{
    static function config(){
        return [
            'data' => [
                'table' => 'clients',
                'searchable' => [
                    'code', 'name', 'pic_name', 'phone'
                ],
                'filterable' => [
                    'status'
                ],
                'list' => [
                    'clients.id', 'clients.code', 'clients.name', 'clients.pic_name', 'clients.phone',
                    'clients.status', 'clients.created_at', 'clients.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                ],
                'view' => [
                    'clients.id', 'clients.code', 'clients.name', 'clients.pic_name', 'clients.phone',
                    'clients.status', 'clients.created_at', 'clients.updated_at',
                    'creator.name created_by_name',
                    'updater.name updated_by_name',
                ],
            ],
            'actions' => [
                'index' => [ClientController::class, 'index'],
                'show' => [ClientController::class, 'show'],
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