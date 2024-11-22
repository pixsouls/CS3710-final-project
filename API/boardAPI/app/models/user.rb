class User < ApplicationRecord
    # Devise modules
    extend Devise::Models
    devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  
    # Include DeviseTokenAuth
    include DeviseTokenAuth::Concerns::User
  
    # Relationships
    has_many :boards, dependent: :nullify
  end
  