When /^I navigate to the track tab$/ do
  @main_navigation.navigate_to(:track)
end

Then /^I do ([\w ]*)see a log entry containing (\w+)$/ do |notModifier, liftName|
  log_list_items = get_displayed_list_items()

  if notModifier != ""
    log_list_items.length.should == 0
  else
    log_list_items.length.should == 1
    log_list_items[0].text().should include liftName
  end
end

When /^I select the log entry for (\w+)$/ do |liftName|
  list_items = get_displayed_list_items().select { |listItem| listItem.text.include?(liftName) }[0]
  list_items.click()
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

Then /^There are (\d+) log entries$/ do |length|
  @driver.find_elements(:class => 'x-list-item').select { |item| item.displayed? }.length.should == length.to_i
end

Then /^I set the log cycle filter to "(.*?)"$/ do |cycle|
  cycle_select = @driver.find_elements(:name => 'cycle').select { |input| input.displayed? }[0]
  @sencha_helper.select_combobox cycle_select, cycle
end



