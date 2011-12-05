require 'selenium-webdriver'
require 'ruby-debug'

$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'wendler531'

driver = Selenium::WebDriver.for :chrome

Before do
  @driver = driver
  @driver.navigate.to "file://" + File.absolute_path('../index.html')
  @wait = Selenium::WebDriver::Wait.new(:timeout => 10)
  @wait.until { @driver.find_element(:id => "main-tab-panel" ) }

  @main_navigation = MainNavigation.new(@driver)
end

at_exit do
  driver.quit
end