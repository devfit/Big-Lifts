Then /^There are (\d+) lifts in the edit lifts list$/ do |count|
  get_displayed_list_items().length.should == count.to_i
end

When /^I edit the max to be ([\d\.]+)$/ do |max|
  max_input = @driver.find_element(:id => 'edit-lift-form').find_element(:name => 'max')
  max_input.clear()
  max_input.send_keys(max)
end

When /^I edit the cycle increase to be ([\d\.]+)$/ do |increase|
  cycle_increase = @driver.find_element(:id => 'edit-lift-form').find_element(:name => 'cycleIncrease')
  cycle_increase.clear
  cycle_increase.send_keys(increase)
end

Then /^I see no error dialog$/ do
  @driver.find_elements(:class => 'x-msgbox').length.should == 0
end

Then /^The sort ordering is sensible$/ do
  lifts_broken = @driver.execute_script("return biglifts.stores.lifts.Lifts.liftOrdersAreBroken()")
  lifts_broken.should be_false
end

Then /^I am on the track tab$/ do
  tab = @driver.find_elements(:css => '.x-button-icon.bookmarks').select { |tab| tab.displayed? }[0]
  tab.find_element(:xpath => './..').attribute('class').should include 'x-tab-active'
end