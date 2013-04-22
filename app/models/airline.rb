class Airline < ActiveRecord::Base
  attr_accessible :name, :iata, :icao, :country
end
