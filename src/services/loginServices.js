import http from '../services/httpServices'

const urlEndpoint = "https://safe-courier.herokuapp.com"
export function login(user) {
    return http.post(urlEndpoint,{
        email: user.email,
        password: user.password
    })
}