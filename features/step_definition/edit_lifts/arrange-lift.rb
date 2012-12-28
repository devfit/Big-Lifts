When /^I tap the move down button$/ do
  @driver.find_elements(:class => 'arrow_down').select { |a| a.displayed? }[0].click
end

When /^I tap the move up button$/ do
  @driver.find_elements(:class => 'arrow_up').select { |a| a.displayed? }[0].click
end

Then /^The lift schedule orders lifts as "([^"]+)"$/ do |liftsText|
  lifts = liftsText.split(',')
  lifts.map! { |lift| lift.strip }

  row_texts = get_displayed_list_items().collect { |row| row.text }

  row_texts.each_with_index do |row_text, index|
    row_text.should == lifts[index]
  end
end
