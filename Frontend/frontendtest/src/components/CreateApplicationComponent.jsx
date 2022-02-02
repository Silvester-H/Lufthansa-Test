import React, { Component } from 'react';
import ApplicationService from '../services/ApplicationService';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import dateFormat from 'dateformat';
let user_logged= localStorage.getItem('user_type');
let user_name = localStorage.getItem('username');
class CreateApplicationComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            username: '',
            id: '',
            startDate: '',
            endDate: '',
            status: ''
           
        }
        this.changeNameHandler= this.changeNameHandler.bind(this);
        this.changeStartDateHandler= this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler= this.changeEndDateHandler.bind(this);
        this.saveApplication =this.saveApplication.bind(this);
      }

      saveApplication  = (event) => {
          event.preventDefault();
          let validation_message = '';
          let nameValue = this.state.name;
          if (nameValue === '') {
              nameValue = "Days off";
          }
          if (this.state.startDate==='') {
            this.state.startDate = new Date();
          }
          if (this.state.endDate==='') {
            this.state.endDate = new Date();
        }
         
         
          if (validation_message==='') {
            let status_ob = this.state.status;
            if (status_ob === "") {
              status_ob = "Proccessed";
            }
            let application = {name: nameValue, username: user_name,status: status_ob,
                startDate: this.state.startDate, endDate: this.state.endDate  
                     };

            ApplicationService.createApplication(application).then(res => {
              let ResultString =  res.data;

              if (ResultString==="Application Saved") {
                alertify.success('Application added successfully.');
                this.props.history.push('/application');
              } else {
                alertify.error(ResultString); 
              }
             
            }).catch ( res => {
              alertify.error('Application could not be sent.');
            }
            );
          } else {
            alertify.error(validation_message);
          }
          
      }
    changeNameHandler=(event)  => {
        this.setState({name: event.target.value});

    }

    changeStartDateHandler=(event)  => {
        this.setState({startDate: event.target.value});

    }
    changeEndDateHandler=(event)  => {
        this.setState({endDate: event.target.value});

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
                                 
                                    <h3 className="text-center text-muted"> Apply for an Application</h3>
                                    <div className="card-body">
                                       
                                        <form>
                                            <div className="form-group">
                                            <label>Application Type</label>
                                                <select className="form-control" name="name" value={this.state.name} onChange={this.changeNameHandler}>
                                                <option defaultValue="Days off" >Days off</option>
                                                <option value="Vacations">Vacations</option>
                                                <option value="Compensation days">Compensation days</option>
                                            </select>  </div>
                                            <div className="form-group">
                                            <label>Start Date</label>
                                            <input type="date" placeholder='startDate' name="startDate" className="form-control" value={dateFormat(this.state.startDate,"yyyy-mm-dd")} onChange={this.changeStartDateHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input type="date" placeholder='endDate' name="endDate" className="form-control" value={dateFormat(this.state.endDate,"yyyy-mm-dd")} onChange={this.changeEndDateHandler}/>
                                        </div>
                                            <br>
                                            </br>
                                           
                                            <button className="btn btn-outline-success" onClick={this.saveApplication} style={{ width: "100px"}}>Apply</button>
                                            <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ width: "100px",marginLeft: "15px"}}>Cancel</button>
        
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

export default CreateApplicationComponent;