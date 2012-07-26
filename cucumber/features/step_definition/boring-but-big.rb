When /^I select "([^"]*)" assistance work$/ do |assistanceName|
  assistanceListItem = @driver.find_element(:id => 'assistance-chooser').find_elements(:class => 'x-list-item').select { |item| item.text() == assistanceName }[0]
  assistanceListItem.click()

  @driver.find_element(:id => 'assistance-chooser-next-button').click()
  sleep @ANIMATION_DELAY
end

Then /^The first boring but big lift weight is (\d+)$/ do |weight|
    @driver.find_element(:id => 'boring-but-big').find_elements(:class => 'weight')[0].text().should == weight
end

When /^I set the BBB percentage to (\d+)$/ do |percentage|
  bbbPercentageInput = @driver.find_element(:name => 'bbbPercentage')
  bbbPercentageInput.clear
  bbbPercentageInput.send_keys percentage
end

When /^I save the boring but big assistance work$/ do
   @driver.find_element(:id => 'boring-but-big-done-button').click()
   sleep @ANIMATION_DELAY
end

