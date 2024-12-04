require 'capybara/rspec'

Capybara.configure do |config|
  config.default_driver = :rack_test # For API testing, use the rack_test driver
end
