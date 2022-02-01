import React, { Component } from 'react';
import ApplicationService from '../services/ApplicationService';
import LoginService from '../services/LoginService';
import ReactDOM from 'react-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import 'datatables.net-responsive'
const $ = require("jquery");
$.Datatable = require("datatables.net-responsive");
let user_logged= localStorage.getItem('user_type');
class ListApplicationComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            applications : []
            
        }
       
        this.addApplication = this.addApplication.bind(this);
        this.updateOwnPassword = this.updateOwnPassword.bind(this);
        this.deleteApplication= this.deleteApplication.bind(this);
        this.viewApplication= this.viewApplication.bind(this);
    }
    viewApplication(id) {
        this.props.history.push(`/view_application/${id}`);
    }
    deleteApplication(id){
        ApplicationService.deleteApplication(id).then( res => {
            this.setState({farners: this.state.applications.filter(application => application.id !== id)});
       
        });
        alertify.success("Deleted successfully.",);
        setTimeout(window.location.reload.bind(window.location), 1000);
    }
    componentDidMount() {
       
        ApplicationService.getApplications().then((res) => {
            this.setState({applications: res.data});
            this.$el = $(this.el);
            this.$el.DataTable({
                data: this.state.applications,
                columns: [
                    { title: "Id", data: "id",   "visible": false, },
                    { title: "username", data: "username", "visible": false, },
                    { title: "Type ", data: "name" },
                    { title: "Start Date", data: "startDate" },
                    { title: "End Date", data: "endDate" },
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
                             <button onClick={ () => this.deleteApplication(rowData.id)} className="btn btn-outline-danger" style={{ width: "100px", marginLeft: "15px"}}>Delete</button>
                             </div>,td )
                           }
                            } 
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
    addApplication(){
        this.props.history.push('/add_application');
    }
    updateOwnPassword(){
        this.props.history.push('/update_password');
    }
    render() {
            if (user_logged === 'User') {
                return (
                    <div>
                        <h2 className="text-center text-muted"> Applications List</h2>
                        <div className="btn btn-outline-dark" style={{ width: "200px"}} onClick={this.addApplication}>Add new application</div>
                        <div className="btn btn-outline-warning" style={{ width: "200px", marginLeft: "15px"}} onClick={this.updateOwnPassword}>Update Password</div>
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


export default ListApplicationComponent;