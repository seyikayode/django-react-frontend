import React, {Component} from "react";
import {Redirect, withRouter, Link} from "react-router-dom";
import axiosInstance from "../http-common";

class Login extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            redirect: null,
            errors: {},
            message: ""
        }
    };

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value 
        })
    };

    handleSubmit(e){
        e.preventDefault();
        axiosInstance.post("/token/obtain/", {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            axiosInstance.defaults.headers["Authorization"] = "JWT " + response.data.access;
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh)
            this.setState({
                username: "",
                password: "",
                redirect: "/"
            });
        })
        .catch(e => {
            console.log(e)
            this.setState({
                errors: e.response.data,
                message: `Please enter a valid username or password!`
            })
        })
    };

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div className="submit-form">
                <h3>Login Page</h3>
                <br></br>
                 <p style={{color: "red"}}>{this.state.errors ? this.state.message : null}</p>
                <form>
                    <div className="form-group">
                    <label>
                        Username:
                        <input className="form-control" type="text" name="username" value={this.state.username}
                        onChange={this.handleChange} />
                        <p style={{color: "red"}}>{this.state.errors.username ? this.state.errors.username : null}</p>
                    </label>
                    </div>
                    <div className="form-group">
                    <label>
                        Password:
                        <input className="form-control"  type="password" name="password" value={this.state.password}
                        onChange={this.handleChange} />
                        <p style={{color: "red"}}>{this.state.errors.password ? this.state.errors.password : null}</p>
                    </label>
                    </div>
                    <p>Don't have an Account? <Link to={`/signup`}>Register</Link></p>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
                </form>
            </div>
        )
    }
}
export default withRouter(Login);