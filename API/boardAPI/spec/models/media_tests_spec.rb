require 'rails_helper'

RSpec.describe Media, type: :model do
  describe 'callbacks' do
    it 'sets default position to {x: 0, y: 0} if no position is provided' do
      media = Media.create(name: 'Test Media', src: 'test_src.jpg', board_id: 1)
      # needs to be a hash (basically, vector2 representation)
      expect(media.position).to eq({ 'x' => 0, 'y' => 0 })
    end
  end

  describe 'validations' do
    it 'adds an error if position is provided but does not contain "x" and "y" keys' do
      media = Media.new(name: 'Test Media', src: 'test_src.jpg', board_id: 1, position: { 'x' => 1 })
      media.valid?
      expect(media.errors[:position]).to include("must include 'x' and 'y' keys")
    end

    it 'does not create a media if name, board_id, or src are blank' do
      media = Media.new(name: '', src: '', board_id: nil)
      expect(media.save).to be_falsey
      expect(media.errors[:name]).to include("can't be blank")
      expect(media.errors[:src]).to include("can't be blank")
      expect(media.errors[:board_id]).to include("can't be blank")
    end

    it 'does not create a media if position is missing' do
      media = Media.new(name: 'Test Media', src: 'test_src.jpg', board_id: 1)
      expect(media.save).to be_falsey
      expect(media.errors[:position]).to include("can't be blank")
    end
  end
end
