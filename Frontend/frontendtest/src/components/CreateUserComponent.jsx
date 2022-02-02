import React, { Component } from 'react';
import UserServices from '../services/UserServices';
import LoginService from '../services/LoginService';
import 'react-notifications-component/dist/theme.css';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import dateFormat from 'dateformat';
let user_logged= localStorage.getItem('user_type');
let user_name = localStorage.getItem('username');
class CreateUserComponent extends Component {
    constructor(props){
        super(props)
  
        this.state = {
            username: '',
            password: '',
            modified_by: '',
            modified_at: '',
            user_type: '',
            startDate: '',
          
        }
        this.changeUsernameHandler= this.changeUsernameHandler.bind(this);
        this.changePasswordHandler= this.changePasswordHandler.bind(this);
        this.changeModifiedByHandler= this.changeModifiedByHandler.bind(this);
        this.changeDateHandler= this.changeDateHandler.bind(this);
        this.changeModifiedAtHandler= this.changeModifiedAtHandler.bind(this);
        this.changeUserTypeHandler= this.changeUserTypeHandler.bind(this);
        this.saveUser =this.saveUser.bind(this);
      }

      saveUser  = (event) => {
          event.preventDefault();
          let validation_message = '';
          let name = this.state.username;
          if (name==='') {
              validation_message = validation_message + ' Name should not be empty. ';
          }
          let passwordvalue = this.state.password;
          if (passwordvalue==='') {
              validation_message = validation_message + ' Password should not be empty.';
          }


          if (validation_message==='') {
          let date_ob= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
          let user_type_ob = this.state.user_type;
          if (user_type_ob === "") {
            user_type_ob = "Admin";
          }
          if (this.state.startDate ==="") {
              this.state.startDate= new Date();
          }
          let passwordVar = this.state.password;
          let bcrypt = require('bcryptjs');
          let hash = bcrypt.hashSync(passwordVar, 10);
          // console.log(hash);

          let user = {username: this.state.username, password: hash,  
            modified_by: user_name, modified_at: date_ob,
            user_type: user_type_ob, startDate: this.state.startDate};

          UserServices.createUser(user).then( res => {
            this.props.history.push('/users');
           alertify.success('User created successfully.');
          }).catch ( res => {
            alertify.error('User already exists.');
          }
            );
          } else {
            alertify.error(validation_message);
          }
      }
      changeUsernameHandler=(event)  => {
        this.setState({username: event.target.value});

    }
    changePasswordHandler=(event)  => {
        this.setState({password: event.target.value});

    }
    changeDateHandler=(event)  => {
        this.setState({startDate: event.target.value});

    }
    logoutButton=(event)  => {
        event.preventDefault();
        LoginService.logout().then( res => {    
        alertify.success("Logout successful.",);
        this.props.history.push('/');
        setTimeout(window.location.reload.bind(window.location), 1000);
        });
      }

    changeModifiedByHandler=(event)  => {
        this.setState({modified_by: event.target.value});

    }
    changeModifiedAtHandler=(event)  => {
        this.setState({modified_at: event.target.value});

    }

    changeUserTypeHandler=(event)  => {
        this.setState({user_type: event.target.value});

    }
    cancel()  {
        this.props.history.push('/users');
    }
    render() {
    

        if (user_logged === 'Admin') {
            return (
                <div>
                    <div className="container">
                        <br>
                        </br>
                        <br>
                        </br>
                        <div className="row row-primary">
                            <div className="card col-md-6 offset-md-3 offset-md-3 ">
                             
                                <h3 className="text-center"> Register a new User</h3>
                                <div className="card-body">
                                   
                                    <form>
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input placeholder="Username" name="username" className="form-control" value={this.state.username} onChange={this.changeUsernameHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label>User Type</label>
                                            <select className="form-control" name="user_type" value={this.state.user_type} onChange={this.changeUserTypeHandler}>
                                            <option defaultValue="Admin" >Admin</option>
                                            <option value="User">User</option>
                                            <option value="Supervisor">Supervisor</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input type="date" placeholder='date' name="date" className="form-control" value={dateFormat(this.state.startDate,"yyyy-mm-dd")} onChange={this.changeDateHandler}/>
                                        </div>
                                        <br>
                                        </br>
                                       
                                        <button className="btn btn-outline-success" onClick={this.saveUser} style={{ width: "100px"}}>Register</button>
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

export default CreateUserComponent;