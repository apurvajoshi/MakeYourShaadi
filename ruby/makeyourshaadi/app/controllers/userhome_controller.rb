class UserhomeController < ApplicationController
  def index
    if session[:user_id].nil?
      redirect_to root_url
    end
  end
end
