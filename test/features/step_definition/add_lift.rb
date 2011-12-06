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
  nameInput = @driver.find_element(:name => 'add-lift-new-name')
  nameInput.send_keys lift
  maxInput = @driver.find_element(:name => 'add-lift-new-max')
  maxInput.send_keys max

  @driver.find_element(:id => 'add-lift-done-button').click
end

Then /^"([^"]*)" is ([\w ]+)?added to the edit lifts screen$/ do |lift, invertCheck|
  puts invertCheck == "not"
end

Then /^"([^"]*)" is ([\w ]+)?added to the lift schedule$/ do |lift, invertCheck|
  puts invertCheck == "not"
end

Then /^I see an error with message "([^"]*)"$/ do |message|
  @wait.until { @driver.find_elements( :class => 'x-msgbox-body' ) != [] }
  @driver.find_element( :class => 'x-msgbox-body' ).text.should == message
end

