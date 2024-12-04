require 'rails_helper'
require 'faker' # Make sure to require Faker if not already required

# (?) https://stackoverflow.com/questions/29597733/how-to-test-a-api-with-rspec-and-capybara-on-rails
# 
RSpec.describe 'Api::V1::Boards', type: :request do
  # user data
  let!(:user) { User.create(name: Faker::Name.name, email: Faker::Internet.email) }

  # board data
  let!(:board) { Board.create(title: Faker::Lorem.sentence, desc: Faker::Lorem.paragraph, user_id: user.id) }

  describe 'GET /boards' do
    it 'returns a list of boards' do
      get '/api/v1/boards'

      # Debugging
      puts "Response Body: #{response.body}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to include(board.title) # board's title in the response
    end
  end
end
