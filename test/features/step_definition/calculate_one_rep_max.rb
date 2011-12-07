When /^I open the 1-rep calculator$/ do
  @main_navigation.navigate_to :one_rep_calculator
  @wait.until { @driver.find_element(:name => 'weight').displayed? }
end

When /^I set weight to (\d+) and reps to (\d+)$/ do |weight, reps|
  weight_input = @driver.find_element(:name => 'weight')
  weight_input.clear
  weight_input.send_keys weight

  reps_input = @driver.find_element(:name => 'reps')
  reps_input.clear
  reps_input.send_keys reps
  reps_input.send_keys :enter
end

Then /^The calculated max should be (\d+)$/ do |estimate|
  actualEstimatedMax = @driver.find_element(:name => 'calculatedMax').attribute('value')
  actualEstimatedMax.should == estimate
end
