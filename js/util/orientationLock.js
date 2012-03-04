"use strict";
function shouldRotateToOrientation(rotation) {
    var settings = wendler.stores.Settings.first();
    if (typeof(settings) === "undefined") {
        return true;
    }
    else {
        switch (rotation) {
            //Portrait or PortraitUpsideDown
            case 0:
            case 180:
                return true;
            //LandscapeRight or LandscapeLeft
            case 90:
            case -90:
                return false;
        }
    }
}