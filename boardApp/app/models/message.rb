class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many(:memberships, {through: :groups})
end
