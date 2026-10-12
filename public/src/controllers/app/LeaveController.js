
import { CrudController } from "../CrudController.js";
import { storageUrl } from "../../config/env.js";
import view from "../../core/view.js";

const leaveStatusOptions = [
    { value: 'pending', label: 'Menunggu', bg: 'text-warning-emphasis bg-warning-subtle border-warning-subtle' },
    { value: 'approved', label: 'Disetujui', bg: 'text-success-emphasis bg-success-subtle border-success-subtle'},
    { value: 'rejected', label: 'Ditolak', bg: 'text-danger-emphasis bg-danger-subtle border-danger-subtle' }
];

export default class LeaveController extends CrudController {
    config = {
        baseUrl: '/leaves',
        state: {
            data: [],
            meta: { from: 0, last_page: 0, page: 0, per_page: 20, to: 0, total: 0 },
            endpoint: '/leaves',
            query: { per_page: 20, page: 1, search: '' },
            loaded: false,
            isLoading: true
        },
        searchFields: ['notes', 'rejection_reason'],
        list: {
            title: 'Leaves',
            subtitle: 'List of employee leave requests',
            createLabel: 'Create Leave Request',
            breadcrumbs: [],
            columns: [
                { label: 'Employee', key: 'employee_name' },
                { label: 'Placement', key: 'placement_name' },
                { label: 'Start Date', key: 'start_at' },
                { label: 'End Date', key: 'end_at' },
                { label: 'Status', key: 'status', value: function(data, record){
                    const selected = leaveStatusOptions.find(ls => ls.value == data)
                    return '<span class="badge rounded-pill px-3 py-2 border text-capitalize '+selected.bg+'">'+selected.label+'</span>'
                }},
                { label: 'Reviewed At', key: 'reviewed_at', value: data => data ?? '-' }
            ],
            filters: [
                { name: 'employee_id', label: 'Employee', type: 'select', options: [], ajax: { response: { value: 'id', label: 'name' }, url: '/employees' } },
                { name: 'placement_id', label: 'Placement', type: 'select', options: [], ajax: { response: { value: 'id', label: 'name' }, url: '/placements' } },
                { name: 'status', label: 'Status', type: 'select', options: leaveStatusOptions },
                { name: 'start_at', label: 'Start Date', type: 'date' },
                { name: 'end_at', label: 'End Date', type: 'date' }
            ],
            actions: [
                { label: 'View', type: 'link', url: row => `/leaves/${row.id}`, class: '', permissions: ['leaves.view'] }
            ],
            headerActions: [
            ]
        },
        view: {
            breadcrumbs: [{ label: 'Leaves', route: '/leaves' }],
            title: 'Leave Request Detail',
            subtitle: 'View employee leave request',
            fields: [
                { label: 'Employee', key: 'employee_name' },
                { label: 'Placement', key: 'placement_name' },
                { label: 'Start Date', key: 'start_at' },
                { label: 'End Date', key: 'end_at' },
                { label: 'Status', key: 'status', value: function(data, record){
                    const selected = leaveStatusOptions.find(ls => ls.value == data)
                    return '<span class="badge rounded-pill px-3 py-2 border text-capitalize '+selected.bg+'">'+selected.label+'</span>'
                }},
                { label: 'Leave Reason', key: 'notes' },
                { label: 'Supporting Document', key: 'file_url', value: (data, record) => {
                    return '<a href="'+storageUrl+'/'+data+'" target="_blank">Lihat</a>'
                } },
                { label: 'Reviewed By', key: 'reviewed_by', value: data => data ?? '-' },
                { label: 'Reviewed At', key: 'reviewed_at', value: data => data ?? '-' },
                { label: 'Rejection Reason', key: 'rejection_reason', value: data => data ?? '-' },
                { label: 'Created At', key: 'created_at' },
            ]
        },
    };

    async show(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
        }

        const response = await ctx.http.get(ctx.state.endpoint + '/' + ctx.params.id)

        ctx.onMounted(() => {
            ctx.on('.btn-approved', 'click', async e => {
                if(!confirm('Apakah anda yakin akan menyetujui permintaan ini ?')) return false

                const formData = new FormData()
                formData.append('id', ctx.params.id)

                await ctx.http.put('/attendance-requests/' + ctx.params.id + '/approved', formData)

                ctx.flash("success", "Data updated.");

                ctx.redirect(this.config.baseUrl + '/' + ctx.params.id)

                return false;
            })
            
            ctx.on('.btn-rejected', 'click', async e => {
                if(!confirm('Apakah anda yakin akan menolak permintaan ini ?')) return false

                const formData = new FormData()
                formData.append('id', ctx.params.id)
                
                await ctx.http.put('/attendance-requests/' + ctx.params.id + '/rejected', formData)

                ctx.flash("success", "Data updated.");

                ctx.redirect(this.config.baseUrl + '/' + ctx.params.id)

                return false;
            })
        })

        
        return await view.render('app/attendance-requests/detail', {...ctx.state, pageAttr: this.config.view, baseUrl: this.config.baseUrl, data: response.data})

    }
}
