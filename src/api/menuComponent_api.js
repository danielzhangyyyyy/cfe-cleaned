import { axios } from '@/utils/request'

const api = {
    refreshMenu: 'login/getMenuList',
    setFavoriteMenu: 'common/favoriteMenu'
}

export default api

export function refreshMenu(parameter) {
    return axios({
        url: api.refreshMenu,
        method: 'get',
        params: parameter
    })
}

export function setFavoriteMenu(parameter) {
    return axios({
        url: api.setFavoriteMenu,
        method: 'get',
        params: parameter
    })
}