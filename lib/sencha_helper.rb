module SenchaHelper
  def select_combobox(combobox, value)
    lift_selector_parent = combobox.find_element(:xpath => '..')
    lift_selector_parent.find_element(:class => 'x-field-mask').click
    sleep 0.3

    floating_selector = @driver.find_elements(:class => 'x-floating').select { |floatingItem|
      floatingItem.attribute('class').include? 'x-container'
    }[0]

    lift_items = floating_selector.find_elements(:tag_name => 'div', :class => 'x-list-item-label')

    lift_div = lift_items.select { |label|
      label.text == value
    }[0]

    lift_div.click
    sleep 0.7

    if lift_div.displayed?
      lift_div.click
    end
  end
end

module ListSelector
  def get_displayed_list_items
    list_items = @driver.find_elements(:class => 'x-list-item').select { |list_item| list_item.displayed? }
    list_items.select { |item|
      not item.attribute('style').include? "-10000px"
    }
  end
end