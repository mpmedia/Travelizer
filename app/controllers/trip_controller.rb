class TripController < ApplicationController
  respond_to :json 
  def index 
    respond_with(@trips = Trip.all)
  end

  def show
    @trip = Trip.find(params[:id])
    respond_with(@trip)
  end

  def update 
    @trip = Trip.find(params[:id])
    respond_to do |format|
      if @trip.update_attributes(params[:trip])
        format.json { head :no_content }
      else
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @trip = Trip.new(params[:trip])
    @trip.save
    respond_with(@trip)
  end

  def destroy
    @trip = Trip.find(params[:id])
    @trip.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
