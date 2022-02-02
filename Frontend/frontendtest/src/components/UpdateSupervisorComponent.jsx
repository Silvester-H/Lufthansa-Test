import React, { Component } from 'react';
import SupervisorService from '../services/SupervisorService';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import dateFormat from 'dateformat';
let user_logged= localStorage.getItem('user_type');
let local_vacations = 0;

class UpdateSupervisorComponent extends Component {
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
        this.changeReasonHandler= this.changeReasonHandler.bind(this);
        this.changeStatusHandler= this.changeStatusHandler.bind(this);
        this.updateApplication =this.updateApplication.bind(this);
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
          SupervisorService.getVacationUser(this.state.id).then((resVacations) => {              
            local_vacations  = resVacations.data;
            
        });
    
      }
      updateApplication  = (event) => {
        event.preventDefault();
        let validation_message = '';
        let dataNull = null;
      
      if (this.state.status!=='Accepted' && this.state.status!=='Denied') {
        validation_message = validation_message + ' Please Accept or Deny the application. ';
    }
    if (this.state.status==='Denied') {
        if (this.state.reason===dataNull) {
            validation_message = validation_message + ' Please specify a reason for Denied. ';
        } else {
            let lengthVar = this.state.reason;
            if (lengthVar.length<5) {
                validation_message = validation_message + ' Please specify a longer reason ';
            }  
        }   
    }
            
      if (validation_message==='') {
        let status_ob = this.state.status;
     
        let application = {name: this.state.name, username: this.state.username,status: status_ob,
            startDate: this.state.startDate, endDate: this.state.endDate, reason: this.state.reason 
                 };

        SupervisorService.updateApplication(application, this.state.id ).then(res => {
          this.props.history.push('/supervisors');
          alertify.success('Application updated successfully.');
        }).catch ( res => {
          alertify.error('Application could not be updated.');
        }
        );
      } else {
        alertify.error(validation_message);
      }
      
      }
    changeStatusHandler=(event)  => {
        this.setState({status: event.target.value});
    }
    changeReasonHandler=(event)  => {
        this.setState({reason: event.target.value});
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
                                    <h3 className="text-center text-muted"> Update Application Details</h3>
                                    <div className="card-body">
                                        <form>
                                        <div className="form-group">
                                                <label>Username</label>
                                                <input placeholder="username" name="username" className="form-control" value={this.state.username} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Number of Days remaining</label>
                                                <input placeholder="Days remaining" name="noDays" className="form-control" value={local_vacations} readOnly/>
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
                                                <select className="form-control" name="name" value={this.state.status} onChange={this.changeStatusHandler} value={this.state.status}>
                                                <option value="Proccessed" >Proccessed</option>
                                                <option value="Accepted">Accepted</option>
                                                <option value="Denied">Denied</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Reason</label>
                                                <input placeholder="no reason" name="reason" className="form-control" onChange={this.changeReasonHandler} value={this.state.reason} />
                                            </div>
                                            <br>
                                            </br>
                                           
                                            <button className="btn btn-outline-success" onClick={this.updateApplication} style={{ width: "100px"}}>Update</button>
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

export default UpdateSupervisorComponent;