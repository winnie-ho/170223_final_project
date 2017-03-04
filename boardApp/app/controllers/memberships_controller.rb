class MembershipsController < ApplicationController
before_action :authenticate_user!

	def index()
	    memberships = Membership.where({user: current_user})
	    render ({:json => memberships.as_json(
			:include=>{
					:group => {
						:include => 
						[
							{events: {only: [:id, :name]}},
							{messages: {only: :msg}}
						]
			    	}
			    })
		    })
  	end
end

