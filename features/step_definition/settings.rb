Then /^I navigate to the settings page$/ do
  @main_navigation.navigate_to(:more)
  settings_menu_item = get_displayed_list_items().select { |item| item.text == 'Settings' }[0]
  settings_menu_item.click()

end

Then /^I toggle use training max$/ do
  @driver.execute_script("Ext.getCmp('use-training-max-toggle').toggle();Ext.getCmp('use-training-max-toggle').fireEvent('change');")

end

When /^I set the training percentage to (\d+)$/ do |percentage|
  training_max_percentage_input = @driver.find_element(:name => 'trainingMaxPercentage')
  training_max_percentage_input.clear()
  training_max_percentage_input.send_keys(percentage)

end

When /^I set units to kg$/ do
  settings_form = @driver.find_element(:id => 'settings-form')
  units_input = settings_form.find_element(:name => 'units')
  units_input.find_element(:xpath => '..').find_element(:class => 'x-field-mask').click()


  floating_selector = @driver.find_elements(:class => 'x-floating').select { |floatingItem|
    floatingItem.attribute('class').include? 'x-container'
  }[0]

  units_select = floating_selector.find_elements(:tag_name => 'div', :class => 'x-list-item-label').select { |item|
    item.text() == "kg"
  }[0]

  units_select.click()


end

Then /^The training percentage shows (\d+)$/ do |percentage|
  training_percentage_text = @driver.find_element(:id => 'training-max-percentage-indicator').text
  training_percentage_text.include?(percentage).should be_true
end

Then /^The calculated squat training max is (\d+)$/ do |trainingMax|
  training_value = @driver.find_element(:name => 'squat-training').attribute('value')
  training_value.should == trainingMax
end
