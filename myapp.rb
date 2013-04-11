require "sinatra/base"
require "sinatra/reloader"
require "sinatra/multi_route"

class MyApp < Sinatra::Base

  register Sinatra::MultiRoute

  configure :development, :test do
    enable :logging, :dump_errors, :raise_errors
    register Sinatra::Reloader
    set :datamapper_url, "sqlite3://#{File.dirname(__FILE__)}/sojo.sqlite3"
  end

  configure :production do
    set :datamapper_url, "sqlite3://#{File.dirname(__FILE__)}/sojo.sqlite3"
  end

  before do
    content_type 'application/json'
  end

  DataMapper.setup(:default, settings.datamapper_url)

  class Note
    include DataMapper::Resource

    Note.property(:id, Serial)
    Note.property(:subject, Text, :required => true)
    Note.property(:content, Text, :required => true)
    Note.property(:created_at, DateTime)
    Note.property(:updated_at, DateTime)

    def to_json(*a)
      {
          'id'      => self.id,
          'subject' => self.subject,
          'content' => self.content,
          'date'    => self.updated_at
      }.to_json(*a)
    end
  end

  DataMapper.finalize
  Note.auto_upgrade!

  def jsonp(json)
    params[:callback] ? "#{params[:callback]}(#{json})" : json
  end

  # Download one note, subject and content
  # Returns:
  # {
  #    subject : "the subject",
  #    content : "wibble wibble wibble wibble""
  # }
  #
  get '/note/:id' do
    note = Note.get(params[:id])
    halt 404 if note.nil?
    jsonp(note.to_json)
  end

  # Add a note to the server, subject and content
  # will give you back an id
  # Body
  # {
  #    subject : "the subject",
  #    content : "wibble wibble wibble wibble""
  # }
  #
  # Returns
  #  2
  #
  put '/note' do
    # Request.body.read is destructive, make sure you don't use a puts here.
    data = JSON.parse(request.body.read)
    puts data
    # Normally we would let the model validations handle this but we don't
    # have validations yet so we have to check now and after we save.
    if data.nil? || data['subject'].nil? || data['content'].nil?
      halt 400
    end

    note = Note.create(
        :subject => data['subject'],
        :content => data['content'],
        :created_at => Time.now.utc,
        :updated_at => Time.now.utc)

    halt 500 unless note.save

    # PUT requests must return a Location header for the new resource
    [201, {'Location' => "/note/#{note.id}"}, jsonp(note.to_json)]
  end

  # Update the content of a note, replace subject
  # or content
  # Body
  # {
  #    subject : "the subject",
  #    content : "wibble wibble wibble wibble""
  # }
  # Subject and content are optional!
  #
  post '/note/:id' do
    # Request.body.read is destructive, make sure you don't use a puts here.
    data = JSON.parse(request.body.read)
    halt 400 if data.nil?

    note = Note.get(params[:id])
    halt 404 if note.nil?

    %w(subject content).each do |key|
      if !data[key].nil? && data[key] != note[key]
        note[key] = data[key]
        note['updated_at'] = Time.now.utc
      end
    end

    halt 500 unless note.save
    jsonp(note.to_json)
  end

  # Remove a note entirely
  #
  delete '/note/:id' do
    note = Note.get(params[:id])
    halt 404 if note.nil?

    halt 500 unless note.destroy
    204
  end
end