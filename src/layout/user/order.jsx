import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getOrder} from "../../data/orders"
import { toast } from 'react-toastify';
class UserOrder extends Component {
    state = { 
        order: {},
        owner: {},
        pick: {}
     }

     async componentDidMount() {
         try {
            const orderId = this.props.match.params.id
            const {data: order} = await getOrder(orderId)
            if (!order) return this.props.history.replace("/not-found")
           //  console.log(order);
            const saveOrder = {
               _id: order._id,
               parcelType: order.parcelType,
               parcelWeight: order.parcelWeight,
               status:order.status,
               receiverName: order.to.recieverName,
               receiverEmail: order.to.reciverEmail,
               receiverTel: order.to.reciverTel,
               destinationRegion: order.to.region,
            }
            const saveOwner = {
                _id: order.ownerId,
               email: order.ownerEmail,
               name: order.ownerName,
               contact: order.ownerTelephoneNumber
            }
            if (order.from) {
                let savePick = {
                   region: order.from.region,
                   lat: order.from.cordinates.lat,
                   lng: order.from.cordinates.lng
                }
                this.setState({order: saveOrder,owner:saveOwner,pick:savePick})
            }
            
            if (!order.from) {
                this.setState({order: saveOrder,owner:saveOwner,pick:{region:""}})
            }            
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
     currentUser = JSON.parse(localStorage.getItem("user"))

    render() { 
        return (  
            <div className="row g-3">
                <div className="col-md-6">
                    <h4>Order Number: {this.state.order._id}</h4>
                    <h4>Order: {this.state.order.parcelType} </h4>
                    <h4>Weight: {this.state.order.parcelWeight}</h4>
                </div>
                <div className="col-md-6">
                    <h4>Status: {this.state.order.status}</h4>
                </div>
                <div className="col-6">
                    <h3>Sender</h3>
                    <h4>Name: {this.state.owner.name}</h4>
                    <h4>Email: {this.state.owner.email}</h4>
                    <h4>Contact: {this.state.owner.contact}</h4>
                </div>
                <div className="col-6">
                    <h3>Destination</h3>
                    <h4>Reciever Name: {this.state.order.receiverName}</h4>
                    <h4>Reciever Email: {this.state.order.receiverEmail}</h4>
                    <h4>Reciever Contact: {this.state.order.receiverTel}</h4>
                    <h4>Region: {this.state.order.destinationRegion}</h4>
                </div>
                <div className="col-md-3">
                    <h3>Pick Up</h3>
                    {this.state.pick.region === "" ? <Link to={`/parcel/${this.state.order._id}/pickup`} className="btn btn-info">Add pickUp Location</Link> : <h4>Region: {this.state.pick.region}</h4>}    
                </div>
                <div className="col-md-3">
                   {(this.state.order.status ==="canceled" || this.state.order.status==="delivered") ? "" : <Link to={`/parcel/${this.state.order._id}/destination`} className="btn btn-info">Change Order destination</Link>}
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary" onClick={()=>this.props.history.push(`/users/${this.currentUser._id}/parcels`)}>Go Back</button>
                </div>
                
                
                
                
            </div>
        );
    }
}
 
 
export default UserOrder;