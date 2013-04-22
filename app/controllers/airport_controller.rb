class AirportController < ApplicationController
  respond_to :json 
  def index
    respond_with(@airports = Airport.all)
  end

  def show
    @airport = Airport.find(params[:id])
    respond_with(@airport)
  end
end
