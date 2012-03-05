Then /^There are (\d+) lifts in the edit lifts list$/ do |count|
  @driver.find_element(:id => 'maxes-edit-lifts-list').find_elements(:class => 'x-list-item').length.should == count.to_i
end
