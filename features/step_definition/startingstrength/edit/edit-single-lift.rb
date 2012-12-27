When /^I tap the "(.*?)" gear icon$/ do |label|
  label.gsub! /\s+/, ''
  icon = @driver.find_elements(:class => 'config-gear').select { |c| c.displayed? && c.attribute('data-name') == label }[0]
  icon.click
end
