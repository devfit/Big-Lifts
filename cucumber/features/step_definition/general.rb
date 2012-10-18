When /^debugger$/ do
  debugger
end

When /^I tap the "(.*?)" button$/ do |button_text|
  @driver.find_elements(:class => 'x-button').select { |button| button.displayed? && button.text() == button_text }[0].click
  sleep @ANIMATION_DELAY
end