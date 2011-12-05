require 'selenium-webdriver'
require 'ruby-debug'

$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'wendler531'

Before do
  @driver = Selenium::WebDriver.for :chrome
  @driver.navigate.to "file://" + File.absolute_path('../index.html')
  @wait = Selenium::WebDriver::Wait.new(:timeout => 10)
  @wait.until { @driver.find_element(:id => "main-tab-panel" ) }

  @main_navigation = MainNavigation.new(@driver)
end

After do
  @driver.quit
end