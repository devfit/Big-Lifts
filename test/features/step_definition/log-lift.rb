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
