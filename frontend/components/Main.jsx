import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/RouteUtil';
import VenuesContainer from './venues/VenuesContainer';
import VenueShowContainer from './venues/VenueShowContainer';
import BookingsList from './bookings/BookingsList';

const Main = (props) => {    
  return (
    <section id='main'>
      <Route exact path='/homes' component={ VenuesContainer } />
      <Route exact path='/homes/:id' component={ VenueShowContainer } />
      <ProtectedRoute exact path='/reservations' component={ BookingsList } />
    </section>
  );
};

export default Main;
