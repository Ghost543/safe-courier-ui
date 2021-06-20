import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {getOrder} from "../../data/orders"

class AdminOrder extends Component {
    state = { 
        order: {},
        owner: {},
        pick: {},
        presentLocation: {}
     }

     async componentDidMount() {
         const orderId = this.props.match.params.id
         const {data: order} = await getOrder(orderId)
         if (!order) return this.props.history.replace("/not-found")
        //  console.log(order.presentLocation);
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
             if (!order.presentLocation.region) {
                this.setState({order: saveOrder,owner:saveOwner,pick:savePick,presentLocation:{region:""}})
             }
             let savePresentLocation = {
                 region: order.presentLocation.region,
                 lat: order.presentLocation.coordinates.lat,
                 lng: order.presentLocation.coordinates.lng
             }
             
             this.setState({order: saveOrder,owner:saveOwner,pick:savePick,presentLocation:savePresentLocation})
         }
         
         if (!order.from) {
            if (!order.presentLocation.region) {
                this.setState({order: saveOrder,owner:saveOwner,pick:{region:""},presentLocation:{region:""}})
            }
            let savePresentLocation = {
                region: order.presentLocation.region,
                lat: order.presentLocation.coordinates.lat,
                lng: order.presentLocation.coordinates.lng
            }
            this.setState({order: saveOrder,owner:saveOwner,pick:{region:"",presentLocation:savePresentLocation}})
         }
        //  const savePickUp = {
        //     region: order.pickUp.region,
        //  }
        //  this.setState({order: saveOrder,owner:saveOwner,pick: savePickUp})
     }
     currentUser = JSON.parse(localStorage.getItem("user"))
    render() { 
        return ( 
            <div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <h3>Parcel Order</h3>
                        <h4>Parcel Number: {this.state.order._id}</h4>
                        <h4>Parcel: {this.state.order.parcelType} </h4>
                        <h4>Weight: {this.state.order.parcelWeight}</h4>
                    </div>
                    <div className="col-md-6">
                        <h4>Status: {this.state.order.status}</h4>
                        <h3>Present Location</h3>
                        {this.state.presentLocation.region === "" ? "Yet to be Updated" : <h4>Region: {this.state.presentLocation.region}</h4>}
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
                        {this.state.pick.region === "" ? "Yet to be added by the user !" : <h4>Region: {this.state.pick.region}</h4>}    
                    </div>
                    <div className="col-md-3">
                       {(this.state.order.status ==="canceled" || this.state.order.status==="delivered") ? "" : <Link to={`/admin/parcel/${this.state.order._id}/status`} className="btn btn-info">Update Parcel Status</Link>}
                    </div>
                    <div className="col-md-4">
                       {(this.state.order.status ==="canceled" || this.state.order.status==="delivered" || this.state.order.status==="pending") ? "" : <Link to={`/admin/parcel/${this.state.order._id}/presentLocation`} className="btn btn-info">Update Present  Location</Link>}
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary" onClick={()=>this.props.history.push("/admin/parcels")}>Go Back</button>
                    </div> 
                </div>
            </div>  
        );
    }
}
 
export default AdminOrder;

