json.ignore_nil!
json.extract!( venue,
  :id,
  :host_id,
  :accommodates,
  :bathrooms,
  :bedrooms,
  :beds,
  :property_type,
  :room_type,
  :name,
  :street,
  :city,
  :state,
  :country,
  :postal_code,
  :lat,
  :lng,
  :minimum_stay,
  :check_in_type,
  :listing_start,
  :listing_stop,
  :price,
  :extra_person_cost,
  :extra_person_threshold,
  :cleaning_fee,
  :security_deposit,
  :weekend_price,
  :weekly_discount,
  :monthly_discount,
  :pets,
  :description_about,
  :description_space,
  :description_guest_access,
  :description_guest_interaction,
  :description_other_notes
)
json.picture_url_large venue.pictures.first.image.url unless venue.pictures.first.nil?
json.picture_url_small venue.pictures.last.image.url unless venue.pictures.last.nil?
