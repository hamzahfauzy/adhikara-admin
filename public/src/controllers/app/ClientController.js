
import { CrudController } from "../CrudController.js";

export default class ClientController extends CrudController {
    config = {
        baseUrl: '/clients',
        state: {
            data: [],
            meta: { from: 0, last_page: 0, page: 0, per_page: 20, to: 0, total: 0 },
            endpoint: '/clients',
            query: { per_page: 20, page: 1, search: '' },
            loaded: false,
            isLoading: true
        },
        searchFields: ['code', 'name', 'pic_name', 'phone'],
        list: {
            title: 'Clients',
            subtitle: 'List of client data',
            createLabel: 'Create Client',
            breadcrumbs: [],
            columns: [
                { label: 'Code', key: 'code' },
                { label: 'Name', key: 'name' },
                { label: 'PIC Name', key: 'pic_name' },
                { label: 'Phone', key: 'phone' },
                { label: 'Status', key: 'status', value: function(data, record){
                        const template = '<span class="badge rounded-pill px-3 py-2 border '+(data == 'active' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
                        return template.replace('value', data == 'active' ? 'Active' : 'Not Active')
                    } },
                {label: 'Created By', key: 'created_by_name'},
                {label: 'Created At', key: 'created_at'},
                {label: 'Updated By', key: 'updated_by_name', value: (data, row) => {
                    return data ?? '-'
                }},
                {label: 'Updated At', key: 'updated_at'},
            ],
            filters: [
                {
                    name: 'status', label: 'Status', type: 'select',
                    options: [
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' }
                    ]
                }
            ],
            actions: [
                { label: 'View', type: 'link', url: row => `/clients/${row.id}`, class: '', permissions: ['clients.view'] },
                { label: 'Edit', type: 'link', url: row => `/clients/${row.id}/edit`, class: '', permissions: ['clients.edit'] },
                { label: 'Delete', type: 'button', class: 'btn-delete text-danger', permissions: ['clients.delete'] }
            ],
            headerActions: [
                { label: '<i class="bi bi-plus-lg me-2"></i> Create Client', route: '/clients/create', class: 'btn btn-primary', permissions: ['clients.create'], type: 'link' }
            ]
        },
        view: {
            breadcrumbs: [{ label: 'Clients', route: '/clients' }],
            title: 'Client Detail',
            subtitle: 'View detail of client data',
            fields: [
                { label: 'Code', key: 'code' },
                { label: 'Name', key: 'name' },
                { label: 'PIC Name', key: 'pic_name' },
                { label: 'Phone', key: 'phone' },
                { label: 'Status', key: 'status', value: function(data, record){
                        const template = '<span class="badge rounded-pill px-3 py-2 border '+(data == 'active' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
                        return template.replace('value', data == 'active' ? 'Active' : 'Not Active')
                    } },
                {label: 'Created By', key: 'created_by_name'},
                {label: 'Created At', key: 'created_at'},
                {label: 'Updated By', key: 'updated_by_name', value: (data, row) => {
                    return data ?? '-'
                }},
                {label: 'Updated At', key: 'updated_at'},
            ]
        },
        create: {
            title: 'Create Client',
            subtitle: 'Fill form to create a client',
            breadcrumbs: [{ label: 'Clients', route: '/clients' }],
            fields: [
                { name: 'code', label: 'Code', type: 'text', required: true },
                { name: 'name', label: 'Name', type: 'text', required: true },
                { name: 'pic_name', label: 'PIC Name', type: 'text' },
                { name: 'phone', label: 'Phone', type: 'tel' },
                {
                    name: 'status', label: 'Status', type: 'select', required: true,
                    options: [
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' }
                    ]
                }
            ]
        },
        edit: {
            title: 'Edit Client',
            subtitle: 'Edit client data',
            breadcrumbs: [{ label: 'Clients', route: '/clients' }],
            fields: [
                { name: 'code', label: 'Code', type: 'text', required: true },
                { name: 'name', label: 'Name', type: 'text', required: true },
                { name: 'pic_name', label: 'PIC Name', type: 'text' },
                { name: 'phone', label: 'Phone', type: 'tel' },
                {
                    name: 'status', label: 'Status', type: 'select', required: true,
                    options: [
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' }
                    ]
                }
            ]
        }
    };
}
