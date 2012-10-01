describe("Meet Goals", function () {
    beforeEach(function(){
        wendler.stores.lifts.Lifts.removeAll();
        wendler.stores.lifts.MeetGoals.removeAll();
    });

    it("should sync to the available lifts, adding missing lifts and defaulting meetGoal to the one rep max", function () {
        wendler.stores.lifts.Lifts.add({propertyName:'squat', max: 400});
        wendler.stores.lifts.syncMeetGoalsToLifts();
        expect(wendler.stores.lifts.MeetGoals.getCount()).toEqual(1);
        expect(wendler.stores.lifts.MeetGoals.first().get('weight')).toEqual(400);
    });

    it("should sync to the available lifts, removing missing lifts", function () {
        wendler.stores.lifts.Lifts.add({propertyName:'squat'});
        wendler.stores.lifts.MeetGoals.add({propertyName:'press'});
        wendler.stores.lifts.syncMeetGoalsToLifts();
        expect(wendler.stores.lifts.MeetGoals.getCount()).toEqual(1);
    });

    it("should sync lifts when the lifts store is modified", function(){
        wendler.stores.lifts.Lifts.add({propertyName:'squat'});
        expect(wendler.stores.lifts.MeetGoals.getCount()).toEqual(0);
        wendler.stores.lifts.Lifts.sync();

        expect(wendler.stores.lifts.MeetGoals.getCount()).toEqual(1);
    });
});