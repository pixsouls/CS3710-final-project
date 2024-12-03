# app/controllers/api/v1/sessions_controller.rb
class Api::V1::SessionsController < DeviseTokenAuth::SessionsController
  # Customize the response on sign-in
  def create
    user = User.find_for_database_authentication(email: params[:email])

    # Check if user exists and password is valid
    Rails.logger.info "valid pwd?: #{user&.valid_password?(params[:password])}"
    if user&.valid_password?(params[:password])
      if user.tokens.empty?
        # Generate a new auth token for the user
        new_token = user.create_new_auth_token
        response.set_header('access-token', new_token['access-token'])
        response.set_header('uid', new_token['uid'])
      else
        # If tokens already exist, select one token
        latest_token = user.tokens.values.first 

        Rails.logger.info "Using token: #{latest_token.inspect}"  # Log the token being used
        response.set_header('access-token', latest_token['token'])
        response.set_header('uid', user.id)
      end

      # Sign in the user
      sign_in user

      # Log headers for debugging purposes
      Rails.logger.info "User tokens empty?: #{user.tokens.empty?}"
      Rails.logger.info "Access token: #{response.headers['access-token']}"
      Rails.logger.info "UID: #{response.headers['uid']}"

      # Respond with success message
      render json: { message: "Signed in successfully" }, status: :ok
    else
      # Handle invalid credentials
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  # Customize the response on sign-out
  def destroy
    super do
      render json: { message: 'Signed out successfully' }, status: :ok and return
    end
  end
end
