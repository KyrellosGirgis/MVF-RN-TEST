export interface WithTrayProps {
  setTrayType: (type: string) => void
  setTrayVisable: (isVisible: boolean) => void
  setTrayConfig: (type: string, config: object) => void
  isTrayVisable: boolean
  setTrayHeight: (height: number) => void
}
