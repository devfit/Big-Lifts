begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :default => :travis

task :cucumber do
  Dir.chdir("cucumber")
  system "cucumber"
end

task :travis do
  system "bundle exec rake jasmine:ci"
  system "export DISPLAY=:99.0 && bundle exec rake cucumber"
end
