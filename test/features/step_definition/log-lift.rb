When /^I set the log notes to "([^"]*)"$/ do |logNotes|
  liftTracking = @driver.find_element(:id => 'lift-tracking')
  liftTracking.find_element(:name => 'notes').send_keys(logNotes)
end

Then /^the log notes are "([^"]*)"$/ do |expectedLogNotes|
  editLogEntry = @driver.find_element(:id => 'edit-log-entry')
  logNotes = editLogEntry.find_element(:name => 'notes').attribute('value')
  logNotes.should == expectedLogNotes
end
