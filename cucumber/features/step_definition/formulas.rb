Then /^All formula suite data is correct$/ do
  @driver.execute_script("return util.formulas.calculateRepsToBeatWeight(300, 230)").should == 10
  @driver.execute_script("return util.formulas.calculateRepsToBeatWeight(300, 300)").should == 1
  @driver.execute_script("return util.formulas.calculateRepsToBeatWeight(300, 400)").should == 1
  @driver.execute_script("return util.formulas.calculateRepsToBeatWeight(300, 299)").should == 1
  @driver.execute_script("return util.formulas.calculateRepsToBeatWeight(300, 100)").should == 61
end
