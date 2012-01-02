When /^I view the lift schedule$/ do
    @main_navigation.navigate_to(:lift_schedule)
end

When /^I open the lift settings configuration$/ do
   @driver.find_element( :id => 'lift-schedule-settings-button' ).click()
   sleep @ANIMATION_DELAY
end

When /^I select wendler progression option (\d+)$/ do |option|
   @driver.find_element( :id => "progression-option-#{option}" ).click();
   sleep @ANIMATION_DELAY
end

When /^I confirm the wendler progression change$/ do
    msgBox = @driver.find_element(:class => 'x-msgbox')
    okButton = msgBox.find_element(:class => 'x-button')

    okButton.click()
    sleep @ANIMATION_DELAY
end

When /^I navigate back to the lift selector from lift settings$/ do
   @driver.find_element( :id => 'lift-settings-back-button' ).click();
   sleep @ANIMATION_DELAY
end