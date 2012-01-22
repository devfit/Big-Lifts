When /^I mark the current lift completed$/ do
    @driver.find_element(:id => 'mark-lift-completed-button').click()
    sleep @ANIMATION_DELAY
end

Then /^The lift complete button is unchecked$/ do
  @driver.find_element(:id => 'mark-lift-completed-button').displayed?
end

When /^I return to the lift schedule$/ do
   @driver.find_element(:id => 'lift-template').find_element(:class => 'x-button-back').click()
   sleep @ANIMATION_DELAY
end

When /^I return from the lift log$/ do
   liftTrackingPanel = @driver.find_element(:id => 'lift-tracking')
   liftTrackingPanel.find_element(:id => 'log-lift-save-button').click()
   sleep @ANIMATION_DELAY
end
