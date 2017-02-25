class MessagesController < ApplicationController

  def messages_params()
    params.require(:message).permit([:msg, :group_id])
  end

  def index()
    messages = Message.all()
    render({:json => messages})
  end

  def create()
    message = Message.create(messages_params())
    render({:json => message})
  end




end