When /^I tap the gear button$/ do
  @driver.find_elements(:css => ".x-button-icon.settings").find { |b| b.displayed? }.click
end

Then /^The starting strength config page includes "(.*?)"$/ do |text|
  @driver.find_element(:id => 'ss-config').text().should include text
end