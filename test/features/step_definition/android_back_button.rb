When /^I press the android back button$/ do
    @driver.execute_script('wendler.navigation.backFunction()')
end

When /^I navigate to the lift editor$/ do
    @main_navigation.navigate_to(:lift_editor)
end

Then /^I am still on the lift schedule$/ do
   maxesFormDisplayed = @driver.find_element( :id => 'maxes-form' ).displayed?
   maxesFormDisplayed.should == true
end