When /^I select "([^"]*)" assistance work$/ do |assistanceName|
  assistanceListItem = @driver.find_element(:id => 'assistance-chooser').find_elements(:class => 'x-list-item').select { |item| item.text() == assistanceName }[0]
  assistanceListItem.click()

  @driver.find_element(:id => 'assistance-chooser-next-button').click()
  sleep @ANIMATION_DELAY
end

Then /^The first boring but big lift weight is (\d+)$/ do |weight|
  @driver.find_element(:id => 'boring-but-big').find_elements(:class => 'weight')[0].text().should == weight
end

When /^I set the BBB percentage to (\d+)$/ do |percentage|
  bbbPercentageInput = @driver.find_element(:name => 'bbbPercentage')
  bbbPercentageInput.clear
  bbbPercentageInput.send_keys percentage
end

When /^I save the boring but big assistance work$/ do
  @driver.find_element(:id => 'boring-but-big-done-button').click()
  sleep @ANIMATION_DELAY
end

Then /^I see (\d+) assistance log entry for "([^"]*)"$/ do |numberOfEntries, entryText|
  logRows = @driver.find_element(:id => 'log-assistance-list').find_elements(:class => 'lift-log-row')
  logRows.length.should == numberOfEntries.to_i

  logRow = logRows[0]
  repsWeight = logRow.find_element(:class => "reps").text() + logRow.find_element(:class => 'weight').text()
  repsWeight.should == entryText
end

