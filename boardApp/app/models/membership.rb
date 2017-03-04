class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :group
  has_many(:events, {through: :groups})
  has_many(:messages, {through: :groups})
end
