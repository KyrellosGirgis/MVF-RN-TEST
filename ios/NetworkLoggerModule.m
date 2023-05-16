//
//  NetworkLoggerModule.m
//  MeinVodafone
//
//  Created by Bavly Abdelmasih on 28/06/2022.
//

#if !IS_PRODUCTION

#import "NetworkLoggerModule.h"
#import "MeinVodafone-Swift.h"
@implementation NetworkLoggerModule
RCT_EXPORT_MODULE();
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(readNetworkLogs)
{
  return [[XNLogger shared] getNetworkLogs];
}

RCT_EXPORT_METHOD(startLogging){
  [[XNLogger shared] startLogging];
  XNConsoleLogHandler *xnc = [XNConsoleLogHandler create];
  NSArray *handlersArray = @[xnc];
  [[XNLogger shared] addLogHandlers:handlersArray];
}

RCT_EXPORT_METHOD(stopLogging){
  [[XNLogger shared] stopLogging];
}

RCT_EXPORT_METHOD(clearNetworkLogs){
  [[XNLogger shared] clearNetworkLogs];
}


@end
#endif
