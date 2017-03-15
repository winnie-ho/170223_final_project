class EventsController < ApplicationController

  before_action :authenticate_user!

  def events_params
    params.require(:event).permit([:id, :name, :date, :time, :location, :description, :route, :group_id])
  end

  def index()
    events = Event.where({group: params[:group_id]})
    orderedEvents = events.order(:date)
    render({:json => orderedEvents})
  end

  def show()
    event = Event.find(params[:id])
    render({:json => event})
  end

  def create()
    event = Event.create(events_params)
    render({:json => event})
  end

  def update()
    event = Event.find(params[:id])
    if event.update_attributes(
      events_params())
      render({:json => event})
    else
      render({json: :update_failed})
    end
  end

  def destroy()
    event = Event.find(params[:id])
    if event.destroy!
      render({:json => {status: :success}})
    else
      render({:json => {status: :update_failed}})
    end
  end

end