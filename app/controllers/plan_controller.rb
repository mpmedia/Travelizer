class PlanController < ApplicationController
  respond_to :xml

  def create
    doc = Nokogiri::XML(request.body.read)
    respond_to do |format|
      format.xml { render xml: doc }
    end
  end
end
