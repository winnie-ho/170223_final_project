class GroupsController < ApplicationController

before_action :authenticate_user!

  def groups_params
    params.require(:group).permit([:name])
  end

  def index
    groups = Group.all
    render ({:json => groups.as_json(
      {include: 
        [
          {events: {only: [:name, :date, :time, :location, :description, :route]}},
          {messages: {only: :msg}}
        ]
      })
    })
  end

  def show
    group = Group.find(params[:id])
    render({:json => group})
  end

  def create
    group = Group.create(groups_params)
    render({:json => group})
  end



end
