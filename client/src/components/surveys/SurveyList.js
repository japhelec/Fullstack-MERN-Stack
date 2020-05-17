import "./surveyList.css"
import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions/index";
import history from "../../history";


class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    console.log(this.props.surveys);
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div
          className="card cyan lighten-4 mouseHover"
          key={survey._id}
          onClick={() => history.push(`/surveys/${survey._id}`)}
        >
          <div className="card-content text-white">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
