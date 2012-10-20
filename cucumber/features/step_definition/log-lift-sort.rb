When /^I tap the sort lift log button$/ do
  @driver.find_element(:id => 'track-sort-button').click()
  sleep @ANIMATION_DELAY
end

When /^I tap sort "([^"]+)"$/ do |sortText|
  sort_toolbar = @driver.find_element(:id => 'track-sort-toolbar')
  sort_toolbar.find_elements(:class => 'x-button').select { |button|
    button.text == sortText
  }[0].click()
  sleep @ANIMATION_DELAY
end

Then /^The log list shows "([^"]*)"$/ do |lifts|
  log_rows = @driver.find_element(:id => 'lift-log-list').find_elements(:class => 'lift-name')

  log_text = log_rows.collect { |row| row.text }
  lifts.should == log_text.join(',')
end

When /^I select the log entry (\d+)$/ do |log_number|
  @driver.find_element(:id => 'lift-log-list').find_elements(:class => 'x-list-item')[log_number.to_i - 1].click
  sleep @ANIMATION_DELAY
end

When /^I change the log date to "([^"]+)"$/ do |date|
  @driver.execute_script('Ext.getCmp("edit-log-date").setValue(Date.parse("'+ date +'"));
Ext.getCmp("edit-log-date").fireEvent("change");')
end

Then /^The log list dates show "(.*?)"$/ do |dates|
  actual_dates = @driver.find_element(:id => 'lift-log-list').find_elements(:class => 'date').collect { |date| date.text() }
  actual_dates.should == dates.split(',')
end