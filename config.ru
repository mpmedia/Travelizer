require 'sinatra/base'

require 'rubygems'
require 'bundler'
require 'open-uri'
require 'data_mapper'

Bundler.require

require './myapp'
run MyApp