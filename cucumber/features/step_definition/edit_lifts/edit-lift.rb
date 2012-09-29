Then /^There are (\d+) lifts in the edit lifts list$/ do |count|
  @driver.find_element(:id => 'maxes-edit-lifts-list').find_elements(:class => 'x-list-item').length.should == count.to_i
end

When /^I edit the max to be ([\d\.]+)$/ do |max|
  @driver.find_element(:name => 'edit-lift-new-max').clear()
  @driver.find_element(:name => 'edit-lift-new-max').send_keys(max)
end

Then /^I see no error dialog$/ do
  @driver.find_elements(:class => 'x-msgbox').length.should == 0
end

Then /^The sort ordering is sensible$/ do
  lifts_broken = @driver.execute_script("return wendler.stores.migrations.liftOrdersAreBroken()")
  lifts_broken.should be_false
end

Then /^I am on the track tab$/ do
  @driver.find_element(:id => 'log').displayed?.should be_true
end