# Sample State
```js
{
  entities: {
    users: {
      $id: {
        id:                                   // INTEGER
        name:                                 // STRING
        email_address:                        // STRING
        phone_number:                         // STRING
        school:                               // STRING
        work:                                 // STRING
        languages: []                         // STRING ARRAY
      }
    },
    venues: {
      $id: {
        id:                                   // INTEGER
        name:                                 // STRING
        phone_number:                         // STRING
        geolocation_id:                       // INTEGER
        owner_id:                             // INTEGER
      }
    },
    bookings: {
      $id: {
        id:                                   // INTEGER
        start_time:                           // DATETIME
        end_time:                             // DATETIME
        venue_id:                             // INTEGER
        user_id:                              // INTEGER
      }
    },
    geolocations: {
      $id: {
        id:                                   // INTEGER
        street:                               // STRING
        city:                                 // STRING
        state:                                // STRING
        postal_code:                          // STRING
        venue_id:                             // INTEGER
      }
    },
    reviews: {
      $id: {
        id:                                   // INTEGER
        user_id:                              // INTEGER
        venue_id:                             // INTEGER
        body:                                 // TEXT
        rating:                               // INTEGER
      }
    },
    messages: {
      $id: {
        id:                                   // INTEGER
        user_id:                              // INTEGER
        chat_id:                              // INTEGER
        timestamp:                            // DATETIME
        body:                                 // TEXT
      }
    },
    chats: {
      $id: {
        id:                                   // INTEGER
      }
    },
    user_chats: {                             // JOIN TABLE
      $id: {
        id:                                   // INTEGER
        user_id:                              // INTEGER
        chat_id:                              // INTEGER
      }
    }
  },

  ui: {
    ...
  },
  
  errors: {
    ...
  },
  
  session: {
    ...
  }
}
```