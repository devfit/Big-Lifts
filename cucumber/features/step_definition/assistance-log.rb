Then /^I tap the assistance log notes$/ do
  @driver.find_element(:id => 'edit-assistance-log-notes').click
  sleep @ANIMATION_DELAY
end

Then /^I set the assistance log notes to "(.*?)"$/ do |notes|
  edit_assistance_log_notes = @driver.find_element(:id => 'assistance-log-notes-editor')
  edit_assistance_log_notes.find_element(:name => 'notes').send_keys(notes)
end

Then /^I tap back from the assistance log notes$/ do
  edit_assistance_log_notes = @driver.find_element(:id => 'assistance-log-notes-editor')
  edit_assistance_log_notes.find_elements(:class => 'x-button').select { |button| button.text() == 'Back' }[0].click
  sleep @ANIMATION_DELAY
end

Then /^The assistance log notes shows "(.*?)"$/ do |notes|
  log_notes = @driver.find_element(:id => 'edit-assistance-log-notes').text()
  log_notes.should == notes
end

Then /^I tap the delete assistance log button$/ do
  @driver.find_element(:id => 'assistance-log-delete-button').click
  sleep @ANIMATION_DELAY
end

Then /^I am on the assistance log list$/ do
  @driver.find_element(:id => 'log-assistance-list').should be_displayed
end

Then /^There are (\d+) assistance log entries$/ do |entry_count|
  @driver.find_element(:id => 'log-assistance-list').find_elements(:class => 'x-list-item').length.should == entry_count.to_i
end