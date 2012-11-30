class Normaluser < ActiveRecord::Base
  attr_accessible :email, :fullname, :password, :spousename, :weddingdate, :weddinglocation
end
