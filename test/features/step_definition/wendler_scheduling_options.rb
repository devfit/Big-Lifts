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
    yesButton = msgBox.find_elements(:class => 'x-button').select { |button| button.text == "Yes" }[0]

    yesButton.click()
    sleep @ANIMATION_DELAY
end

When /^I navigate back to the lift selector from lift settings$/ do
   @driver.find_element( :id => 'lift-settings-back-button' ).click();
   sleep @ANIMATION_DELAY
end