def get_displayed_plates
  @driver.find_element(:id => 'plates-setup-fieldset').find_elements(:class => 'x-form-label').collect { |label| label.text }
end

Then /^The plates list shows "([^"]*?)"$/ do |plates|
  expected_plates = plates.split ','
  actual_plates = get_displayed_plates()
  actual_plates.should == expected_plates
end