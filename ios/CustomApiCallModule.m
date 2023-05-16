#import <UIKit/UIKit.h>
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif



@interface CustomApiCallModule : NSObject <RCTBridgeModule, NSURLSessionDelegate>
@end

@implementation CustomApiCallModule

RCT_EXPORT_MODULE();

RCTPromiseResolveBlock globalResolve;

RCT_EXPORT_METHOD(getRequestNoRedirectionsWithUrl:(NSString *)apiUrl
                  cookies:(NSString *)cookies
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
                  
{
  globalResolve = resolve;
  NSURL *url = [NSURL URLWithString:apiUrl];
  NSMutableURLRequest *request= [NSMutableURLRequest requestWithURL:url];
  [request addValue:cookies forHTTPHeaderField:@"Cookie"];
  
  NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration:configuration delegate:self delegateQueue:nil];
  [[session dataTaskWithRequest:request
          completionHandler:^(NSData *data, NSURLResponse *response, NSError *error)
  {
    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
    reject([NSString stringWithFormat:@"%ld", (long)[httpResponse statusCode]],@"", nil);

  }] resume];
};

- (void)URLSession:(NSURLSession *)session
              task:(NSURLSessionTask *)task
willPerformHTTPRedirection:(NSHTTPURLResponse *)response
        newRequest:(NSURLRequest *)request
 completionHandler:(void (^)(NSURLRequest *))completionHandler
{
  globalResolve(@[request.URL.absoluteString]);
}

@end


