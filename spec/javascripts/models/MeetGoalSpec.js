describe("Meet Goals", function () {
    beforeEach(function(){
        biglifts.stores.lifts.Lifts.removeAll();
        biglifts.stores.lifts.MeetGoals.removeAll();
    });

    it("should sync to the available lifts, adding missing lifts and defaulting meetGoal to the one rep max", function () {
        biglifts.stores.lifts.Lifts.add({propertyName:'squat', max: 400});
        biglifts.stores.lifts.syncMeetGoalsToLifts();
        expect(biglifts.stores.lifts.MeetGoals.getCount()).toEqual(1);
        expect(biglifts.stores.lifts.MeetGoals.first().get('weight')).toEqual(400);
    });

    it("should sync to the available lifts, removing missing lifts", function () {
        biglifts.stores.lifts.Lifts.add({propertyName:'squat'});
        biglifts.stores.lifts.MeetGoals.add({propertyName:'press'});
        biglifts.stores.lifts.syncMeetGoalsToLifts();
        expect(biglifts.stores.lifts.MeetGoals.getCount()).toEqual(1);
    });

    it("should sync lifts when the lifts store is modified", function(){
        biglifts.stores.lifts.Lifts.add({propertyName:'squat'});
        expect(biglifts.stores.lifts.MeetGoals.getCount()).toEqual(0);
        biglifts.stores.lifts.Lifts.sync();

        expect(biglifts.stores.lifts.MeetGoals.getCount()).toEqual(1);
    });
});