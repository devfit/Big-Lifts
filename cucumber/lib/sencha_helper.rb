class SenchaHelper
  def initialize(driver, animation_delay)
    @driver = driver
    @animation_delay = animation_delay
  end

  def select_combobox(combobox, value)
    lift_selector_parent = combobox.find_element(:xpath => '..')
    lift_selector_parent.find_element(:class => 'x-field-mask').click
    sleep @animation_delay

    floating_selector = @driver.find_elements(:class => 'x-floating').select { |floatingItem|
      floatingItem.attribute('class').include? 'x-container'
    }[0]

    lift_items = floating_selector.find_elements(:tag_name => 'div', :class => 'x-list-item-label')

    lift_div = lift_items.select { |label|
      label.text == value
    }[0]

    lift_div.click
    sleep @animation_delay

    if lift_div.displayed?
      lift_div.click
    end
  end
end