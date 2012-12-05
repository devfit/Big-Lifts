Then /^I navigate to the settings page$/ do
  navigate_to(:more)
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
  select_combobox settings_form.find_element(:name => 'units'), 'kg'
end

Then /^The training percentage shows (\d+)$/ do |percentage|
  training_percentage_text = @driver.find_element(:id => 'training-max-percentage-indicator').text
  training_percentage_text.include?(percentage).should be_true
end

Then /^The calculated squat training max is (\d+)$/ do |trainingMax|
  training_value = @driver.find_element(:name => 'squat-training').attribute('value')
  training_value.should == trainingMax
end
