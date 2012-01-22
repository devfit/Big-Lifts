When /^I hit done on the lift completion screen$/ do
   sleep @ANIMATION_DELAY
   @driver.find_element(:id => 'lifts-complete-done-button').click()
   sleep @ANIMATION_DELAY
end

Then /^(\w+) max is set to ([\d\.]+)$/ do |lift, newmax|
  @main_navigation.navigate_to(:lift_editor)
  @driver.find_element(:name => lift).attribute('value').should == newmax
end

When /^I edit the cycle increase to be ([\d\.]+)$/ do |increase|
  cycleIncrease = @driver.find_element(:name => 'edit-lift-cycle-increase')
  cycleIncrease.clear
  cycleIncrease.send_keys(increase)
  sleep 0.5
end

