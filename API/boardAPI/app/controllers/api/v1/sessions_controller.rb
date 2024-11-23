# app/controllers/api/v1/sessions_controller.rb
class Api::V1::SessionsController < DeviseTokenAuth::SessionsController
  # Customize the response on sign-in
  def create
    super do |user|
      render json: {
        message: 'Signed in successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        status: :ok
      } and return
    end
  end

  # Customize the response on sign-out
  def destroy
    super do
      render json: { message: 'Signed out successfully' }, status: :ok and return
    end
  end
end
  