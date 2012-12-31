Then /^The cycle is "(.*?)"$/ do |cycle|
  @driver.find_element(:class => 'cycle-change-button').text().should include cycle
end