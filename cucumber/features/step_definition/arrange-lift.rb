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

Then /^The lift schedule orders lifts as ([\w\s,]+)$/ do |liftsText|
  lifts = liftsText.split(',')
  lifts.map! { |lift| lift.strip }
  rowTexts = @driver.find_element(:id => 'lift-selector').find_elements(:class => 'x-list-item').select { |row|
    row.displayed?
  }.collect { |row| row.text }

  rowTexts.each_with_index do |rowText, index|
    rowText.should == lifts[index]
  end
end
