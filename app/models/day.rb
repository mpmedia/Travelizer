class Day
  include Mongoid::Document

  field :notes, type: String
  field :date, type: Date

  embedded_in :trip
end
