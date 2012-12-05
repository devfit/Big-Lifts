Then /^the cycle is ([\w\s]*)increased$/ do |notModifier|
  cycleChangeButtonText = @driver.find_element(:id => 'cycle-change-button').text
  expectedNewCycle = notModifier == "" ? "2" : "1"
  cycleChangeButtonText.include?(expectedNewCycle).should
end

Then /^I click the increase cycle button$/ do
  @driver.find_element(:id => 'cycle-change-button').click()

end