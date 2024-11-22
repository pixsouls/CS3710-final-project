class AddDeviseTokenAuthToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      # Required for Devise Token Auth
      t.string :provider, default: 'email'
      t.string :uid, null: false, default: ''
      t.string :tokens

      # You can also add other fields like this:
      # t.string :name
    end

    # Add indexes for Devise Token Auth
    add_index :users, :uid, unique: true
    add_index :users, [:uid, :provider], unique: true
  end
end
