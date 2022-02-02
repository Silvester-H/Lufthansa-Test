import React, { Component } from 'react';
import SupervisorService from '../services/SupervisorService';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import dateFormat from 'dateformat';
let user_logged= localStorage.getItem('user_type');
class ViewSupervisorComponent extends Component {
    constructor(props){
        super(props)
  
        this.state = {
            id: this.props.match.params.id,
            name: '',
            username: '',
            startDate: '',
            endDate: '',
            status: '',
            reason: ''
        }
      }

    componentDidMount(){
        SupervisorService.getApplicationById(this.state.id).then( (res) =>{
            let application =res.data;
            this.setState({name: application.name,
                          username: application.username,
                          startDate: application. startDate,
                          endDate: application.endDate,
                          reason: application.reason,
                          status: application.status });
        });
    }
    cancel()  {
        this.props.history.push('/supervisors');
    } 
    logoutButton=(event)  => {
        event.preventDefault();
        LoginService.logout().then( res => {    
        alertify.success("Logout successful.",);
        this.props.history.push('/');
        setTimeout(window.location.reload.bind(window.location), 1000);
        });
      }
    render() {
            if (user_logged === 'Supervisor') {
                return (
                    <div>
                        <div className="container">
                            <br>
                            </br>
                            <br>
                            </br>
                            <div className="row row-primary">
                                <div className="card col-md-6 offset-md-3 offset-md-3 ">
                                 
                                    <h3 className="text-center text-muted"> View Application</h3>
                                    <div className="card-body">
                                       
                                        <form>
                                        <div className="form-group">
                                                <label>Username</label>
                                                <input placeholder="username" name="username" className="form-control" value={this.state.username} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input placeholder="Type " name="name" className="form-control" value={this.state.name} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Start Date</label>
                                                <input type="date" placeholder="startDate" name="startDate" className="form-control" value={dateFormat(this.state.startDate,"yyyy-mm-dd")} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>End Date</label>
                                                <input type="date" placeholder="endDate" name="endDate" className="form-control" value={dateFormat(this.state.endDate,"yyyy-mm-dd")} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <input placeholder="status" name="status" className="form-control" value={this.state.status} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Reason</label>
                                                <input placeholder="" name="reason" className="form-control" value={this.state.reason} readOnly/>
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

export default ViewSupervisorComponent;