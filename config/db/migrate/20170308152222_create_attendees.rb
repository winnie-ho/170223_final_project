class CreateAttendees < ActiveRecord::Migration[5.0]
  def change
    create_table :attendees do |t|
      t.references :event, foreign_key: true
      t.references :user, foreign_key: true
      t.text :userName

      t.timestamps
    end
  end
end
