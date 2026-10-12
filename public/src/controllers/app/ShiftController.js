
import { CrudController } from "../CrudController.js";

const shiftStatusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
];

const shiftFields = [
    { name: 'code', label: 'Shift Code', type: 'text', required: true },
    { name: 'name', label: 'Shift Name', type: 'text', required: true },
    { name: 'start_time', label: 'Start Time', type: 'time', required: true },
    { name: 'end_time', label: 'End Time', type: 'time', required: true },
    { name: 'late_tolerance_minutes', label: 'Late Tolerance (minutes)', type: 'number', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: shiftStatusOptions }
];

export default class ShiftController extends CrudController {
    config = {
        baseUrl: '/shifts',
        state: {
            data: [],
            meta: { from: 0, last_page: 0, page: 0, per_page: 20, to: 0, total: 0 },
            endpoint: '/shifts',
            query: { per_page: 20, page: 1, search: '' },
            loaded: false,
            isLoading: true
        },
        searchFields: ['code', 'name'],
        list: {
            title: 'Shifts',
            subtitle: 'List of work shifts',
            createLabel: 'Create Shift',
            breadcrumbs: [],
            columns: [
                { label: 'Code', key: 'code' },
                { label: 'Name', key: 'name' },
                { label: 'Start Time', key: 'start_time' },
                { label: 'End Time', key: 'end_time' },
                { label: 'Late Tolerance (min)', key: 'late_tolerance_minutes' },
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
                { name: 'status', label: 'Status', type: 'select', options: shiftStatusOptions }
            ],
            actions: [
                { label: 'View', type: 'link', url: row => `/shifts/${row.id}`, class: '', permissions: ['shifts.view'] },
                { label: 'Edit', type: 'link', url: row => `/shifts/${row.id}/edit`, class: '', permissions: ['shifts.edit'] },
                { label: 'Delete', type: 'button', class: 'btn-delete text-danger', permissions: ['shifts.delete'] }
            ],
            headerActions: [
                { label: '<i class="bi bi-plus-lg me-2"></i> Create Shift', route: '/shifts/create', class: 'btn btn-primary', permissions: ['shifts.create'], type: 'link' }
            ]
        },
        view: {
            breadcrumbs: [{ label: 'Shifts', route: '/shifts' }],
            title: 'Shift Detail',
            subtitle: 'View shift details',
            fields: [
                { label: 'Code', key: 'code' },
                { label: 'Name', key: 'name' },
                { label: 'Start Time', key: 'start_time' },
                { label: 'End Time', key: 'end_time' },
                { label: 'Late Tolerance (minutes)', key: 'late_tolerance_minutes' },
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
            title: 'Create Shift',
            subtitle: 'Fill form to create a shift',
            breadcrumbs: [{ label: 'Shifts', route: '/shifts' }],
            fields: shiftFields
        },
        edit: {
            title: 'Edit Shift',
            subtitle: 'Edit shift data',
            breadcrumbs: [{ label: 'Shifts', route: '/shifts' }],
            fields: shiftFields
        }
    };
}
