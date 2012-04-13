Then /^All parse\.js unit tests pass$/ do
    @driver.execute_script("return parse.restoreConvertedIds([{recordId:3,userId:'1234'}])").should == [{"id"=>3, "userId"=>"1234"}]
end
