class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :date
      t.datetime :time
      t.string :location
      t.string :description
      t.string :route
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end
