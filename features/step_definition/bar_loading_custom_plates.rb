def get_plates_fieldset
  @driver.find_elements(:class => 'x-form-fieldset').select { |fieldset| fieldset.displayed? && fieldset.text().include?('Plates')}[0]
end

When /^I set the new plate weight to (\d+)$/ do |weight|
  @driver.find_element(:name => 'newPlateWeight').send_keys weight
end

Then /^There are (\d+) custom plate entries$/ do |expected_entries|
  get_plates_fieldset().find_elements(:class => 'x-field-number').length.should == expected_entries.to_i
end
