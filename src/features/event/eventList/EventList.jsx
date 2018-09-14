import React, { Component } from 'react'
import EventListItem from './EventListItem';


class EventList extends Component {
  render() {
    const {events}=this.props;
    let callEventListItem = events.map((event)=>{
      return <EventListItem key={event.id} event={event} />
    })
    return (
      <div>
        <h1>Event List</h1>   
        {callEventListItem}     
      </div>
    )
  }
}

export default EventList;