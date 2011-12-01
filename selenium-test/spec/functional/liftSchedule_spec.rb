require 'spec_helper'

describe 'The lift schedule tab' do
  before(:all) do
    @driver = Selenium::WebDriver.for :chrome
    @driver.navigate.to 'http://localhost:3000/'
    @wait = Selenium::WebDriver::Wait.new(:timeout => 10)
    @wait.until { @driver.find_element(:id => "lift-selector") }
  end

  after(:all) do
    @driver.quit
  end

  it 'includes all built-in lifts' do
    liftList = @driver.find_element(:id => 'lift-selector')
    liftList.text.should include('Squat', 'Deadlift', 'Press', 'Bench')
  end

  it 'Shows warmup and work sets' do
    squatListItem = @driver.find_element(:class => 'x-list-item', :text => 'Squat')
    squatListItem.click
    @wait.until { @driver.find_element(:id => 'lift-template') }
    liftTemplate = @driver.find_element(:id => 'lift-template')
    liftTemplate.find_elements(:class => 'lift-row').length.should == 6
  end
end