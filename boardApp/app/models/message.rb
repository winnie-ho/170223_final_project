class Message < ApplicationRecord
  belongs_to :group
  has_many(:users, {through: :groups})
end
