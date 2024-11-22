class Board < ApplicationRecord
  belongs_to :user
  has_many :media, class_name: 'Media', dependent: :destroy # class_name 'media' VERY IMPORTANT, WHY RAILS??? WHY???

  validates :title, presence: true
  validates :desc, presence: true
end
