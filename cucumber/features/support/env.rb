require 'selenium-webdriver'

$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'navigation'
require 'sencha_helper'

Before('@premium') do
  @premium_text = "?premium=true"
end

Before do
  @premium_text = @premium_text || "?premium=false"
  @ANIMATION_DELAY = 0.8

  @driver = Selenium::WebDriver.for :chrome, :switches => %w[--allow-file-access-from-files]
  @driver.navigate.to "file://" + File.absolute_path("../index.html#{@premium_text}")
  @wait = Selenium::WebDriver::Wait.new(:timeout => 10)

  @wait.until { @driver.find_element(:id => "maxes-form") && @driver.find_element(:id => 'maxes-form').displayed? }

  @main_navigation = MainNavigation.new(@driver, @ANIMATION_DELAY)
  @lift_schedule_navigator = LiftScheduleNavigator.new(@driver, @ANIMATION_DELAY)
  @sencha_helper = SenchaHelper.new(@driver, @ANIMATION_DELAY)
end

After do
  @driver.quit
end
