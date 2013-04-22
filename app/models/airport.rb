class Airport < ActiveRecord::Base
  attr_accessible :name, :city, :country, :iata, :icao, :lat, :lon, :alt, :timezone, :dst
end
