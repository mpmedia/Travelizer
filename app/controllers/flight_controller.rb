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
    flight_info = FlightStats::Flight.direct_departing_by_flight_number @flight.career_code, @flight.flight_no, @flight.date.year, @flight.date.month, @flight.date.day
    flight_info[0].flight_legs.each do |flight_leg|
      @flight.flight_legs.create(
          :career_code => flight_leg.carrier_fs_code,
          :flight_no => flight_leg.flight_number,
          :departure_airport => flight_leg.departure_airport_fs_code,
          :departure_time => flight_leg.departure_time,
          :departure_terminal => flight_leg.departure_terminal,
          :arrival_airport => flight_leg.arrival_airport_fs_code,
          :arrival_time => flight_leg.arrival_time,
          :arrival_terminal => flight_leg.arrival_terminal,
          :distance => flight_leg.distance_miles,
          :flight_duration => flight_leg.flight_duration_minutes,
          :layover_duration => flight_leg.layover_duration_minutes
      )
    end
    params[:passengers].each do |passenger|
      @flight.passengers.create(passenger)
    end
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
