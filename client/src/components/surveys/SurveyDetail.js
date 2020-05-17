import React from "react";
import axios from "axios";
import history from "../../history";

class SurveyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { survey: {} };
  }
  componentDidMount() {
    axios.get(`/api/surveys/${this.props.match.params.id}`).then((res) => {
      this.setState({ survey: res.data });
    });
  }
  deleteSurvey() {
    axios.delete(`/api/surveys/${this.props.match.params.id}`).then(() => {
      history.push("/surveys");
    });
  }
  editSurvey() {
    history.push(`/surveys/${this.props.match.params.id}/edit`);
  }
  renderSurvey() {
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
      <div className="card cyan lighten-4 ">
        <div className="card-content text-white">
          <span className="card-title">{this.state.survey.title}</span>
          <p>{this.state.survey.body}</p>
          <p className="right">
            Sent On: {new Date(this.state.survey.dateSent).toLocaleDateString()}
          </p>
        </div>
        <div className="card-action">
          <a>Yes: {this.state.survey.yes}</a>
          <a>No: {this.state.survey.no}</a>

          <button
            className="btn waves-effect waves-light"
            onClick={() => this.editSurvey()}
          >
            Edit
            <i className="material-icons right">edit</i>
          </button>

          <button
            className="btn waves-effect waves-light red darken-1"
            onClick={() => this.deleteSurvey()}
          >
            Delete
            <i className="material-icons right">delete</i>
          </button>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderSurvey()}</div>;
  }
}

export default SurveyDetail;
