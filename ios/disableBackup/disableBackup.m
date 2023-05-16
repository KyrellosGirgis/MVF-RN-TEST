//
//  disableBackup.m
//  MeinVodafone
//
//  Created by Abdelrahman Shaker on 03/02/2022.
//

#import <Foundation/Foundation.h>
#import "disableBackup.h"
#include <sys/xattr.h>

@implementation disableBackup


+ (BOOL)addSkipBackupAttributeToItemAtURL:(NSURL *)URL
{
    if (URL && [[NSFileManager defaultManager] fileExistsAtPath:[URL path]]) {
        NSError *error = nil;
      
        BOOL success = [URL setResourceValue: [NSNumber numberWithBool: YES]
                                      forKey: NSURLIsExcludedFromBackupKey error: &error];
      
        return success;
    }
  return YES;
}

+ (void)excludingFromBackup:(NSArray *)paths
{
  NSURL *pathURL = [NSURL fileURLWithPath:paths[0]];
  [disableBackup addSkipBackupAttributeToItemAtURL:(pathURL)];
}

@end
