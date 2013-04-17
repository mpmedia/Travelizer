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
    @flight = Flight.new(params[:flight])
    @flight.save
    respond_with(@flight)
  end

  def destroy
    @flight = Flight.find(params[:id])
    @flight.destroy
    respond_to do |format|
      format.json  { head :ok }
    end
  end
end
