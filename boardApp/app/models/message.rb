class Message < ApplicationRecord
  belongs_to :Group
  has_many(:users, {through: :groups})
end
