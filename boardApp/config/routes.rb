Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}

  resources :groups do
    resources :events do
    end
  end




end
