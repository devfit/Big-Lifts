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