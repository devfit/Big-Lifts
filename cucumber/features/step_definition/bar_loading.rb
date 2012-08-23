When /^I tap set (\d+) in the lift template$/ do |set|
  setListItem = @driver.find_element(:id => 'lift-template').find_elements(:class => 'x-list-item').select {
      |listItem| listItem.displayed?
  }[set.to_i-1]
  setListItem.click
  sleep 0.5
end

Then /^The plate breakdown for set (\d+) shows "(.*?)"$/ do |set, plates|
    setListItem = @driver.find_elements(:class => 'lift-row').select {|row|
        row.displayed? }[set.to_i-1]

    setListItem.find_element(:class => 'bar-loader-breakdown').text.should == plates
end

When /^I tap the bar\/plates button$/ do
    @driver.find_element(:id => 'setup-plates-button').click()
    sleep @ANIMATION_DELAY
end

When /^I set the bar weight to (\d+)$/ do |weight|
    barWeightInput = @driver.find_element(:id => 'bar-plate-setup-panel').find_element(:name => 'weight')
    barWeightInput.clear
    barWeightInput.send_keys weight
end

When /^I tap back in the bar plates editor$/ do
  @driver.find_element(:id => 'bar-setup-back-button').click
  sleep @ANIMATION_DELAY
end

When /^I set the number of (\d+)lbs plates to (\d+)$/ do |weight, plateNumber|
  @driver.find_element(:name => "#{weight}-lbs").clear
  @driver.find_element(:name => "#{weight}-lbs").send_keys plateNumber
end
