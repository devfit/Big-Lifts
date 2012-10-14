class MainNavigation
  TABS = {
      :lift_schedule => {:tab_text => '5/3/1', :panel_id => 'lift-schedule'},
      :lift_editor => {:tab_text => 'Lifts', :panel_id => 'maxes-form'},
      :track => {:tab_text => 'Track', :panel_id => 'log'},
      :one_rep_calculator => {:tab_text => '1-Rep Calc', :panel_id => 'one-rep-max-calculator'},
      :more => {:tab_text => 'More', :panel_id => 'more'},
  }

  def initialize(driver, animation_delay)
    @driver = driver
    @animation_delay = animation_delay
  end

  def navigate_to(location)
    menu_text_pattern = TABS[location][:tab_text]
    raise "#{location}: Not a valid menu location" if !menu_text_pattern

    target_panel = TABS[location][:panel_id]

    unless @driver.find_element(:id => target_panel).displayed?
      tab_navigation = @driver.find_element(:id, 'tab-navigation')
      main_nav_buttons = tab_navigation.find_elements(:class => 'x-tab')

      main_nav_buttons.select { |button| button.text == menu_text_pattern }[0].click
      sleep @animation_delay
    end
  end
end

class LiftScheduleNavigator
  def initialize(driver, animation_delay)
    @driver = driver
    @animation_delay = animation_delay
  end

  def selectWeek(week)
    lift_selector = @driver.find_element(:id => 'lift-selector')
    lift_selector.find_elements(:tag_name => 'div', :class => 'x-tab').select { |i| i.text == "#{week}" }[0].click
    sleep @animation_delay
  end
end