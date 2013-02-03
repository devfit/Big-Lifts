describe("Log Syncer", function () {
    beforeEach(function () {
        this.log = emptyStore(reloadStore(biglifts.stores.LiftLog));
        this.users = emptyStore(reloadStore(biglifts.stores.Users));
        this.syncer = Ext.create('biglifts.models.Log531Syncer');
    });
    it("should convert the 5/3/1 log into post ready format", function () {
        var timestamp = new Date().getTime();
        this.log.add({workout_id:1, reps:2, liftName:'Squat', weight:100, timestamp:timestamp, cycle:3, expectedReps:5, week:1});
        this.log.sync();

        var expected = [
            {
                workout_id:1,
                logs:[
                    {
                        sets:1,
                        reps:2,
                        name:'Squat',
                        weight:100,
                        notes:'',
                        date:timestamp,
                        specific:{
                            type:'5/3/1',
                            data:{
                                cycle:3,
                                expected_reps:5,
                                week:1
                            }
                        }
                    }
                ]
            }
        ];
        expect(this.syncer.getFormattedLog()).toEqual(expected);
    });

    it("should build basic auth headers from the user store", function () {
        this.users.add({username:'bob', password:'password'});
        expect(this.syncer.buildAuthHeaders()).toEqual({Authorization:'Basic Ym9iOnBhc3N3b3Jk'});
    });
});