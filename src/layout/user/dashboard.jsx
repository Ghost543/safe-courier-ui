import React, { Component } from 'react'

import {pagination} from "../../utils/pagination"
import Pagination from '../../components/common/pagenation'
import ListGroups from '../../components/common/listgroups'
import { Link } from 'react-router-dom'
import { getUserOrders,cancelOrder } from '../../data/orders'
import { toast } from 'react-toastify'

class UserDashboard extends Component {
    state = { 
        orders: [],
        currentPage: 1,
        pageSize: 4,
        status: [],
        selectedStatus: "All Orders"
     }
     async componentDidMount() {
         try {
            const response = await getUserOrders(this.props.match.params.id)
            // console.log(response.data.orders);
            this.setState({orders: response.data.orders,status: ["All Orders","pending","inprocess","delivered","canceled"]})
         } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                // console.log(ex.response.data);
                toast.error(ex.response.data.message)
            }
            if (ex.response && ex.response.status === 401) {
                // console.log(ex.response.data);
                toast.error(ex.response.data.message)
            }
            if (ex.response && ex.response.status === 404) {
                // console.log(ex.response.data);
                toast.error(ex.response.data.message)
            }
         }
         
     }
     pageChangeHandler = (page) => {
        this.setState({currentPage:page})
    }
    statusChangeHandler = (item) => {
        this.setState({selectedStatus: item, currentPage:1})
    }
    orderCancelHandler = async (id) => {
        try {                
                let parcelCopy = [...this.state.orders]
                // let parcel = parcelCopy.filter(order => order._id === id )
                let index = parcelCopy.findIndex(order => order._id === id)
                // parcel[0].status = "canceled"
                
                const parcel = await cancelOrder(id)
                parcelCopy.splice(index,1,parcel.data.data)
                this.setState({orders:parcelCopy})
                toast.success(`Successfully canceled parce ${id}`)
            
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message)
            }
            if (ex.response && ex.response.status === 404) {
                toast.error(ex.response.data.message)
                this.props.history.push('/not-found')
            }
        }
    }

    render() { 
        let {orders, pageSize,currentPage,selectedStatus}= this.state
        const filtered = selectedStatus !=="All Orders" ? orders.filter(o => o.status === selectedStatus) : orders
        orders = pagination(filtered,currentPage,pageSize) 
        return ( 
            <div className="row">
                <div className="col-3" >
                    <ListGroups 
                        items={this.state.status}
                        onItemSelect={this.statusChangeHandler}
                        selectedStatus={selectedStatus}
                    /> 
                </div>
                <div className="col">
                    <Link to="/parcel/new" className="btn btn-primary" style={{marginBottom: 20}}>New Order</Link>
                    <div className="table-responsive-md">
                        <table className="table table-success table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Order Number</th>
                                    <th scope="col">Order</th>
                                    <th scope="col">Weight (Kg)</th>
                                    <th scope="col">Reciver's Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td> <Link to={`/parcel/${order._id}`}>{order._id}</Link></td>
                                        <td>{order.parcelType}</td>
                                        <td>{order.parcelWeight}</td>
                                        <td>{order.destination.recieverName}</td>
                                        <td>{order.status}</td>
                                        <td>{(order.status === "canceled"||order.status ==="delivered") ? "" : <button onClick={()=>this.orderCancelHandler(order._id)} type="button" className="btn btn-danger">Cancel</button>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination 
                        itemsCount={filtered.length} 
                        pageSize={pageSize} 
                        currentPage={currentPage}
                        onPageChange={this.pageChangeHandler} 
                    />
                </div>
            </div>
         );
    }
}
 
export default UserDashboard;