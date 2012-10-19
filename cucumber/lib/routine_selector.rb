class RoutineSelector
  def initialize(driver, wait)
    @driver = driver
    @wait = wait
  end

  def select routine
    @driver.find_elements(:class => 'x-list-item').select { |item| item.text() == routine }[0].click
    @wait.until { @driver.find_element(:id => 'maxes-form').displayed? }
  end
end