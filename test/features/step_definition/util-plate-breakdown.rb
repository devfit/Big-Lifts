Then /^All util plate breakdown suite data is correct$/ do
  @driver.execute_script("return util.formulas.buildPlateListForWeight(35, 45)").should == []
  @driver.execute_script("return util.formulas.buildPlateListForWeight(45, 45)").should == []
  @driver.execute_script("return util.formulas.buildPlateListForWeight(65, 45)").should == [10]
  @driver.execute_script("return util.formulas.buildPlateListForWeight(75, 45)").should == [15]
  @driver.execute_script("return util.formulas.buildPlateListForWeight(100, 45)").should == [25,2.5]
  @driver.execute_script("return util.formulas.buildPlateListForWeight(105, 45)").should == [25,5]
  @driver.execute_script("return util.formulas.buildPlateListForWeight(115, 45)").should == [35]
  @driver.execute_script("return util.formulas.buildPlateListForWeight(225, 45)").should == [45,45]
  @driver.execute_script("return util.formulas.buildPlateListForWeight(235, 45)").should == [45,45,5]
end

