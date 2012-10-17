When /^I press the android back button$/ do
    @driver.execute_script('biglifts.navigation.back()')
    sleep @ANIMATION_DELAY
end

When /^I navigate to the lift schedule/ do
    @main_navigation.navigate_to(:lift_schedule)
end

Then /^I am on the lift schedule$/ do
   maxesFormDisplayed = @driver.find_element( :id => 'lift-selector' ).displayed?
   maxesFormDisplayed.should == true
end

Then /^I am on the lift settings$/ do
   liftSettingsDisplayed = @driver.find_element( :id => 'lift-settings' ).displayed?
   liftSettingsDisplayed.should == true
end


When /^I navigate to the lift editor$/ do
  @main_navigation.navigate_to(:lift_editor)
end

When /^I click add lift$/ do
  @driver.find_element(:id => 'add-lift-button').click()
  sleep @ANIMATION_DELAY
end

Then /^I am on the lift editor$/ do
  liftEditorDisplayed = @driver.find_element(:id => 'maxes-panel').displayed?
  liftEditorDisplayed.should == true
end

When /^I click edit squat in the edit lifts lists$/ do
  liftList = @driver.find_element(:id => 'maxes-edit-lifts-list').find_elements(:class => 'x-list-item')
  editSquat = liftList.select{ |lift| lift.text == 'Squat' }[0]
  editSquat.click()
  sleep @ANIMATION_DELAY
end
