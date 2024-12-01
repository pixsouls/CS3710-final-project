require 'rack/cors'
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow requests from your frontend origin
    origins 'http://localhost:3001'  # Adjust if your frontend is on a different port

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['access-token', 'client', 'uid', 'expiry', 'token-type'], # Expose token headers
      credentials: true # Allow sending credentials (cookies, tokens)
  end
end
