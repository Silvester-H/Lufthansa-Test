import React, { Component } from 'react';
import UserServices from '../services/UserServices';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import dateFormat from 'dateformat';
let user_logged= localStorage.getItem('user_type');
let user_name = localStorage.getItem('username');
class updateOwnPasswordComponent extends Component {
    constructor(props){
        super(props)
  
        this.state = {
            username: user_name,
            password: '',
            institution: '',
            modified_by: '',
            modified_at: '',
            user_type: '',
            status: ''
        }
        this.changeUsernameHandler= this.changeUsernameHandler.bind(this);
        this.changePasswordHandler= this.changePasswordHandler.bind(this);
        this.changeModifiedByHandler= this.changeModifiedByHandler.bind(this);
        this.changeModifiedAtHandler= this.changeModifiedAtHandler.bind(this);
        this.changeUserTypeHandler= this.changeUserTypeHandler.bind(this);
        this.updateUser =this.updateUser.bind(this);
      }

   
    logoutButton=(event)  => {
        event.preventDefault();
        LoginService.logout().then( res => {    
        alertify.success("Logout successful.",);
        this.props.history.push('/');
        setTimeout(window.location.reload.bind(window.location), 1000);
        });
      }
    updateUser  = (event) => {
        event.preventDefault();
        let validation_message = '';
        let passwordvalue = this.state.password;
        if (passwordvalue==='') {
            validation_message = validation_message + ' Password should not be empty.';
        }
        if (validation_message==='') {
        let date_ob= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        // console.log(date_ob);
        let user = {username: this.state.username, password: this.state.password, institution: this.state.institution, 
            modified_by: user_name, modified_at: date_ob,
            user_type: this.state.user_type, status: this.state.status};
      //   console.log('famrer =>' + JSON.stringify(farmer));
      UserServices.updateOwnPassword(user, this.state.username ).then( res => {
          this.props.history.push('/application');
          alertify.success("Password update successful.",); 
      }).catch ( res => {
        alertify.error('Error updating password.');
      }
        );
    } else {
        alertify.error(validation_message);
    }
}
      changeUsernameHandler=(event)  => {
        this.setState({username: event.target.value});

    }
    changePasswordHandler=(event)  => {
        this.setState({password: event.target.value});

    }
    changeInstitutionHandler=(event)  => {
        this.setState({institution: event.target.value});

    }
    changeModifiedByHandler=(event)  => {
        this.setState({modified_by: event.target.value});

    }
    changeModifiedAtHandler=(event)  => {
        this.setState({modified_at: event.target.value});

    }
    changeStatusHandler=(event)  => {
        this.setState({status: event.target.value});

    }
    changeUserTypeHandler=(event)  => {
        this.setState({user_type: event.target.value});

    }
    cancel()  {
        this.props.history.push('/application');
    }
   
    render() {
   
            if (user_logged === 'User') {
                return (
                    <div>
                        <div className="container">
                            <br>
                            </br>
                            <br>
                            </br>
                            <div className="row row-primary">
                                <div className="card col-md-6 offset-md-3 offset-md-3 ">
                                 
                                    <h3 className="text-center text-muted"> Update User Password</h3>
                                    <div className="card-body">
                                       
                                        <form>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input placeholder="Username" name="username" className="form-control" value={this.state.username} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>New Password</label>
                                                <input type="password" placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                                            </div>
                            
                                            <br>
                                            </br>
                                           
                                            <button className="btn btn-outline-success" onClick={this.updateUser} style={{ width: "100px"}}>Update</button>
                                            <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ width: "100px", marginLeft: "15px"}}>Cancel</button>
        
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
        
                    </div>
                );
            } else {
                return ( 
                    <div className="container">
                    <br></br><br></br>
                <div className="row row-primary ">
                
                <div className="card col-md-4 offset-md-4 offset-md-4 ">
                <div className="card-body">
                <form>
                <div className="form-group">
                <h3 className="text-center text-muted"> You have no access to this!</h3>
                </div>
                <br></br><br></br>
               </form> 
               </div>
               </div> 
               </div> 
               </div>
                );
            }
       
    }
}

export default updateOwnPasswordComponent;