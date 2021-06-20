import  { Component } from 'react'

class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/"
    }
    
    render() { 
        return (
            <div>Loged out</div>
        )
    }
}
 
export default Logout;