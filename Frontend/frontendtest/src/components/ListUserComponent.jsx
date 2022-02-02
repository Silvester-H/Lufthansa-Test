import React, { Component } from 'react';
import UserServices from '../services/UserServices';
import LoginService from '../services/LoginService';
import ReactDOM  from 'react-dom';
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
class ListUserComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users : []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser= this.editUser.bind(this);
        this.deleteUser= this.deleteUser.bind(this);
        this.viewUser= this.viewUser.bind(this);
        this.updateUserPassword= this.updateUserPassword.bind(this);
    }
    logoutButton=(event)  => {
        event.preventDefault();
        LoginService.logout().then( res => {    
        alertify.success("Logout successful.",);
        this.props.history.push('/');
        setTimeout(window.location.reload.bind(window.location), 1000);
        });
      }
    editUser(id) {
        this.props.history.push(`/update_user/${id}`);
    }
    updateUserPassword(id) {
        this.props.history.push(`/update_user_password/${id}`);
    }
    viewUser(id) {
        this.props.history.push(`/view_user/${id}`);
    }
    deleteUser(id){
        UserServices.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
       
        });
        alertify.success("Deleted successfully.",);
        setTimeout(window.location.reload.bind(window.location), 1000);
    }
    componentDidMount() {
        UserServices.getUsers().then((res) => {
            this.setState({users: res.data});
            this.$el = $(this.el);
            this.$el.DataTable({
                data: this.state.users,
                columns: [
                    { title: "Id", data: "id",   "visible": false, },
                    { title: "Username", data: "username" },
                    { title: "User", data: "user_type" },
                    { title: "Started At", data: "startDate" ,  displayFormat: 'M/D/YYYY'},
                    { title: "Modified By", data: "modified_by" },
                    { title: "Modified At", data: "modified_at" },
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
                             <button onClick={ () => this.viewUser(rowData.id)} className="btn btn-outline-dark" style={{ width: "100px", marginLeft: "15px"}} >View</button>
                             <button onClick={ () => this.editUser(rowData.id)} className="btn btn-outline-secondary" style={{ width: "100px", marginLeft: "15px"}}>Update</button>
                             <button onClick={ () => this.deleteUser(rowData.id)} className="btn btn-outline-danger" style={{ width: "100px", marginLeft: "15px"}}>Delete</button>
                             <button onClick={ () => this.updateUserPassword(rowData.id)} className="btn btn-outline-warning" style={{ width: "100px", marginLeft: "15px"}}>Password</button>
                             </div>,td )
                           }
                            } 
                ],
   
            })
        });
    }
    addUser(){
        this.props.history.push('/add_user');
    }
    goToLog(){
        this.props.history.push('/reports');
    }
    render() {
   
   
            if (user_logged === 'Admin') {
                return (
                    <div className="container-fluid bg-dark.bg-gradient ">
                        <h2 className="text-center text-muted"> Users List</h2>
                        <div className="btn btn-outline-dark" style={{ width: "200px"}} onClick={this.addUser}>Add User</div>
                         <br/><br></br>
                        <div className ="row ">
                            <table className= "table table-light table-responsive table-hover " ref={(el) => (this.el = el)}>
                               <thead className="table-dark thead-dark text-center"></thead>
                               <tbody className="text-center" ></tbody>
                                {/* <thead className="table-dark thead-dark text-center">
                                    <tr>
                                        <th>Username</th>
                                        <th>User Type</th>
                                        <th>Status</th>
                                        <th>Modified By</th>
                                        <th>Modified At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
        
                                <tbody className="text-center" >
                                    {
                                        this.state.users.map(
                                            user => 
                                            <tr  key ={user.id}>
                                                <td> {user.username}</td>
                                                <td> {user.user_type}</td>
                                                <td> {user.status}</td>
                                                <td> {user.modified_by}</td>
                                                <td> {user.modified_at}</td>
                                                <td>
                                                <div className ="container-row ">
                                                    <button onClick={ () => this.viewUser(user.id)} className="btn btn-outline-dark" style={{ width: "100px", marginLeft: "15px"}} >View</button>
                                                    <button onClick={ () => this.editUser(user.id)} className="btn btn-outline-secondary" style={{ width: "100px", marginLeft: "15px"}}>Update</button>
                                                    <button onClick={ () => this.deleteUser(user.id)} className="btn btn-outline-danger" style={{ width: "100px", marginLeft: "15px"}}>Delete</button>
                                                    <button onClick={ () => this.updateUserPassword(user.id)} className="btn btn-outline-warning" style={{ width: "100px", marginLeft: "15px"}}>Password</button>
                                                </div>
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


export default ListUserComponent;