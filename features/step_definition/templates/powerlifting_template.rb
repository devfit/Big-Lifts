def get_meet_goals_fieldset
  @driver.find_elements(:class => 'x-form-fieldset-title').select { |m| m.displayed? && m.text().include?('Meet Goals') }[0]
end

When /^I set the (\w+) meet goal to (\d+)$/ do |lift, weight|
  form = get_meet_goals_fieldset().find_element(:xpath => '../..')
  lift_input = form.find_element(:name => lift)
  lift_input.clear
  lift_input.send_keys weight
end

Then /^Meet goals are not visible$/ do
  get_meet_goals_fieldset().should == nil
end