require 'spec_helper'

describe 'index' do
  it 'shows the user content' do
    visit 'index.html'
    page.should have_content('Wendler')
  end
end
