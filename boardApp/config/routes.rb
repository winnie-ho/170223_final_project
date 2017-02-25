Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}

  resources :groups do
    resources :events 
    resources :messages
  end

  resources :users
end
