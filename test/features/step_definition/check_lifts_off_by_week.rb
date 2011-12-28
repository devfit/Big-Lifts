When /^I check off lifts for week (\d+)$/ do |week|
    @main_navigation.navigate_to(:lift_schedule)
    @driver.find_element(:id => 'mark-week-completed-button').click()
end
When /^I uncheck lifts for week (\d+)$/ do |week|
    @main_navigation.navigate_to(:lift_schedule)
    @driver.find_element(:id => 'unmark-week-completed-button').click()
end
Then /^the disclosure icons for week (\d+) are ([\w\s]*)checkmarks$/ do |week, notCondition|
    doneItems = @driver.find_element(:id => 'lift-schedule').find_elements(:class => 'x-list-item')
    visibleDoneItems = doneItems.select{|i| i.displayed? && i.attribute('class').include?('done') }

    puts notCondition
    expectedCheckedCount = notCondition === "" ? 4 : 0
    visibleDoneItems.length.should == expectedCheckedCount
end



