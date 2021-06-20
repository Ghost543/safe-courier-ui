import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {pagination} from "../../utils/pagination"
import {getOrders,cancelOrder} from "../../data/orders"
import Pagination from '../../components/common/pagenation'
import ListGroups from '../../components/common/listgroups'

class AdminDashboard extends Component {
    state = { 
        parcels: [],
        currentPage: 1,
        pageSize: 4,
        status: [],
        selectedStatus: "All Orders"
     }

    async componentDidMount() {
        
            const response = await getOrders()
            // console.log(response.data.parcel);
            this.setState({parcels: response.data.parcel,status: ["All Orders","pending","inprocess","delivered","canceled"]})
        
    }
    pageChangeHandler = (page) => {
        this.setState({currentPage:page})
    }
    statusChangeHandler = (item) => {
        this.setState({selectedStatus: item, currentPage:1})
    }
    orderCancelHandler = async (id) => {
        try {                
                let parcelCopy = [...this.state.parcels]
                // let parcel = parcelCopy.filter(order => order._id === id )
                let index = parcelCopy.findIndex(order => order._id === id)
                // parcel[0].status = "canceled"
                
                const parcel = await cancelOrder(id)
                parcelCopy.splice(index,1,parcel.data.data)
                this.setState({parcels:parcelCopy})
                toast.success(`Successfully canceled parce ${id}`)
            
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message)
            }
            if (ex.response && ex.response.status === 404) {
                toast.error(ex.response.data)
                this.props.history.push('/not-found')
            }
        }
    }
    render() { 
        let {parcels, pageSize,currentPage,selectedStatus}= this.state
        const filtered = selectedStatus !=="All Orders" ? parcels.filter(o => o.status === selectedStatus) : parcels
        parcels = pagination(filtered,currentPage,pageSize)   
        return ( 
            <div className="row">
            <div className="col-3">
                <ListGroups 
                    items={this.state.status}
                    onItemSelect={this.statusChangeHandler}
                    selectedStatus={selectedStatus}
                /> 
            </div>
            <div className="col">
                <div className="table-responsive-md">
                    <table className="table table-success table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Order Number</th>
                                <th scope="col">Order</th>
                                <th scope="col">Weight (Kg)</th>
                                <th scope="col">Owner</th>
                                <th scope="col">Status</th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map(order => (
                                <tr key={order._id}>
                                    <td><Link to={`/admin/parcel/${order._id}`}>{order._id}</Link></td>
                                    <td>{order.parcelType}</td>
                                    <td>{order.parcelWeight}</td>
                                    <td>{order.owner.name}</td>
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
 
export default AdminDashboard;