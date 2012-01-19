Then /^Training maxes are visible$/ do
  trainingMaxesVisible = @driver.find_element(:id => 'training-maxes').displayed?
  trainingMaxesVisible.should == true
end

Then /^Training maxes are not visible$/ do
  trainingMaxesVisible = @driver.find_element(:id => 'training-maxes').displayed?
    trainingMaxesVisible.should == false
end

Then /^The training max for clean is shown$/ do
  trainingMaxShown = @driver.find_element(:id => 'maxes-clean-training').displayed?
  trainingMaxShown.should == true
end


