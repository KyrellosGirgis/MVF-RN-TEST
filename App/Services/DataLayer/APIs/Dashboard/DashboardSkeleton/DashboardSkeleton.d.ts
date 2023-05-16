export interface Self {
  href: string
}

export interface Links {
  self: Self
}

export interface LargeTiles {
  _links: Links
}

export interface Embedded {
  largeTiles: LargeTiles
  mediumTiles: LargeTiles
  smallTiles: LargeTiles
}

export interface DashboardSectionItem {
  label: string
  icon: Self
  action: Self
  buttonLabel?: string
}

export interface DashboardSection {
  type: string
  title: string
  content?: Self
  style?: string
  items?: DashboardSectionItem[]
  image?: Self
}

export interface OptionalNavigation {
  name: string
  label: string
  icon: Self
  action: Self
}

export interface DashboardSkeleton {
  _embedded?: Embedded
  sections?: DashboardSection[]
  optionalNavigation?: OptionalNavigation[]
  _links?: Links
}
