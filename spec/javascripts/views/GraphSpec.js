describe("5/3/1 lift graph", function () {
    beforeEach(function () {
        this.lifts = reloadStore(biglifts.stores.lifts.Lifts);
        this.graph = Ext.create('biglifts.views.LiftGraph');
    });

    it("should generate lift select options", function () {
        var expected = [
            {text:'All', value:'all'},
            {text:'Press', value:this.lifts.findRecord('name', 'Press').get('id')},
            {text:'Deadlift', value:this.lifts.findRecord('name', 'Deadlift').get('id')},
            {text:'Bench', value:this.lifts.findRecord('name', 'Bench').get('id')},
            {text:'Squat', value:this.lifts.findRecord('name', 'Squat').get('id')}
        ];
        var options = this.graph.getLiftOptions();
        expect(options).toEqual(expected);
    });
});