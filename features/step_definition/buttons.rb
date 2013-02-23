def click_button button_cls
  @driver.find_elements(:css => ".x-button .#{button_cls}").select { |button| button.displayed? }[0].click
end

When /^I tap the user icon$/ do
  click_button 'user'
end

When /^I tap the checkmark$/ do
  click_button 'done'
end

When /^I tap the "(.*?)" button$/ do |button_text|
  @driver.find_elements(:class => 'x-button').find { |button| button.displayed? && button.text() == button_text }.click
end

Then /^I tap the delete button$/ do
  click_button 'trash'
end

Then /^I tap the graph button$/ do
  click_button "chart"
end