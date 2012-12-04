When /^I press the android back button$/ do
    @driver.execute_script('biglifts.navigation.back()')
    sleep @ANIMATION_DELAY
end

When /^I navigate to the lift schedule/ do
    @main_navigation.navigate_to(:lift_schedule)
end

Then /^I am on the lift schedule$/ do
   @driver.find_element( :id => 'lift-selector' ).displayed?.should be_true
end

Then /^I am on the lift settings$/ do
   @driver.find_element( :id => 'lift-settings' ).displayed?.should be_true
end


When /^I navigate to the lift editor$/ do
  @main_navigation.navigate_to(:lift_editor)
end

When /^I click add lift$/ do
  @driver.find_element(:id => 'add-lift-button').click()
  sleep @ANIMATION_DELAY
end

Then /^I am on the lift editor$/ do
  @driver.find_element(:id => 'maxes-panel').displayed?.should be_true
end