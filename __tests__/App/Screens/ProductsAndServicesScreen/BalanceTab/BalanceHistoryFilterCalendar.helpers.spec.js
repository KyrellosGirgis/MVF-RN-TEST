import { filterHistory } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.helpers'

describe('test balance tab helpers ', () => {
  const balanceData = [
    {
      id: 1,
      name: 'International calls',
      items: [
        {
          id: 10,
          icon: 'ic_outgoing_call',
          title: '+33 (0) 580979275',
          date: '2022-10-22T13:26:42.156Z',
          duration: '12m 34s',
          price: '2.83€',
          type: 'International calls'
        },
        {
          id: 11,
          icon: 'ic_outgoing_call',
          title: '+39 (0) 430456666',
          date: '2022-10-20T13:26:42.156Z',
          duration: '1 hr 12min',
          price: '5.30€',
          type: 'International calls'
        }
      ]
    },
    {
      id: 2,
      name: 'Local calls',
      items: [
        {
          id: 12,
          icon: 'ic_outgoing_call',
          title: '+44 (0) 780998927',
          date: '2022-10-17T13:26:42.156Z',
          duration: '12m 34s',
          price: '2.83€',
          type: 'Local calls'
        },
        {
          id: 13,
          icon: 'ic_outgoing_call',
          title: '+44 (0) 780998927',
          date: '2022-10-10T13:26:42.156Z',
          duration: '1 hr 40min',
          price: '2.83€',
          type: 'Local calls'
        }
      ]
    }
  ]
  const balanceDataAfterMapping = [
    {
      id: 1,
      name: 'International calls',
      items: [
        {
          id: 10,
          icon: 'ic_outgoing_call',
          title: '+33 (0) 580979275',
          date: '2022-10-22T13:26:42.156Z',
          duration: '12m 34s',
          price: '2.83€',
          type: 'International calls'
        },
        {
          id: 11,
          icon: 'ic_outgoing_call',
          title: '+39 (0) 430456666',
          date: '2022-10-20T13:26:42.156Z',
          duration: '1 hr 12min',
          price: '5.30€',
          type: 'International calls'
        }
      ]
    },
    {
      id: 2,
      name: 'Local calls',
      items: [
        {
          id: 12,
          icon: 'ic_outgoing_call',
          title: '+44 (0) 780998927',
          date: '2022-10-17T13:26:42.156Z',
          duration: '12m 34s',
          price: '2.83€',
          type: 'Local calls'
        }
      ]
    }
  ]
  const emptyItems = [
    {
      id: 1,
      items: [],
      name: 'International calls'
    },
    {
      id: 2,
      items: [],
      name: 'Local calls'
    }
  ]

  test('should filter data correctly based on startDate and endDate of selected interval from calendar', async () => {
    const mappedData = filterHistory({
      startDate: '2022-10-16T13:26:42.156Z',
      endDate: '2022-10-27T13:26:42.156Z',
      originalData: balanceData
    })
    expect(mappedData).toEqual(balanceDataAfterMapping)
  })

  test('should return empty items array if no data within range ', async () => {
    const mappedData = filterHistory({
      startDate: '2022-10-15T13:26:42.156Z',
      endDate: '2022-10-16T13:26:42.156Z',
      originalData: balanceData
    })
    expect(mappedData).toEqual(emptyItems)
  })
})
