When /^I select Day\/Month\/Year for the date format$/ do
  settingsForm = @driver.find_element(:id => 'settings-form')
  dateFormatInput = settingsForm.find_element(:name => 'dateFormat')
  dateFormatInput.find_element(:xpath => '..').find_element(:class => 'x-field-mask').click()
  sleep @ANIMATION_DELAY

  floatingSelector = @driver.find_elements(:class => 'x-floating').select { |floatingItem|
    floatingItem.attribute('class').include? 'x-container'
  }[0]

  dateFormatSelect = floatingSelector.find_elements(:tag_name => 'div', :class => 'x-list-item-label').select { |item|
    item.text() == "Day/Month/Year"
  }[0]

  dateFormatSelect.click()
  sleep @ANIMATION_DELAY
  sleep @ANIMATION_DELAY
end

Then /^The log date is today formatted as dd\/MM\/yyyy$/ do
    dateText = @driver.find_element(:id => 'edit-log-entry').find_element(:name => 'timestamp').attribute('value')
    dateText.should == Time.now.strftime("%d/%m/%Y")
end

Then /^The date for the log entry for (\w+) is dd\/MM\/yyyy$/ do |liftName|
    logListItems = @driver.find_element(:id => 'lift-log-list').find_elements(:class => 'x-list-item')
    listItem = logListItems.select { |listItem| listItem.text.include?(liftName) }[0]
    dateText = listItem.find_element(:class => 'date').text
    debugger
    dateText.should == Time.now.strftime("%d/%m/%Y")
end
