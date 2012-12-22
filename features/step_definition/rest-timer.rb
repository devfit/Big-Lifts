When /^I tap the rest timer button$/ do
  button = @driver.find_elements(:class => 'rest-timer-button').select { |button| button.displayed? }[0]
  button.click
end

When /^I tap the increment rest timer button$/ do
  @driver.find_element(:class => 'rest-timer-increment-button').click()
end

Then /^The rest timer shows "(.*?)"$/ do |time|
  @driver.find_element(:class => 'rest-timer-time').text().should == time
end

Then /^The rest timer does not show "(.*?)"$/ do |time|
  @driver.find_element(:class => 'rest-timer-time').text().should_not == time
end

Then /^I wait (\d+) seconds$/ do |seconds|
  sleep seconds.to_i
end

Then /^I am on the lift template$/ do
  @driver.find_element(:id => 'lift-template').displayed?.should be_true
end
