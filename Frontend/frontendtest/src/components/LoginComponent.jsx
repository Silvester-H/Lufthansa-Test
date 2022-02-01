import React, { Component } from 'react';
import LoginService from '../services/LoginService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
let token_value= localStorage.getItem('token');
let user_logged= localStorage.getItem('user_type');
class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.loginButton = this.loginButton.bind(this);
    this.logoutButton = this.logoutButton.bind(this);
    this.continueButton = this.continueButton.bind(this);
    this.state = {
      username: "",
      password: ""

    };
  }
  changeUsernameHandler=(event)  => {
    this.setState({username: event.target.value});

}
changePasswordHandler=(event)  => {
    this.setState({password: event.target.value});

}
logoutButton=(event)  => {
  event.preventDefault();
  LoginService.logout().then( res => {    
  alertify.success("Logout successful.",);
  this.props.history.push('/');
  setTimeout(window.location.reload.bind(window.location), 1000);
  });
}
continueButton=(event)  => {
  event.preventDefault();
  if (user_logged ==="Admin") {
    this.props.history.push('/users');
  } else {
    this.props.history.push('/application');
  }

}
loginButton  = (event) => {
  event.preventDefault();
  let usernameVar = this.state.username;
  let passwordVar = this.state.password;
  // let bcrypt = require('bcryptjs');
  // let hash = bcrypt.hashSync(passwordVar, 10);
  // console.log(hash);
  let user = {username: usernameVar, password: passwordVar };
//   console.log('application =>' + JSON.stringify(user));

  LoginService.login(user).then( res => {
    let user_logged= localStorage.getItem('user_type');
    if (user_logged ==="Admin") {
      this.props.history.push('/users');
      window.location.reload();
    } else {
      this.props.history.push('/application');
      window.location.reload();
    }
    alertify.success('Login successful.');
    // localStorage.setItem('token',res.jwt);
   
  }).catch ( res => {
    alertify.error('Username or Password Wrong.');
  }
  );

}
 
    render() {
       if (token_value==="") {
        return (
            <div>
            <div className="container">
                <br>
                </br>
                <br>
                </br>
                <div className="row row-primary ">
                    <div className="card col-md-4 offset-md-4 offset-md-4 ">
                
                        <h3 className="text-center text-muted"> Login to the System</h3>
                        <div className="card-body">
                           
                            <form>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input placeholder="Username" name="username" className="form-control" value={this.state.username} onChange={this.changeUsernameHandler}/>
                                </div>
                                <div className="form-group ">
                                    <label>Password</label>
                                    <input type="password" placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                                </div>
                        
                                <br>
                                </br>
                              
                                <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-warning" onClick={this.loginButton} style={{ width: "100px"}}>Login</button>
                                </div>
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
            <h3 className="text-center text-muted"> You are already logged in!</h3>
            </div>
            <br></br><br></br>
            <div className="d-flex justify-content-center">
            <button className="btn btn-outline-warning" onClick={this.continueButton} style={{ width: "100px"}}>Continue</button>
            <button className="btn btn-outline-danger" onClick={this.logoutButton} style={{ width: "100px", marginLeft: "15px"}}>Logout</button>
            </div> 
           </form> 
           </div>
           </div> 
           </div> 
           </div>
          );

       }
    }
}

export default LoginComponent;