require 'selenium-webdriver'

$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'navigation'
require 'sencha_helper'
require 'routine_selector'
require 'lift_schedule_navigator'

include ListSelector
include MainNavigation
include LiftScheduleNavigator
include SenchaHelper

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
  @driver = Selenium::WebDriver.for :chrome

  @premium_text = @premium_text || "premium=false"
  @existing_routine = @existing_routine || ""
  @driver.navigate.to "file://" + File.absolute_path("./index.html?#{[@premium_text, @existing_routine].join('&')}")
  @wait = Selenium::WebDriver::Wait.new(:timeout => 1, :interval => 0.05)

  if @routine
    @wait.until { @driver.find_element(:id => "routine-chooser") && @driver.find_element(:id => "routine-chooser").displayed? }
    RoutineSelector.new(@driver, @wait).select @routine
  end
end

After do
  @driver.quit
end
