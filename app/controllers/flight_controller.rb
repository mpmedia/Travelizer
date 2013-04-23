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
    params[:passengers].each do |passenger|
      @flight.passengers.create(passenger)
    end
    #flight_info = FlightStats::Flight.direct_departing_by_flight_number @flight.airline_code, @flight.flight_no, @flight.date.year, @flight.date.month, @flight.date.day
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
