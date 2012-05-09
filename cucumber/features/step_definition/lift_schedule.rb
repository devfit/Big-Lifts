When /^I set the (\w+) max to (\d+)$/ do |liftProperty, max|
  @main_navigation.navigate_to(:lift_editor)

  liftInput = @driver.find_element(:id => 'maxes-form-items').find_element(:name => liftProperty)
  liftInput.clear
  liftInput.send_keys max
end

When /^I view the (\w+) lift schedule for week (\d+)$/ do |liftProperty, week|
  @main_navigation.navigate_to(:lift_schedule)
  @lift_schedule_navigator.selectWeek(week)

  liftSelector = @driver.find_element(:id => 'lift-selector')
  liftSelector.find_elements(:class => 'x-list-item').select { |i| i.text.downcase == liftProperty }[0].click
  sleep @ANIMATION_DELAY
end

Then /^The lift schedule shows "([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"$/ do |*liftSets|
  liftTemplate = @driver.find_element(:id => 'lift-template')
  actual_lift_sets = liftTemplate.find_elements(:class => 'reps-weight').
      select {|i| i.displayed? }.collect { |i| i.text.gsub(/\n+/, " ") }
  actual_lift_sets.should == liftSets
end