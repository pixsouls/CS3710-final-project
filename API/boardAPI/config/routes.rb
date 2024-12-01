Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        sessions: 'api/v1/sessions'
      }

      resources :media
      resources :boards do
        get 'media', on: :member
        get 'search', on: :collection 
      end
      resources :users
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
