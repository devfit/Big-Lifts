class MainNavigation
  DELAY = 0.6

  TABS = {
      :lift_schedule => {:tab_text => 'Lift!', :panel_id => 'lift-schedule'},
      :lift_editor => {:tab_text => 'Edit', :panel_id => 'maxes-form'},
      :track => {:tab_text => 'Track', :panel_id => 'log'},
      :one_rep_calculator => {:tab_text => '1-Rep', :panel_id => 'one-rep-max-calculator'},
      :more => {:tab_text => 'More', :panel_id => 'more'},
      :assistance => {:tab_text => 'Asst.', :panel_id => 'assistance'},
  }

  def initialize(driver)
    @driver = driver
  end

  def navigate_to(location)
    menu_text_pattern = TABS[location][:tab_text]
    raise "#{location}: Not a valid menu location" if !menu_text_pattern

    target_panel = TABS[location][:panel_id]

    unless @driver.find_element(:id => target_panel).displayed?
      tab_navigation = @driver.find_element(:id, 'tab-navigation')
      main_nav_buttons = tab_navigation.find_elements(:class => 'x-tab')

      main_nav_buttons.select { |button| button.text == menu_text_pattern }[0].click
      sleep MainNavigation::DELAY
    end
  end
end

class LiftScheduleNavigator
  def initialize(driver)
    @driver = driver
  end

  def selectWeek(week)
    lift_selector = @driver.find_element(:id => 'lift-selector')
    week_tab = lift_selector.find_elements(:tag_name => 'div', :class => 'x-tab').select { |i| i.text() == "#{week}" }[0]

    unless week_tab.attribute('class').include? 'x-tab-active'
      week_tab.click
      sleep MainNavigation::DELAY
    end
  end
end