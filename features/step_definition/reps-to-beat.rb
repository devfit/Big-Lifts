Then /^The best estimated one rep max is ([\d\.]+)$/ do |estimatedOneRep|
  @driver.find_element(:class => 'reps-toolbar').text().should include estimatedOneRep
end

Then /^The reps to beat is (\d+)$/ do |reps|
  @driver.find_element(:class => 'reps-toolbar').text().should include "Reps to beat: #{reps}"
end