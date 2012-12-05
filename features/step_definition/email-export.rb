require 'json'

When /^I tap the log export button$/ do
  @driver.find_element(:id => 'export-log-button').click()

end

When /^I set the email to ([^"]*)$/ do |email|
  @driver.find_element(:name => 'email').send_keys( email )
end

When /^I tap the send email button$/ do
  @driver.find_element(:id => 'send-email-export-log-button').click()

end

Then /^The email is currently set to ([^"]*)$/ do |expectedEmail|
  email = @driver.execute_script("return window.testEmail")
  email.should == expectedEmail
end

Then /^The CSV to export is correct$/ do
  csv = @driver.execute_script("return window.testData")

  results = JSON.parse(csv)
  object = results[0]
  object['name'].should == "Squat"
  object['reps'].should == 5
  object['expected reps'].should == 5
  object['estimated one rep max'].should == 180.5
  object['notes'].should == ""
  object['week'].should == 1
  object['weight'].should == "155"
  object['cycle'].should == 1

  object['date'].should == Time.now.strftime("%m/%d/%Y")
  object['units'].should == 'lbs'
end
