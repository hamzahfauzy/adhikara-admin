
import { CrudController } from "../CrudController.js";

const placementStatusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'ended', label: 'Ended' }
];

const placementFields = [
    {
        name: 'employee_id', label: 'Employee', type: 'select', required: true,
        options: [],
        ajax: { response: { value: 'id', label: 'name' }, url: '/employees' }
    },
    {
        name: 'client_id', label: 'Client', type: 'select', required: true,
        options: [],
        ajax: { response: { value: 'id', label: 'name' }, url: '/clients' }
    },
    { name: 'name', label: 'Placement Name', type: 'text', required: true },
    { name: 'position', label: 'Position', type: 'text' },
    { name: 'lat', label: 'Latitude', type: 'text', required: true },
    { name: 'lng', label: 'Longitude', type: 'text', required: true },
    { name: 'radius', label: 'Attendance Radius (meters)', type: 'number', required: true },
    { name: 'start_date', label: 'Start Date', type: 'date', required: true },
    { name: 'end_date', label: 'End Date', type: 'date' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: placementStatusOptions }
];

export default class PlacementController extends CrudController {
    config = {
        baseUrl: '/placements',
        state: {
            data: [],
            meta: { from: 0, last_page: 0, page: 0, per_page: 20, to: 0, total: 0 },
            endpoint: '/placements',
            query: { per_page: 20, page: 1, search: '' },
            loaded: false,
            isLoading: true
        },
        searchFields: ['name', 'position'],
        list: {
            title: 'Placements',
            subtitle: 'List of employee placements',
            createLabel: 'Create Placement',
            breadcrumbs: [],
            columns: [
                { label: 'Name', key: 'name' },
                { label: 'Position', key: 'position' },
                { label: 'Employee', key: 'employee_name' },
                { label: 'Client', key: 'client_name' },
                { label: 'Start Date', key: 'start_date' },
                { label: 'End Date', key: 'end_date' },
                { label: 'Radius (m)', key: 'radius' },
                { label: 'Status', key: 'status', value: function(data, record){
                        const template = '<span class="badge rounded-pill px-3 py-2 border '+(data == 'active' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
                        return '<span class="text-capitalize">'+template.replace('value', data)+'</span>'
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
                { name: 'client_id', label: 'Client', type: 'select', options: [], ajax: { response: { value: 'id', label: 'name' }, url: '/clients' } },
                { name: 'status', label: 'Status', type: 'select', options: placementStatusOptions },
                { name: 'start_date', label: 'Start Date', type: 'date' },
                { name: 'end_date', label: 'End Date', type: 'date' }
            ],
            actions: [
                { label: 'View', type: 'link', url: row => `/placements/${row.id}`, class: '', permissions: ['placements.view'] },
                { label: 'Edit', type: 'link', url: row => `/placements/${row.id}/edit`, class: '', permissions: ['placements.edit'] },
                { label: 'Delete', type: 'button', class: 'btn-delete text-danger', permissions: ['placements.delete'] }
            ],
            headerActions: [
                { label: '<i class="bi bi-plus-lg me-2"></i> Create Placement', route: '/placements/create', class: 'btn btn-primary', permissions: ['placements.create'], type: 'link' }
            ]
        },
        view: {
            breadcrumbs: [{ label: 'Placements', route: '/placements' }],
            title: 'Placement Detail',
            subtitle: 'View placement details',
            fields: [
                { label: 'Employee', key: 'employee_name' },
                { label: 'Client', key: 'client_name' },
                { label: 'Name', key: 'name' },
                { label: 'Position', key: 'position' },
                { label: 'Latitude', key: 'lat' },
                { label: 'Longitude', key: 'lng' },
                { label: 'Radius (meters)', key: 'radius' },
                { label: 'Start Date', key: 'start_date' },
                { label: 'End Date', key: 'end_date' },
                { label: 'Status', key: 'status', value: function(data, record){
                        const template = '<span class="badge rounded-pill px-3 py-2 border '+(data == 'active' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
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
            title: 'Create Placement',
            subtitle: 'Assign an employee to a client location',
            breadcrumbs: [{ label: 'Placements', route: '/placements' }],
            fields: placementFields
        },
        edit: {
            title: 'Edit Placement',
            subtitle: 'Update placement details',
            breadcrumbs: [{ label: 'Placements', route: '/placements' }],
            fields: placementFields
        }
    };
}
