class Passenger
  include Mongoid::Document

  field :name, type: String
  field :ticket_no, type: String
  field :seat, type: String

  embedded_in :flight
end