import React, { Component } from 'react';
import LoginService from '../services/LoginService';
import { withRouter} from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
let user_name = localStorage.getItem('username');
class HeaderComponent extends Component {
    constructor(props){
      super(props)

      this.state = {

      }
      this.logout= this.logout.bind(this);
    }
    logout=(event)  => {
        event.preventDefault();
        LoginService.logout().then( res => {    
        alertify.success("Logout successful.",);
        this.props.history.push('/');
        setTimeout(window.location.reload.bind(window.location), 1000);
        });
      }
    render() {
        if (user_name=== "" ) {
            return (
                <div >
                      <header className="">
                         <nav className="navbar navbar-dark bg-dark justify-content-center" >
                            <div className="justify-content-center">
                                <h3 className="justify-content-center text-muted" >
                                    Welcome to the Applications Management
                                </h3>
                            </div>
                        </nav> 
                    </header>
              
                </div>
            );
           
        }
        else {
            return (
                <div>
                <div className="navbar-dark bg-dark ">
                      <header className="container row-primary">
                         <nav className="navbar navbar-dark bg-dark " >
                            <div className="justify-content-center">
                                <h3 className=" pull-center justify-content-center text-muted" >
                                Welcome to the Applications Management
                                </h3>
                            </div>
                            <div className=" col-sm-3 col-md-3 pull-right">
                            <form className="navbar-form">
                            <button onClick={this.logout} className="btn btn-outline-light " style={{ width: "100px", marginLeft: "225px"}} >Logout</button>     
                           </form>
                           </div>
                           </nav> 
                    </header>
                    </div>
                </div>
            );     
        }
       
    }
}

export default withRouter(HeaderComponent);