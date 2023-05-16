//
//  trustKitConfigs.m
//  MeinVodafone
//
//  Created by Huda Ahmed on 26/12/2021.
//

#import <Foundation/Foundation.h>
#import "trustKitConfigs.h"
#import <TrustKit/TrustKit.h>

@implementation trustKitConfigs

+ (void)configureTrustKit
{
  NSDictionary *trustKitConfig =
@{
  kTSKSwizzleNetworkDelegates: @YES,
  kTSKPinnedDomains : @{
          @"www.vodafone.de" : @{
                  kTSKPublicKeyHashes : @[
                          @"48hXNwn3laJAzsrIBprOcewUb097BGNL7e+MVM7Rcis=",
                          @"c/nqgPa16tHvHrSGY1qOHEk3d61bI83zs/QP4Ciafvs="
                          ],
                  kTSKEnforcePinning : @YES,
                  kTSKIncludeSubdomains : @YES,
                  kTSKDisableDefaultReportUri : @YES
                  },
          @"api.vodafone.de" : @{
                  kTSKPublicKeyHashes : @[
                          @"JSMzqOOrtyOT1kmau6zKhgT676hGgczD5VMdRMyJZFA=",
                          @"++MBgDH5WGvL9Bcn5Be30cRcL0f5O+NyoXuWtQdX1aI="
                          ],
                  kTSKEnforcePinning : @YES,
                  kTSKIncludeSubdomains : @YES,
                   kTSKDisableDefaultReportUri : @YES
                  },
          }};
  
  [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
}

@end
