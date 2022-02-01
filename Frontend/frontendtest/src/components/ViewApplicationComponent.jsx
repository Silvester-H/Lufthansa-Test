import React, { Component } from 'react';
import ApplicationService from '../services/ApplicationService';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
let user_logged= localStorage.getItem('user_type');
let user_status = localStorage.getItem('status');
class ViewApplicationComponent extends Component {
    constructor(props){
        super(props)
  
        this.state = {
            id: this.props.match.params.id,
            name: '',
            surname: '',
            email: '',
            id_card: '',
            land_area: '',
            modified_at: '',
            modified_by: '',
            status: ''
        }
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
        if (user_status==='') {
            this.props.history.push('/');
        }
        if (user_status==='Active') {
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
                                 
                                    <h3 className="text-center text-muted"> View Application</h3>
                                    <div className="card-body">
                                       
                                        <form>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input placeholder="Name" name="name" className="form-control" value={this.state.name} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Surname</label>
                                                <input placeholder="Surname" name="Surname" className="form-control" value={this.state.surname} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input placeholder="Email" name="Email" className="form-control" value={this.state.email} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>ID Card</label>
                                                <input placeholder="ID Card" name="id_card" className="form-control" value={this.state.id_card} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Land Area</label>
                                                <input placeholder="Land Area" name="id_card" className="form-control" value={this.state.land_area} readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <input placeholder="Status" name="status" className="form-control" value={this.state.status} readOnly/>
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

export default ViewApplicationComponent;