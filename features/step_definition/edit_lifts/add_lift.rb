When /^I add a new lift named "([^"]*)" with max (\d+)$/ do |lift, max|
  navigate_to(:lift_editor)
  @driver.find_element(:css => '.x-button-icon.add').click()

  name_input = @driver.find_elements(:name => 'name').select { |n| n.displayed? }[0]
  name_input.send_keys lift

  max_input = @driver.find_elements(:name => 'max').select { |m| m.displayed? }[0]
  max_input.send_keys max

  @driver.find_elements(:class => 'x-button').select { |button| button.displayed? && button.text() == "Save" }[0].click
end

Then /^"([^"]*)" is ([\w ]+)?added to the edit lifts screen$/ do |lift, invertCheck|
  lift_should_be_added = invertCheck == nil

  navigate_to(:lift_editor)

  lift_list_text = @driver.find_elements(:class => 'x-form-label').collect { |l| l.text() }.join
  lift_is_shown = lift_list_text.include? lift

  lift_is_shown.should == lift_should_be_added
end

Then /^"([^"]*)" is ([\w ]+)?added to the lift schedule$/ do |lift, invertCheck|
  lift_should_be_added = invertCheck == nil
  navigate_to(:lift_schedule)

  lift_selector = @driver.find_element(:id => 'lift-selector')
  lift_is_shown = lift_selector.text.include? lift

  lift_is_shown.should == lift_should_be_added
end

Then /^I see an error with message "([^"]*)"$/ do |message|

  @driver.find_element(:class => 'x-msgbox').find_element(:class => 'x-msgbox-text').text.should == message
  @driver.find_element(:class => 'x-msgbox').find_element(:class => 'x-button').click

end

When /^I edit the name to be "([^"]*)"$/ do |new_lift_name|
  edit_lift_input = @driver.find_element(:id => 'edit-lift-form').find_element(:name => 'name')
  edit_lift_input.clear
  edit_lift_input.send_keys(new_lift_name)
end


