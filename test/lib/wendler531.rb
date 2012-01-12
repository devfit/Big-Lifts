class MainNavigation
  TABS = {
      :lift_schedule => '5/3/1',
      :lift_editor => 'Lifts',
      :one_rep_calculator => '1-Rep Calc',
      :more => 'More'
  }

  def initialize(driver, animationDelay)
      @driver = driver
      @animationDelay = animationDelay
  end

  def navigate_to(location)
    menuTextPattern = TABS[location]
    if (!menuTextPattern)
      raise "#{location}: Not a valid menu location"
    end

    mainNavButtons.select { |button| button.text == menuTextPattern }[0].click
    sleep @animationDelay
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

class LiftScheduleNavigator
    def initialize(driver, animationDelay)
        @driver = driver
        @animationDelay = animationDelay
    end

    def selectWeek( week )
       liftSelector = @driver.find_element(:id => 'lift-selector')
       liftSelector.find_elements(:tag_name => 'div', :class => 'x-tab').select { |i| i.text == "#{week}"}[0].click
       sleep @animationDelay
    end
end