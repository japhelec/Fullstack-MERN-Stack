import React from "react";
import axios from "axios";
import EditForm from "./EditForm";

import history from "../../history";

class SurveyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { survey: {} };
  }
  componentDidMount() {
    axios.get(`/api/surveys/${this.props.match.params.id}`).then((res) => {
      this.setState({ survey: res.data });
    });
  }
  onSurveySubmit = (formValues) => {
    axios
      .patch(`/api/surveys/${this.props.match.params.id}`, formValues)
      .then(() => {
        history.push("/surveys");
      });
  };
  renderForm() {
    if (JSON.stringify(this.state.survey) === "{}") {
      return (
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>Edit a stream</h3>
        <EditForm
          initialValues={{
            title: this.state.survey.title,
          }}
          onSurveySubmit={this.onSurveySubmit}
          id={this.props.match.params.id}
        />
      </div>
    );
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default SurveyEdit;
