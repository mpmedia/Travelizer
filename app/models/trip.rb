class Trip
  include Mongoid::Document

  field :uuid, type: String
  field :name, type: String
  field :start, type: Date
  field :end, type: Date
  field :location, type: String
  field :description, type: String

  embeds_many :days
  embeds_many :flights
  embeds_many :travellers
end
