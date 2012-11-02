require 'selenium-webdriver'
require 'ruby-debug'

$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'navigation'
require 'sencha_helper'
require 'routine_selector'

Before('@premium') do
  @premium_text = "?premium=true"
end

Before('@531') do
  @routine = '5/3/1'
end

Before do
  @premium_text = @premium_text || "?premium=false"

  @ANIMATION_DELAY = 1

  @driver = Selenium::WebDriver.for :chrome, :switches => %w[--allow-file-access-from-files]
  @driver.navigate.to "file://" + File.absolute_path("../index.html#@premium_text")
  @wait = Selenium::WebDriver::Wait.new(:timeout => 10, :interval => 0.1)

  @wait.until { @driver.find_element(:id => "first-time-launch") && @driver.find_element(:id => "first-time-launch").displayed? }

  RoutineSelector.new(@driver, @wait).select @routine if @routine

  @main_navigation = MainNavigation.new(@driver, @ANIMATION_DELAY)
  @lift_schedule_navigator = LiftScheduleNavigator.new(@driver, @ANIMATION_DELAY)
  @sencha_helper = SenchaHelper.new(@driver, @ANIMATION_DELAY)
end

After do
  @driver.quit
end
