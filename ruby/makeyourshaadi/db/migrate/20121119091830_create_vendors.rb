class CreateVendors < ActiveRecord::Migration
  def change
    create_table :vendors do |t|
      t.string :vname

      t.timestamps
    end
  end
end
