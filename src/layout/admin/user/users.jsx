import React, { Component } from 'react'

import {pagination} from "../../../utils/pagination"
import Pagination from '../../../components/common/pagenation'
import { Link } from 'react-router-dom'
import { getUsers } from '../../../data/orders'
import { toast } from 'react-toastify'

class AdminUsersList extends Component {
    state = { 
        users: [],
        currentPage: 1,
        pageSize: 4,
     }
     async componentDidMount() {
         try {
            const response = await getUsers(this.props.match.params.id)
            // console.log(response.data.users);
            this.setState({users: response.data.users})
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
     pageChangeHandler = (page) => {
        this.setState({currentPage:page})
    }
    

    render() { 
        let {users, pageSize,currentPage}= this.state
        
        users = pagination(users,currentPage,pageSize) 
        return ( 
            <div className="row">
                <div className="col">
                    <div className="table-responsive-md">
                        <table className="table table-success table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">User id</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">User Email</th>
                                    <th scope="col">Telephone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td> <Link to={`/admin/user/${user._id}`}>{user._id}</Link></td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.telephonNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination 
                        itemsCount={users.length} 
                        pageSize={pageSize} 
                        currentPage={currentPage}
                        onPageChange={this.pageChangeHandler} 
                    />
                </div>
            </div>
         );
    }
}
 
export default AdminUsersList;