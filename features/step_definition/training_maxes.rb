def get_training_maxes
  @driver.find_elements(:class => 'x-docking-vertical').select { |d| d.displayed? && d.text().include?("90%") }[0]
end

Then /^Training maxes are visible$/ do
  get_training_maxes().should_not == nil
end

Then /^Training maxes are not visible$/ do
  get_training_maxes().should == nil
end

Then /^The training max for clean is shown$/ do
  @driver.find_element(:id => 'maxes-clean-training').displayed?().should be_true
end