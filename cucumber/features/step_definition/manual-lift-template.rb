def displayed_lift_settings_page
  @driver.find_element(:id => @driver.execute_script("return Ext.getCmp('lift-settings').getActiveItem().id"))
end

When /^I switch to the custom percentages template$/ do
  until displayed_lift_settings_page().find_element(:class => 'x-title').text() == "Custom" do
    displayed_lift_settings_page().find_elements(:class => 'x-button').select { |button| button.text() == "Next" }[0].click
    sleep @ANIMATION_DELAY
  end
end

When /^I tap the use template button$/ do
  button = displayed_lift_settings_page().find_elements(:class => 'x-button').select { |button| button.text() == "Use" }[0]
  button.click
  sleep @ANIMATION_DELAY
end

When /^I select week (\d+) for the manual percentages editor$/ do |week|
  edit_lift_percentages = @driver.find_element(:id => 'edit-lift-percentages')
  week_tab = edit_lift_percentages.find_elements(:class => 'x-tab').select { |tab|
    tab.text.include?(week)
  }[0]
  week_tab.click()
  sleep @ANIMATION_DELAY
  sleep 0.5
end

When /^I select set (\d+) on the manual percentages editor$/ do |set|
  list_of_sets = @driver.find_element(:id => 'edit-lift-percentages').find_elements(:class => 'x-list-item').select { |item| item.displayed? }
  list_of_sets[set.to_i-1].click()
  sleep @ANIMATION_DELAY
end

When /^I set the manual percentage to (\d+)$/ do |percentage|
  percentage_input = @driver.find_element(:id => 'percentage-edit-input').find_element(:tag_name => 'input')
  percentage_input.clear
  percentage_input.send_keys percentage
end

When /^I tap back when viewing a manual progression$/ do
  @driver.find_element(:id => 'edit-progression-toolbar').find_element(:class => 'x-button-back').click()
  sleep @ANIMATION_DELAY
end

When /^I navigate back to the lift settings from the manual percentages editor$/ do
  @driver.find_element(:id => 'edit-lift-percentages').find_element(:class => 'x-button-back').click()
  sleep @ANIMATION_DELAY
end

Then /^The set (\d+) lift percentage shows (\d+)%$/ do |set, percentage|
  set_list_item = @driver.find_element(:id => 'lift-template').find_elements(:class => 'x-list-item').select {
      |listItem| listItem.displayed?
  }[set.to_i-1]
  set_list_item.text.should include("#{percentage}%")
end

When /^I set the manual reps to (\d+)$/ do |reps|
  reps_input = @driver.find_element(:id => 'reps-edit-input').find_element(:tag_name => 'input')
  reps_input.clear
  reps_input.send_keys reps
end

Then /^The set (\d+) reps shows (\d+)$/ do |set, reps|
  set_list_item = @driver.find_element(:id => 'lift-template').find_elements(:class => 'x-list-item').select {
      |listItem| listItem.displayed?
  }[set.to_i-1]

  set_list_item.text.should include("#{reps}")
end

Then /^Lift progressions in the list are visible$/ do
  @driver.find_elements(:class => 'lift-percentage-row').select { |row|
    row.displayed?
  }.each do |row|
    row_text_present = row.text == ''
    row_text_present.should be_false
  end
end

When /^I tap the add set button$/ do
  @driver.find_elements(:class => 'x-button').select { |button|
    button.displayed? && button.text() == 'Add set'
  }[0].click

  sleep @ANIMATION_DELAY
end

When /^I check the amrap custom set checkbox$/ do
  @driver.find_element(:id => 'edit-progression').find_element(:name => 'amrap').find_element(:xpath => './..').click
end

Then /^Set (\d+) is marked as AMRAP$/ do |set_number|
  row = @driver.find_elements(:class => 'reps-weight').select { |row| row.displayed? }[set_number.to_i - 1]
  row.attribute('class').should include('amrap')
end
