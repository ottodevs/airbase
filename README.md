# Airbase

Airbase is a full-stack clone of Airbnb's web application. This project is a learning experience for integrating technologies I've learnt over the past couple of months. On a high level, Airbase is a Rails API connected to a PostgreSQL DB, serving data to a React & Redux frontend. This application is hosted on Heroku and static data is served from AWS. Venues are obtained from the Google Places API and integrated into Google Maps.

Building a clone relieved myself of making design decisions, freeing up more time for developing features. The styles were obtained through inspecting with chrome dev tools, and are written from scratch in SCSS.

My project can be [viewed here](https://airbase-sksea.herokuapp.com/#/).

# Setup and Dev Commands
This project requires the local development environment to contain: 
- **ruby** (v. 2.3+)
- **node** (v 8.6)
- **rails** (5.0+)
- **postgres** (v 9.6).
- and the Bundler gem

## Setup

Run the following commands in a terminal after pulling down the repository.

```
bundle install
npm install

bundle exec rake db:create
bundle exec rake db:seed
```

## Development

The following commands need to be run in separate terminals, or with foreman (requires adding a Procfile).

Server (dev runs on port 3000)
```
bundle install
rails s
```

Frontend
```
npm install
npm start
```

# Technologies

Airbase has a React frontend, with state managed by Redux. React provides more than a means of code reuse, it also implements a Virtual DOM which allows for efficient DOM manipulation, re-rendering only the right elements at the right time, all the while exposing a `component lifecycle` which we can hook into and use to run code at predictable moments. As the app grows, data may need to flow through many layers of components before arriving at its destination. Redux enables us to keep state contained in a central `store` from which components can pick and choose the `slices` of state that concerns them. This avoids the need to thread state through components.

Airbase's backend is a Rails API with a Postgres DB. Rails was chosen mostly for being relatively simple to use. Fortunately, concepts like RESTful conventions and handling the request/response cycle will carry over to other web frameworks I learn in future. Lastly, using Postgres was good practice for using relational databases.

# Dev notes

In this section, I highlight some challenges presented to me over the course of this project, followed by my approach in solving the issue or any findings I took away.

### Integrating third-party javascript components

To clone Airbnb, there is no avoiding the large map taking up 34% of screen estate on the home listing page. I've always been fond of maps, so naturally I found integration with Google maps one the more interesting parts of this project.

EDIT: I previously misunderstood the purpose of React's `ref` attribute for integrating third-party libraries.

We use React's `ref` attribute to correctly load Google maps. The DOM element needed to load the map does not exist until our React component mounts. The callback provided to `ref` is called on component mount, and gives us a reference to the underlying DOM element, which is ultimately provided to `google.maps.Map(...)`in `componentDidMount()`.

`gmap.jsx`
```js
class GMap extends React.Component {

  componentDidMount() {
    const mapOptions = {
      // initialize map defaults
    }
    this.map = new window.google.maps.Map(this.mapContainer, mapOptions);
    this.controller = new GMapController(this.map); //
  }

  render() {
    return (
      // https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-dom-element
      // This is important for loading Google Maps correctly. See README for
      // a more detailed explaination.
      <div id='map-wrapper'>
        <div id='map-container' 
          ref={ domElement => { this.mapContainer = domElement; } } >
        </div>
      </div>
    );
  }
}
```

### Database seeding

Seeding data is important for both visualizing the application's frontend, as well as testing logic in the backend. Doing this manually is futile because it is time consuming and provides too narrow a representation of how our app may actually look and function.

Instead, I had fun pulling data from the Google Places API. Note that fetching data takes a significant amount of time, so it's worth considering to not wipe the entire database during each round of seeding. This allowed me to generate pages that look more reasonable.

I wrote a `GoogleMapsHelper` class for seeding that looked something like this.

`google_maps_helper.rb`
```ruby
module GoogleMapsHelper
    
    # provide coordinates of cities to Google to search
    CITY_COORDS = {
      new_york: "40.7505189,-74.0014333",
      brooklyn: "40.710513, -73.940305",
      london: "51.5281613,-0.6619945",
      seoul: "37.575654,126.975786",
      melbourne: "-37.858901,145.074694",
      kyoto: "35.011081,135.758882",
      berlin: "52.527018,13.406480"
    }
    
    def fetch_places(location)
      options = {
        # query params...
      }
      # fetch a list of places
      resp = HTTParty.get(GOOGLE_PLACES_BASE_URI, options)
      results = resp.parsed_response["results"]  
    end
    
    def fetch_place_details(place_id)
      options = {
        # query params...
      }
      # fetch details for a particular place
      resp = HTTParty.get(GOOGLE_DETAILS_BASE_URI, options)
      results = resp.parsed_response["result"]
    end
end
```

**Home show page populated with data fetched from google**
![home-show](https://raw.githubusercontent.com/sksea/i/master/airbase-prod-readme/homes-show.png)

From this project, I also got a taste for the need to sanitize data. When I tried to build addresses from responses, I realized that the Google Places API returned addresses in arrays of varying lengths. This pushed me to handle each locale differently.

`google_maps_helper.rb`
```ruby
module GoogleMapsHelper
  
  def parse_addr_comps(city_symbol, addr_comps)
      # Check address component array size
    if city_symbol.to_s.include?(NEW_YORK)
      if addr_comps.size < 8
        puts 'Fetched addr_comps incomplete, skipping'
        return
      end
      return [
        # build address from components
        "#{addr_comps[0]['long_name']} #{addr_comps[1]['long_name']}",
        "#{addr_comps[2]['long_name']}",
        "#{addr_comps[3]['long_name']}",
        "#{addr_comps[6]['long_name']}",
        "#{addr_comps[7]['long_name']}"
      ]
    elsif city_symbol.to_s.include?(HONG_KONG)
      if addr_comps.size < 4
        puts 'Fetched addr_comps incomplete, skipping'
        return
      end
      return [
        # access addr_comps differently
      ]
    elsif city_symbol.to_s.include?(LONDON)
      if addr_comps.size < 6
        puts 'Fetched addr_comps incomplete, skipping'
        return
      end
      return [
        # access addr_comps differently
      ]
    end
    
end
```

### Managing state with redux and selectors

As my project grew, I found deeply nested components which needed pieces of state their ancestors did not care for. The pattern I found helpful for solving this is using selectors to mold a component's props into the exact form that's clear and convenient to use. In the resulting component, it's clear with at a quick glance to `mapStateToProps` which slices of state that component has access to. This is much nicer than jumping through multiple to try and trace the flow of props, or even fiddling with the debugger.  Another takeaway from the following snippet is that component structure is best kept as flat as possible. Organization or components came be inferred from naming convention. Any more than one sublevel in `/components` results in an ugly trail of `../../..`, which makes reference other folders like selectors or actions awkward. This is something I will keep in mind for my next React project.

`VenueBooking.jsx`
```js
import { selectVenue } from '../../selectors/venuesSelectors';
import { selectBookings, selectBookingsErrors } from '../../selectors/bookingsSelectors';
import { selectGuestsDisplayed } from '../../selectors/uiSelectors';
import { currentUser, currentUserBookings } from '../../selectors/sessionSelectors';

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    venue: selectVenue(state, id),
    bookings: selectBookings(state),
    selectGuestsDisplayed: selectGuestsDisplayed(state),
    errors: selectBookingsErrors(state),
    currentUser: currentUser(state),
    currentUserBookings: currentUserBookings(state),
  };
};
```

### Thin controllers and keeping logic with the appropriate owner

Checking a venue's availability for a user to place reservations prompts the question of where that logic should live. The first and most obvious place is in `BookingsController`, but here is already crowded with things like params and code to render responses, which are both different concerns than the actual query's business logic. The next stop would be to move it down to the `Venue` model, which leads to a cleaner controller. However, I realized a venue's availability only makes sense in the context of a new booking. We could get a reference of our current `venue` and try to pass in a new `booking` like `venue.is_valid?(booking)`, but that seems clunky. Ultimately, I settled on the solution below, which is place the logic in the `Booking` model. With coupling reduced between the two models, minimal changes need to be made to venues even if bookings is completely removed from this application.

`booking.rb`
```ruby
class Booking < ApplicationRecord
  validate :venue_available
  validate :booking_duration_valid
  
  belongs_to :user
  belongs_to :venue
  has_one :host, through: :venue
  
  private
  
  def venue_available
    venue_bookings = self.venue.bookings
    venue_bookings.any? do |vb|
      if vb.overlaps?(self)
        errors.add(:check_in, 'time is unavailable')
        break
      end
    end
  end
  
end
```