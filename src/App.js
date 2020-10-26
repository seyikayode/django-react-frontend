import React, {Component} from "react";
import {Switch, Link, Route, Redirect, withRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTutorial from "./components/add-tutorial";
import Tutorial from "./components/tutorial";
import TutorialList from "./components/tutorials-list";
import Login from "./components/login";
import Signup from "./components/signup";
import axiosInstance from "./http-common";

class App extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this)

        this.state = {
            redirect: null
        }
    };

    async handleLogout(){
        try {
            const response = await axiosInstance.post("/blacklist/", {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            axiosInstance.defaults.headers["Authorization"] = null;
            this.setState({
                redirect: this.props.history.push("/login")
            })
            return response;
        } catch(e){
            console.log(e);
        }
    };

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const access_token = localStorage.getItem("access_token")

        return(
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/" className="navbar-brand">Home</a>
                        {access_token ? (
                            <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                        <Link to={`/tutorials`} className="nav-link">Tutorials</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/add`} className="nav-link">Add</Link>
                    </li>
                    <button id="btn-logout" className="btn btn-outline-danger" 
                    onClick={this.handleLogout}>Logout</button>
                        </div>
                        ) : (
                            <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                            <Link to={`/login`} className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/signup`} className="nav-link">Signup</Link>
                        </li>
                        </div>
                        )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/tutorials"]} component={TutorialList} />
                        <Route exact path="/add" component={AddTutorial} />
                        <Route path="/tutorials/:id" component={Tutorial} />
                        <Route exact path={"/login"} component={Login} />
                        <Route exact path={"/signup"} component={Signup} />
                    </Switch>
                </div>
            </div>
        )
    }
};
export default withRouter(App);