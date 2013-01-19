Then /^The best estimated one rep max is ([\d\.]+)$/ do |estimatedOneRep|
  @driver.find_element(:id => 'last-one-rep-estimate').text.should == estimatedOneRep
end

Then /^The reps to beat is (\d+)$/ do |reps|
  @driver.find_element(:id => 'reps-needed-to-beat-last-estimate').text.should == reps
end