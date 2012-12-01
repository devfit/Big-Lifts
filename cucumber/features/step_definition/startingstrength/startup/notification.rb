Then /^I see a notification for starting strength$/ do
  @driver.find_element(:tag_name => 'body').text().should include 'Starting Strength is now available!'
end