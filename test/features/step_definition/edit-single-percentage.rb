When /^I select edit manual percentages$/ do
  @driver.find_element(:id => 'manual-percentages-button').click()
  sleep @ANIMATION_DELAY
end

When /^I select week (\d+) for the manual percentages editor$/ do |week|
  editLiftPercentages = @driver.find_element(:id => 'edit-lift-percentages')
  weekTab = editLiftPercentages.find_elements(:class => 'x-tab').select { |tab|
    tab.text.include?( week )
  }[0]
  weekTab.click()
  sleep @ANIMATION_DELAY
end

When /^I select set (\d+) on the manual percentages editor$/ do |set|
  listOfSets = @driver.find_element(:id => 'edit-lift-percentages').find_elements(:class => 'x-list-item').select{ |item| item.displayed? }
  listOfSets[set.to_i-1].click()
  sleep @ANIMATION_DELAY
end

When /^I set the manual percentage to (\d+)$/ do |percentage|
  percentageInput = @driver.find_element(:name => 'percentage-edit-input')
  percentageInput.clear
  percentageInput.send_keys percentage
end

When /^I save the manual progression$/ do
  @driver.find_element(:id => 'edit-percentage-save-button').click()
  sleep @ANIMATION_DELAY
end

When /^I navigate back to the lift settings from the manual percentages editor$/ do
  @driver.find_element(:id => 'edit-lift-percentages').find_element(:class => 'x-button-back').click()
  sleep @ANIMATION_DELAY
end

Then /^The set (\d+) lift percentage shows (\d+)%$/ do |set, percentage|
  setListItem = @driver.find_element(:id => 'lift-template').find_elements(:class => 'x-list-item')[set.to_i-1]
  setListItem.text.include?( "#{percentage}%" ).should == true
end

When /^I set the manual reps to (\d+)$/ do |reps|
   repsInput = @driver.find_element(:name => 'reps-edit-input')
   repsInput.clear
   repsInput.send_keys reps
end

Then /^The set (\d+) reps shows (\d+)$/ do |set, reps|
  setListItem = @driver.find_element(:id => 'lift-template').find_elements(:class => 'x-list-item')[set.to_i-1]
  setListItem.text.include?( "#{reps}x" ).should == true
end

