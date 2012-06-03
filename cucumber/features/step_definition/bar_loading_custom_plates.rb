When /^I set the new plate weight to (\d+)$/ do |weight|
    @driver.find_element(:id => 'bar-setup-form').find_element(:name => 'newPlateWeight').send_keys weight
end

When /^I tap add new plate$/ do
  @driver.find_element(:id => 'add-new-custom-plate-button').click();
end

When /^I tap remove plate$/ do
  @driver.find_element(:id => 'remove-custom-plate-button').click();
end

Then /^There are (\d+) custom plate entries$/ do |numberOfEntries|
  actualEntries = @driver.execute_script("return Ext.getCmp('plates-setup-fieldset').query('.numberfield').length");
  actualEntries.should == numberOfEntries.to_i()
end
