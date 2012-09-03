When /^I set the (\w+) max to (\d+)$/ do |liftProperty, max|
  @main_navigation.navigate_to(:lift_editor)

  lift_input = @driver.find_element(:id => 'maxes-form-items').find_element(:name => liftProperty)
  lift_input.clear
  lift_input.send_keys max
end

When /^I select week (\d+)$/ do |week|
  @lift_schedule_navigator.selectWeek(week)
end

When /^I view the (\w+) lift schedule for week (\d+)$/ do |liftProperty, week|
  @main_navigation.navigate_to(:lift_schedule)
  @lift_schedule_navigator.selectWeek(week)

  lift_selector = @driver.find_element(:id => 'lift-selector')
  lift_selector.find_elements(:class => 'x-list-item').select { |i| i.text.downcase == liftProperty }[0].click
  sleep @ANIMATION_DELAY
end

Then /^I back out of viewing the lift$/ do
  @driver.find_element(:id => 'lift-template').find_elements(:class => 'x-button').select { |button|
    button.text() == "Back"
  }[0].click
  sleep @ANIMATION_DELAY
end

Then /^The lift schedule shows "([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"$/ do |*liftSets|
  lift_template = @driver.find_element(:id => 'lift-template')
  actual_lift_sets = lift_template.find_elements(:class => 'reps-weight').
      select { |i| i.displayed? }.collect { |i| i.text.gsub(/\n+/, " ") }
  actual_lift_sets.should == liftSets
end
