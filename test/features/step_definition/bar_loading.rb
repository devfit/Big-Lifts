When /^I tap set (\d+) in the lift template$/ do |set|
  setListItem = @driver.find_element(:id => 'lift-template').find_elements(:class => 'x-list-item').select {
      |listItem| listItem.displayed?
    }[set.to_i-1]
  setListItem.click
end

Then /^The plate breakdown for set (\d+) shows "(.*?)"$/ do |set, plates|
  pending # express the regexp above with the code you wish you had
end

