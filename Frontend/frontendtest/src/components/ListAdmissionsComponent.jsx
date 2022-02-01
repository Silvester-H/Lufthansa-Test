import React, { Component } from 'react';
import LogService from '../services/LogService';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
const $ = require("jquery");
$.Datatable = require("datatables.net");
let user_logged= localStorage.getItem('user_type');
let user_status = localStorage.getItem('status');

class ListAdmissionsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            reports : []
        }
        this.goBack = this.goBack.bind(this);
      
    }

    
    logoutButton=(event)  => {
        event.preventDefault();
        LoginService.logout().then( res => {    
        alertify.success("Logout successful.",);
        this.props.history.push('/');
        setTimeout(window.location.reload.bind(window.location), 1000);
        });
      }
    componentDidMount() {
        LogService.getLogs().then((res) => {
            this.setState({reports: res.data});
            // console.log(res.data);
            // console.log(this.state.reports);
            this.$el = $(this.el);
            this.$el.DataTable({
                data: this.state.reports,
                "order": [[ 0, "desc" ]],
                columns: [
                    { title: "Id", data: "id", "visible": false, },
                    { title: "User", data: "user" },
                    { title: "Action", data: "action" },
                    { title: "Time", data: "time" },
                ]
               
            })
        });
        // console.log(this.state.reports.data);
       
    }
    
    goBack(){
        this.props.history.push('/users');
    }
    render() {
     
        if (user_status==='Active') {
            if (user_logged === 'Admin') {
                return (
                    <div className="container-fluid bg-dark.bg-gradient">
                        <h2 className="text-center text-muted"> Log List</h2>
                        <div className="btn btn-outline-dark" style={{ width: "200px"}} onClick={this.goBack}>Go back</div>
                        <br/><br></br>
                        <div className ="row ">
                            <table className= "table table-light table-responsive table-hover  "  ref={(el) => (this.el = el)}>
                               <thead className="table-dark thead-dark text-center"></thead>
                               <tbody className="text-center" ></tbody>
                                {/* <thead className="table-dark thead-dark text-center">
                                    <tr>
                                        <th>User</th>
                                        <th>Action</th>
                                        <th>Time</th>
                                       
                                       
                                    </tr>
                                </thead>
        
                                <tbody className="text-center" >
                                    {
                                        this.state.reports.map(
                                            report => 
                                            <tr key ={report.id}>
                                                <td> {report.user}</td>
                                                <td> {report.action}</td>
                                                <td> {report.time}</td>
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
            <h3 className="text-center text-muted"> Please contact <a href="mailto:admin@lufthansa.com" style={{ textDecoration: "none", color: "#6c757d"}}>Admin!</a></h3>
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

export default ListAdmissionsComponent;