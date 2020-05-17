import React from "react";
import { reduxForm, Field } from "redux-form";
import EditField from "./EditField";
import { Link } from "react-router-dom";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        <Field
          label="Survey Title"
          name="title"
          type="text"
          component={EditField}
        />
        <Link
          to={`/surveys/${this.props.id}`}
          className="red btn-flat white-text"
        >
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Update
          <i className="material-icons right">update</i>
        </button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["title"]) {
    errors["title"] = `You must provide a value`;
  }

  return errors;
}

export default reduxForm({ form: "surveyEdit", validate })(EditForm);
