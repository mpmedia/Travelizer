require "sinatra/base"
require "sinatra/reloader"
require "sinatra/multi_route"

class MyApp < Sinatra::Base

  register Sinatra::MultiRoute

  configure :development, :test do
    enable :logging, :dump_errors, :raise_errors
    register Sinatra::Reloader
  end

  configure :production do

  end

  get '/' do
    erb :index
  end
end