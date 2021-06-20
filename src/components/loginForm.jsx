import React from 'react'
import Joi from "joi-browser"
import jwtDecoder from 'jwt-decode'
import { toast } from 'react-toastify';
import Form from './common/form';
import { login } from '../services/loginServices';

class LoginForm extends Form {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors:{}
    }
    schema = {
        email:Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(8).label("Password")
    }
    doSubmit = async () => {
        try {
            const {data: jwt} = await login(this.state.data)
            localStorage.setItem('token',jwt)
            const user = jwtDecoder(jwt)
            if (user.isAdmin) {
                toast.success(`Succefully logged in as ${user.email}`)
                return window.location = "/admin/parcels"
            }
            toast.success(`Succefully logged in as ${user.email}`)
            window.location = `/`
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors}
                errors.email = ex.response.data
                toast.error(ex.response.data)
                this.setState({errors:errors})
            }
        }
        
    } 
    render() { 
        return ( 
            <div>
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        {this.renderInput("email","Email address","email")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("password","Password","password")}
                    </div>
                    {this.renderButton("Login")}
                </form>
            </div>
         );
    }
}
 
export default LoginForm;