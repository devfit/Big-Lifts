When /^I mark the current lift completed$/ do
    @driver.find_element(:id => 'mark-lift-completed-button').click()
    sleep @ANIMATION_DELAY
end

When /^I return to the lift schedule$/ do
   @driver.find_element(:id => 'lift-template').find_element(:class => 'x-button-back').click()
   sleep @ANIMATION_DELAY
end

When /^I save the lift log$/ do
   liftTrackingPanel = @driver.find_element(:id => 'lift-tracking')
   liftTrackingPanel.find_element(:id => 'log-lift-save-button').click()
   sleep @ANIMATION_DELAY
end

Then /^the (\w+) lift is checked$/ do |lift|
   liftListItem = @driver.find_element(:id => 'lift-selector').find_elements(:class => 'x-list-item').select {|item|
        item.displayed? && item.text.include?( lift )
   }[0]

   liftListItem.attribute('class').include?( 'done' ).should == true
end
