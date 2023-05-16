export type TileID =
  | '1_MyOffers'
  | '2_Top-up'
  | '3_NetworkSignal'
  | '4_WifiControl'
  | '5_Demo'

export interface ExtraInfo {
  title?: string
  icon?: string
  leftTitle?: string
  rightTitle?: string
  background?: string
  onPress?: () => void
}

export interface SmallTile {
  _id: TileID
  extraInfo: ExtraInfo
}
