import React, { Component } from 'react'

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <header>
                    <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal">Courier Quotes</h1>
                        <p className="fs-5 text-muted"> Our estimed client we would what to help know or atleast help you estimate how much or the effluence of your parcel weight to the price or much needed. Not to forget also the distance between the locations i.e. <strong>destination</strong> and <strong>pickup location</strong></p>
                    </div>
                </header>
                <main>
                    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal">≤0.1Kg</h4>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title pricing-card-title">UGSH:5000<small className="text-muted fw-light">/parcel</small></h3>
                                <ul className="list-unstyled mt-3 mb-4">
                                <li>10 parcels come with one free delivery</li>
                                <li>20 parcels come with two free delivery</li>
                                <li>And Email support to keep track of your deliveries</li>
                                <li>Help center access</li>
                                </ul>
                                <h4 className="w-100 btn btn-lg btn-outline-primary">Best Quotes in town</h4>
                            </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">≤0.5Kg</h4>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title pricing-card-title">UGSH:10,000<small className="text-muted fw-light">/parcel</small></h3>
                                    <ul className="list-unstyled mt-3 mb-4">
                                    <li>5 parcels come with one free delivery</li>
                                    <li>20 parcels come with two free delivery</li>
                                    <li>And Email support to keep track of your deliveries</li>
                                    <li>Help center access</li>
                                    </ul>
                                    <h4 className="w-100 btn btn-lg btn-primary">Best Quotes in town</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm border-primary">
                            <div className="card-header py-3 text-white bg-primary border-primary">
                                <h4 className="my-0 fw-normal">≤1Kg</h4>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title pricing-card-title">UGSH:20,000<small className="text-muted fw-light">/parcel</small></h3>
                                <ul className="list-unstyled mt-3 mb-4">
                                <li>5 parcels come with one free delivery</li>
                                <li>20 parcels come with two free delivery</li>
                                <li>And Email support to keep track of your deliveries</li>
                                <li>Help center access and SMS notification support</li>
                                </ul>
                                <h4 className="w-100 btn btn-lg btn-primary">Best Quotes in town</h4>
                            </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">≤5Kg</h4>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title pricing-card-title">UGSH:30000<small className="text-muted fw-light">/parcel</small></h3>
                                    <ul className="list-unstyled mt-3 mb-4">
                                    <li>10 parcels come with one free delivery</li>
                                    <li>20 parcels come with two free delivery</li>
                                    <li>And Email support to keep track of your deliveries</li>
                                    <li>Help center access</li>
                                    </ul>
                                    <h4 className="w-100 btn btn-lg btn-outline-primary">Best Quotes in town</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">≤15Kg</h4>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title pricing-card-title">UGSH:45,000<small className="text-muted fw-light">/parcel</small></h3>
                                    <ul className="list-unstyled mt-3 mb-4">
                                    <li>5 parcels come with one free delivery</li>
                                    <li>20 parcels come with two free delivery</li>
                                    <li>And Email support to keep track of your deliveries</li>
                                    <li>Help center access</li>
                                    </ul>
                                    <h4 className="w-100 btn btn-lg btn-primary">Best Quotes in town</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm border-primary">
                                <div className="card-header py-3 text-white bg-primary border-primary">
                                    <h4 className="my-0 fw-normal">≤20Kg</h4>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title pricing-card-title">UGSH:60,000<small className="text-muted fw-light">/parcel</small></h3>
                                    <ul className="list-unstyled mt-3 mb-4">
                                    <li>5 parcels come with one free delivery</li>
                                    <li>20 parcels come with two free delivery</li>
                                    <li>And Email support to keep track of your deliveries</li>
                                    <li>Help center access and SMS notification support</li>
                                    </ul>
                                    <h4 className="w-100 btn btn-lg btn-primary">Best Quotes in town</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </main>
            </div>
         );
    }
}
 
export default Home;