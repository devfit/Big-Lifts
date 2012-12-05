When /^I hit cancel on the increase cycle screen$/ do
  @driver.find_element(:id => 'complete-cycle-back-button').click()

end

When /^I set the next cycle to (\d+)$/ do |cycle|
  @driver.find_element(:name => 'new-cycle').clear()
  @driver.find_element(:name => 'new-cycle').send_keys(cycle)
end

Then /^The week (\d+) tab does not have a checkmark$/ do |week|
  tab = @driver.find_elements(:class => 'x-tab').select { |tab|
    tab.displayed? && tab.text() == week
  }[0]

  tab.attribute('class').include?('completed').should be_false
end