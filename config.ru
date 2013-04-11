require 'sinatra/base'

require 'rubygems'
require 'bundler'
require 'open-uri'
require 'json'
require 'data_mapper'

Bundler.require

require './myapp'
run MyApp