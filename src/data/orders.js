import http from '../services/httpServices'
const baseUrl = "https://safe-courier.herokuapp.com" || "http://localhost:3100/api/v2"
export function getOrders() {
    return http.get(baseUrl+'/parcels/all')
}

export function getUserOrders(id) {
    return http.get(`${baseUrl}/users/${id}/parcels`)
}

export function getOrder(id) {
    return http.get(`${baseUrl}/parcels/${id}`)
}

export function saveOrder(data) {
    return http.post(baseUrl+"/parcels",data)
}
export function cancelOrder(id) {
    return http.put(`${baseUrl}/parcels/${id}/cancel`)
}
export function addPickUp(id,data) {
    return http.post(`${baseUrl}/parcels/${id}/pick`,data)
}
export function changeDestination(id,data) {
    return http.put(`${baseUrl}/parcels/${id}/destination`,data)
}

export function updateParcelStatus(id,data) {
    return http.put(`${baseUrl}/parcels/${id}/status`,data)
}

export function updatePresentLocation(id,data) {
    return http.put(`${baseUrl}/parcels/${id}/presentLocation`,data)
}

export function getUsers() {
    return http.get(baseUrl+"/users/")
}

export function getUser(id) {
    return http.get(`${baseUrl}/users/${id}`)
}

