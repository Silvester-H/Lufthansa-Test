import React, { Component } from 'react';
import SupervisorService from '../services/SupervisorService';
import LoginService from '../services/LoginService';
import ReactDOM from 'react-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import 'datatables.net-responsive'

import dateFormat from 'dateformat';
const $ = require("jquery");

$.Datatable = require("datatables.net-responsive");
let user_logged= localStorage.getItem('user_type');
class ListSupervisorComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            applications : []
            
        }
       
        this.editApplication = this.editApplication.bind(this);
        this.updateOwnPassword = this.updateOwnPassword.bind(this);
        this.viewApplication= this.viewApplication.bind(this);
    }
    viewApplication(id) {
        this.props.history.push(`/view_supervisors/${id}`);
    }
    editApplication(id) {
        this.props.history.push(`/update_supervisors/${id}`);
    }

    componentDidMount() {
       
        SupervisorService.getAllApplications().then((res) => {
            this.setState({applications: res.data});
            this.$el = $(this.el);
            this.$el.DataTable({
                data: this.state.applications,
                columns: [
                    { title: "Id", data: "id",  "visible": false },
                    { title: "Username", data: "username", },
                    { title: "Type ", data: "name" },
                    { title: "Start Date", data: "startDate",  },
                    { title: "End Date", data: "endDate", },
                    { title: "Status", data: "status" },
                    { title: "Actions", data: "id" },

                ],
                responsive: {
                    details: {
                    renderer: $.fn.dataTable.Responsive.renderer.listHiddenNodes()
                   
                  }
               },
               colReorder:true,
                columnDefs: [
                    {
                        'targets': [6],
                        createdCell:  (td, cellData, rowData, row, col) => {
                          ReactDOM.render(
                             <div className ="container-row ">
                             <button onClick={ () => this.viewApplication(rowData.id)} className="btn btn-outline-dark" style={{ width: "100px", marginLeft: "15px"}} >View</button>
                             <button onClick={ () => this.editApplication(rowData.id)} className="btn btn-outline-success" style={{ width: "100px", marginLeft: "15px"}}>Edit</button>
                             </div>,td )
                           }

                            }, 
                          
                ],
   
            })
           
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

    updateOwnPassword(){
        this.props.history.push('/update_supervisor_password');
    }
    render() {
            if (user_logged === 'Supervisor') {
                return (
                    <div>
                        <h2 className="text-center text-muted"> Applications List</h2>
                       <div className="btn btn-outline-warning" style={{ width: "200px"}} onClick={this.updateOwnPassword}>Update Password</div>
                    
                        <br/><br></br>
                        <div className ="row">
                        <table className= "table table-light table-responsive table-hover" ref={(el) => (this.el = el)}>
                        <thead className="table-dark thead-dark text-center"></thead>
                        <tbody className="text-center" ></tbody>
                                {/* <thead className="table-dark thead-dark text-center">
                                    <tr>
                                        <th>Name</th>
                                        <th>Surname</th>
                                        <th>Land Area</th>
                                        <th>Status</th>
                                        <th>Modified by</th>
                                        <th>Modified at</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
        
                                <tbody className="text-center">
                                    {
                                        this.state.applications.map(
                                            application => 
                                            <tr key ={application.id}>
                                                <td> {application.name}</td>
                                                <td> {application.surname}</td>
                                                <td> {application.land_area}</td>
                                                <td> {application.status}</td>
                                                <td> {application.modified_by}</td>
                                                <td> {application.modified_at}</td>
                                                <td>
                                                    <button onClick={ () => this.viewApplication(application.id)} className="btn btn-outline-dark" style={{ width: "100px", marginLeft: "15px"}} >View</button>
                                                    <button onClick={ () => this.editApplication(application.id)} className="btn btn-outline-secondary" style={{ width: "100px", marginLeft: "15px"}}>Update</button>
                                                    <button onClick={ () => this.deleteApplication(application.id)} className="btn btn-outline-danger" style={{ width: "100px", marginLeft: "15px"}}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody> */}
                            </table>
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


export default ListSupervisorComponent;