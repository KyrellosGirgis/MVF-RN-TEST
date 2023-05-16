export interface ConfigurationType {
  title: string
  description: string
  withCard: boolean
  items: {
    component: any
    name: string
  }[]
}
