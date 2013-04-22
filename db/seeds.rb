# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'csv'

CSV.foreach("#{Rails.root}/db/airlines.csv", :headers => true) do |row|
  Airline.create!(row.to_hash)
end

CSV.foreach("#{Rails.root}/db/airports.csv", :headers => true) do |row|
  Airport.create!(row.to_hash)
end