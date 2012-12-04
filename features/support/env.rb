require 'selenium-webdriver'
require 'ruby-debug'

$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'navigation'
require 'sencha_helper'
require 'routine_selector'

include ListSelector

Before('@premium') do
  @premium_text = "premium=true"
end

Before('@531') do
  @routine = '5/3/1'
end

Before('@StartingStrength') do
  @routine = 'Starting Strength'
end

Before('@Existing531WithoutNotification') do
  @existing_routine = 'existing_routine=531NoNotification'
end

Before do
  @ANIMATION_DELAY = 0.9
  @driver = Selenium::WebDriver.for :chrome, :switches => %w[--allow-file-access-from-files]

  @premium_text = @premium_text || "premium=false"
  @existing_routine = @existing_routine || ""
  @driver.navigate.to "file://" + File.absolute_path("../index.html?#{[@premium_text, @existing_routine].join('&')}")
  @wait = Selenium::WebDriver::Wait.new(:timeout => 10, :interval => 0.1)

  if @routine
    @wait.until { @driver.find_element(:id => "routine-chooser") && @driver.find_element(:id => "routine-chooser").displayed? }
    RoutineSelector.new(@driver, @wait).select @routine
  else

  end

  @main_navigation = MainNavigation.new(@driver, @ANIMATION_DELAY)
  @lift_schedule_navigator = LiftScheduleNavigator.new(@driver, @ANIMATION_DELAY)
  @sencha_helper = SenchaHelper.new(@driver, @ANIMATION_DELAY)
end

After do
  @driver.quit
end
