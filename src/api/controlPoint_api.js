import {axios} from '@/utils/request'

const api = {
    list: 'controlPoint/list',
    CutoffBOMRefresh:'controlPoint/update',
    CalculateSubmit:'controlPoint/calculateSubmit',
    BakeSubmit:'controlPoint/bakeSubmit',
    PreWriteBack:'controlPoint/preWriteBack',
    PartialBake:'controlPoint/partialBake',
    WriteBack: 'controlPoint/writeBack',
    NewCycle:'controlPoint/newCycle',
    ExecuteReport: 'controlPoint/executeReport'
}

export default api

export function list(parameter) {
    return axios({
        url: api.list,
        method: 'get',
        data: parameter
    })
}

export function ExecuteReport(parameter) {
    return axios({
        url: api.ExecuteReport,
        method: 'post',
        data: parameter
    })
}

export function CutoffBOMRefresh(parameter) {
    return axios({
        url: api.CutoffBOMRefresh,
        method: 'put',
        params: parameter
    })
}
export function CalculateSubmit(parameter) {
    return axios({
        url: api.CalculateSubmit,
        method: 'post',
        data: parameter
    })
}
export function BakeSubmit(parameter) {
    return axios({
        url: api.BakeSubmit,
        method: 'post',
        data: parameter
    })
}
export function PreWriteBack(parameter) {
    return axios({
        url: api.PreWriteBack,
        method: 'post',
        data: parameter
    })
}
export function PartialBake(parameter) {
    return axios({
        url: api.PartialBake,
        method: 'post',
        data: parameter
    })
}
export function WriteBack(parameter) {
    return axios({
        url: api.WriteBack,
        method: 'post',
        data: parameter
    })
}
export function NewCycle(parameter) {
    return axios({
        url: api.NewCycle,
        method: 'post',
        data: parameter
    })
}

