def maxes_form_item_of_name(name)
  @driver.find_element(:id => 'maxes-form-items').find_element(:name => name)
end

When /^I set the (\w+) max to (\d+)$/ do |liftProperty, max|
  @main_navigation.navigate_to(:lift_editor)
  maxes_form_item_of_name(liftProperty).clear
  maxes_form_item_of_name(liftProperty).clear
  maxes_form_item_of_name(liftProperty).send_keys max
end

When /^I select week (\d+)$/ do |week|
  @lift_schedule_navigator.selectWeek(week)
end

When /^I view the (\w+) lift schedule for week (\d+)$/ do |liftProperty, week|
  @main_navigation.navigate_to(:lift_schedule)
  @lift_schedule_navigator.selectWeek(week)

  get_displayed_list_items().select { |i| i.text.downcase == liftProperty }[0].click
  sleep @ANIMATION_DELAY
end

Then /^I back out of viewing the lift$/ do
  @driver.find_element(:id => 'lift-template').find_elements(:class => 'x-button').select { |button|
    button.text() == "Back"
  }[0].click
  sleep @ANIMATION_DELAY
end

Then /^The lift schedule shows "([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"$/ do |*liftSets|
  get_actual_lift_sets().should == liftSets
end

Then /^The lift schedule shows "([^"]+)"$/ do |expected_sets|
  get_actual_lift_sets().should == expected_sets.split(',')
end

Then /^The lift selector shows "([^"]+)"$/ do |expected_lifts|
  lift_rows = @driver.find_element(:id => "lift-selector").find_elements(:class => 'x-list-item').select { |list_item| list_item.displayed? }
  lift_text = lift_rows.collect { |row| row.text() }
  lift_text.should == expected_lifts.split(',')
end

def get_actual_lift_sets()
  get_displayed_list_items().collect { |i| i.text.gsub(/\n+/, " ") }
end
