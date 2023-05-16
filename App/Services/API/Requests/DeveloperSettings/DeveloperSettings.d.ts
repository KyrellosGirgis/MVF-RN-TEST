export interface ApiMockConfig {
  baseURL?: string
  headers?: any
}
export interface ApiMockObject {
  [key: string]: { [key: string]: { apis: { [key: string]: ApiMockConfig } } }
}
export interface ApiMockFileResponse {
  testCases: ApiMockObject
}
