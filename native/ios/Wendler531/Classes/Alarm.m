#import "Alarm.h"

@implementation Alarm

- (void)alarm:(CDVInvokedUrlCommand *)command {
    NSString *soundPath = [[NSBundle mainBundle] pathForResource:@"alert" ofType:@"wav"];
    NSURL *url = [NSURL fileURLWithPath:soundPath];
    
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];
    AVAudioPlayer *audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL: url error:nil];
    audioPlayer.numberOfLoops = 0;
    [audioPlayer play];
}

@end