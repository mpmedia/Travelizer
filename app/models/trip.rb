class Trip < ActiveRecord::Base
  has_many :travellers
  has_many :flights
  before_create :create_unique_identifier

  attr_accessible :name, :description

  def create_unique_identifier
    begin
      self.uuid = SecureRandom.hex(5)
    end while self.class.exists?(:uuid => uuid)
  end
end
