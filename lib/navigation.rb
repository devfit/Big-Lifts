module MainNavigation
  DELAY = 0.5

  TABS = {
      :lift_schedule => {:tab_text => 'Lift!', :panel_id => 'lift-schedule'},
      :lift_editor => {:tab_text => 'Edit', :panel_id => 'maxes-form'},
      :track => {:tab_text => 'Track', :panel_id => 'log'},
      :one_rep_calculator => {:tab_text => '1-Rep', :panel_id => 'one-rep-max-calculator'},
      :more => {:tab_text => 'More', :panel_id => 'more'},
      :assistance => {:tab_text => 'Asst.', :panel_id => 'assistance'},
  }

  def navigate_to(location)
    menu_text_pattern = TABS[location][:tab_text]
    raise "#{location}: Not a valid menu location" if !menu_text_pattern

    target_panel = TABS[location][:panel_id]

    target = @driver.find_element(:id => target_panel)
    unless target.displayed?
      tab_navigation = @driver.find_element(:id, 'tab-navigation')
      main_nav_buttons = tab_navigation.find_elements(:class => 'x-tab')

      main_nav_buttons.select { |button| button.text == menu_text_pattern }[0].click
      sleep DELAY
    end
  end
end