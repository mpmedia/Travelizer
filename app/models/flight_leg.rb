class FlightLeg
  include Mongoid::Document

  field :career_code, type: String
  field :flight_no, type: String
  field :departure_airport, type: String
  field :departure_time, type: String
  field :departure_terminal, type: String
  field :arrival_airport, type: String
  field :arrival_time, type: String
  field :arrival_terminal, type: String
  field :distance, type: String
  field :flight_duration, type: String
  field :layover_duration, type: String

  embedded_in :flight
end
