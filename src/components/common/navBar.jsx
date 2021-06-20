import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import { Fragment } from 'react/cjs/react.development';

const NavBar = ({user}) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom" style={{paddingLeft:40}}>
            <div className="container-fluid">
                <Link className="navbar-brand p-2 flex-grow-1" to="/" >Safe Courier</Link> {(user && user.isAdmin) ? <small><strong>Admin</strong></small> : ""}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" style={!user ? {paddingLeft:800} : {paddingLeft:500}}>
                <ul className="navbar-nav">
                    {(user && user.isAdmin===false) && <li className="nav-item p-2 flex-grow-1">
                        <NavLink className="nav-link " to={`/users/${user._id}/parcels`}>Parcels</NavLink>
                    </li>}
                    {(user && user.isAdmin===true) && <li className="nav-item p-2 flex-grow-1">
                        <NavLink className="nav-link " to="/admin/parcels">Parcels</NavLink>
                    </li>}
                    {(user && user.isAdmin===true) && <li className="nav-item p-2">
                    <NavLink className="nav-link " to="/admin/users">Users</NavLink>
                    </li>}
                    {!user &&
                        <Fragment>
                            <li className="nav-item p-2">
                                <NavLink className="nav-link " to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item p-2">
                                <NavLink className="nav-link " to="/signup">Signup</NavLink>
                            </li>
                        </Fragment>
                    }
                    {user &&
                        <Fragment>
                            <li className="nav-item p-2">
                                <NavLink className="nav-link " to="/profile">{user.name}</NavLink>
                            </li>
                            <li className="nav-item p-2">
                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                            </li>
                        </Fragment>
                    }
                </ul>
                </div>
            </div>
        </nav>
     );
}
 
export default NavBar;
