class MembershipsController < ApplicationController
before_action :authenticate_user!

  def memberships_params()
    params.require(:membership).permit([:user_id, :userName, :group_id])
  end

	def index()
	    memberships = Membership.where({user: current_user})
	    render ({:json => memberships.as_json(
			:include=>{
					:group => {
						:include => 
						[
							{events: {only: [:id, :name, :date, :time, :description, :location, :route]}},
							{messages: {only: [:msg, :user_id, :userName]}}
						]
			    	}
			    })
		    })
  	end

  def create()
    membership = Membership.create(memberships_params())
    render({:json => membership})
  end
end

