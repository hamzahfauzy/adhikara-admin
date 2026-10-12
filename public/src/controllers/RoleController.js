import { CrudController } from "./CrudController.js";

export default class RoleController extends CrudController {

    config = {
        baseUrl: '/roles',
        state: {
            data: [],
            meta: {
                from: 0,
                last_page: 0,
                page: 0,
                per_page: 20,
                to: 0,
                total: 0
            },
            endpoint: '/roles',
            query: {
                per_page: 20,
                page: 1,
                search: ''
            },
            loaded: false,
            isLoading: true
        },
        searchFields: [],
        list: {
            title: 'Role',
            subtitle: 'List of role data',
            createLabel: 'Create Role',
            breadcrumbs: [],
            columns: [
                {label: 'Name', key: 'name'},
                {label: 'Slug', key: 'slug'},
                {label: 'Description', key: 'description'},
            ],
            filters: [],
            actions: [
                {
                    label: 'View', type: 'link', 
                    url: row => { return '/roles/' + row.id }, 
                    class: '',
                    permissions: ['roles.view'],
                },
                {
                    label: 'Edit', type: 'link', 
                    url: row => { return '/roles/' + row.id + '/edit' }, 
                    class: '',
                    permissions: ['roles.edit'],
                },
                {
                    label: 'Delete', type: 'button', 
                    class: 'btn-delete text-danger',
                    permissions: ['roles.delete'],
                },
            ],
            headerActions: [
                {
                    label: '<i class="bi bi-plus-lg me-2"></i> Create Role', route: '/roles/create', 
                    class: 'btn btn-primary', permissions: ['roles.create'],
                    type: 'link'
                }
            ],
        },
        view: {
            breadcrumbs: [
                {label: 'Roles', route: '/roles'}
            ],
            title: 'Role Detail',
            subtitle: 'View detail of role data',
            fields: [
                {label: 'Name', key: 'name'},
                {label: 'Slug', key: 'slug'},
                {label: 'Description', key: 'description'},
                {
                    label: 'Permission', key: 'permission_data', 
                    value: function(data, record){
                        var html = '';
                        for(const permission of data)
                        {
                            html += '<span class="badge border text-success-emphasis bg-success-subtle border-success-subtle me-1">'+permission.name+'</span>'
                        }
                        return html
                    }
                },
            ],
        },
        create: {
            title: 'Create Role',
            subtitle: 'Fill form to create role',
            breadcrumbs: [
                {label: 'Role', route: '/roles'}
            ],
            fields: [
                {name: 'name', label: 'Name', type: 'text', required: true},
                {name: 'slug', label: 'Slug', type: 'text', required: true},
                {name: 'description', label: 'Description', type: 'textarea', required: true},
                {
                    name: 'permissions', label: 'Permissions', 
                    type: 'checkbox',
                    options: [],
                    ajax: {
                        response: {value: 'id', label: 'name'},
                        url: '/permissions',
                    },
                    required: true
                },
            ],
        },
        edit: {
            title: 'Edit Role',
            subtitle: 'Edit form to update role',
            breadcrumbs: [
                {label: 'Role', route: '/roles'}
            ],
            fields: [
                {name: 'name', label: 'Name', type: 'text', required: true},
                {name: 'slug', label: 'Slug', type: 'text', required: true},
                {name: 'description', label: 'Description', type: 'textarea', required: true},
                {
                    name: 'permissions', label: 'Permissions', 
                    type: 'checkbox',
                    options: [],
                    ajax: {
                        response: {value: 'id', label: 'name'},
                        url: '/permissions',
                    },
                    required: true
                },
            ],
        },
    }

}