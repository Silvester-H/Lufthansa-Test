import React, { Component } from 'react';
import ApplicationService from '../services/ApplicationService';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
let user_logged= localStorage.getItem('user_type');
let user_name = localStorage.getItem('username');
let user_status = localStorage.getItem('status');
class UpdateApplicationComponent extends Component {
    constructor(props){
        super(props)
  
        this.state = {
            id: this.props.match.params.id,
            name: '',
            surname: '',
            email: '',
            id_card: '',
            land_area: '',
            status: '',
            modified_by: '',
            modified_at: ''
        }
        this.changeNameHandler= this.changeNameHandler.bind(this);
        this.changeSurnameHandler= this.changeSurnameHandler.bind(this);
        this.changeEmailHandler= this.changeEmailHandler.bind(this);
        this.changeIdCardHandler= this.changeIdCardHandler.bind(this);
        this.changeLandAreaHandler= this.changeLandAreaHandler.bind(this);
        this.changeStatusHandler= this.changeStatusHandler.bind(this);
        this.changeModifiedByHandler= this.changeModifiedByHandler.bind(this);
        this.changeModifiedAtHandler= this.changeModifiedAtHandler.bind(this);
        this.updateApplication =this.updateApplication.bind(this);
      }

      componentDidMount(){
          ApplicationService.getApplicationById(this.state.id).then( (res) =>{
              let application =res.data;
              this.setState({name: application.name,
                surname: application.surname,
                email: application.email,
                id_card: application.id_card,
                land_area: application.land_area,
                modified_by: application.modified_by,
                modified_at: application.modified_at,
                status: application.status });
          });
      }
      updateApplication  = (event) => {
          event.preventDefault();
          let validation_message = '';
          let nameValue = this.state.name;
          if (nameValue==='') {
              validation_message = validation_message + ' Name should not be empty. ';
          }
          let surnameValue = this.state.surname;
          if (surnameValue==='') {
              validation_message = validation_message + ' Surname should not be empty.';
          }
          let idValue = this.state.id_card;
          if (idValue==='') {
              validation_message = validation_message + ' ID Card Value should not be empty.';
          }
          if (validation_message==='') {
            let date_ob= new Date().toISOString().replace(/T/,' ').replace(/\..+/,'');
            let application = {name: this.state.name, surname: this.state.surname, email: this.state.email, 
                          id_card: this.state.id_card, land_area: this.state.land_area,
                          modified_at: date_ob, modified_by: user_name,
                          status: this.state.status};
          //   console.log('famrer =>' + JSON.stringify(application));
          ApplicationService.updateApplication(application, this.state.id ).then( res => {
              this.props.history.push('/applications');
              alertify.success('Application updated successfully.');
            }).catch ( res => {
              alertify.error('Application update error.');
            }
            );
          } else {
            alertify.error(validation_message);
          }
      
      }
    changeNameHandler=(event)  => {
        this.setState({name: event.target.value});

    }
    changeSurnameHandler=(event)  => {
        this.setState({surname: event.target.value});

    }
    changeEmailHandler=(event)  => {
        this.setState({email: event.target.value});

    }
    changeIdCardHandler=(event)  => {
        this.setState({id_card: event.target.value});

    }
    changeLandAreaHandler=(event)  => {
        this.setState({land_area: event.target.value});

    }
    changeStatusHandler=(event)  => {
        this.setState({status: event.target.value});

    }
    changeModifiedByHandler=(event)  => {
        this.setState({modified_by: event.target.value});

    }
    changeModifiedAtHandler=(event)  => {
        this.setState({modified_at: event.target.value});

    }
    cancel()  {
        this.props.history.push('/applications');
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
  
        if (user_status === 'Active') {
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
                                 
                                    <h3 className="text-center text-muted"> Update Application Details</h3>
                                    <div className="card-body">
                                       
                                        <form>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input placeholder="Name" name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Surname</label>
                                                <input placeholder="Surname" name="Surname" className="form-control" value={this.state.surname} onChange={this.changeSurnameHandler}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input placeholder="Email" name="Email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select className="form-control" name="status" value={this.state.status} onChange={this.changeStatusHandler}>
                                                <option defaultValue="Procesuar">Procesuar</option>
                                                <option value="Regjistruar">Regjistruar</option>
                                                <option value="Refuzuar">Refuzuar</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>ID Card</label>
                                                <input placeholder="ID Card" name="id_card" className="form-control" value={this.state.id_card} onChange={this.changeIdCardHandler}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Land Area</label>
                                                <input placeholder="Land Area" name="id_card" className="form-control" value={this.state.land_area} onChange={this.changeLandAreaHandler}/>
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
        } else {
            if (user_logged!=="") {
            return ( 
                <div className="container">
                <br></br><br></br>
            <div className="row row-primary ">
            
            <div className="card col-md-4 offset-md-4 offset-md-4 ">
            <div className="card-body">
            <form>
            <div className="form-group">
            <h3 className="text-center text-muted"> Your user is disabled. </h3>
            <h3 className="text-center text-muted"> Please contact <a href="mailto:admin@applications.com" style={{ textDecoration: "none", color: "#6c757d"}}>Admin!</a></h3>
            </div>
            <br></br><br></br>
            <div className="d-flex justify-content-center">
            <button className="btn btn-outline-danger" onClick={this.logoutButton} style={{ width: "100px"}}>Logout</button>
            </div> 
           </form> 
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
}

export default UpdateApplicationComponent;