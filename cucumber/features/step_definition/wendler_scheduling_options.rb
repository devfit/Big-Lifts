When /^I view the lift schedule$/ do
  @main_navigation.navigate_to(:lift_schedule)
end

When /^I open the lift settings configuration$/ do
  @driver.find_element(:id => 'lift-schedule-settings-button').click()
  sleep @ANIMATION_DELAY
end

When /^I select the "(.*?)" lift template$/ do |assistance_template|
  until displayed_lift_settings_page().find_element(:class => 'x-title').text() == assistance_template do
    displayed_lift_settings_page().find_elements(:class => 'x-button').select { |button| button.text() == "Next" }[0].click
    sleep @ANIMATION_DELAY
  end

  displayed_lift_settings_page().find_elements(:class => 'x-button').select { |button| button.text() == "Use" }[0].click
  sleep @ANIMATION_DELAY
end

When /^I confirm the wendler progression change$/ do
  msg_box = @driver.find_element(:class => 'x-msgbox')
  ok_button = msg_box.find_element(:class => 'x-button')

  ok_button.click()
  sleep @ANIMATION_DELAY
end

When /^I navigate back to the lift selector from lift settings$/ do
  until displayed_lift_settings_page().find_element(:class => 'x-title').text() == "Fresher" do
    displayed_lift_settings_page().find_elements(:class => 'x-button').select { |button| button.text() == "Back" }[0].click
    sleep @ANIMATION_DELAY
  end

  displayed_lift_settings_page().find_elements(:class => 'x-button').select { |button| button.text() == "Back" }[0].click
  sleep @ANIMATION_DELAY
end