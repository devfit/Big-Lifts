#import "DateFormatFinder.h"

@implementation DateFormatFinder

- (void)getDateFormat:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    NSString* callbackId = [arguments objectAtIndex:0];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self findDeviceDateFormat]];
    NSString* javaScript = [pluginResult toSuccessCallbackString:callbackId];
    
    [self writeJavascript:javaScript];
}

- (NSString *)findDeviceDateFormat {
    NSDateFormatter *dateFormatter = [[[NSDateFormatter alloc] init] autorelease];
    [dateFormatter setDateStyle:NSDateFormatterShortStyle];
    
    NSCalendar *calendar = [[[NSCalendar alloc] initWithCalendarIdentifier:NSGregorianCalendar] autorelease];
    NSDateComponents *comps = [[[NSDateComponents alloc] init] autorelease];
    [comps setDay:1];
    [comps setMonth:2];
    [comps setYear:1999];
    
    NSDate *testDate = [calendar dateFromComponents:comps];
    
    NSString *dateString = [dateFormatter stringFromDate:testDate];
    
    dateString = [dateString stringByReplacingOccurrencesOfString:@"1999" withString:@"yyyy"];
    dateString = [dateString stringByReplacingOccurrencesOfString:@"99" withString:@"yyyy"];
    
    dateString = [dateString stringByReplacingOccurrencesOfString:@"02" withString:@"MM"];
    dateString = [dateString stringByReplacingOccurrencesOfString:@"2" withString:@"MM"];
    
    dateString = [dateString stringByReplacingOccurrencesOfString:@"01" withString:@"dd"];
    dateString = [dateString stringByReplacingOccurrencesOfString:@"1" withString:@"dd"];
    
    return dateString;
}

@end