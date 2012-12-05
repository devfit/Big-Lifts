When /^I hit done on the lift completion screen$/ do

  @driver.find_element(:id => 'lifts-complete-done-button').click()

end

Then /^(\w+) max is set to ([\d\.]+)$/ do |lift, newmax|
  navigate_to(:lift_editor)
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


