Then /^I navigate to the settings page$/ do
  @main_navigation.navigate_to(:more)
  moreInfoList = @driver.find_element(:id => 'more-info-list').find_elements(:class => 'x-list-item')
  settingsMenuItem = moreInfoList.select{|item| item.text == 'Settings' }[0]
  settingsMenuItem.click()
  sleep @ANIMATION_DELAY
end

Then /^I untoggle use training max$/ do
  @driver.find_element(:name => 'use-training-max').click()
  sleep @ANIMATION_DELAY
end

When /^I set the training percentage to (\d+)$/ do |percentage|
  trainingMaxPercentageInput = @driver.find_element(:name => 'training-max-percentage')
  trainingMaxPercentageInput.clear()
  trainingMaxPercentageInput.send_keys(percentage)
  sleep @ANIMATION_DELAY
end

Then /^The training percentage shows (\d+)$/ do |percentage|
  trainingPercentageText = @driver.find_element(:id => 'training-max-percentage-indicator').text
  trainingPercentageText.indlude?(percentage).should == true
end
