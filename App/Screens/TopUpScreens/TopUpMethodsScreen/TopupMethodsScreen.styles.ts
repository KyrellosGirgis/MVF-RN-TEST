import { StyleSheet } from 'react-native'

import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

export default StyleSheet.create({
  voucherTopupQrScannerFooterBtnContainerStyle: {
    marginTop: 0,
    marginBottom: 0
  },
  voucherTopupQrScannerFooterBtnStyle: {
    borderRadius: 6,
    borderColor: Colors.dark_grey,
    borderWidth: 2
  },
  voucherButtonContainer: {
    marginTop: 5
  },
  successBtnDisabledStyle: {
    backgroundColor: Colors.vfRed,
    opacity: 0.38
  }
})
