When /^I set the new plate weight to (\d+)$/ do |weight|
    @driver.find_element(:id => 'bar-setup-form').find_element(:name => 'newPlateWeight').send_keys weight
end

When /^I tap add new plate$/ do
  @driver.find_element(:id => 'add-new-custom-plate-button').click()
end

When /^I tap remove plate$/ do
  @driver.find_element(:id => 'remove-custom-plate-button').click()
end

Then /^There are (\d+) custom plate entries$/ do |numberOfEntries|
  actual_entries = @driver.execute_script("return Ext.getCmp('plates-setup-fieldset').query('.numberfield').length")
  actual_entries.should == numberOfEntries.to_i()
end
