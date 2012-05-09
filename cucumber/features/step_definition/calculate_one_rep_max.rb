When /^I open the 1-rep calculator$/ do
  @main_navigation.navigate_to :one_rep_calculator
end

When /^I set weight to (\d+) and reps to (\d+)$/ do |weight, reps|
  oneRepMaxPage = @driver.find_element(:id => 'one-rep-max-calculator')

  weight_input = oneRepMaxPage.find_element(:name => 'weight')
  weight_input.clear
  weight_input.send_keys weight

  reps_input = oneRepMaxPage.find_element(:name => 'reps')
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
  liftSelectorParent = liftSelector.find_element(:xpath => '..')
  liftSelectorParent.find_element(:class => 'x-field-mask').click
  sleep @ANIMATION_DELAY

  floatingSelector = @driver.find_elements(:class => 'x-floating').select { |floatingItem|
    floatingItem.attribute('class').include? 'x-container'
  }[0]

  liftItems = floatingSelector.find_elements(:tag_name => 'div', :class => 'x-list-item-label')

  liftDiv = liftItems.select { |label|
    label.text == lift
  }[0]

  liftDiv.click
  sleep @ANIMATION_DELAY

  if( liftDiv.displayed? )
    liftDiv.click
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



