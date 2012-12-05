module LiftScheduleNavigator
  def select_week(week)
    lift_selector = @driver.find_element(:id => 'lift-selector')
    week_tab = lift_selector.find_elements(:class => 'x-tab').select { |i| i.text() == "#{week}" }[0]

    unless week_tab.attribute('class').include? 'x-tab-active'
      week_tab.click
      sleep MainNavigation::DELAY
    end
  end
end