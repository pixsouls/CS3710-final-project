class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[7.1]
  def change
    # Add necessary columns to the existing users table if they don't already exist
    unless column_exists?(:users, :provider)
      add_column :users, :provider, :string, default: 'email', null: false
    end

    unless column_exists?(:users, :uid)
      add_column :users, :uid, :string, null: false, default: ''
    end

    unless column_exists?(:users, :encrypted_password)
      add_column :users, :encrypted_password, :string, null: false, default: ''
    end

    unless column_exists?(:users, :name)
      add_column :users, :name, :string
    end

    unless column_exists?(:users, :tokens)
      add_column :users, :tokens, :text
    end

    # Add indexes if they don't already exist
    unless index_exists?(:users, :email)
      add_index :users, :email, unique: true
    end

    unless index_exists?(:users, [:uid, :provider])
      add_index :users, [:uid, :provider], unique: true
    end
  end
end
