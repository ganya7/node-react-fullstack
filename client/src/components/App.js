import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import * as actions from "../actions";

// const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

// const App = () => {
class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path='/' exact component={Landing} />
                        <Route path='/surveys' exact component={Dashboard} />
                        <Route path='/surveys/new' exact component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return;
}

//key of the 2nd argument can be our own choice and its value will the action imported
//  and to be associated with it.
export default connect(null, actions)(App); 