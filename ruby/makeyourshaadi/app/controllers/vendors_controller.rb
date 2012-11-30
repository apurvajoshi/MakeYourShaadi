class VendorsController < ApplicationController
helper_method :sort_column, :sort_direction
  def index
    if params[:search]
      #@vendors = Vendor.order(sort_column + " " + sort_direction).paginate(:conditions => ['title LIKE ?', "%#{params[:search]}%"], :per_page => 5, :page => params[:page])
      @vendors = Vendor.where("vname LIKE ?", "%#{params[:search]}%")
    else
      #@vendors = Vendor.search(params[:search]).order(sort_column + " " + sort_direction).paginate(:per_page => 5, :page => params[:page])
      @vendors = Vendor.all
    end
    
    respond_to do |format|
        format.html
        format.js
        format.xml  { render :xml => @vendors }
    end
  end
  
  def sort_column
    Vendor.column_names.include?(params[:sort]) ? params[:sort] : "vname"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
end
