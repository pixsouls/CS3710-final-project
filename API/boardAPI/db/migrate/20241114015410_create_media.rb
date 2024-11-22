class CreateMedia < ActiveRecord::Migration[7.1]
  def change
    create_table :media do |t|
      t.string :name
      t.string :src

      t.timestamps
    end
  end
end
