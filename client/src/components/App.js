import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";

import Header from "./Header";
import Landing from "./Landing";
import { fetchUser } from "../actions/index";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyDetail from "./surveys/SurveyDetail";
import SurveyEdit from "./surveys/SurveyEdit";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/surveys" exact component={Dashboard} />
              <Route path="/surveys/new" exact component={SurveyNew} />
              <Route path="/surveys/:id" exact component={SurveyDetail} />
              <Route path="/surveys/:id/edit" exact component={SurveyEdit} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, { fetchUser: fetchUser })(App);
