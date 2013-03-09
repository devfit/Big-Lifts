def find_input_by_label label
  label = @driver.find_elements(:class => 'x-form-label').select { |l| l.displayed? && l.text() == label }[0]
  label.find_element(:xpath => '..').find_element(:tag_name => 'input')
end

When /^I set the "(.*?)" input to "(.*?)"$/ do |name, weight|
  input = find_input_by_label name
  input.clear
  input.send_keys weight
  @driver.find_element(:id => 'ext-viewport').click
end

Then /^The "(.*?)" input is "(.*?)"$/ do |input_name, value|
  input = find_input_by_label input_name
  input.attribute('value').should == value
end

Then /^The "(.*?)" input is disabled$/ do |label|
  input = find_input_by_label label
  input.attribute('disabled').should == "true"
end

Then /^The "(.*?)" input is enabled/ do |label|
  input = find_input_by_label label
  input.attribute('disabled').should == nil
end

Then /^There is a "(.*?)" form label$/ do |name|
  labels = @driver.find_elements(:class => 'x-form-label').select { |label| label.displayed? && label.text().include?(name) }
  labels.length.should == 1
end

Then /^There is not a "(.*?)" form label$/ do |name|
  label = @driver.find_elements(:class => 'x-form-label').find { |label| label.displayed? && label.text().include?(name) }
  label.should == nil
end