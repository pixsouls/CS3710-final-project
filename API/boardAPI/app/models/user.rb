class User < ApplicationRecord
  # Include the Devise modules you need, such as:
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  # DeviseTokenAuth setup
  include DeviseTokenAuth::Concerns::User

  # Relationships
  has_many :boards, dependent: :nullify
end
