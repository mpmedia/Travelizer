class Traveller < ActiveRecord::Base
  belongs_to :trip
  attr_accessible :name, :trip_id
end
