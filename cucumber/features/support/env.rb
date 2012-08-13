require 'selenium-webdriver'

$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'wendler531'

Before('@premium') do
  premiumFileText = File.open("../js/premium.js", "rb").read
  File.open('../js/premium.js', 'w') {|f|
    f.write(premiumFileText.gsub(/false/,"true"))
  }
end

After('@premium') do
  premiumFileText = File.open("../js/premium.js", "rb").read
  File.open('../js/premium.js', 'w') {|f|
    f.write(premiumFileText.gsub(/true/,"false"))
  }
end

Before do
  if ENV["HEADLESS"] == 'true'
    require "headless"
    @headless = Headless.new
    @headless.start
  end

  @ANIMATION_DELAY = 0.8

  @driver = Selenium::WebDriver.for :chrome, :switches => %w[--allow-file-access-from-files]
  @driver.navigate.to "file://" + File.absolute_path("../#{'index.html'}")
  @wait = Selenium::WebDriver::Wait.new(:timeout => 10)
  @wait.until { @driver.find_element(:id => "maxes-form" ) }

  @main_navigation = MainNavigation.new(@driver, @ANIMATION_DELAY)
  @lift_schedule_navigator = LiftScheduleNavigator.new(@driver, @ANIMATION_DELAY)
end

After do
  @headless.destroy if defined?(@headless)
  @driver.quit
end
