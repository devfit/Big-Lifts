When /^I set the (\w+) meet goal to (\d+)$/ do |lift, weight|
  lift_input = @driver.find_element(:id => 'meet-goals').find_element(:name => lift)
  lift_input.clear
  lift_input.send_keys weight
end

Then /^Meet goals are not visible$/ do
  @driver.find_element(:id => 'meet-goals').should be_displayed
end