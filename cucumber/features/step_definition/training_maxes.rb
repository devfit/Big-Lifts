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

Then /^I navigate to the more tab/ do
  @main_navigation.navigate_to(:more)
end

When /^I tap the settings list item$/ do
  moreInfoList = @driver.find_element(:id => 'more-info-list').find_elements(:class => 'x-list-item')
  settingsMenuItem = moreInfoList.select { |item| item.text == 'Settings' }[0]
  settingsMenuItem.click()
  sleep @ANIMATION_DELAY
end



