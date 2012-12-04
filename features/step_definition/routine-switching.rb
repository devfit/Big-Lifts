Then /^I am on the routine chooser$/ do
  @driver.find_element(:id => 'routine-chooser').should be_displayed
end

Then /^There is a "(.*?)" tab$/ do |tab_text|
  tabs = @driver.find_element(:id => 'tab-navigation').find_elements(:class => 'x-tab')
  tabs.select { |tab| tab.text().include? tab_text }.length.should == 1
end