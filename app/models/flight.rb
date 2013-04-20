class Flight
  include Mongoid::Document

  field :confirmation_no, type: String
  field :airport, type: String
  field :airline, type: String
  field :flight_no, type: String
  field :date, type: Date
  field :time, type: ActiveSupport::TimeWithZone
  field :terminal, type: String
  field :gate, type: String

  embedded_in :trip
  embeds_many :passengers
end
