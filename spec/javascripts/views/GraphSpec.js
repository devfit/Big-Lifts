describe("5/3/1 lift graph", function () {
    beforeEach(function () {
        this.lifts = reloadStore(biglifts.stores.lifts.Lifts);
        this.graph = Ext.create('biglifts.views.LiftGraph');
    });

    it("should generate lift select options", function () {
        var expected = [
            {text:'Press', value:''},
            {text:'Press', value:''},
            {text:'Press', value:''},
            {text:'Press', value:''}
        ];
        var options = this.graph.getLiftOptions();
        expect(options).toEqual(expected);
    });
});