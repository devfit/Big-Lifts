Then /^The powerlifting total is "(.*?)"$/ do |total|
  @driver.find_element(:class => 'powerlifting-total').text().should include total
end

Then /^The powerlifting total is hidden$/ do
  @driver.find_element(:class => 'powerlifting-total').should_not be_displayed
end

When /^I tap the powerlifting config gear$/ do
  powerlifting_total = @driver.find_element(:class => 'powerlifting-total')
  parent_container = powerlifting_total.find_element(:xpath => './..')
  parent_container.find_element(:class => 'config-gear').click
end

When /^I tap the "(.*?)" input$/ do |arg1|
  @driver.find_elements(:class => 'x-field-checkbox').select { |c| c.displayed? }[0].find_element(:class => 'x-field-mask').click
end

