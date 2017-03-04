class Group < ApplicationRecord
  has_many(:events)
  has_many(:users, {through: :memberships})
  has_many(:messages)
  has_many(:memberships)
end
