require 'sencha_helper'
class RoutineSelector
  include ListSelector

  def initialize(driver, wait)
    @driver = driver
    @wait = wait
  end

  def select routine
    get_displayed_list_items().select { |item| item.text() == routine }[0].click
    @wait.until { @driver.find_element(:id => 'maxes-form').displayed? }
  end
end