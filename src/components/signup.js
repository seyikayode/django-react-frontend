import React, {Component} from "react";
import {Redirect, withRouter, Link} from "react-router-dom";
import axiosInstance from "../http-common";

class Signup extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            email: "",
            redirect: null,
            errors: {}
        }
    };

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value 
        })
    };

    handleSubmit(e){
        e.preventDefault();
        axiosInstance.post("/user/create/", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            this.setState({
                username: "",
                password: "",
                redirect: "/login"
            })
            return response;
        })
        .catch(e => {
            console.log(e)
            this.setState({
                errors: e.response.data
            })
        })
    };

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div className="submit-form">
                <h3>Signup Page</h3>
                <br></br>
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
                        Email:
                        <input className="form-control" type="email" name="email" value={this.state.email}
                        onChange={this.handleChange} />
                        <p style={{color: "red"}}>{this.state.errors.email ? this.state.errors.email : null}</p>
                    </label>
                    </div>
                    <div className="form-group">
                    <label>
                        Password:
                        <input className="form-control" type="password" name="password" value={this.state.password}
                        onChange={this.handleChange} />
                        <p style={{color: "red"}}>{this.state.errors.password ? this.state.errors.password : null}</p>
                    </label>
                    </div>
                    <p>Already have an Account? <Link to={`/login`}>Login</Link></p>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}
export default withRouter(Signup);