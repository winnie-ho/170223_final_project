class AttendeesController < ApplicationController
	before_action :authenticate_user!

  def attendees_params
    params.require(:attendee).permit([:id, :user_id, :group_id, :userName, :event_id])
  end


  def index()
  	attendees = Attendee.where({event: params[:event_id]})
  	render({:json => attendees})
  end

  def show()
    attendee = Attendee.find(params[:id])
    render({:json => attendee})
  end

  def create()
    attendee = Attendee.create(attendees_params)
    render({:json => attendee})
  end

  def destroy()
    attendee = Attendee.find(params[:id])
    if attendee.destroy!
      render({:json => {status: :success}})
    else
      render({:json => {status: :update_failed}})
    end
  end
  
end