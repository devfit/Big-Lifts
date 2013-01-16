Then /^I tap assistance row (\d+)$/ do |row|
  get_displayed_list_items()[row.to_i - 1].click

end

Then /^I change the custom movement name to "(.*?)"$/ do |name|
  name_input = @driver.find_elements(:name => 'name').select { |input| input.displayed? }[0]
  name_input.clear
  name_input.send_keys name
end

Then /^I change the custom movement weight to (\d+)$/ do |weight|
  weight_input = @driver.find_elements(:name => 'weight').select { |input| input.displayed? }[0]
  weight_input.clear
  weight_input.send_keys weight
end

When /^I tap the trash button$/ do
  @driver.find_elements(:class => 'trash').select { |button| button.displayed? }[0].click
end