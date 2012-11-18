When /^I select "([^"]*)" assistance work$/ do |assistanceName|
  assistance_list_item = get_displayed_list_items().select { |item| item.text() == assistanceName }[0]
  assistance_list_item.click()

  @driver.find_element(:id => 'assistance-chooser-next-button').click()
  sleep @ANIMATION_DELAY
end

Then /^The first boring but big lift weight is (\d+)$/ do |weight|
  @driver.find_element(:id => 'boring-but-big').find_elements(:class => 'weight')[0].text().should == weight
end

When /^I set the BBB percentage to (\d+)$/ do |percentage|
  bbb_percentage_iput = @driver.find_element(:name => 'bbbPercentage')
  bbb_percentage_iput.clear
  bbb_percentage_iput.send_keys percentage
end

When /^I save the boring but big log$/ do
  @driver.find_element(:id => 'boring-but-big-save-log-button').click()
  sleep @ANIMATION_DELAY
end

Then /^I see (\d+) assistance log entry for "([^"]*)"$/ do |numberOfEntries, entryText|
  log_rows = get_displayed_list_items()
  log_rows.length.should == numberOfEntries.to_i

  log_row = log_rows[0]
  reps_weight = log_row.find_element(:class => "reps").text() + log_row.find_element(:class => 'weight').text()
  reps_weight.should == entryText
end

Then /^I set the boring but big notes to "(.*?)"$/ do |notes|
  boring_but_big_notes = @driver.find_element(:id => 'boring-but-big-notes')
  boring_but_big_notes.find_element(:name => 'notes').send_keys(notes)
end

Then /^I return from the boring but big notes$/ do
  @driver.find_element(:id => 'boring-but-big-notes').find_elements(:class => 'x-button').select { |button|
    button.text() == 'Back'
  }[0].click

  sleep @ANIMATION_DELAY
end

When /^I tap "([^"]+)" log entry (\d+)$/ do |assistance_type, row_entry|
  row = @driver.find_element(:id => 'log-assistance-list').find_elements(:class => 'x-list-item').select { |row|
    row.text().include? assistance_type
  }[row_entry.to_i - 1]

  row.click
  sleep @ANIMATION_DELAY
end

Then /^The assistance details notes shows "([^"]*?)"$/ do |notes|
  log_notes = @driver.find_element(:id => 'edit-assistance-log-notes').text()
  log_notes.should == notes
end

Then /^I set the assistance log reps to (\d+)$/ do |reps|
  reps_input = @driver.find_element(:id => 'edit-assistance-log-fieldset').find_element(:name => 'reps')
  reps_input.clear
  reps_input.send_keys reps
end

When /^I tap the first boring but big entry$/ do
  get_displayed_list_items()[0].click
  sleep @ANIMATION_DELAY
end

When /^I set the boring but big lift to "(.*?)"$/ do |lift_name|
  @sencha_helper.select_combobox @driver.find_element(:id => 'bbb-movement-editor').find_element(:name => 'lift'), lift_name
end

Then /^The BBB list item (\d+) contains "(.*?)"$/ do |list_item_number, text|
  get_displayed_list_items()[list_item_number.to_i - 1].text().should include text
end

Then /^The BBB list item (\d+) does not contain "(.*?)"$/ do |list_item_number, text|
  get_displayed_list_items()[list_item_number.to_i - 1].text().should_not include text
end


Then /^I see an assistance log entry containing "(.*?)"$/ do |text|
  @driver.find_element(:id => 'log-assistance-list').text().should include text
end

Then /^I set the "(.*?)" to "(.*?)"$/ do |name, value|
  input = @driver.find_elements(:name => name).select { |input| input.displayed? }[0]
  input.clear
  input.send_keys value
end

Then /^The trash icon is hidden$/ do
  @driver.find_elements(:class => 'trash').select { |button| button.displayed? }.length.should == 0
end
