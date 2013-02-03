describe("Log Syncer", function () {
    beforeEach(function () {
        this.log = emptyStore(reloadStore(biglifts.stores.LiftLog));
        this.syncer = Ext.create('biglifts.models.Log531Syncer');
    });
    it("should convert the 5/3/1 log into post ready format", function () {
        var timestamp = new Date().getTime();
        this.log.add({workout_id:1, reps:2, liftName:'Squat', weight:100, timestamp:timestamp});
        this.log.sync();

        expect(this.syncer.getFormattedLog()).toEqual([
            {
                workout_id:1,
                logs:[
                    {
                        sets:1,
                        reps:2,
                        name:'Squat',
                        weight:100,
                        notes:'',
                        date:timestamp
                    }
                ]
            }
        ]);
    });
});