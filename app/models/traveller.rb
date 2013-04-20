class Traveller
  include Mongoid::Document

  field :name, type: String

  embedded_in :trip
end
