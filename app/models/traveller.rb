class Traveller < ActiveRecord::Base
  belongs_to :trip
  belongs_to :flight
  attr_accessible :name, :trip_id
end
