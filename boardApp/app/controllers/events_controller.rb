class EventsController < ApplicationController

  # before_action :authenticate_user!

  def index()
    events = Event.where({group: params[:group_id]})
    render({:json => events})
  end


end