<?php

namespace Libraries;

use Closure;

class Route
{
    /**
     * Semua route yang terdaftar.
     */
    protected static array $routes = [];

    /**
     * Prefix group.
     */
    protected static string $prefix = '';

    public static function get(string $uri, ...$handlers): void
    {
        self::add('GET', $uri, $handlers);
    }

    public static function post(string $uri, ...$handlers): void
    {
        self::add('POST', $uri, $handlers);
    }

    public static function put(string $uri, ...$handlers): void
    {
        self::add('PUT', $uri, $handlers);
    }

    public static function patch(string $uri, ...$handlers): void
    {
        self::add('PATCH', $uri, $handlers);
    }

    public static function delete(string $uri, ...$handlers): void
    {
        self::add('DELETE', $uri, $handlers);
    }

    protected static function add(
        string $method,
        string $uri,
        array $handlers
    ): void {

        $uri = '/' . trim(self::$prefix . '/' . trim($uri, '/'), '/');

        self::$routes[] = [
            'method' => strtoupper($method),
            'uri'    => $uri,
            'handlers' => $handlers,
        ];
    }

    public static function group(string $prefix, callable $callback): void
    {
        $oldPrefix = self::$prefix;
        self::$prefix .= '/' . trim($prefix, '/');
        $callback();
        self::$prefix = $oldPrefix;
    }

    public static function crud(string $uri, $config, $permissionPrefix = '*', ...$handlers)
    {
        $config = self::parseConfig($config);

        $defaultActions = [
            'index' => [Crud::class, 'index'],
            'store' => [Crud::class, 'store'],
            'update' => [Crud::class, 'update'],
            'destroy' => [Crud::class, 'destroy'],
            'show' => [Crud::class, 'show'],
        ];

        $defaultData = [
            'table' => '',
            'searchable'  => [],
            'filterable'  => [],
            'sortable'  => [],
            'list'  => '*',
            'view'  => '*'
        ];

        $otherData = array_merge($defaultData, $config['data']);
        $actions = array_merge($defaultActions, $config['actions'] ?? []);

        $excludeActions = array_merge(isset($config['exclude_actions']) ? $config['exclude_actions'] : [], []);

        $permissions = [
            'index' => $permissionPrefix == '*' ? $permissionPrefix : $permissionPrefix.'index',
            'store' => $permissionPrefix == '*' ? $permissionPrefix : $permissionPrefix.'store',
            'update' => $permissionPrefix == '*' ? $permissionPrefix : $permissionPrefix.'update',
            'destroy' => $permissionPrefix == '*' ? $permissionPrefix : $permissionPrefix.'destroy',
            'show' => $permissionPrefix == '*' ? $permissionPrefix : $permissionPrefix.'show',
        ];

        $requests = [
            'index' => ['GET', $uri],
            'store' => ['POST', $uri],
            'show' => ['GET', $uri . '/{id}'],
            'update' => ['PUT', $uri . '/{id}'],
            'destroy' => ['DELETE', $uri . '/{id}'],
        ];

        foreach($excludeActions as $act)
        {
            if(isset($permissions[$act]))
            {
                unset($permissions[$act]);
                unset($requests[$act]);
                unset($actions[$act]);
            }
        }

        foreach($requests as $key => $_uri)
        {
            self::add($_uri[0], $_uri[1], [...$handlers, permissionMiddleware($permissions[$key]), crudConfig($otherData), $actions[$key]]);
        }
    }

    protected static function parseConfig($config)
    {
        if (is_string($config) && file_exists($config .'.php')) {
            return require $config . '.php';
        }

        if (is_callable($config)) {
            return call_user_func($config);
        }

        if ($config instanceof Closure) {
            return $config();
        }

        return null;
    }

    public static function all(): array
    {
        return self::$routes;
    }
}