import { Route,Redirect,Switch  } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import {ToastContainer} from 'react-toastify'
import jwtDecode from 'jwt-decode'
import React, { Component } from 'react'


import './App.css';
import NavBar from './components/common/navBar';
import NotFound from './components/common/notFound';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import AdminDashboard from './layout/admin/dashboard';
import AdminOrder from './layout/admin/order';
import AddOrder from './layout/user/addOrder';
import UserDashboard from './layout/user/dashboard';
import UserOrder from "./layout/user/order"
import Footer from "./components/footer"
import 'react-toastify/dist/ReactToastify.css'
import Home from './layout/home/home';
import Logout from './components/logout';
import PickUpForm from './components/common/addpickuplocation';
import DestinationForm from './components/common/changeDestinationForm';
import UpdateStatus from './components/common/updateStatus'
import UpdatePresentLocation from './components/common/updatePresentLocation';
import AdminUsersList from './layout/admin/user/users';
import AdminUser from './layout/admin/user/user';

class App extends Component {
    state = { 
        
     }
    componentDidMount() {
        try {
            const jwt = localStorage.getItem("token")
            const user = jwtDecode(jwt)
            this.setState({user:user})
            
        } catch (error) {
            
        }
        
    }
    
    render() { 
        const {user} = this.state
        // console.log(user);
        return ( 
            <Fragment>
                <ToastContainer />
                <NavBar user={user}/>
                <main className="container">
                    <Switch>
                        <Route path="/signup" render={props => {
                            if(user) return <Redirect to="/"/>
                            return <SignupForm {...props} />
                        }} />
                        <Route path="/login" render={props =>{
                            if(user) return <Redirect to="/" />
                            return <LoginForm {...props} />
                        }} />
                        <Route path="/logout" render={props => {
                            if (!user) return <Redirect to="/login" />
                            return <Logout {...props}/>
                        }}/>
                        <Route path="/parcel/:id/pickup" exact render={props => {
                            if (!user) return <Redirect to="/login" />
                            return <PickUpForm {...props}/>
                        }}/>
                        <Route path="/parcel/:id/destination" exact render={props => {
                            if (!user) return <Redirect to="/login" />
                            return <DestinationForm {...props}/>
                        }}/>
                        <Route path="/parcel/new" render={props => {
                            if (!user) return <Redirect to="/login" />
                            return <AddOrder {...props}/>
                        }}/>
                        <Route path="/parcel/:id" render={props => {
                            if (!user) return <Redirect to="/login" />
                            return <UserOrder {...props}/>
                        }}/>
                        <Route path="/users/:id/parcels" component={UserDashboard}/>
                        <Route path="/admin/parcel/:id/status" exact render={props => {
                            if(!user) return <Redirect to="/login" />
                            if(user.isAdmin === false) return <Redirect to="/login"/>
                            return <UpdateStatus {...props}/>
                        }}/>
                        <Route path="/admin/parcel/:id/presentLocation" exact render={props => {
                            if(!user) return <Redirect to="/login" />
                            if(user.isAdmin === false) return <Redirect to="/login"/>
                            return <UpdatePresentLocation {...props}/>
                        }}/>
                        <Route path="/admin/parcel/:id" exact render={props => {
                            if(!user) return <Redirect to="/login" />
                            if(user.isAdmin === false) return <Redirect to="/login"/>
                            return <AdminOrder {...props}/>
                        }}/>
                        <Route path="/admin/user/:id" exact render={props => {
                            if(!user) return <Redirect to="/login" />
                            if(user.isAdmin === false) return <Redirect to="/login"/>
                            return <AdminUser {...props}/>
                        }}/>
                        <Route path="/admin/parcels" exact render={props => {
                            if(!user) return <Redirect to="/login" />
                            if(user.isAdmin === false) return <Redirect to="/login"/>
                            return <AdminDashboard {...props}/>
                        }}/>
                         <Route path="/admin/users" exact render={props => {
                            if(!user) return <Redirect to="/login" />
                            if(user.isAdmin === false) return <Redirect to="/login"/>
                            return <AdminUsersList {...props}/>
                        }}/>
                        
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/" component={Home} />
                        <Redirect to="/not-found"/>
                        
                    </Switch>
                </main>
                <Footer />
            </Fragment>
         );
    }
}
 
 
export default App;