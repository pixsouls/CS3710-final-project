class AddBoardIdToMedia < ActiveRecord::Migration[7.1]
  def change
    add_reference :media, :board, null: false, foreign_key: true
  end
end
