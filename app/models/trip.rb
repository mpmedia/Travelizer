class Trip < ActiveRecord::Base
  before_create :create_unique_identifier

  attr_accessible :name, :description

  def create_unique_identifier
    begin
      self.uuid = SecureRandom.hex(5)
    end while self.class.exists?(:uuid => uuid)
  end
end
