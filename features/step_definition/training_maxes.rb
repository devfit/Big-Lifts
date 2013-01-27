def get_training_maxes
  @driver.find_elements(:class => 'x-docking-vertical').select { |d| d.displayed? && d.text().include?("90%") }[0]
end

def get_training_max label
  lift_id = @driver.execute_script("return biglifts.stores.lifts.Lifts.findRecord('name','#{label}').get('id')")
  @driver.find_elements(:name => lift_id).find { |f| f.displayed? }
end

Then /^Training maxes are visible$/ do
  get_training_maxes().should_not == nil
end

Then /^Training maxes are not visible$/ do
  get_training_maxes().should == nil
end

Then /^The "(.*?)" training max is "(.*?)"$/ do |label, value|
  get_training_max(label).attribute('value').should == value
end

Then /^The training max for "(.*?)" is shown$/ do |label|
  get_training_max(label).should_not == nil
end
