//
//  XNLogger.swift
//  XNLogger
//
//  Created by Sunil Sharma on 16/12/18.
//  Copyright © 2018 Sunil Sharma. All rights reserved.
//
#if !IS_PRODUCTION

import Foundation


@objc public protocol XNLoggerDelegate: class {
  
  @objc optional func xnLogger(didStartRequest logData: XNLogData)
  @objc optional func xnLogger(didReceiveResponse logData: XNLogData)
}

@objcMembers
public class XNLogger: NSObject {
  
  // Public variables
  public static let shared = XNLogger()
  public weak var delegate: XNLoggerDelegate?
  
  // Private variables
  private let networkInterceptor = XNInterceptor()
  
  private(set) public var handlers: [XNLogHandler] = []
  let filterManager: XNFilterManager = XNFilterManager()
  
  override private init() {}
  
  public func startLogging() {
     print(": Started logging network traffic")
    networkInterceptor.startInterceptingNetwork()
  }
  
  public func stopLogging() {
    // print("XNL: Stopped logging network traffic")
    networkInterceptor.stopInterceptingNetwork()
  }
  
  /**
   Checks whether logging is enabled or not.
   */
  public func isEnabled() -> Bool {
    return networkInterceptor.isProtocolSwizzled()
  }
  
  /**
   Add given list of handlers.
   
   - Parameters handlers: List of handlers to be added.
   */
  public func addLogHandlers(_ handlers: [XNLogHandler]) {
    self.handlers.append(contentsOf: handlers)
  }
  
  /**
   Remove given list of handlers.
   
   - Parameters handlers: List of handlers to be removed.
   */
  public func removeHandlers(_ handlers: [XNLogHandler]) {
    for handler in handlers {
      self.handlers = self.handlers.filter { (item) -> Bool in
        return item !== handler
      }
    }
  }
  
  /**
   Remove all added handlers.
   */
  public func removeAllHandlers() {
    self.handlers.removeAll()
  }
  
  
  public func clearNetworkLogs(){
    for handler in self.handlers {
      handler.clearNetworkLogs?()
    }
  }
  
  public func getNetworkLogs()->NSArray{
    var networkLogs = [Any]()
    
    for handler in self.handlers {
      if let logs = handler.getNetworkLogs?(){
        networkLogs = logs as! [Any]
      }
      handler.clearNetworkLogs?()
    }
    
    return networkLogs as NSArray
  }
  
  
  func logResponse(from logData: XNLogData) {
    for handler in self.handlers {
      handler.xnLogger?(logResponse: logData)
    }
  }
  
  func logRequest(from logData: XNLogData) {
    for handler in self.handlers {
      handler.xnLogger?(logRequest: logData)
    }
  }
  
}
#endif
