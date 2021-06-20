import http from '../services/httpServices'

const urlEndpoint = "https://safe-courier.herokuapp.com"

export function signup(user) {
    return http.post(urlEndpoint,{
        name: user.fullname,
        email: user.email,
        telephoneNumber: user.telephone,
        password: user.password
    })
}