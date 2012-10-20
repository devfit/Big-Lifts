When /^I select the "(.*?)" routine$/ do |routine|
  @driver.find_elements(:class => 'routine-entry').select { |row| row.text() == routine }[0].click
  sleep @ANIMATION_DELAY
end

Then /^"(.*?)" is in the more info list$/ do |text|
  @driver.find_element(:id => 'more-info-list').text().should include text
end