Then /^Filenames for saving stores is saved correctly$/ do
  liftFileName = @driver.execute_script("return util.filebackup.generateFileName(biglifts.stores.lifts.Lifts)")
  liftFileName.should == "lift.json"
end
