class TravellerController < ApplicationController
  respond_to :json 
  def index
    respond_with(@travellers = Traveller.all)
  end

  def show
    @traveller = Traveller.find(params[:id])
    respond_with(@traveller)
  end

  def update 
    @traveller = Traveller.find(params[:id])
    respond_to do |format|
      if @traveller.update_attributes(params[:traveller])
        format.json { head :no_content }
      else
        format.json { render json: @traveller.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @trip = Trip.find(params[:trip_id])
    @traveller = @trip.travellers.create(params[:traveller])
    @trip.save
    respond_with(@traveller)
  end

  def destroy
    @trip = Trip.find(params[:trip_id])
    @traveller = @trip.travellers.find(params[:id])
    @traveller.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
