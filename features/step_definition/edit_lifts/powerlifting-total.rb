Then /^The powerlifting total is "(.*?)"$/ do |total|
  @driver.find_element(:class => 'powerlifting-total').text().should include total
end