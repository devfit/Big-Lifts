When /^debugger$/ do
  debugger
end

When /^I tap the "(.*?)" button$/ do |button_text|
  @driver.find_elements(:class => 'x-button').select { |button| button.displayed? && button.text() == button_text }[0].click
  sleep @ANIMATION_DELAY
end

Then /^I navigate to the "([^"]+)" tab/ do |tab_text|
  tab = @driver.find_elements(:class => 'x-tab').select { |tab| tab.displayed? && tab.text().include?(tab_text) }[0]
  tab.click
  sleep @ANIMATION_DELAY
end