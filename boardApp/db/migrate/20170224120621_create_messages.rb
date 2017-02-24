class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :msg
      t.references :Group, foreign_key: true

      t.timestamps
    end
  end
end
