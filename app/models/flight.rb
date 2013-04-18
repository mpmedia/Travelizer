class Flight < ActiveRecord::Base
  belongs_to :trip
  has_many :travellers
  attr_accessible :trip_id, :date, :airport, :airline, :flight_no, :confirmation_id, :ticket_id
end
