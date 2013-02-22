When /^debugger$/ do
  require 'ruby-debug'
  debugger
end

Then /^There is a "(.*?)" list item$/ do |text|
  get_displayed_list_items().select { |li| li.text().include?(text) }.length.should == 1
end

Then /^There are (\d+) list items$/ do |item_count|
  get_displayed_list_items().length.should == item_count.to_i
end

Then /^I navigate to the "([^"]+)" tab/ do |tab_text|
  tab = @driver.find_elements(:class => 'x-tab').select { |tab| tab.displayed? && tab.text().include?(tab_text) }[0]
  tab.click
  sleep MainNavigation::DELAY
end

When /^I wait for the animation$/ do
  sleep MainNavigation::DELAY
end

When /^I set select "([^"]+)" to "([^"]+)"/ do |name, value|
  select_combobox @driver.find_elements(:name => name).select { |input| input.displayed? }[0], value
end

Then /^There is a "(.*?)" button$/ do |text|
  @driver.find_elements(:class => 'x-button').select { |button| button.displayed? && button.text() == text }.should_not be_empty
end

When /^I select "(.*?)" from the "(.*?)" selector$/ do |value, name|
  select_combobox @driver.find_elements(:name => name).select { |s| s.displayed? }[0], value
end

Then /^The "(.+?)" select is set to "(.+?)"$/ do |name, value|
  @driver.find_elements(:name => name).select { |s| s.displayed? }[0].attribute('value').should == value
end

Then /^The page title is "(.*?)"$/ do |title|
  @driver.find_elements(:class => 'x-title').select { |t| t.displayed? && t.text() == title }.should_not == []
end

When /^I change the "(.*?)" date to "(.*?)"$/ do |id, date|
  @driver.execute_script("Ext.getCmp('#{id}').setValue(Date.parse('#{date}'));Ext.getCmp('#{id}').fireEvent('change');")
  sleep 0.3
end

When /^I toggle "(.*?)"$/ do |label|
  label_element = @driver.find_elements(:class => 'x-form-label').select { |f| f.displayed? }[0]
  label_element.find_element(:xpath => './..').find_element(:class => 'x-toggle-inner').click
end

