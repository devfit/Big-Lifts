When /^I hit cancel on the increase cycle screen$/ do
  @driver.find_element(:id => 'complete-cycle-back-button').click()
  sleep @ANIMATION_DELAY
end
