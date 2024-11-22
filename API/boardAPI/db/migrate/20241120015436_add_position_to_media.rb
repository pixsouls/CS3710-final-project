class AddPositionToMedia < ActiveRecord::Migration[7.1]
  def change
    add_column :media, :position, :json, default: {'x' => 0, 'y' => 0}, null: false
  end
end
