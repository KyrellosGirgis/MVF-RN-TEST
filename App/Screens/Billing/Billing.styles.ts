import { StyleSheet } from 'react-native'
import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

export default StyleSheet.create({
  billAmountStyle: {
    color: Colors.secondary5
  },
  prevBillAmountStyle: {
    padding: 3
  },
  descriptionContainerStyle: {
    borderBottomColor: Colors.white_two,
    borderBottomWidth: 0.2,
    marginBottom: 24
  },
  billingNegativeValueNoteStyle: {
    color: Colors.light_grey,
    textAlign: 'right'
  }
})
