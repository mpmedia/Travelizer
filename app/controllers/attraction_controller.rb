class AttractionController < ApplicationController
  respond_to :json 
  def index
    respond_with({})
  end

  def show
    @trip = Trip.find(params[:trip_id])
    @day = @trip.days.find(params[:day_id])
    @attraction = @day.attractions.find(params[:id])
    respond_with(@attraction)
  end

  def update
    @trip = Trip.find(params[:trip_id])
    @day = @trip.days.find(params[:day_id])
    @attraction = @day.attractions.find(params[:id])
    respond_to do |format|
      if @attraction.update_attributes(params[:attraction])
        format.json { head :no_content }
      else
        format.json { render json: @attraction.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @trip = Trip.find(params[:trip_id])
    @day = @trip.days.find(params[:day_id])
    @attraction = @day.attractions.create(params[:attraction])
    @trip.save
    respond_with(@attraction)
  end

  def destroy
    @trip = Trip.find(params[:trip_id])
    @day = @trip.days.find(params[:day_id])
    @attraction = @day.attractions.find(params[:id])
    @attraction.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
