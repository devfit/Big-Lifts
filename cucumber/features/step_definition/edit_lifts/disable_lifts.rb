When /^I disable "(.*?)"$/ do |lift_to_disable|
  row = @driver.find_elements(:class => 'lift-list-row').select { |row| row.displayed? && row.text().include?(lift_to_disable) }[0]
  row.find_element(:class => 'x-input-checkbox').find_element(:xpath => './..').click
end

When /^I tap the "(.*?)" button$/ do |button_text|
  @driver.find_elements(:class => 'x-button').select { |button| button.displayed? && button.text() == button_text }
  sleep @ANIMATION_DELAY
end