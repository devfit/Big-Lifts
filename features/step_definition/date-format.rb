When /^I select Day\/Month\/Year for the date format$/ do
  settings_form = @driver.find_element(:id => 'settings-form')
  date_format_input = settings_form.find_element(:name => 'dateFormat')
  date_format_input.find_element(:xpath => '..').find_element(:class => 'x-field-mask').click()


  floating_selector = @driver.find_elements(:class => 'x-floating').select { |floatingItem|
    floatingItem.attribute('class').include? 'x-container'
  }[0]

  date_format_select = floating_selector.find_elements(:tag_name => 'div', :class => 'x-list-item-label').select { |item|
    item.text() == "Day/Month/Year"
  }[0]

  date_format_select.click()


end

Then /^The log date is today formatted as dd\/MM\/yyyy$/ do
  date_text = @driver.find_element(:id => 'edit-log-entry').find_element(:name => 'timestamp').attribute('value')
  date_text.should == Time.now.strftime("%d/%m/%Y")
end

Then /^The date for the log entry for (\w+) is dd\/MM\/yyyy$/ do |liftName|
  log_list_items = get_displayed_list_items()
  list_item = log_list_items.select { |listItem| listItem.text.include?(liftName) }[0]
  date_text = list_item.find_element(:class => 'date').text
  date_text.should == Time.now.strftime("%d/%m/%Y")
end
