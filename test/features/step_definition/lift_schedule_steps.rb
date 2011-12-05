When /^I set the (\w+) max to (\d+)$/ do |liftProperty, max|
  @main_navigation.navigate_to(:lift_editor)

  liftInput = @driver.find_element(:id => 'maxes-form-items').find_element(:name => liftProperty)
  @wait.until { liftInput.displayed? }

  liftInput.clear
  liftInput.send_keys max
end

When /^I view the (\w+) lift schedule for week (\d+)$/ do |liftProperty, week|
  @main_navigation.navigate_to(:lift_schedule)

  liftSelector = @driver.find_element(:id => 'lift-selector')
  @wait.until { liftSelector.displayed? }

  liftSelector.find_elements(:class => 'x-list-item').select { |i| i.text.downcase == liftProperty }[0].click
  @liftTemplate = @driver.find_element(:id => 'lift-template')
  @wait.until { @liftTemplate.displayed? }

  @liftTemplate.find_elements(:class => 'x-button-label').select { |i| i.tag_name == 'span' && i.text == "Week #{week}"}[0].click
  sleep 1
end

Then /^The lift schedule shows "(.+)","(.+)","(.+)","(.+)","(.+)","(.+)"$/ do |*liftSets|
  actual_lift_sets = @liftTemplate.find_elements(:class => 'lift-row').
      select {|i| i.displayed? }.collect { |i| i.text }
  actual_lift_sets.should == liftSets
end
