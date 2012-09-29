When /^I disable "(.*?)"$/ do |lift_to_disable|
  row = @driver.find_elements(:class => 'lift-list-row').select { |row| row.displayed? && row.text().include?(lift_to_disable) }[0]
  row.find_element(:class => 'x-input-checkbox').find_element(:xpath => './..').click
end

When /^I tap the "(.*?)" button$/ do |button_text|
  @driver.find_elements(:class => 'x-button').select { |button| button.displayed? && button.text() == button_text }[0].click
  sleep @ANIMATION_DELAY
end

Then /^The "(.*?)" edit lift row still has a checkbox$/ do |lift_name|
  row = @driver.find_element(:id => 'maxes-edit-lifts-panel').find_elements(:class => 'lift-list-row').select {
      |row| row.text().include? lift_name
  }[0]

  row.find_elements(:class => 'x-input-checkbox').should_not be_empty
end

Then /^Week (\d+) of the lift selector is marked complete$/ do |week|
  week_tab = @driver.find_element(:id => 'lift-selector').find_elements(:class => 'x-tab').
      select { |tab| tab.displayed? && tab.text().include?(week) }[0]

  week_tab.attribute('class').should include 'completed'
end

Then /^The lift template title is "(\w+)"$/ do |lift_name|
  @driver.find_element(:id => 'lift-template-toolbar').find_element(:class => 'x-title').text().should include lift_name
end

Then /^I am prompted with the cycle complete dialog$/ do
  @driver.find_element(:id => 'cycle-complete').should be_displayed
end

When /^I tap the increase maxes help button$/ do
  @driver.find_element(:id => 'increase-maxes-help-image').click
  sleep @ANIMATION_DELAY
end

Then /^The help screen shows lifts "([^"]*?)"$/ do |lifts|
  expected_lifts = lifts.split ','
  actual_lift_rows = @driver.find_element(:id => 'increase-maxes-help').find_elements(:class => 'x-list-item')
  actual_lifts = actual_lift_rows.collect { |row| row.find_element(:tag_name => 'td').text() }

  actual_lifts.should == expected_lifts
end