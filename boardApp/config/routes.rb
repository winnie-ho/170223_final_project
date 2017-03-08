Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}

 resources :users
    resources :memberships do
  end
  		resources :groups do
		resources :events do
			resources :attendees
		end
		resources :messages
	end
end
