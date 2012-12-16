Then /^I tap the assistance log notes$/ do
  @driver.find_element(:id => 'edit-assistance-log-notes').click
end

When /^I tap the assistance tab$/ do
  navigate_to :assistance
end

Then /^I set the assistance log notes to "(.*?)"$/ do |notes|
  edit_assistance_log_notes = @driver.find_element(:id => 'assistance-log-notes-editor')
  edit_assistance_log_notes.find_element(:name => 'notes').send_keys(notes)
end

Then /^The assistance log notes shows "(.*?)"$/ do |notes|
  log_notes = @driver.find_element(:id => 'edit-assistance-log-notes').text()
  log_notes.should == notes
end

Then /^I am on the assistance log list$/ do
  @driver.find_element(:id => 'log-assistance-list').should be_displayed
end