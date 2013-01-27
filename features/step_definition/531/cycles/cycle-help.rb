When /^I tap the question mark button$/ do
  @driver.find_elements(:class => 'help-image').find { |h| h.displayed? }.click
end
