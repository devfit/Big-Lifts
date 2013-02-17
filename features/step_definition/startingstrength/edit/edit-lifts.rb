Then /^The Starting Strength "(.*?)" lift is "(.*?)"$/ do |name, expected_weight|
  actual_weight = @driver.execute_script("return biglifts.stores.ss.Lifts.findRecord('name','#{name}').get('weight')")
  actual_weight.should == expected_weight.to_i
end
