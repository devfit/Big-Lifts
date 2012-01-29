When /^I open the 1-rep calculator$/ do
  @main_navigation.navigate_to :one_rep_calculator
  @wait.until { @driver.find_element(:name => 'weight').displayed? }
  sleep 0.25
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

Then /^The calculated max should be ([\d\.]+)$/ do |estimate|
  actualEstimatedMax = @driver.find_element(:name => 'calculatedMax').attribute('value')
  actualEstimatedMax.should == estimate
end

Then /^I select use for (\w+)$/ do |lift|
  liftSelector = @driver.find_element(:name => 'use-for-lift-select')
  liftSelectorParent = liftSelector.find_element(:xpath => './..')
  liftSelectorParent.find_element(:class => 'x-field-mask').click
  sleep 0.25

  floatingSelector = @driver.find_element(:class => 'x-floating')
  sleep @ANIMATION_DELAY

  liftSpan = floatingSelector.find_elements(:tag_name => 'span', :class => 'x-list-label').select { |label|
    label.text == lift
  }[0]
  liftHolder = liftSpan.find_element(:xpath => './../..')
  liftHolder.click
  sleep @ANIMATION_DELAY
  if( liftHolder.displayed? )
    liftHolder.click
  end
  sleep @ANIMATION_DELAY

  @driver.find_element(:id => 'use-max-button').click
  sleep @ANIMATION_DELAY
end

Then /^I am taken to the maxes page$/ do
  @driver.find_element(:id => 'maxes-form').displayed?.should == true
end

Then /^The max for (\w+) is set to ([\d\.]+)$/ do |lift, max|
  actualValue = @driver.find_element(:name => lift.downcase, :tag_name => 'input').attribute('value')
  actualValue.should == max
end



