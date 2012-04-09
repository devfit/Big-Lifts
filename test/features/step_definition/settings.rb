Then /^I navigate to the settings page$/ do
  @main_navigation.navigate_to(:more)
  moreInfoList = @driver.find_element(:id => 'more-info-list').find_elements(:class => 'x-list-item')
  settingsMenuItem = moreInfoList.select { |item| item.text == 'Settings' }[0]
  settingsMenuItem.click()
  sleep @ANIMATION_DELAY
end

Then /^I toggle use training max$/ do
  @driver.execute_script("Ext.getCmp('use-training-max-toggle').toggle();Ext.getCmp('use-training-max-toggle').fireEvent('change');")
  sleep @ANIMATION_DELAY
end

When /^I set the training percentage to (\d+)$/ do |percentage|
  trainingMaxPercentageInput = @driver.find_element(:name => 'training-max-percentage')
  trainingMaxPercentageInput.clear()
  trainingMaxPercentageInput.send_keys(percentage)
  sleep @ANIMATION_DELAY
end

When /^I set units to kg$/ do
  settingsForm = @driver.find_element(:id => 'settings-form')
  unitsInput = settingsForm.find_element(:name => 'units')
  unitsInput.find_element(:xpath => '..').find_element(:class => 'x-field-mask').click()
  sleep @ANIMATION_DELAY

  floatingSelector = @driver.find_elements(:class => 'x-floating').select { |floatingItem|
    floatingItem.attribute('class').include? 'x-container'
  }[0]

  unitsSelect = floatingSelector.find_elements(:tag_name => 'div', :class => 'x-list-item-label').select { |item|
    item.text() == "kg"
  }[0]

  unitsSelect.click()
  sleep @ANIMATION_DELAY
  sleep @ANIMATION_DELAY
end

Then /^The training percentage shows (\d+)$/ do |percentage|
  trainingPercentageText = @driver.find_element(:id => 'training-max-percentage-indicator').text
  trainingPercentageText.include?(percentage).should == true
end

Then /^The calculated squat training max is (\d+)$/ do |trainingMax|
  trainingValue = @driver.find_element(:name => 'squat-training').attribute('value')
  trainingValue.should == trainingMax
end
