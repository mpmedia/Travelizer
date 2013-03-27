require "sinatra/base"
require "sinatra/reloader"
require "sinatra/multi_route"

class MyApp < Sinatra::Base

  @@redis = Redis.new

  register Sinatra::Synchrony
  register Sinatra::MultiRoute

  configure :development, :test do
    enable :logging, :dump_errors, :raise_errors
    register Sinatra::Reloader
  end

  configure :production do
    uri = URI.parse(URI.encode(ENV["REDISTOGO_URL"]))
    @@redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
  end

  set :sockets, []

  get '/' do
    erb :index
  end

  get '/app.js' do
    headers \
      "Content-Type" => "text/javascript"

    ERB.new(File.read('app.js')).result
  end
end