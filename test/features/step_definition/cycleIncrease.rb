Then /^the cycle is ([\w\s]*)increased$/ do |notModifier|
    cycle = @driver.execute_script('return wendler.stores.CurrentCycle.first().data.cycle')
    expectedNewCycle = notModifier == "" ? 2 : 1
    cycle.should == expectedNewCycle
end

Then /^I click the increase cycle button$/ do
  @driver.find_element(:id => 'cycle-change-button').click()
  sleep @ANIMATION_DELAY
end