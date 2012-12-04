def displayed_lift_settings_page
  @driver.find_element(:id => @driver.execute_script("return Ext.getCmp('lift-settings').getActiveItem().id"))
end

When /^I select week (\d+) for the manual percentages editor$/ do |week|
  edit_lift_percentages = @driver.find_element(:id => 'edit-lift-percentages')
  week_tab = edit_lift_percentages.find_elements(:class => 'x-tab').select { |tab|
    tab.text.include?(week)
  }[0]
  week_tab.click()
  sleep @ANIMATION_DELAY
end

When /^I select set (\d+) on the manual percentages editor$/ do |set|
  get_displayed_list_items()[set.to_i-1].click()
  sleep @ANIMATION_DELAY
end

When /^I set the manual percentage to (\d+)$/ do |percentage|
  percentage_input = @driver.find_element(:id => 'percentage-edit-input').find_element(:tag_name => 'input')
  percentage_input.clear
  percentage_input.send_keys percentage
end

When /^I navigate back to the lift settings from the manual percentages editor$/ do
  @driver.find_element(:id => 'edit-lift-percentages').find_element(:class => 'x-button-back').click()
  sleep @ANIMATION_DELAY
end

Then /^The set (\d+) lift percentage shows (\d+)%$/ do |set, percentage|
  get_displayed_list_items()[set.to_i-1].text.should include("#{percentage}%")
end

When /^I set the manual reps to (\d+)$/ do |reps|
  reps_input = @driver.find_element(:id => 'reps-edit-input').find_element(:tag_name => 'input')
  reps_input.clear
  reps_input.send_keys reps
end

Then /^The set (\d+) reps shows (\d+)$/ do |set, reps|
  get_displayed_list_items()[set.to_i-1].text.should include("#{reps}")
end

Then /^Lift progressions in the list are visible$/ do
  get_displayed_list_items().each do |row|
    row_text_present = row.text != ''
    row_text_present.should be_true
  end
end

When /^I tap the add set button$/ do
  @driver.find_elements(:class => 'x-button').select { |button|
    button.displayed? && button.text() == 'Add set'
  }[0].click

  sleep @ANIMATION_DELAY
end

When /^I check the (\w+) custom set checkbox$/ do |custom_set_field|
  @driver.find_element(:id => 'edit-progression').find_element(:name => custom_set_field).find_element(:xpath => './..').click
end

Then /^Set (\d+) is ([\w\s]*?)marked as (\w+)/ do |set_number, not_modifier, marked_as_class|
  row = @driver.find_elements(:class => 'lift-row').select { |row| row.displayed? }[set_number.to_i - 1]

  row_class = row.find_element(:tag_name => 'p').attribute('class')

  if not_modifier == "not "
    row_class.should_not include(marked_as_class)
  else
    row_class.should include(marked_as_class)
  end
end