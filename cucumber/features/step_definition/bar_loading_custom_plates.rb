When /^I set the new plate weight to (\d+)$/ do |weight|
  @driver.find_element(:id => 'bar-setup-form').find_element(:name => 'newPlateWeight').send_keys weight
end

Then /^There are (\d+) custom plate entries$/ do |expected_entries|
  plate_fieldset = @driver.find_elements(:class => 'x-form-fieldset').select { |fieldset| fieldset.displayed? && fieldset.text().include?('Plates')}[0]
  plate_fieldset.find_elements(:class => 'x-field-number').length.should == expected_entries.to_i
end
