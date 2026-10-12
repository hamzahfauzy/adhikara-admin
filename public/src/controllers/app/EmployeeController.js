
import { CrudController } from "../CrudController.js";

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'resigned', label: 'Resigned' }
];

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
];

const employeeFields = [
    { name: 'code', label: 'Employee Code', type: 'text', required: true },
    { name: 'identity_number', label: 'Identity Number', type: 'text' },
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'gender', label: 'Gender', type: 'select', options: genderOptions },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'join_date', label: 'Join Date', type: 'date', required: true },
    { name: 'address', label: 'Address', type: 'textarea' },
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: statusOptions }
];

export default class EmployeeController extends CrudController {
    config = {
        baseUrl: '/employees',
        state: {
            data: [],
            meta: { from: 0, last_page: 0, page: 0, per_page: 20, to: 0, total: 0 },
            endpoint: '/employees',
            query: { per_page: 20, page: 1, search: '' },
            loaded: false,
            isLoading: true
        },
        searchFields: ['code', 'identity_number', 'name', 'phone', 'username'],
        list: {
            title: 'Employees',
            subtitle: 'List of employee data',
            createLabel: 'Create Employee',
            breadcrumbs: [],
            columns: [
                { label: 'Code', key: 'code' },
                { label: 'Identity Number', key: 'identity_number' },
                { label: 'Name', key: 'name' },
                { label: 'Gender', key: 'gender' },
                { label: 'Phone', key: 'phone' },
                { label: 'Join Date', key: 'join_date' },
                { label: 'Username', key: 'username' },
                { label: 'Status', key: 'status', value: function(data, record){
                        const template = '<span class="badge rounded-pill px-3 py-2 border '+(data == 'active' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
                        return template.replace('value', data == 'active' ? 'Active' : 'Not Active')
                    }  },
                {label: 'Created By', key: 'created_by_name'},
                {label: 'Created At', key: 'created_at'},
                {label: 'Updated By', key: 'updated_by_name', value: (data, row) => {
                    return data ?? '-'
                }},
                {label: 'Updated At', key: 'updated_at'},
            ],
            filters: [
                { name: 'gender', label: 'Gender', type: 'select', options: genderOptions },
                { name: 'status', label: 'Status', type: 'select', options: statusOptions }
            ],
            actions: [
                { label: 'View', type: 'link', url: row => `/employees/${row.id}`, class: '', permissions: ['employees.view'] },
                { label: 'Edit', type: 'link', url: row => `/employees/${row.id}/edit`, class: '', permissions: ['employees.edit'] },
                { label: 'Delete', type: 'button', class: 'btn-delete text-danger', permissions: ['employees.delete'] }
            ],
            headerActions: [
                { label: '<i class="bi bi-plus-lg me-2"></i> Create Employee', route: '/employees/create', class: 'btn btn-primary', permissions: ['employees.create'], type: 'link' }
            ]
        },
        view: {
            breadcrumbs: [{ label: 'Employees', route: '/employees' }],
            title: 'Employee Detail',
            subtitle: 'View detail of employee data',
            fields: [
                { label: 'Code', key: 'code' },
                { label: 'Identity Number', key: 'identity_number' },
                { label: 'Name', key: 'name' },
                { label: 'Gender', key: 'gender' },
                { label: 'Phone', key: 'phone' },
                { label: 'Join Date', key: 'join_date' },
                { label: 'Address', key: 'address' },
                { label: 'Status', key: 'status', value: function(data, record){
                        const template = '<span class="badge rounded-pill px-3 py-2 border '+(data == 'active' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
                        return template.replace('value', data == 'active' ? 'Active' : 'Not Active')
                    }  },
                { label: 'Username', key: 'username' },
                { label: 'Last Login', key: 'last_login_at' },
                {label: 'Created By', key: 'created_by_name'},
                {label: 'Created At', key: 'created_at'},
                {label: 'Updated By', key: 'updated_by_name', value: (data, row) => {
                    return data ?? '-'
                }},
                {label: 'Updated At', key: 'updated_at'},
            ]
        },
        create: {
            title: 'Create Employee',
            subtitle: 'Fill form to create an employee',
            breadcrumbs: [{ label: 'Employees', route: '/employees' }],
            fields: [
                ...employeeFields,
                { name: 'password', label: 'Password', type: 'password', required: true }
            ]
        },
        edit: {
            title: 'Edit Employee',
            subtitle: 'Edit employee data',
            breadcrumbs: [{ label: 'Employees', route: '/employees' }],
            fields: employeeFields
        }
    };
}
