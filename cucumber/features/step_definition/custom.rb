Then /^Custom movement (\d+) is "(.*?)"$/ do |index, movement_text|
  movement_row = @driver.find_element(:id => 'custom-assistance').find_elements(:class => 'x-list-item')[index.to_i - 1]
  movement_row.text().should == movement_text
end

Then /^Assistance log entry (\d+) shows "(.*?)"$/ do |index, log_text|
  log_row = @driver.find_element(:id => 'log-assistance-list').find_elements(:class => 'x-list-item')[index.to_i - 1]
  log_row.text().gsub(/\n/, " ").should include log_text
end

Then /^I tap custom row (\d+)$/ do |row|
  @driver.find_element(:id => 'custom-assistance').find_elements(:class => 'x-list-item')[row.to_i - 1].click
  sleep @ANIMATION_DELAY
end

Then /^I change the custom movement name to "(.*?)"$/ do |name|
  name_input = @driver.find_element(:id => 'custom-movement-editor').find_element(:name => 'name')
  name_input.clear
  name_input.send_keys name
end

Then /^I change the custom movement weight to (\d+)$/ do |weight|
  weight_input = @driver.find_element(:id => 'custom-movement-editor').find_element(:name => 'weight')
  weight_input.clear
  weight_input.send_keys weight
end

When /^I tap the trash button$/ do
  @driver.find_elements(:class => 'trash').select { |button| button.displayed? }[0].click
  sleep @ANIMATION_DELAY
end

Then /^There is (\d+) custom assistance row[s]*$/ do |row_count|
  @driver.find_elements(:class => 'assistance-table').select { |row| row.displayed? }.length.should == row_count.to_i
end