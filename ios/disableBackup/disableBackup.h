//
//  disableBackup.h
//  MeinVodafone
//
//  Created by Abdelrahman Shaker on 03/02/2022.
//



@interface disableBackup : NSObject

+ (BOOL)addSkipBackupAttributeToItemAtURL:(NSURL *)URL ;
+ (void)excludingFromBackup:(NSArray *)paths;

@end
