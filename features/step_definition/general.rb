When /^debugger$/ do
  debugger
end

When /^I tap the "(.*?)" button$/ do |button_text|
  @driver.find_elements(:class => 'x-button').find { |button| button.displayed? && button.text() == button_text }.click
end

Then /^There is a "(.*?)" list item$/ do |text|
  get_displayed_list_items().select { |li| li.text().include?(text) }.length.should == 1
end

Then /^There are (\d+) list items$/ do |item_count|
  get_displayed_list_items().length.should == item_count.to_i
end

When /^I tap the checkmark$/ do
  @driver.find_elements(:css => '.x-button-icon.done').select { |button| button.displayed? }[0].click
end

Then /^I navigate to the "([^"]+)" tab/ do |tab_text|
  tab = @driver.find_elements(:class => 'x-tab').select { |tab| tab.displayed? && tab.text().include?(tab_text) }[0]
  tab.click
  sleep MainNavigation::DELAY
end

Then /^There is a "(.*?)" form label$/ do |name|
  labels = @driver.find_elements(:class => 'x-form-label').select { |label| label.displayed? && label.text().include?(name) }
  labels.length.should == 1
end

Then /^There is not a "(.*?)" form label$/ do |name|
  label = @driver.find_elements(:class => 'x-form-label').find { |label| label.displayed? && label.text().include?(name) }
  label.should == nil
end

When /^I wait for the animation$/ do
  sleep MainNavigation::DELAY
end

When /^I set select "([^"]+)" to "([^"]+)"/ do |name, value|
  select_combobox @driver.find_elements(:name => 'units').select { |input| input.displayed? }[0], value
end

Then /^I tap the delete button$/ do
  @driver.find_elements(:class => 'x-button-decline').select { |button| button.displayed? }[0].click
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