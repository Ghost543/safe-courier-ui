import React from 'react'
import Joi from "joi-browser"
import Form from '../../components/common/form'
import {saveOrder} from "../../data/orders"

class AddOrder extends Form {
    state = {
        data: {
            parcelType: "",
            parcelWeight: '',
            receiverName: '',
            receiverEmail: '',
            receiverTel: '',
            destinationRegion: "",
            destinationLat: "",
            destinationLng: ""
        },
        errors:{}
    }
    schema = {
        parcelType: Joi.string().required().label("Order Kind"),
        parcelWeight: Joi.number().required().label("Order Weight"),
        receiverName: Joi.string().required().label("Reciver's Name"),
        receiverEmail: Joi.string().email().label("Reciver's Email address"),
        receiverTel: Joi.string().min(10).max(13).required().label("Reciever's Telephone Number"),
        destinationRegion: Joi.string().required().label("Destination Region"),
        destinationLat: Joi.number().label("Latitude"),
        destinationLng: Joi.number().label("Longtitude")
    }

    

    doSubmit = async () => {
        const {parcelType,parcelWeight,receiverName,receiverEmail,receiverTel,destinationRegion,destinationLat,destinationLng} = this.state.data
        let data = {
            parcelType: parcelType,
            parcelWeight: parcelWeight,
            receiverName: receiverName,
            receiverEmail: receiverEmail,
            receiverTel: receiverTel,
            destinationRegion: destinationRegion,
            destinationLat: destinationLat,
            destinationLng: destinationLng 
        }
        if (destinationLat === "" || destinationLng === "") {
            data = {
               parcelType: parcelType,
               parcelWeight: parcelWeight,
               receiverName: receiverName,
               receiverEmail: receiverEmail,
               receiverTel: receiverTel,
               destinationRegion: destinationRegion,
           }
        }
        //call server
        await saveOrder(data)
        let current = JSON.parse(localStorage.getItem("user"))
        console.log("Submit");
        this.props.history.push(`/users/${current._id}/parcels`)
    }
    
    
    render() { 
        return ( 
            <div style={{paddingBottom:20}}>
                <h3 style={{paddingLeft: 70}}>New Order</h3>
                <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                        {this.renderInput("parcelType","Order Kind","text")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("parcelWeight","Order Weight (Kg)","number")}
                    </div>
                    <h3>Destination</h3>
                    <div className="mb-3">
                        {this.renderInput("receiverName","Reciver's Name","text")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("receiverEmail","Reciver's Email address","email")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("receiverTel","Reciever's Telephone Number","tel")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("destinationRegion","Destination Region","text")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("destinationLat","Latitude","number")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("destinationLng","Longtitude","number")}
                    </div>
                    {this.renderButton("Create Order")}
                </form>
            </div>
         );
    }
}
 
export default AddOrder;