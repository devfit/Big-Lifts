When /^I edit the "(.*?)" input to be "(.*?)"$/ do |name, weight|
  label = @driver.find_elements(:class => 'x-form-label').select { |label| label.text().include? name }[0]
  input = label.find_element(:xpath => '..').find_element(:tag_name => 'input')
  input.clear
  input.send_keys weight
end

Then /^The Starting Strength "(.*?)" lift is "(.*?)"$/ do |name, expected_weight|
  actual_weight = @driver.execute_script("return biglifts.stores.ss.Lifts.findRecord('name','#{name}').get('weight')")
  actual_weight.should == expected_weight.to_i
end
