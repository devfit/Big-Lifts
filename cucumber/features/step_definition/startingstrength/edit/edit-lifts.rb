def find_input_by_label label
  label = @driver.find_elements(:class => 'x-form-label').select { |l| l.displayed? && l.text().include?(label) }[0]
  label.find_element(:xpath => '..').find_element(:tag_name => 'input')
end

When /^I set the "(.*?)" input to "(.*?)"$/ do |name, weight|
  input = find_input_by_label name
  input.clear
  input.send_keys weight
end

Then /^The "(.*?)" input is "(.*?)"$/ do |input_name, value|
  input = find_input_by_label input_name
  input.attribute('value').should == value
end


Then /^The Starting Strength "(.*?)" lift is "(.*?)"$/ do |name, expected_weight|
  actual_weight = @driver.execute_script("return biglifts.stores.ss.Lifts.findRecord('name','#{name}').get('weight')")
  actual_weight.should == expected_weight.to_i
end
