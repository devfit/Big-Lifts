Then /^There is a "(.*?)" navigation tab$/ do |tab|
  @driver.find_element(:id => 'tab-navigation').text().should include tab
end

Then /^I tap the "(.*?)" list item$/ do |text|
  @driver.find_elements(:class => 'x-list-item').select { |item| item.displayed? && item.text().include?(text) }[0].click
  sleep @ANIMATION_DELAY
end

Then /^I am on the one rep max screen$/ do
  @driver.find_element(:id => 'one-rep-max-calculator').should be_displayed
end

Then /^I am on the more tab$/ do
  @driver.find_element(:id => 'more-info-list-panel').should be_displayed
end