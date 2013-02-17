Then /^A user loads with username "(.*?)" and password "(.*?)"$/ do |username, password|
  js = "biglifts.stores.Users.addUser({username:'#{username}',password:'#{password}'})"
  @driver.execute_script js
end

Then /^The user save responds with success, user changed$/ do
  @driver.execute_script "Ext.getCmp('user-setup').saveSuccessful('Username changed!')"
end

Then /^The user save flash message is "(.*?)"$/ do |message|
  @driver.find_elements(:class => 'flash-message').select { |m| m.displayed? }[0].text.should == message
end

When /^The user save responds with existing user, bad password$/ do
  @driver.execute_script "Ext.getCmp('user-setup').saveFailure('User exists, bad password')"
end
