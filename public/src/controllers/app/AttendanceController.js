
import { CrudController } from "../CrudController.js";
import { storageUrl } from "../../config/env.js";

const attendanceStatusOptions = [
    { value: 'approved', label: 'Disetujui' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Ditolak' }
];

const attendanceTypeOptions = [
    { value: 'presence', label: 'Hadir' },
    { value: 'leave', label: 'Izin/Cuti' },
    { value: 'duty', label: 'Dinas Luar' }
];

export default class AttendanceController extends CrudController {
    config = {
        baseUrl: '/attendances',
        state: {
            data: [],
            meta: { from: 0, last_page: 0, page: 0, per_page: 20, to: 0, total: 0 },
            endpoint: '/attendances',
            query: { per_page: 20, page: 1, search: '' },
            loaded: false,
            isLoading: true
        },
        searchFields: ['notes'],
        list: {
            title: 'Attendances',
            subtitle: 'List of employee attendance records',
            createLabel: 'Create Attendance',
            breadcrumbs: [],
            columns: [
                { label: 'Employee', key: 'employee_name' },
                { label: 'Placement', key: 'placement_name' },
                { label: 'Date', key: 'attendance_date' },
                { label: 'Check In', key: 'start_at' },
                { label: 'Check Out', key: 'end_at', value: data => data ?? '-' },
                { label: 'Type', key: 'record_type', value: function(data, record){
                    const val = attendanceTypeOptions.find(att => att.value == data)
                    return val.label
                } },
                { label: 'Status', key: 'status', value: function(data, record){
                    const val = attendanceStatusOptions.find(att => att.value == data)
                    const template = '<span class="badge rounded-pill px-3 py-2 border '+(data == 'approved' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
                    return template.replace('value', val.label)
                }  }
            ],
            filters: [
                { name: 'employee_id', label: 'Employee', type: 'select', options: [], ajax: { response: { value: 'id', label: 'name' }, url: '/employees' } },
                { name: 'placement_id', label: 'Placement', type: 'select', options: [], ajax: { response: { value: 'id', label: 'name' }, url: '/placements' } },
                { name: 'attendance_date', label: 'Date', type: 'date' },
                { name: 'record_type', label: 'Type', type: 'select', options: attendanceTypeOptions },
                { name: 'status', label: 'Status', type: 'select', options: attendanceStatusOptions }
            ],
            actions: [
                { label: 'View', type: 'link', url: row => `/attendances/${row.id}`, class: '', permissions: ['attendances.view'] },
            ],
            headerActions: [
                
            ]
        },
        view: {
            breadcrumbs: [{ label: 'Attendances', route: '/attendances' }],
            title: 'Attendance Detail',
            subtitle: 'View attendance details',
            fields: [
                { label: 'Request', key: 'request_id', value: (data, record) => {
                    const type = {leave: 'leaves', duty: 'duties'}
                    return !data ? '-' : '<a href="/'+type[record.record_type]+'/'+data+'" router-link>Lihat</a>'
                }},
                { label: 'Employee', key: 'employee_name' },
                { label: 'Placement', key: 'placement_name' },
                // { label: 'Schedule ID', key: 'schedule_id' },
                { label: 'Attendance Date', key: 'attendance_date' },
                { label: 'Check In', key: 'start_at' },
                { label: 'Check Out', key: 'end_at', value: data => data ?? '-' },
                { label: 'Check-in Location', key: 'start_lat', value: (data, record) => {
                    return !data ? '-' : '<a href="https://www.google.com/maps?q='+record.start_lat+','+record.start_lng+'" target="_blank">Lihat</a>'
                } },
                { label: 'Check-out Location', key: 'end_lat', value: (data, record) => {
                    return !data ? '-' : '<a href="https://www.google.com/maps?q='+record.end_lat+','+record.end_lng+'" target="_blank">Lihat</a>'
                }  },
                { label: 'Check-in Photo URL', key: 'start_photo_url', value: (data, record) => {
                    return !data ? '-' : '<a href="'+storageUrl+'/'+data+'" target="_blank">Lihat</a>'
                }},
                { label: 'Check-out Photo URL', key: 'end_photo_url', value: (data, record) => {
                    return !data ? '-' : '<a href="'+storageUrl+'/'+data+'" target="_blank">Lihat</a>'
                } },
                { label: 'Type', key: 'record_type', value: function(data, record){
                    const val = attendanceTypeOptions.find(att => att.value == data)
                    return val.label
                } },
                { label: 'Status', key: 'status', value: function(data, record){
                    const val = attendanceStatusOptions.find(att => att.value == data)
                    const template = '<span class="badge rounded-pill px-3 py-2 border '+(data == 'approved' ? 'text-success-emphasis bg-success-subtle border-success-subtle' : 'text-danger-emphasis bg-danger-subtle border-danger-subtle')+'">value</span>'
                    return template.replace('value', val.label)
                } },
                { label: 'Notes', key: 'notes', value: data => data ?? '-' },
                { label: 'Attachment URL', key: 'file_url', value: (data, record) => {
                    return data ? '<a href="'+storageUrl+'/'+data+'" target="_blank">Lihat</a>' : '-'
                } },
                { label: 'Created At', key: 'created_at' },
            ]
        }
    };
}
