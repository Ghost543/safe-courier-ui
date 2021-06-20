import React from 'react'
import Joi from "joi-browser"
import Form from './form';
import { addPickUp } from '../../data/orders';

class PickUpForm extends Form {
    state = {
        data: {
            pickRegion: "",
            pickLat: "",
            pickLng: ""
        },
        errors:{}
    }
    schema = {
        pickRegion: Joi.string().required().label("Pick up Region"),
        pickLat: Joi.number().label("Latitude"),
        pickLng: Joi.number().label("Longtitude")
    }
    doSubmit = async() => {
        const data = this.state.data
        await addPickUp(this.props.match.params.id,data)
        // console.log(response);
	//window.location = `/parcel/${this.props.match.params.id}`
        this.props.history.push(`/parcel/${this.props.match.params.id}`)
    }
    render() { 
        return ( 
            <div>
                <h3>Add pick up location</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                            {this.renderInput("pickRegion","Pick up Region","text")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("pickLat","Latitude","number")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("pickLng","Longtitude","number")}
                    </div>
                    {this.renderButton("Add Location")}
                </form>
            </div>
         );
    }
}
 
export default PickUpForm;
