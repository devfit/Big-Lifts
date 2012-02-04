Then /^the cycle is increased$/ do
    cycle = @driver.execute_script('return wendler.stores.CurrentCycle.first().data.cycle')
    cycle.should == 2
end

Then /^I click the increase cycle button$/ do
  @driver.find_element(:id => 'cycle-change-button').click()
  sleep @ANIMATION_DELAY
end