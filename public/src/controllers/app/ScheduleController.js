
import { CrudController } from "../CrudController.js";

const scheduleStatusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'day_off', label: 'Day Off' }
];

const scheduleFields = [
    {
        name: 'employee_id', label: 'Employee', type: 'select', required: true,
        options: [],
        ajax: { response: { value: 'id', label: 'name' }, url: '/employees' }
    },
    {
        name: 'placement_id', label: 'Placement', type: 'select', required: true,
        options: [],
        ajax: { response: { value: 'id', label: 'name' }, url: '/placements' }
    },
    {
        name: 'shift_id', label: 'Shift', type: 'select', required: true,
        options: [],
        ajax: { response: { value: 'id', label: 'name' }, url: '/shifts' }
    },
    { name: 'date', label: 'Schedule Date', type: 'date', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: scheduleStatusOptions }
];

export default class ScheduleController extends CrudController {
    config = {
        baseUrl: '/schedules',
        state: {
            data: [],
            meta: { from: 0, last_page: 0, page: 0, per_page: 20, to: 0, total: 0 },
            endpoint: '/schedules',
            query: { per_page: 20, page: 1, search: '' },
            loaded: false,
            isLoading: true
        },
        searchFields: [],
        list: {
            title: 'Schedules',
            subtitle: 'List of employee schedules',
            createLabel: 'Create Schedule',
            breadcrumbs: [],
            columns: [
                { label: 'Employee', key: 'employee_name' },
                { label: 'Placement', key: 'placement_name' },
                { label: 'Shift', key: 'shift_name' },
                { label: 'Date', key: 'date' },
                { label: 'Status', key: 'status', value: function(data, record){
                    const template = '<span class="badge rounded-pill px-3 py-2 border text-capitalize '+(data == 'scheduled' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
                    return template.replace('value', data)
                } },
                {label: 'Created By', key: 'created_by_name'},
                {label: 'Created At', key: 'created_at'},
                {label: 'Updated By', key: 'updated_by_name', value: (data, row) => {
                    return data ?? '-'
                }},
                {label: 'Updated At', key: 'updated_at'},
            ],
            filters: [
                { name: 'employee_id', label: 'Employee', type: 'select', options: [], ajax: { response: { value: 'id', label: 'name' }, url: '/employees' } },
                { name: 'placement_id', label: 'Placement', type: 'select', options: [], ajax: { response: { value: 'id', label: 'name' }, url: '/placements' } },
                { name: 'shift_id', label: 'Shift', type: 'select', options: [], ajax: { response: { value: 'id', label: 'name' }, url: '/shifts' } },
                { name: 'date', label: 'Date', type: 'date' },
                { name: 'status', label: 'Status', type: 'select', options: scheduleStatusOptions }
            ],
            actions: [
                { label: 'View', type: 'link', url: row => `/schedules/${row.id}`, class: '', permissions: ['schedules.view'] },
                { label: 'Edit', type: 'link', url: row => `/schedules/${row.id}/edit`, class: '', permissions: ['schedules.edit'] },
                { label: 'Delete', type: 'button', class: 'btn-delete text-danger', permissions: ['schedules.delete'] }
            ],
            headerActions: [
                { label: '<i class="bi bi-plus-lg me-2"></i> Create Schedule', route: '/schedules/create', class: 'btn btn-primary', permissions: ['schedules.create'], type: 'link' }
            ]
        },
        view: {
            breadcrumbs: [{ label: 'Schedules', route: '/schedules' }],
            title: 'Schedule Detail',
            subtitle: 'View schedule details',
            fields: [
                { label: 'Employee', key: 'employee_name' },
                { label: 'Placement', key: 'placement_name' },
                { label: 'Shift', key: 'shift_name' },
                { label: 'Date', key: 'date' },
                { label: 'Status', key: 'status', value: function(data, record){
                        const template = '<span class="badge rounded-pill px-3 py-2 border '+(data == 'scheduled' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
                        return '<span class="text-capitalize">'+template.replace('value', data)+'</span>'
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
            title: 'Create Schedule',
            subtitle: 'Assign a shift to an employee',
            breadcrumbs: [{ label: 'Schedules', route: '/schedules' }],
            fields: scheduleFields
        },
        edit: {
            title: 'Edit Schedule',
            subtitle: 'Update schedule data',
            breadcrumbs: [{ label: 'Schedules', route: '/schedules' }],
            fields: scheduleFields
        }
    };
}
