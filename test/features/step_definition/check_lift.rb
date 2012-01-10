When /^I mark the current lift completed$/ do
    @driver.find_element(:id => 'mark-lift-completed-button').click()
end

Then /^The lift complete button is unchecked$/ do
  @driver.find_element(:id => 'mark-lift-completed-button').displayed?
end

When /^I return to the lift schedule$/ do
   @driver.find_element(:id => 'lift-schedule').find_element(:class => 'x-button-back').click()
end
