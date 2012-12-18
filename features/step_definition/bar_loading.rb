When /^I tap set (\d+) in the lift template$/ do |set|
  get_displayed_list_items()[set.to_i-1].click
  sleep 0.5
end

Then /^The plate breakdown for set (\d+) shows "(.*?)"$/ do |set, plates|
  set_list_item = @driver.find_elements(:class => 'lift-row').select { |row|
    row.displayed? }[set.to_i-1]

  set_list_item.find_element(:class => 'bar-loader-breakdown').text.should == plates
end

When /^I set the bar weight to (\d+)$/ do |weight|
  bar_weight_input = @driver.find_element(:id => 'bar-plate-setup-panel').find_element(:name => 'weight')
  bar_weight_input.clear
  bar_weight_input.send_keys weight
end

When /^I set the number of (\d+)lbs plates to (\d+)$/ do |weight, plateNumber|
  @driver.find_element(:name => "#{weight}-lbs").clear
  @driver.find_element(:name => "#{weight}-lbs").send_keys plateNumber
end
