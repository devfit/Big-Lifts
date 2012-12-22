Then /^The powerlifting total is "(.*?)"$/ do |total|
  @driver.find_element(:class => 'powerlifting-total').text().should include total
end

Then /^The powerlifting total is hidden$/ do
  @driver.find_element(:class => 'powerlifting-total').should_not be_displayed
end

