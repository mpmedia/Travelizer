class AirlineController < ApplicationController
  respond_to :json 
  def index
    respond_with(@airlines = Airline.all)
  end

  def show
    @airline = Airline.find(params[:id])
    respond_with(@airline)
  end
end
