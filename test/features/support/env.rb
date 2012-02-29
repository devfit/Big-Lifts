require 'selenium-webdriver'

$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'wendler531'

Before do
  @ANIMATION_DELAY = 0.8

  testFile = ENV['TEST_FILE'] || 'index.html'
  @driver = Selenium::WebDriver.for :chrome, :switches => %w[--allow-file-access-from-files --disable-web-security]
  @driver.navigate.to "file://" + File.absolute_path("../#{testFile}")
  @wait = Selenium::WebDriver::Wait.new(:timeout => 10)
  @wait.until { @driver.find_element(:id => "main-tab-panel" ) }

  @main_navigation = MainNavigation.new(@driver, @ANIMATION_DELAY)
  @lift_schedule_navigator = LiftScheduleNavigator.new(@driver, @ANIMATION_DELAY)
end

After do
  @driver.quit
end