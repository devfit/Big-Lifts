Then /^the cycle is increased$/ do
    cycle = @driver.execute_script('return wendler.stores.CurrentCycle.first().data.cycle')
    cycle.should == 2
end
