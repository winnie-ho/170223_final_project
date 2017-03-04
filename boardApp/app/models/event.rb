class Event < ApplicationRecord
  belongs_to :group
  has_many(:memberships, {through: :groups})
end
