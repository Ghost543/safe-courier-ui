const orders = [
        {
            "status": "inprocess",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4ef3b473ba387514a04d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "Envelope",
            "parcelWeight": 23,
            "createdAt": "2021-06-12T17:30:35.560Z",
            "updatedAt": "2021-06-13T10:18:56.952Z",
        },
	{
            "status": "delivered",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4ef3b473ba387514a05d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "box",
            "parcelWeight": 23,
        },{
            "status": "pending",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4ef3b473ba386514a04d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "Bag",
            "parcelWeight": 23,
        },
	{
            "status": "inprocess",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4ef3b473ba397514a04d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "box",
            "parcelWeight": 23,
        },{
            "status": "delivered",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4ef3b474ba387514a04d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "Bag",
            "parcelWeight": 23,
        },{
            "status": "pending",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4ef4b473ba387514a04d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "box",
            "parcelWeight": 23,
        },{
            "status": "pending",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4eg3b473ba387514a04d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "envelop",
            "parcelWeight": 23,
        },{
            "status": "canceled",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4ef3c473ba387514a04d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "box",
            "parcelWeight": 23,
        },{
            "status": "canceled",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4ef3b473bb387514a04d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "box",
            "parcelWeight": 23,
        },{
            "status": "canceled",
            "date": "2021-06-12T17:16:34.068Z",
            "_id": "60c4ef3b473ba387814a04d9",
            "owner": {
                "_id": "60c4ebfa473ba387514a04d8",
                "name": "Muwanguzi Peter",
                "email": "petermuwanguzi51@gmail.com",
                "telephonNumber": "+256770535474"
            },
            "parcelType": "envelope",
            "parcelWeight": 23,
        },
    ]

export function getOrders() {
    return orders
}
export function saveOrder(data){
    const _id = Date.now().toString()
    const owner = {
        "owner": {
            "_id": "60c4ebfa473ba387514a04d8",
            "name": "Muwanguzi Peter",
            "email": "petermuwanguzi51@gmail.com",
            "telephonNumber": "+256770535474"
        }
    }
    const status = "pending"
    const save = { _id: _id, status: status,...owner, ...data}
    orders.push(save)
}
export function cancelOrder(id) {
    let ordersCopy = [...orders]
    
    let order = ordersCopy.filter(order => order._id === id )
    // let order = ordersCopy.filter(order => order._id === params.id && (order.status === "inprocess" || "pending"))
    let index = ordersCopy.findIndex(order => order._id === id)
    order[0].status = "canceled"
    orders.splice(index,1,order[0])
    return orders
}
export function getOrder(id) {
    let order = orders.filter(order => order._id === id ) 
    // console.log(order[0]);
    return order[0]
}
export function getStatus() {
    return [
        {_id:1,name: "pending"},
        {_id:2,name: "inprocess"},
        {_id:3,name: "delivered"},
        {_id:4,name: "canceled"}
    ]
}
