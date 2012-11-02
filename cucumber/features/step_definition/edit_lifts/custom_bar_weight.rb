When /^I set the custom bar weight to "(\d*)"$/ do |bar_weight|
  bar_weight_input = @driver.find_element(:id => "edit-lift-form").find_element(:name => "customBarWeight")
  bar_weight_input.clear
  bar_weight_input.send_keys bar_weight
end

Then /^The custom bar weight is "(.*?)"$/ do |bar_weight|
  actual_bar_weight = @driver.find_element(:id => "edit-lift-form").find_element(:name => "customBarWeight").attribute('value')
  actual_bar_weight.should == bar_weight
end