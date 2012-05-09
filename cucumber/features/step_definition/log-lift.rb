When /^I set the log expected reps to (\d+)$/ do |reps|
  expectedRepsInput = @driver.find_element(:id => 'log').find_element(:name => 'expectedReps')
  expectedRepsInput.clear
  expectedRepsInput.send_keys reps
end

When /^I set the log reps to (\d+)$/ do |reps|
  repsInput = @driver.find_element(:id => 'log').find_element(:name => 'reps')
  repsInput.clear
  repsInput.send_keys reps
end

Then /^The log expected reps is (\d+)$/ do |reps|
  @driver.find_element(:id => 'log').find_element(:name => 'expectedReps').attribute('value').should == reps
end

Then /^The log reps is (\d+)$/ do |reps|
  @driver.find_element(:id => 'log').find_element(:name => 'reps').attribute('value').should == reps
end

When /^I tap edit first log notes$/ do
  @driver.find_element(:id => 'first-log-notes').click()
  sleep @ANIMATION_DELAY
end

When /^I set the first log notes to "([^"]*)"$/ do |logNotes|
  firstLiftTracking = @driver.find_element(:id => 'first-log-notes-editor')
  firstLiftTracking.find_element(:name => 'notes').send_keys(logNotes)

  firstLiftTracking.find_element(:class => 'x-button-back').click()
  sleep @ANIMATION_DELAY
end

Then /^the log notes are "([^"]*)"$/ do |expectedLogNotes|
  logNotes = @driver.find_element(:id => 'edit-log-notes').text()
  logNotes.should == expectedLogNotes
end

Then /^The log date is today$/ do
  dateText = @driver.find_element(:id => 'edit-log-entry').find_element(:name => 'timestamp').attribute('value')
  dateText.include?(Time.now.strftime("%m/%d/%Y")).should == true
end

Then /^I tap edit log notes$/ do
  @driver.find_element(:id => 'edit-log-notes').click()
  sleep @ANIMATION_DELAY
end

Then /^I return from editing the log notes$/ do
  @driver.find_element(:id => 'log-notes-editor').find_element(:class => 'x-button-back').click()
  sleep @ANIMATION_DELAY
end

Then /^I return from viewing a log$/ do
  @driver.find_element(:id => 'edit-log-entry').find_element(:class => 'x-button-back').click()
  sleep @ANIMATION_DELAY
end

Then /^The squat long entry date in the log list is today$/ do
  dateText = @driver.find_element(:id => 'lift-log-list').find_element(:class => 'date-week').text()
  dateText.include?(Time.now.strftime("%m/%d/%Y")).should == true
end

Then /^I am returned to the lift schedule and no log is saved$/ do
  liftTemplateVisible = @driver.find_element(:id => 'lift-template').displayed?
  liftTemplateVisible.should == true

  @driver.execute_script("return wendler.stores.LiftLog.getCount()").should == 0
end

When /^I tap back in the lift log$/ do
  @driver.find_element(:id => 'log-lift-back-button').click()
  sleep @ANIMATION_DELAY
end
