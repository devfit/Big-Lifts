Then /^The powerlifting total is "(.*?)"$/ do |total|
  @driver.find_element(:class => 'powerlifting-total').text().should include total
end

Then /^The powerlifting total is hidden$/ do
  @driver.find_element(:class => 'powerlifting-total').should_not be_displayed
end

When /^I tap the powerlifting config gear$/ do
  powerlifting_total = @driver.find_element(:class => 'powerlifting-total')
  parent_container = powerlifting_total.find_element(:xpath => './..')
  parent_container.find_element(:class => 'config-gear').click
end

def get_checkbox_field text
  @driver.find_elements(:class => 'x-field-checkbox').select { |c| c.displayed? && c.text().include?(text) }[0]
end

When /^I tap the "(.*?)" checkbox/ do |text|
  get_checkbox_field(text).find_element(:class => 'x-field-mask').click
end


Then /^The "(.*?)" checkbox is unchecked$/ do |text|
  get_checkbox_field(text).find_element(:class => 'x-input-checkbox').attribute('checked').should be_false
end

Then /^The "(.*?)" checkbox is checked$/ do |text|
  get_checkbox_field(text).find_element(:class => 'x-input-checkbox').attribute('checked').should be_true
end
