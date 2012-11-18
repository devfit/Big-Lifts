When /^I hit done on the lift completion screen$/ do
  sleep @ANIMATION_DELAY
  @driver.find_element(:id => 'lifts-complete-done-button').click()
  sleep @ANIMATION_DELAY
end

Then /^(\w+) max is set to ([\d\.]+)$/ do |lift, newmax|
  @main_navigation.navigate_to(:lift_editor)
  @driver.find_element(:name => lift).attribute('value').should == newmax
end

When /^I check off all lifts$/ do
  check_lifts_script = <<END
  biglifts.stores.lifts.LiftCompletion.each(function(r){
  if(!(r.data.liftPropertyName === 'bench' && r.data.week === 4 )){
    r.set('completed',true); r.save(); biglifts.stores.lifts.LiftCompletion.sync();
  }
  });
END
  @driver.execute_script(check_lifts_script)

  @driver.find_element(:id => 'lift-selector').find_elements(:class => 'x-tab')[3].click()
  sleep @ANIMATION_DELAY

  lift_index = 4
  lift_list_item = @driver.find_element(:id => 'lift-selector').find_elements(:class => 'x-list-item').select { |item| item.displayed? }[lift_index-1]
  lift_list_item.click()
  sleep @ANIMATION_DELAY

  #MARK LIFT COMPLETED
  @driver.find_element(:id => 'mark-lift-completed-button').click()
  sleep @ANIMATION_DELAY

  #LOG LIFT
  lift_tracking_panel = @driver.find_element(:id => 'lift-tracking')
  lift_tracking_panel.find_element(:id => 'log-lift-save-button').click()
  sleep @ANIMATION_DELAY

  #RETURN TO LIFT SCHEDULE
  @main_navigation.navigate_to(:lift_schedule)
end


