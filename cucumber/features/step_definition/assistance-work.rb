Then /^"(.*?)" assistance work is selected$/ do |assistance_text|
  list_item = @driver.find_element(:id => 'assistance-chooser').find_element(:class => 'x-list-item', :text => assistance_text)
  list_item.attribute('class').should include 'x-item-selected'
end

Then /^I tap "(.*?)" to change the log type$/ do |button_text|
  button = @driver.find_elements(:class => 'x-button', :text => button_text).select { |button| button.displayed? }[0]
  button.click
end

Then /^There are no assistance log entries$/ do
  @driver.find_element(:id => 'log-assistance-list').find_elements(:class => 'x-list-item').length.should == 0
end