When /^I navigate to the track tab$/ do
  @main_navigation.navigate_to(:track)
end

Then /^I do ([\w ]*)see a log entry containing (\w+)$/ do |notModifier, liftName|
  logListItems = @driver.find_element(:id => 'lift-log-list').find_elements(:class => 'x-list-item')

  if (notModifier != "")
    logListItems.length.should == 0
  else
    logListItems.length.should == 1
    liftNameInLog = logListItems[0].text.include?(liftName)
    liftNameInLog.should == true
  end
end

When /^I select the log entry for (\w+)$/ do |liftName|
  logListItems = @driver.find_element(:id => 'lift-log-list').find_elements(:class => 'x-list-item')
  listItem = logListItems.select { |listItem| listItem.text.include?(liftName) }[0]
  listItem.click()
  sleep @ANIMATION_DELAY
end

When /^I tap delete for a log entry$/ do
  @driver.find_element(:id => 'delete-log-entry-button').click()
  sleep @ANIMATION_DELAY
end

Then /^The current notes shows "([^"]*)"$/ do |notes|
  @driver.find_element(:id => 'first-log-notes').text().should == notes
end

Then /^The full log notes shows "([^"]*)"$/ do |notes|
  @driver.find_element(:id => 'first-log-notes-editor').find_element(:name => 'notes').attribute('value').should == notes
end



