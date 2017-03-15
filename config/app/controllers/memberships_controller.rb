class MembershipsController < ApplicationController
before_action :authenticate_user!

  def memberships_params()
    params.require(:membership).permit([:user_id, :userName, :group_id])
  end

	def index()
	    memberships = Membership.all
	    render ({:json => memberships.as_json})
  	end

  	def show()
	    memberships = Membership.where({user: current_user})
	    render ({:json => memberships.as_json(
			:include => {
					:group => {
						:include => 
						[
							{:events => {
                :include => :attendees
                }},
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

  def destroy()
  	membership = Membership.find(params[:id])
  	if membership.destroy!
  		render({:json => {status: :success}})
  	else
  		render({:json => {status: :update_failed}})
  	end
  end


end

