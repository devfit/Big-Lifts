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
