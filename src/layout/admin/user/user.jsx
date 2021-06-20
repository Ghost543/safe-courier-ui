import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import {getUser} from "../../../data/orders"

class AdminUser extends Component {
    state = { 
        user:{}
     }

     async componentDidMount() {
         try {
            const {data} = await getUser(this.props.match.params.id)
            const user = data.user
            if (!user) return this.props.history.replace("/not-found")
           //  console.log(user);
           
           const saveUser = {
                _id: user._id,
               email: user.email,
               name: user.name,
               contact: user.telephonNumber
           }
           this.setState({user:saveUser})
         } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                // console.log(ex.response.data);
                toast.error(ex.response.data.message)
            }
            if (ex.response && ex.response.status === 401) {
                // console.log(ex.response.data);
                toast.error(ex.response.data.message)
            }
         }
         
         
    }
    render() { 
        return ( 
            <div className="row">                    
                <div className="col-12">
                    <h3>User</h3>
                    <h4>Name: {this.state.user.name}</h4>
                    <h4>Email: {this.state.user.email}</h4>
                    <h4>Contact: {this.state.user.contact}</h4>
                </div>
                <Link to={`/users/${this.state.user._id}/parcels`} className="btn btn-primary">Show Parcels</Link>
            </div>  
        );
    }
}
 
export default AdminUser;

