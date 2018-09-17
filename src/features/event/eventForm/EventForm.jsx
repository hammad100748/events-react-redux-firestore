import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from "revalidate";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
import moment from 'moment'
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(evt => evt.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators ({
  title: isRequired({message:'Event title is required'}),
  category: isRequired({message:'Provide event category'}),
  description:composeValidators(
    isRequired({message:'Needs to provide description of event'}),
    hasLengthGreaterThan(4)({message:'Description should be at least 5 characters'})
  )(),
  city:isRequired('city'),
  venue:isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends Component {
  
  onFormSubmit = values => {
    values.date=moment(values.date).format();
    if (this.props.initialValues.id) {
      this.props.history.goBack();
      this.props.updateEvent(values);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  handleCancelForm = () => {
    this.props.history.push("/events");
  };

  render() {
    const {invalid, submitting, pristine} = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Event Name"
              />
              <Field
                name="category"
                type="text"
                options={category}
                component={SelectInput}
                placeholder="What is event about"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Description of the event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={TextInput}
                placeholder="Event City"
              />
              <Field
                name="venue"
                type="text"
                component={TextInput}
                placeholder="Event Venue"
              />
             <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat='YYYY-MM-DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder="Date and time of event"
              />

              <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button onClick={this.handleCancelForm} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm", enableReinitialize: true, validate })(EventForm));
