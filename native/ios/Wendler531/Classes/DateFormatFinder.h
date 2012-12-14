#import <Cordova/CDVPlugin.h>

@interface DateFormatFinder : CDVPlugin
- (void)getDateFormat:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (NSString *)findDeviceDateFormat;
@end