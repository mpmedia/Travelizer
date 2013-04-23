class FlightLeg
  include Mongoid::Document

  field :airline_code, type: String
  field :flight_no, type: String
  field :departure_airport, type: String
  field :departure_time, type: String
  field :departure_terminal, type: String
  field :arrival_airport, type: String
  field :arrival_time, type: String
  field :distance, type: String
  field :flight_duration, type: String
  field :layover_duration, type: String

  embedded_in :trip
  embeds_many :passengers
  embeds_many :flight_legs
end
