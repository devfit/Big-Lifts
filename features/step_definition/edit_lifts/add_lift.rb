When /^I add a new lift named "([^"]*)" with max (\d+)$/ do |lift, max|
  @main_navigation.navigate_to(:lift_editor)

  add_lift_button = @driver.find_element(:id => 'add-lift-button')
  add_lift_button.click
  sleep @ANIMATION_DELAY

  name_input = @driver.find_element(:name => 'add-lift-new-name')
  name_input.send_keys lift
  max_input = @driver.find_element(:name => 'add-lift-new-max')
  max_input.send_keys max

  @driver.find_elements(:class => 'x-button').select{|button| button.displayed? && button.text() == "Save"}[0].click
  sleep @ANIMATION_DELAY
end

Then /^"([^"]*)" is ([\w ]+)?added to the edit lifts screen$/ do |lift, invertCheck|
  lift_should_be_added = invertCheck == nil

  @main_navigation.navigate_to(:lift_editor)

  lift_list = @driver.find_element(:id => 'maxes-form-items')
  lift_is_shown = lift_list.text.include? lift

  lift_is_shown.should == lift_should_be_added
end

Then /^"([^"]*)" is ([\w ]+)?added to the lift schedule$/ do |lift, invertCheck|
  lift_should_be_added = invertCheck == nil
  @main_navigation.navigate_to(:lift_schedule)

  lift_selector = @driver.find_element(:id => 'lift-selector')
  lift_is_shown = lift_selector.text.include? lift

  lift_is_shown.should == lift_should_be_added
end

Then /^I see an error with message "([^"]*)"$/ do |message|
  sleep @ANIMATION_DELAY
  @driver.find_element(:class => 'x-msgbox').find_element(:class => 'x-msgbox-text').text.should == message
  @driver.find_element(:class => 'x-msgbox').find_element(:class => 'x-button').click
  sleep @ANIMATION_DELAY
end

When /^I edit the name to be "([^"]*)"$/ do |new_lift_name|
  edit_lift_input = @driver.find_element(:id => 'edit-lift-form').find_element(:name => 'name')
  edit_lift_input.clear
  edit_lift_input.send_keys(new_lift_name)
end


