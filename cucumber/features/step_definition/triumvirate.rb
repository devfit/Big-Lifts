Then /^Triumvirate movement (\d+) is "(.*?)"$/ do |index, movement_text|
  movement_row = @driver.find_element(:id => 'triumvirate').find_elements(:class => 'x-list-item')[index.to_i - 1]
  movement_row.text().should == movement_text
end

Then /^I save the triumvirate assistance work$/ do
  buttons = @driver.find_element(:id => 'triumvirate').find_elements(:class => 'x-button')
  buttons.select { |button| button.text() == "Save"}[0].click
  sleep @ANIMATION_DELAY
end

Then /^Assistance log entry (\d+) shows "(.*?)"$/ do |index, log_text|
  log_row = @driver.find_element(:id => 'log-assistance-list').find_elements(:class => 'x-list-item')[index.to_i - 1]
  log_row.text().gsub(/\n/, " ").should include log_text
end