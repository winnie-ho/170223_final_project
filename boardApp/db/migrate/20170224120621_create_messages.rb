class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :msg
      t.references :user, foreign_key: true
      t.references :group, foreign_key: true
      t.text :userName

      t.timestamps
    end
  end
end
