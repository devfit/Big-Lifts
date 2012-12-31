def get_displayed_plates
  get_plates_fieldset().find_elements(:class => 'x-form-label').collect { |label| label.text }
end

Then /^The plates list shows "([^"]*?)"$/ do |plates|
  expected_plates = plates.split ','
  actual_plates = get_displayed_plates()
  actual_plates.should == expected_plates
end

Then /^The bar weight is ([\d\.]+)$/ do |bar_weight|
  @driver.find_elements(:name => 'weight').select { |w| w.displayed? }[0].attribute('value').should == bar_weight
end
