class MainNavigation
  TABS = {
      :lift_schedule => '5/3/1',
      :lift_editor => 'Lifts',
      :one_rep_calculator => '1-Rep Calc',
      :settings => 'Settings'
  }

  def initialize(driver)
      @driver = driver
  end

  def navigate_to(location)
    menuTextPattern = TABS[location]
    if (!menuTextPattern)
      raise "#{location}: Not a valid menu location"
    end

    mainNavButtons.select { |button| button.text == menuTextPattern }[0].click
  end

  def mainNavButtons
    if (@mainNavButtons)
      @mainNavButtons
    else
      tabNavigation = @driver.find_element(:id, 'tab-navigation')
      @mainNavButtons ||= tabNavigation.find_elements(:class => 'x-tab')
    end
  end
end