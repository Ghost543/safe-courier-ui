import React from 'react'
import Joi from "joi-browser"
import Form from './form';
import { updatePresentLocation } from '../../data/orders';
import { toast } from 'react-toastify';

class UpdatePresentLocation extends Form {
    state = {
        data: {
            presentRegion: "",
            presentLat: "",
            presentLng: ""
        },
        errors:{}
    }
    schema = {
        presentRegion: Joi.string().required().label("Present Region"),
        presentLat: Joi.number().label("Latitude"),
        presentLng: Joi.number().label("Longtitude")
    }
    doSubmit = async() => {
        try {
            const data = this.state.data
            await updatePresentLocation(this.props.match.params.id,data)
            toast.success(`Successfully update the current location for ${this.props.match.params.id}` )
            // console.log(response);
            this.props.history.push(`/admin/parcel/${this.props.match.params.id}`)
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
            <div>
                <h3>Add pick up location</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                            {this.renderInput("presentRegion","Present Region","text")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("presentLat","Latitude","number")}
                    </div>
                    <div className="mb-3">
                        {this.renderInput("presentLng","Longtitude","number")}
                    </div>
                    {this.renderButton("Update Present Location")}
                </form>
            </div>
         );
    }
}
 
export default UpdatePresentLocation;