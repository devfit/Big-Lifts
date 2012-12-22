def set_counter
  @driver.find_elements(:class => 'set-counter').select { |s| s.displayed? }[0]
end

def set_counter_clear
  @driver.find_elements(:class => 'set-counter-clear').select { |s| s.displayed? }[0]
end

When /^I tap the set counter$/ do
  set_counter().click
end

Then /^The set counter shows "(.*?)"$/ do |text|
  set_counter().text().should == text
end

Then /^I tap the set counter clear$/ do
  set_counter_clear().click
end

