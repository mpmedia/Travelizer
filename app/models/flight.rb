class Flight < ActiveRecord::Base
  belongs_to :trip
  has_many :travellers
  attr_accessible :trip_id, :airline, :flight_no, :depart_from, :departure_time, :arrive_at, :arrival_time
end
