class Media < ApplicationRecord
  belongs_to :board

  validates :name, :src, :board_id, presence: true
  validates :position, presence: true
  validate :valid_position_format

  before_validation :set_default_position, on: :create

  private

  # checking for 'x' and 'y' keys
  def valid_position_format
    unless position.is_a?(Hash) && position.key?('x') && position.key?('y')
      errors.add(:position, "must include 'x' and 'y' keys")
    end
  end

  # Sets position to { 'x': 0, 'y': 0 } if empty
  def set_default_position
    self.position ||= { 'x' => 0, 'y' => 0 }
  end
end
