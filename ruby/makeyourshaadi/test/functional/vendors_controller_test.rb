require 'test_helper'

class VendorsControllerTest < ActionController::TestCase
  test "should get vendorsearch" do
    get :vendorsearch
    assert_response :success
  end

end
