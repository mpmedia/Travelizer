class Flight
  include Mongoid::Document

  field :confirmation_no, type: String
  field :career_code, type: String
  field :flight_no, type: String
  field :date, type: Date

  embedded_in :trip
  embeds_many :passengers
  embeds_many :flight_legs
end
