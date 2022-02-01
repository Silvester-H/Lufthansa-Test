import React, { Component } from 'react';
import UserServices from '../services/UserServices';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
let user_logged= localStorage.getItem('user_type');
let user_name = localStorage.getItem('username');
class updateUserPasswordComponent extends Component {
    constructor(props){
        super(props)
  
        this.state = {
            id: this.props.match.params.id,
            username: '',
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

      componentDidMount(){
        UserServices.getUserById(this.state.id).then( (res) =>{
            let user =res.data;
            this.setState({username: user.username,
                password: '',
                modified_by: user.modified_by,
                modified_at: user.modified_at,
                startDate: user.startDate,
                user_type: user.user_type
                });
        });
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
        let user = {username: this.state.username, password: this.state.password,  
            modified_by: user_name, modified_at: date_ob,
            user_type: this.state.user_type, startDate: this.state.startDate};
      //   console.log('famrer =>' + JSON.stringify(farmer));
      UserServices.updatePasswordUser(user, this.state.id ).then( res => {
          this.props.history.push('/users');
          alertify.success("User update successful.",); 
      }).catch ( res => {
        alertify.error('Error updating user.');
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
        this.props.history.push('/users');
    }
   
    render() {

            if (user_logged === 'Admin') {
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
                                            {/* <div className="form-group">
                                                <label>User Type</label>
                                                <select className="form-control" name="user_type" value={this.state.user_type} onChange={this.changeUserTypeHandler}>
                                                <option value="Admin" selected>Admin</option>
                                                <option value="User">User</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select className="form-control" name="status" value={this.state.status} onChange={this.changeStatusHandler}>
                                                <option value selected="Active">Active</option>
                                                <option value="Not Active">Not Active</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Institution</label>
                                                <select className="form-control" name="institution" value={this.state.institution} onChange={this.changeInstitutionHandler}>
                                                <option value selected="Ministria">Ministria</option>
                                                <option value="AZHBR">AZHBR</option>
                                                </select>
                                                </div> */}
                                            {/* <div className="form-group">
                                                <label>Modified By</label>
                                                <input placeholder="Modified By" name="modified_by" className="form-control" value={this.state.modified_by} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Modified At</label>
                                                <input placeholder="Modified Ay" name="modified_at" className="form-control" value={this.state.modified_at} readOnly/>
                                            </div> */}
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

export default updateUserPasswordComponent;