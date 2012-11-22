When /^I open the 1-rep calculator$/ do
  @main_navigation.navigate_to :one_rep_calculator
end

When /^I set weight to (\d+) and reps to (\d+)$/ do |weight, reps|
  one_rep_max = @driver.find_element(:id => 'one-rep-max-calculator')

  weight_input = one_rep_max.find_element(:name => 'weight')
  weight_input.clear
  weight_input.send_keys weight

  reps_input = one_rep_max.find_element(:name => 'reps')
  reps_input.clear
  reps_input.send_keys reps
  reps_input.send_keys :enter
end

Then /^The calculated max should be ([\d\.]+)$/ do |estimate|
  actual_estimated_max = @driver.find_element(:name => 'calculatedMax').attribute('value')
  actual_estimated_max.should == estimate
end

Then /^I select use for (\w+)$/ do |lift|
  lift_selector = @driver.find_element(:name => 'use-for-lift-select')
  @sencha_helper.select_combobox lift_selector, lift

  @driver.find_element(:id => 'use-max-button').click
  sleep @ANIMATION_DELAY
end

Then /^I am taken to the maxes page$/ do
  @driver.find_element(:id => 'maxes-form').displayed?.should be_true
end

Then /^The max for (\w+) is set to ([\d\.]+)$/ do |lift, max|
  actual_value = @driver.find_elements(:name => lift.downcase, :tag_name => 'input').select {
      |input| input.displayed?
  }[0].attribute('value')
  actual_value.should == max
end



