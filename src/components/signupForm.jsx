import React from 'react'
import Joi from "joi-browser"
import Form from './common/form';
import { signup } from '../services/userService';
import { toast } from 'react-toastify';

class SignupForm extends Form {
    state = {
        data: {
            fullname: "",
            email: "",
            telephone: "",
            password: ""
        },
        errors:{}
    }
    schema = {
        fullname:Joi.string().required().label("Full Name"),
        email:Joi.string().required().email().label("Email"),
        telephone: Joi.string().required().label("Telephone Number"),
        password: Joi.string().required().min(8).label("Password")
    }  
    doSubmit = async () => {
        try {
            const response = await signup(this.state.data)
	        console.log(this.props.history)
            localStorage.setItem("token",response.headers['x-auth-token'])
            toast.success(`Successfully registered ${response.data.email}`)
            window.location = `/`
            
        }catch (ex) {
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
                <h3>Signup</h3>
                <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                        {this.renderInput("fullname","Full Name","text")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("email","Email address","email")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("telephone","Telephone Number","tel")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("password","Password","password")}
                    </div>
                    {this.renderButton("Signup")}
                </form>
            </div>
         );
    }
}
 
export default SignupForm;
