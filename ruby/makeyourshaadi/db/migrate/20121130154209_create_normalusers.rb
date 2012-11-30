class CreateNormalusers < ActiveRecord::Migration
  def change
    create_table :normalusers do |t|
      t.string :fullname
      t.string :password
      t.string :email
      t.string :weddinglocation
      t.date :weddingdate
      t.string :spousename

      t.timestamps
    end
  end
end
