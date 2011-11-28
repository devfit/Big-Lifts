require 'spec_helper'

describe 'The lift schedule tab' do
  before(:each) do
    @driver = Selenium::WebDriver.for :chrome
  end

  it 'Shows the lift list', :js => true do
    @driver.navigate.to 'http://localhost:3000/index.html'
    liftList = @driver.find_element(:id => 'lift-selector')
    puts liftList.text
  end
end