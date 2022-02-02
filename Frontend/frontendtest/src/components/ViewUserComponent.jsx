import React, { Component } from 'react';
import UserServices from '../services/UserServices';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import dateFormat from 'dateformat';
let user_logged= localStorage.getItem('user_type');
class ViewUserComponent extends Component {
    constructor(props){
        super(props)
  
        this.state = {
            id: this.props.match.params.id,
            username: '',
            password: '',
            modified_by: '',
            modified_at: '',
            user_type: '',
            startDate: '',
        }
      }

      componentDidMount(){
        UserServices.getUserById(this.state.id).then( (res) =>{
            let user =res.data;
            this.setState({username: user.username,
                password: user.password,
                modified_by: user.modified_by,
                modified_at: user.modified_at,
                user_type: user.user_type,
                startDate: user.startDate
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
    cancel()  {
        this.props.history.push('/users');
    }
    render() {

            if (user_logged === 'Admin') {
                return (
                    <div className="">
                        <div className="container">
                            <br>
                            </br>
                            <br>
                            </br>
                            <div className="row row-primary">
                                <div className="card col-md-6 offset-md-3 offset-md-3 ">
                                 
                                    <h3 className="text-center text-muted"> View User</h3>
                                    <div className="card-body">
                                       
                                        <form>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input placeholder="Username" name="username" className="form-control" value={this.state.username} readOnly/>
                                            </div>
                        
                                             <div className="form-group">
                                                <label>User Type</label>
                                                <input placeholder="User Type" name="user_type" className="form-control" value={this.state.user_type} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Start Date</label>
                                                <input placeholder="Start Date" name="startDate" className="form-control" value={dateFormat(this.state.startDate,"yyyy-mm-dd")} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Modified By</label>
                                                <input placeholder="Modified By" name="modified_by" className="form-control" value={this.state.modified_by} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Modified At</label>
                                                <input placeholder="Modified At" name="modified_at" className="form-control" value={this.state.modified_at} readOnly/>
                                            </div>
                                            <br>
                                            </br>
                                           
                                            <button className="btn btn-outline-secondary" onClick={this.cancel.bind(this)} style={{ width: "100px"}}>Go Back</button>
        
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

export default ViewUserComponent;