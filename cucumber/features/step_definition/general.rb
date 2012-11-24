When /^debugger$/ do
  debugger
end

When /^I tap the "(.*?)" button$/ do |button_text|
  @driver.find_elements(:class => 'x-button').select { |button| button.displayed? && button.text() == button_text }[0].click
  sleep @ANIMATION_DELAY
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
  sleep @ANIMATION_DELAY
end

Then /^There is a "(.*?)" form label$/ do |name|
  labels = @driver.find_elements(:class => 'x-form-label').select { |label| label.displayed? && label.text().include?(name) }
  labels.length.should == 1
end