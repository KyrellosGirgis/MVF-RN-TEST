//
//  XNConsoleLogHandler.swift
//  XNLogger
//
//  Created by Sunil Sharma on 10/01/19.
//  Copyright © 2019 Sunil Sharma. All rights reserved.
//
#if !IS_PRODUCTION

import UIKit

public class XNConsoleLogHandler: XNBaseLogHandler, XNLogHandler {
  
  private var networkLogs = [Any]()
  
  @objc public class func create() -> XNConsoleLogHandler {
    let instance: XNConsoleLogHandler = XNConsoleLogHandler()
    return instance
  }
  
  private override init() {
    super.init()
  }
  
  public func xnLogger(logRequest logData: XNLogData) {
    
//    var headers = [ String]()
//    if let headerFields = logData.urlRequest.allHTTPHeaderFields, headerFields.isEmpty == false {
//      for (key, value) in headerFields {
//        headers.append("\n\(key) = \(value)")
//      }
//    }
//
//    let method = logData.urlRequest.httpMethod ?? "no mehtod"
//    let body = logData.urlRequest.httpBody

    networkLogs.append("\(logData.urlRequest)")
  }
  
  @objc public func getNetworkLogs()->NSArray{
    return networkLogs as NSArray
    
  }
  
  @objc public func clearNetworkLogs(){
    networkLogs.removeAll()
    
  }
  
  public func xnLogger(logResponse logData: XNLogData) {}
  
}
#endif
