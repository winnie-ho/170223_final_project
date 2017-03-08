class AttendeesController < ApplicationController
	before_action :authenticate_user!

  def attendees_params
    params.require(:attendee).permit([:id, :user_id, :group_id, :userName, :event_id])
  end


  def index()
  	attendees = Attendee.where({event: params[:event_id]})
  	render({:json => attendees})
  end

  def create()
    attendee = Attendee.create(attendees_params)
    render({:json => attendee})
  end
end