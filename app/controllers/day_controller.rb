class DayController < ApplicationController
  respond_to :json 
  def index
    respond_with({})
  end

  def show
    @trip = Trip.find(params[:trip_id])
    @day = @trip.days.find(params[:id])
    respond_with(@day)
  end

  def update 
    @day = Day.find(params[:id])
    respond_to do |format|
      if @day.update_attributes(params[:day])
        format.json { head :no_content }
      else
        format.json { render json: @day.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @trip = Trip.find(params[:trip_id])
    @day = @trip.days.create(params[:day])
    @trip.save
    respond_with(@day)
  end

  def destroy
    @trip = Trip.find(params[:trip_id])
    @day = @trip.days.find(params[:id])
    @day.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
