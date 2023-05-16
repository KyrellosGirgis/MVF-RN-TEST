//
//  FlexModule.m
#if !IS_PRODUCTION 
#import "FLEXManager.h"
#import "FlexModule.h"

@implementation FlexModule
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(toggleFlexBar)
{
    dispatch_async(dispatch_get_main_queue(), ^{
    [[FLEXManager sharedManager] toggleExplorer];
  });
}

RCT_EXPORT_METHOD(hide)
{
    dispatch_async(dispatch_get_main_queue(), ^{
    [[FLEXManager sharedManager] hideExplorer];
  });
}
@end

//  Created by Kyrellous Girgis on 18/11/2021.
//  Copyright © 2021 Vodafone. All rights reserved.
//

#import <Foundation/Foundation.h>
#endif
