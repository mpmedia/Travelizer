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

  post '/' do
    unless (params[:url] =~ URI::regexp).nil?
      @token = shortlink_token
      @@redis.set("links:#{@token}", params[:url])
      erb :shortened
    else
      @error = "Please enter a valid URL."
      erb :index
    end
  end

  get '/:token/?' do
    url = @@redis.get("links:#{params[:token]}")
    unless url.nil?
      redirect(url)
    end
    erb :expired
  end

  get '/app.js' do
    headers \
      "Content-Type" => "text/javascript"

    ERB.new(File.read('app.js')).result
  end

  helpers do
    def shortlink_token
      (Time.now.to_i + rand(36**8)).to_s(36)
    end
  end
end