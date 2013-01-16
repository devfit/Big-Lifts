When /^debugger$/ do
  debugger
end

When /^I tap the "(.*?)" button$/ do |button_text|
  @driver.find_elements(:class => 'x-button').select { |button| button.displayed? && button.text() == button_text }[0].click
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

Then /^The page title is "([^"]+)"$/ do |title|
  @driver.find_elements(:class => 'x-toolbar').select { |toolbar| toolbar.displayed? }[0].text().should include title
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