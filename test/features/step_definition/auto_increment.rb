When /^I hit done on the lift completion screen$/ do
   sleep 1
   @driver.find_element(:id => 'lifts-complete-done-button').click()
end

Then /^(\w+) max is set to (\d+)$/ do |lift, newmax|
  @main_navigation.navigate_to(:lift_editor)
  @driver.find_element(:name => lift).attribute('value').should == newmax
end
