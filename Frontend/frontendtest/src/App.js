
import './App.css';
import ListApplicationComponent from './components/ListApplicationComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateApplicationComponent from './components/CreateApplicationComponent';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UpdateApplicationComponent from './components/UpdateApplicationComponent';
import ViewApplicationComponent from './components/ViewApplicationComponent';
import ListUserComponent from './components/ListUserComponent';
import CreateUserComponent from './components/CreateUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import ViewSupervisorComponent from './components/ViewSupervisorComponent';
import LoginComponent from './components/LoginComponent';
import UpdateUserPasswordComponent from './components/UpdateUserPasswordComponent';
import updateOwnPasswordComponent from './components/UpdateOwnPasswordComponent';
import UpdateSupervisorPasswordComponent from './components/UpdateSupervisorPasswordComponent';
import ListSupervisorComponent from './components/ListSupervisorComponent';
import UpdateSupervisorComponent from './components/UpdateSupervisorComponent';
function App() {
  return (
    <div>
      <Router>
     
          <HeaderComponent />
      
        <div className="container">
          
          <Switch>
            <Route path= "/" exact component = {LoginComponent}></Route>
            <Route path= "/application" exact component = {ListApplicationComponent}></Route>
            <Route path= "/add_application" component = {CreateApplicationComponent}></Route>
            <Route path= "/update_application/:id" component = {UpdateApplicationComponent}></Route>
            <Route path= "/view_application/:id" component = {ViewApplicationComponent}></Route>
            <Route path= "/users" exact component = {ListUserComponent}></Route>
            <Route path= "/add_user" component = {CreateUserComponent}></Route>
            <Route path= "/update_user/:id" component = {UpdateUserComponent}></Route>
            <Route path= "/update_user_password/:id" component = {UpdateUserPasswordComponent}></Route>
            <Route path= "/view_user/:id" component = {ViewUserComponent}></Route>
            <Route path= "/update_password/" component = {updateOwnPasswordComponent}></Route>
            <Route path= "/supervisors" component = {ListSupervisorComponent}></Route>
            <Route path= "/view_supervisors/:id" component = {ViewSupervisorComponent}></Route>
            <Route path= "/update_supervisor_password/" component = {UpdateSupervisorPasswordComponent}></Route>
            <Route path= "/update_supervisors/:id" component = {UpdateSupervisorComponent}></Route>
          </Switch>
        </div>
      
          <FooterComponent />
      
      </Router>
    </div>
  );
}

export default App;
