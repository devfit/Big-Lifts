When /^I add a new lift named "([^"]*)" with max (\d+)$/ do |lift, max|
  @main_navigation.navigate_to(:lift_editor)

  addLiftButton = @driver.find_element(:id => 'add-lift-button')
  addLiftButton.click
  sleep @ANIMATION_DELAY

  nameInput = @driver.find_element(:name => 'add-lift-new-name')
  nameInput.send_keys lift
  maxInput = @driver.find_element(:name => 'add-lift-new-max')
  maxInput.send_keys max

  @driver.find_element(:id => 'add-lift-done-button').click
  sleep @ANIMATION_DELAY
end

Then /^I close the edit lifts screen$/ do
  edit_lifts_done_button = @driver.find_element(:id => 'edit-lifts-done-button')
  edit_lifts_done_button.click
  sleep @ANIMATION_DELAY
end

Then /^"([^"]*)" is ([\w ]+)?added to the edit lifts screen$/ do |lift, invertCheck|
  liftShouldBeAdded = invertCheck == nil

  @main_navigation.navigate_to(:lift_editor)

  liftList = @driver.find_element(:id => 'maxes-form-items')
  liftIsShown = liftList.text.include? lift

  liftIsShown.should == liftShouldBeAdded
end

Then /^"([^"]*)" is ([\w ]+)?added to the lift schedule$/ do |lift, invertCheck|
  liftShouldBeAdded = invertCheck == nil
  @main_navigation.navigate_to(:lift_schedule)

  lift_selector = @driver.find_element(:id => 'lift-selector')
  liftIsShown = lift_selector.text.include? lift

  liftIsShown.should == liftShouldBeAdded
end

Then /^I see an error with message "([^"]*)"$/ do |message|
  @wait.until { @driver.find_elements(:class => 'x-msgbox-body') != [] }
  @driver.find_element(:class => 'x-msgbox-body').text.should == message
  @driver.find_element(:class => 'x-msgbox').find_element(:class => 'x-button').click
  sleep 0.25
end

Then /^I close the add lift screen$/ do
  @driver.find_element(:id => 'add-lift-cancel-button').click
  sleep @ANIMATION_DELAY
end

When /^I click edit lifts$/ do
   @driver.find_element(:id => 'edit-lifts-button').click()
   sleep @ANIMATION_DELAY
end

When /^I click edit "([^"]*)"$/ do |lift|
     editLiftsList = @driver.find_element(:id => 'maxes-edit-lifts-list')
     editLiftsList.find_elements(:class => 'x-list-item').select{|l| l.text == lift}[0].click()
end

When /^I close the edit lift screen$/ do
    @driver.find_element(:id => 'edit-lift-back-button').click
    sleep @ANIMATION_DELAY
end

When /^I edit the name to be "([^"]*)"$/ do |newLiftName|
   editLiftInput = @driver.find_element(:name => 'edit-lift-new-name')
   editLiftInput.clear
   editLiftInput.send_keys( newLiftName )
end


