Then /^"(.*?)" assistance work is selected$/ do |assistance_text|
  list_item = @driver.find_element(:id => 'assistance-chooser').find_element(:class => 'x-list-item', :text => assistance_text)
  list_item.attribute('class').should include 'x-item-selected'
end

Then /^There are no assistance log entries$/ do
  get_displayed_list_items().length.should == 0
end

Then /^I am on the assistance chooser$/ do
  @driver.find_element(:id => 'assistance-chooser').should be_displayed
end