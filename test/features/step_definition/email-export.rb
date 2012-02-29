When /^I tap the log export button$/ do
  @driver.find_element(:id => 'export-log-button').click()
  sleep @ANIMATION_DELAY
end

When /^I set the email to ([^"]*)$/ do |email|
  @driver.find_element(:name => 'email').send_keys( email )
end

When /^I tap the send email button$/ do
  @driver.find_element(:id => 'send-email-export-log-button').click()
  sleep @ANIMATION_DELAY
end

Then /^The email is currently set to ([^"]*)$/ do |expectedEmail|
  email = @driver.execute_script("return window.testEmail")
  email.should == expectedEmail
end

Then /^The CSV to export is correct$/ do
  csv = @driver.execute_script("return window.testData")

  expectedCsv =
<<eos
[{"name":"Squat","reps":5,"notes":"","weight":"155","week":1,"cycle":1,"date":"","timestamp":1330488621420,"units":"lbs"}]
eos

  csv.should == expectedCsv
end
