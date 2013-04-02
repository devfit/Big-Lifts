Then /^The "(\w+)" list item is (not)?\s?checked$/ do |text, notText|
  lift_list_item = get_displayed_list_items().select { |item|
    item.text.include?(text)
  }[0]


  list_item_class = lift_list_item.attribute('class')
  list_item_class.should include 'done' if !notText
  list_item_class.should_not include 'done' if notText
end
