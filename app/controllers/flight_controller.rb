class FlightController < ApplicationController
  respond_to :json 
  def index
    respond_with(@flights = Flight.all)
  end

  def show
    @flight = Flight.find(params[:id])
    respond_with(@flight)
  end

  def update 
    @flight = Flight.find(params[:id])
    respond_to do |format|
      if @flight.update_attributes(params[:flight])
        format.json { head :no_content }
      else
        format.json { render json: @flight.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @trip = Trip.find(params[:trip_id])
    @flight = @trip.flights.create(params[:flight])
    @trip.save
    respond_with(@flight)
  end

  def destroy
    @trip = Trip.find(params[:trip_id])
    @flight = @trip.flights.find(params[:id])
    @flight.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
