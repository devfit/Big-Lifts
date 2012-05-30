When /^I tap the rest timer button$/ do
  @driver.find_element(:id => 'rest-timer-button').click()
  sleep @ANIMATION_DELAY
end

When /^I tap the increment rest timer button$/ do
  @driver.find_element(:id => 'rest-timer-increment-button').click();
end

Then /^The rest timer shows "(.*?)"$/ do |time|
  @driver.find_element(:id => 'rest-timer-time').text().should == time;
end

Then /^I tap the rest timer start button$/ do
  @driver.find_element(:id => 'start-timer-button').click();
end

Then /^I wait (\d+) seconds$/ do |seconds|
  sleep seconds.to_i
end

Then /^I am on the lift template$/ do
  @driver.find_element(:id => 'lift-template').displayed?.should == true
end
