Rails.application.routes.draw do
  devise_for :users

  resources :groups do
  end

end
