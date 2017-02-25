class GroupsController < ApplicationController

before_action :authenticate_user!

  def groups_params()
    params.require(:group).permit([:name])
  end

  def index()
    groups = Group.all
    render ({:json => groups.as_json(
      {include: 
        [
          {events: {only: [:id, :name, :date, :time, :location, :description, :route]}},
          {messages: {only: :msg}}
        ]
      })
    })
  end

  def show()
    group = Group.find(params[:id])
    render({:json => group.as_json(
        {include: [:events, :messages]}
      )
    })
  end

  def create()
    group = Group.create(groups_params())
    render({:json => group})
  end

  def update()
    group = Group.find(params[:id])
    if group.update_attributes(groups_params())
      render({:json => group})
    else
      render ({json: :update_failed})
    end
  end

  def destroy()
    group = Group.find(params[:id])
    if group.destroy!
      render({:json => {status: :success}})
    else
      render({:json => {status: :update_failed}})
    end
  end

end
