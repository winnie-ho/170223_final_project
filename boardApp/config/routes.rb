Rails.application.routes.draw do
  devise_for :users

  resources :groups do
    resources :events do
    end
  end

end
