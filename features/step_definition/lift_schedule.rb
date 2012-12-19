def maxes_form_item_of_name(name)
  @driver.find_elements(:name => name).select { |item| item.displayed? }[0]
end

When /^I set the (\w+) max to (\d+)$/ do |liftProperty, max|
  navigate_to(:lift_editor)
  maxes_form_item_of_name(liftProperty).clear
  maxes_form_item_of_name(liftProperty).clear
  maxes_form_item_of_name(liftProperty).send_keys max
end

When /^I select week (\d+)$/ do |week|
  select_week(week)
end

When /^I view the (\w+) lift schedule for week (\d+)$/ do |liftProperty, week|
  navigate_to(:lift_schedule)
  select_week(week)

  get_displayed_list_items().select { |i| i.text.downcase == liftProperty }[0].click

end

Then /^I back out of viewing the lift$/ do
  @driver.find_element(:id => 'lift-template').find_elements(:class => 'x-button').select { |button|
    button.text() == "Back"
  }[0].click

end

Then /^The lift schedule shows "([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"$/ do |*liftSets|
  get_actual_lift_sets().should == liftSets
end

Then /^The lift schedule shows "([^"]+)"$/ do |expected_sets|
  get_actual_lift_sets().should == expected_sets.split(',')
end

Then /^The lift selector shows "([^"]+)"$/ do |expected_lifts|
  get_displayed_list_items().collect { |row| row.text() }.should == expected_lifts.split(',')
end

def get_actual_lift_sets()
  get_displayed_list_items().collect { |i| i.text.gsub(/\n+/, " ") }
end
