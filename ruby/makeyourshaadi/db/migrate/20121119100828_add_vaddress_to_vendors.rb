class AddVaddressToVendors < ActiveRecord::Migration
  def change
    add_column :vendors, :vaddress, :string
  end
end
