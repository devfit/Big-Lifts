#import "Alarm.h"

@implementation Alarm

- (void)alarm:(CDVInvokedUrlCommand *)command {
    NSError *setCategoryErr = nil;
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:&setCategoryErr];
    
    NSString *soundPath = [[NSBundle mainBundle] pathForResource:@"alert" ofType:@"wav"];
    NSURL *url = [NSURL URLWithString:soundPath];
    
    AVAudioPlayer *audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL: url error:nil];
    [audioPlayer prepareToPlay];
    
    audioPlayer.currentTime = 0;
    [audioPlayer play];
}

@end