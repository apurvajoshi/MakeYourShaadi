class AddVpincodeToVendors < ActiveRecord::Migration
  def change
    add_column :vendors, :vpincode, :string
    add_column :vendors, :vcity, :string
    add_column :vendors, :vphonenumber, :string
    add_column :vendors, :vemailid, :string
    add_column :vendors, :vwebsite, :string
  end
end
