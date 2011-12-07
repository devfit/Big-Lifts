When /^I add a new lift named "([^"]*)" with max (\d+)$/ do |lift, max|
  @main_navigation.navigate_to(:lift_editor)

  editLiftsButton = @driver.find_element(:id => 'edit-lifts-button')
  @wait.until { editLiftsButton.displayed? }
  sleep 0.25
  editLiftsButton.click

  @wait.until { @driver.find_elements(:id => 'edit-lifts-add-lift-button') != [] }
  addLiftButton = @driver.find_element(:id => 'edit-lifts-add-lift-button')
  addLiftButton.click

  @wait.until { @driver.find_elements(:id => 'add-lift-new-name') != [] }
  sleep 0.25

  nameInput = @driver.find_element(:name => 'add-lift-new-name')
  nameInput.send_keys lift
  maxInput = @driver.find_element(:name => 'add-lift-new-max')
  maxInput.send_keys max

  @driver.find_element(:id => 'add-lift-done-button').click
end

Then /^When I close the edit lifts screen$/ do
  edit_lifts_done_button = @driver.find_element(:id => 'edit-lifts-done-button')
  @wait.until { edit_lifts_done_button.displayed? }
  sleep 0.5
  edit_lifts_done_button.click
end

Then /^"([^"]*)" is ([\w ]+)?added to the edit lifts screen$/ do |lift, invertCheck|
  liftShouldBeAdded = invertCheck == nil
  @main_navigation.navigate_to(:lift_editor)
  editLiftsButton = @driver.find_element(:id => 'edit-lifts-button')
  @wait.until { editLiftsButton.displayed? }

  liftList = @driver.find_element(:id => 'maxes-form-items')
  liftIsShown = liftList.text.include? lift

  liftIsShown.should == liftShouldBeAdded
end

Then /^"([^"]*)" is ([\w ]+)?added to the lift schedule$/ do |lift, invertCheck|
  if (invertCheck != nil)

  end
end

Then /^I see an error with message "([^"]*)"$/ do |message|
  @wait.until { @driver.find_elements(:class => 'x-msgbox-body') != [] }
  @driver.find_element(:class => 'x-msgbox-body').text.should == message
  @driver.find_element(:class => 'x-msgbox').find_element(:class => 'x-button').click
end

Then /^I close the add lift screen$/ do
  @driver.find_element(:id => 'add-lift-cancel-button').click
  sleep 0.25
  @driver.find_element(:id => 'edit-lifts-done-button').click
end

