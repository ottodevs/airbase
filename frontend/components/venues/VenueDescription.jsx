import React from 'react';
import VenueBooking from './VenueBooking';
import VenueReviews from './VenueReviews';

import { parseDate } from '../../helpers/helpers';

const VenueDescription = ({ venue }) => {
  
  const style = { 
    'backgroundImage': `url(${ venue.picture_url_large })`,
  };
  const listingStart = parseDate(venue.listing_start);
  const listingStop = parseDate(venue.listing_stop);
  return (
    <div id='venue-description'>
      <div className='ven-desc-landing-img' 
        style={ style }>
      </div>
      <div className='ven-desc-body'>
        <div className='ven-desc-body-left'>
          <div className='ven-desc-sec ven-desc-title'>
            <div className='ven-desc-title-name'>{ venue.name }</div>
            <div>
              { venue.city }, { venue.state }, { venue.country } 
              <div className='availability'>{listingStart} ~ {listingStop}</div>
            </div>
          </div>
          <div className='ven-desc-sec ven-desc-summary-icons'>
            <div className='ven-desc-icon-group'>
              <i className="icon icon-entire-place icon-size" aria-hidden="true"></i>
              <span>{ venue.room_type }</span>
            </div>
            <div className='ven-desc-icon-group'>
              <i className="icon icon-group icon-size" aria-hidden="true"></i>
              <span>{ venue.accommodates } guests</span>
            </div>
            <div className='ven-desc-icon-group'>
              <i className="icon icon-double-bed icon-size" aria-hidden="true"></i>
              <span>{ venue.bedrooms } bedrooms</span>
            </div>
            <div className='ven-desc-icon-group'>
              <i className="icon icon-rooms icon-size" aria-hidden="true"></i>
              <span>{ venue.beds } beds</span>
            </div>
          </div>
          <div className='ven-desc-sec ven-desc-about'>
            <div className='ven-desc-about-main-header'>About this listing</div>
            <span>{ venue.description_about }</span>
            <div className='ven-desc-about-header'>The space</div>
            <span>{ venue.description_space }</span>
            <div className='ven-desc-about-header'>Guest access</div>
            <span>{ venue.description_guest_access }</span>
            <div className='ven-desc-about-header'>Interaction with guests</div>
            <span>{ venue.description_guest_interaction }</span>
            <div className='ven-desc-about-header'>Other things to note</div>
            <span>{ venue.description_other_notes }</span>
          </div>
          <VenueReviews />
        </div>
        <div className='ven-desc-body-right'>
          <VenueBooking />
        </div>
      </div>
    </div>
  );
};

export default VenueDescription;

