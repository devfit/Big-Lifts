Then /^Training maxes are visible$/ do
  @driver.find_element(:id => 'training-maxes').displayed?().should be_true
end

Then /^Training maxes are not visible$/ do
  @driver.find_element(:id => 'training-maxes').displayed?().should be_false
end

Then /^The training max for clean is shown$/ do
  @driver.find_element(:id => 'maxes-clean-training').displayed?().should be_true
end

Then /^I navigate to the more tab/ do
  @main_navigation.navigate_to(:more)
end