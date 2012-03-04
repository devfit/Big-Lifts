When /^I tap the sort lift log button$/ do
  @driver.find_element(:id => 'track-sort-button').click()
  sleep @ANIMATION_DELAY
end

When /^I tap sort "([^"]+)"$/ do |sortText|
  sortToolbar = @driver.find_element(:id => 'track-sort-toolbar')
  sortToolbar.find_elements(:class => 'x-button').select { |button|
    button.text == sortText
  }[0].click()
  sleep @ANIMATION_DELAY
end

Then /^The log list shows "([^"]*)"$/ do |lifts|
  logRows = @driver.find_element(:id => 'lift-log-list').find_elements(:class => 'lift-name')

  logText = logRows.collect { |row| row.text }
  lifts.should == logText.join(',')
end
