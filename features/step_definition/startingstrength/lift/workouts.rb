When /^I tap the "(.*?)" tab$/ do |tab_text|
  @driver.find_elements(:class => 'x-tab').select { |tab| tab.displayed? && tab.text().include?(tab_text) }[0].click
  sleep MainNavigation::DELAY
end

Then /^I am on the starting strength workout$/ do
  @driver.find_element(:class => 'ss-workout').should be_displayed
end
