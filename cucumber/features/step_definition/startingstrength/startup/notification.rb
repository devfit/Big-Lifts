Then /^I see a notification for starting strength$/ do
  debugger
  @driver.find_element(:tag_name => 'body').text().should include 'Starting Strength is now available!'
end