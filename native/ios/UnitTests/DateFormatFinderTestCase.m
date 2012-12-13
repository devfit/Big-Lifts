#import "DateFormatFinderTestCase.h"
#import "DateFormatFinder.h"

@implementation DateFormatFinderTestCase
@synthesize dateFormatFinder;

- (void)setUp {
    dateFormatFinder = [[DateFormatFinder alloc] init];
}

- (void)testDateFormatFinderFindsDateFormat {
    NSString* dateFormat = dateFormatFinder.findDeviceDateFormat;
    STAssertEqualObjects(dateFormat, @"MM/dd/yyyy", @"F");
}
@end
