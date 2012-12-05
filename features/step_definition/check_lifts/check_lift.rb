Then /^the (\w+) lift is checked$/ do |lift|
  lift_list_item = get_displayed_list_items().select { |item|
    item.text.include?(lift)
  }[0]

  lift_list_item.attribute('class').should include 'done'
end
