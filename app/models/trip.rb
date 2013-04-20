class Trip
  include Mongoid::Document

  field :uuid, type: String
  field :name, type: String
  field :description, type: String

  embeds_many :flights
  embeds_many :travellers
end
