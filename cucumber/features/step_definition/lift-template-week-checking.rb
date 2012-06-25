Then /^The week (\d+) tab is checked$/ do |week|
   @driver.find_elements(:css => '.x-tab').select { |tab| tab.attribute('class').include? 'completed' }.size.should == 1
end
