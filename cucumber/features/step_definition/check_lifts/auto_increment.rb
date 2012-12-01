When /^I hit done on the lift completion screen$/ do
  sleep @ANIMATION_DELAY
  @driver.find_element(:id => 'lifts-complete-done-button').click()
  sleep @ANIMATION_DELAY
end

Then /^(\w+) max is set to ([\d\.]+)$/ do |lift, newmax|
  @main_navigation.navigate_to(:lift_editor)
  @driver.find_element(:name => lift).attribute('value').should == newmax
end

When /^I check off all lifts but bench week 4$/ do
  check_lifts_script = <<END
  biglifts.stores.lifts.LiftCompletion.each(function(r){
  if(!(r.data.liftPropertyName === 'bench' && r.data.week === 4 )){
    r.set('completed',true); r.save(); biglifts.stores.lifts.LiftCompletion.sync();
  }
  });
END
  @driver.execute_script(check_lifts_script)
end


