class Event < ApplicationRecord
  belongs_to :group
  has_many(:memberships, {through: :groups})
  has_many(:attendees)
  has_many(:users, {through: :groups})
end
