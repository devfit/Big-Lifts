When /^I tap arrange lifts$/ do
  @driver.find_element(:id => 'arrange-lifts-button').click()
  sleep @ANIMATION_DELAY
end

When /^I tap the arrange (\w+) row$/ do |liftName|
  @driver.find_element(:id => 'arrange-lifts-list').find_elements(:class => 'x-list-item').select { |row|
    row.text == liftName
  }[0].click()
  sleep @ANIMATION_DELAY
end

When /^I tap the move down button$/ do
  @driver.find_element(:id => 'arrange-lifts-down-button').click()
  sleep @ANIMATION_DELAY
end

When /^I tap the move up button$/ do
  @driver.find_element(:id => 'arrange-lifts-up-button').click()
  sleep @ANIMATION_DELAY
end

When /^I tap done while arranging lifts$/ do
  @driver.find_element(:id => 'arrange-lifts-done-button').click()
  sleep @ANIMATION_DELAY
end

Then /^The lift schedule orders lifts as (\w+), (\w+), (\w+), (\w+)$/ do |lift1, lift2, lift3, lift4|
  rowTexts = @driver.find_element(:id => 'lift-selector').find_elements(:class => 'x-list-item').select { |row|
    row.displayed?
  }.collect { |row| row.text }

  rowTexts.each_with_index do |rowText, index|
    rowText.should == [lift1, lift2, lift3, lift4][index]
  end
end
