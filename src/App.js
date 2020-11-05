import React from "react";
import {Switch, Link, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTutorial from "./components/add-tutorial";
import Tutorial from "./components/tutorial";
import TutorialList from "./components/tutorials-list";

const App =()=> {

        return(
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={`/`} className="navbar-brand">Home</Link>
                            <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                        <Link to={`/tutorials`} className="nav-link">Tutorials</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/add`} className="nav-link">Add</Link>
                    </li>
                        </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/tutorials"]} component={TutorialList} />
                        <Route exact path="/add" component={AddTutorial} />
                        <Route path="/tutorials/:id" component={Tutorial} />
                    </Switch>
                </div>
            </div>
        )
    };
export default App;