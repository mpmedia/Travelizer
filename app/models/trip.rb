class Trip
  include Mongoid::Document

  field :uuid, type: String
  field :name, type: String
  field :start, type: Date
  field :end, type: Date
  field :location, type: String
  field :location_lonlat, type: String
  field :description, type: String

  embeds_many :days
  embeds_many :travellers
end
