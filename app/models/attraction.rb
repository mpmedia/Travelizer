class Attraction
  include Mongoid::Document

  field :name, type: String

  embedded_in :day
end
