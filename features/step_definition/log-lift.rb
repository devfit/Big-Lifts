When /^I set the log expected reps to (\d+)$/ do |reps|
  expected_reps_input = @driver.find_element(:id => 'log').find_element(:name => 'expectedReps')
  expected_reps_input.clear
  expected_reps_input.send_keys reps
end

When /^I set the log reps to (\d+)$/ do |reps|
  reps_input = @driver.find_element(:id => 'log').find_element(:name => 'reps')
  reps_input.clear
  reps_input.send_keys reps
end

Then /^The log expected reps is (\d+)$/ do |reps|
  @driver.find_element(:id => 'log').find_element(:name => 'expectedReps').attribute('value').should == reps
end

Then /^The log reps is (\d+)$/ do |reps|
  @driver.find_element(:id => 'log').find_element(:name => 'reps').attribute('value').should == reps
end

When /^I tap edit first log notes$/ do
  @driver.find_element(:id => 'first-log-notes').click()

end

When /^I set the first log notes to "([^"]*)"$/ do |log_notes|
  first_lift_tracking = @driver.find_element(:id => 'first-log-notes-editor')
  first_lift_tracking.find_element(:name => 'notes').send_keys(log_notes)

  first_lift_tracking.find_element(:class => 'x-button-back').click()

end

Then /^the log notes are "([^"]*)"$/ do |expected_log_notes|
  log_notes = @driver.find_element(:id => 'edit-log-notes').text()
  log_notes.should == expected_log_notes
end

Then /^The log date is today$/ do
  date_text = @driver.find_element(:id => 'edit-log-entry').find_element(:name => 'timestamp').attribute('value')
  date_text.include?(Time.now.strftime("%m/%d/%Y")).should be_true
end

Then /^I tap edit log notes$/ do
  @driver.find_element(:id => 'edit-log-notes').click()

end

Then /^I return from editing the log notes$/ do
  @driver.find_element(:id => 'log-notes-editor').find_element(:class => 'x-button-back').click()

end

Then /^I return from viewing a log$/ do
  @driver.find_element(:id => 'edit-log-entry').find_element(:class => 'x-button-back').click()

end

Then /^The squat long entry date in the log list is today$/ do
  date_text = @driver.find_element(:id => 'lift-log-list').find_element(:class => 'date-week').text()
  date_text.include?(Time.now.strftime("%m/%d/%Y")).should be_true
end

Then /^I am returned to the lift schedule and no log is saved$/ do
  lift_template_visible = @driver.find_element(:id => 'lift-template').displayed?
  lift_template_visible.should be_true

  @driver.execute_script("return biglifts.stores.LiftLog.getCount()").should == 0
end
