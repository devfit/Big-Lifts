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
  Dir.glob('features/**/*.feature').each do |dir|
    system "cucumber #{dir}"
  end
end

task :get_chromedriver do
  puts "Grabbing chromedriver..."
  mkdir_p "/tmp/bin"
  chrome_zip = 'chromedriver_linux32_23.0.1240.0.zip'
  chrome_url = "http://chromedriver.googlecode.com/files/#{chrome_zip}"
  system "cd /tmp/bin && wget #{chrome_url} && unzip #{chrome_zip}"
end

task :travis => [:get_chromedriver] do
  system "bundle exec rake jasmine:ci"
  system "export PATH=/tmp/bin:$PATH && export DISPLAY=:99.0 && bundle exec rake cucumber"
end
