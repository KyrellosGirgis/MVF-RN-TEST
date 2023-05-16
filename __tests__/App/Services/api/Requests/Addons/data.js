const addonsData = {
  digitalProductOffering: [
    {
      id: 'Vodafone Care',
      name: 'Vodafone Care',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      isBundle: false,
      lifecycleStatus: 'launched',
      isSellable: true,
      attachment: [
        {
          isDefault: true,
          relatedTo: 'details',
          description:
            'This is the image displayed when the customer selects this addon to check its details',
          id: 'socialPass',
          attachmentType: 'image',
          url: 'http://url.com/image.png',
          mimeType: 'image/png'
        },
        {
          isDefault: true,
          relatedTo: 'icon',
          description:
            'This image is the icon also need to be updated to use real URL',
          id: 'socialPass',
          attachmentType: 'image',
          url: 'http://url.com/image.png',
          mimeType: 'image/png'
        }
      ],
      digitalTerm: [
        {
          name: 'Commercial release',
          validFor: {
            startDateTime: '2022-10-27T10:16:40.610Z',
            endDateTime: '2022-11-6T10:16:40.610Z'
          }
        }
      ],
      digitalProductOfferingPrice: [
        {
          isDefault: true,
          id: 'P1',
          priceType: 'recurring',
          recurringChargePeriodType: 'month',
          recurringChargePeriodLength: 1,
          price: {
            value: 9.99,
            unit: 'EUR'
          }
        }
      ],
      digitalCharacteristic: [
        {
          name: 'renewal',
          digitalCharacteristicValue: [
            {
              id: 'isAutoRenewable',
              value: 'false'
            }
          ]
        },
        {
          name: 'slogan',
          digitalCharacteristicValue: [
            {
              id: 'slogan',
              value: "Don't get lost anywhere you travel this month."
            }
          ]
        }
      ]
    },
    {
      id: 'Video Vodafone Pass',
      name: 'Video Vodafone Pass',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      isBundle: false,
      lifecycleStatus: 'launched',
      isSellable: true,
      attachment: [
        {
          isDefault: true,
          relatedTo: 'details',
          description:
            'This is the image displayed when the customer selects this addon to check its details',
          id: 'videoPass',
          attachmentType: 'image',
          url: 'http://url.com/image.png',
          mimeType: 'image/png'
        },
        {
          isDefault: true,
          relatedTo: 'icon',
          description:
            'This image is the icon also need to be updated to use real URL',
          id: 'videoPass',
          attachmentType: 'image',
          url: 'http://url.com/image.png',
          mimeType: 'image/png'
        }
      ],
      digitalTerm: [
        {
          name: 'Commercial release',
          validFor: {
            startDateTime: '2022-10-28T10:16:40.610Z',
            endDateTime: '2022-11-1T10:16:40.610Z'
          }
        }
      ],
      digitalProductOfferingPrice: [
        {
          isDefault: true,
          id: 'P1',
          priceType: 'recurring',
          recurringChargePeriodType: 'month',
          recurringChargePeriodLength: 1,
          price: {
            value: '5.00',
            unit: 'EUR'
          }
        }
      ],
      digitalCharacteristic: [
        {
          name: 'renewal',
          digitalCharacteristicValue: [
            {
              id: 'isAutoRenewable',
              value: 'false'
            }
          ]
        },
        {
          name: 'slogan',
          digitalCharacteristicValue: [
            {
              id: 'slogan',
              value: "Don't get lost anywhere you travel this month."
            }
          ]
        }
      ]
    },
    {
      id: 'Long distance calls',
      name: 'Long distance calls',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      isBundle: false,
      lifecycleStatus: 'launched',
      isSellable: true,
      attachment: [
        {
          isDefault: true,
          relatedTo: 'details',
          description:
            'This is the image displayed when the customer selects this addon to check its details',
          id: 'romaing',
          attachmentType: 'image',
          url: 'http://url.com/image.png',
          mimeType: 'image/png'
        },
        {
          isDefault: true,
          relatedTo: 'icon',
          description:
            'This image is the icon also need to be updated to use real URL',
          id: 'roaming',
          attachmentType: 'image',
          url: 'http://url.com/image.png',
          mimeType: 'image/png'
        }
      ],
      digitalTerm: [
        {
          name: 'Commercial release',
          validFor: {
            startDateTime: '2022-10-28T10:16:40.610Z',
            endDateTime: '2022-11-1T10:16:40.610Z'
          }
        }
      ],
      digitalProductOfferingPrice: [
        {
          isDefault: true,
          id: 'P1',
          priceType: 'recurring',
          recurringChargePeriodType: 'month',
          recurringChargePeriodLength: 1,
          price: {
            value: '5.00',
            unit: 'EUR'
          }
        }
      ],
      digitalCharacteristic: [
        {
          name: 'renewal',
          digitalCharacteristicValue: [
            {
              id: 'isAutoRenewable',
              value: 'false'
            }
          ]
        },
        {
          name: 'slogan',
          digitalCharacteristicValue: [
            {
              id: 'slogan',
              value: "Don't get lost anywhere you travel this month."
            }
          ]
        }
      ]
    }
  ],
  product: [
    {
      id: '123456789',
      name: "Phil's Mobile Subscription",
      startDate: '2022-10-28T10:16:40.610Z',
      terminationDate: '2022-11-28T10:16:40.610Z',
      product: [
        {
          id: 'Social Pass',
          name: 'Social Pass',
          productCharacteristic: [
            {
              name: 'type',
              value: 'Social Pass'
            }
          ],
          productOffering: {
            id: 'Social Pass'
          },
          productPrice: [
            {
              priceType: 'recurring',
              recurringChargePeriod: 'montly',
              price: {
                taxRate: 20,
                dutyFreeAmount: {
                  unit: 'EUR',
                  value: 4.17
                },
                taxIncludedAmount: {
                  unit: 'EUR',
                  value: 0.83
                }
              }
            }
          ],
          relatedParty: [
            {
              id: '+44(0)78994621',
              role: 'Subscriber'
            }
          ],
          status: 'active'
        },
        {
          id: 'Video Vodafone Pass',
          name: 'Video Pass',
          productCharacteristic: [
            {
              name: 'type',
              value: 'Video Pass'
            }
          ],
          productOffering: {
            id: 'Video Pass'
          },
          productPrice: [
            {
              priceType: 'recurring',
              recurringChargePeriod: 'montly',
              price: {
                taxRate: 20,
                dutyFreeAmount: {
                  unit: 'EUR',
                  value: 4.17
                },
                taxIncludedAmount: {
                  unit: 'EUR',
                  value: 0.83
                }
              }
            }
          ],
          relatedParty: [
            {
              id: '+44(0)78994621',
              role: 'Subscriber'
            }
          ],
          status: 'active'
        },
        {
          id: 'Long distance calls',
          name: 'Long distance calls',
          productCharacteristic: [
            {
              name: 'type',
              value: 'Calls'
            }
          ],
          productOffering: {
            id: 'Video Pass'
          },
          productPrice: [
            {
              priceType: 'recurring',
              recurringChargePeriod: 'montly',
              price: {
                taxRate: 20,
                dutyFreeAmount: {
                  unit: 'EUR',
                  value: 10.0
                },
                taxIncludedAmount: {
                  unit: 'EUR',
                  value: 2.0
                }
              }
            }
          ],
          relatedParty: [
            {
              id: '+44(0)78994621',
              role: 'Subscriber'
            }
          ],
          status: 'active'
        },
        {
          id: 'Maps Vodafone Pass',
          name: 'Maps Pass',
          productCharacteristic: [
            {
              name: 'type',
              value: 'Calls'
            }
          ],
          productOffering: {
            id: 'Maps Pass'
          },
          productPrice: [
            {
              priceType: 'recurring',
              recurringChargePeriod: 'montly',
              price: {
                taxRate: 20,
                dutyFreeAmount: {
                  unit: 'EUR',
                  value: 10.0
                },
                taxIncludedAmount: {
                  unit: 'EUR',
                  value: 2.0
                }
              }
            }
          ],
          relatedParty: [
            {
              id: '+44(0)78994621',
              role: 'Subscriber'
            }
          ],
          status: 'active'
        },
        {
          id: 'Gaming Vodafone Pass',
          name: 'Gaming Pass',
          productCharacteristic: [
            {
              name: 'type',
              value: 'Calls'
            }
          ],
          productOffering: {
            id: 'Maps Pass'
          },
          productPrice: [
            {
              priceType: 'recurring',
              recurringChargePeriod: 'montly',
              price: {
                taxRate: 20,
                dutyFreeAmount: {
                  unit: 'EUR',
                  value: 10.0
                },
                taxIncludedAmount: {
                  unit: 'EUR',
                  value: 2.0
                }
              }
            }
          ],
          relatedParty: [
            {
              id: '+44(0)78994621',
              role: 'Subscriber'
            }
          ],
          status: 'active'
        }
      ],
      productPrice: [
        {
          priceType: 'recurring',
          recurringChargePeriod: 'month',
          price: {
            dutyFreeAmount: {
              unit: 'GBP',
              value: 22.5
            }
          }
        }
      ],
      relatedParty: [
        {
          id: '+44(0)78994621',
          role: 'Customer'
        }
      ],
      status: 'active'
    }
  ],
  isInlineContentEnabled: true,
  inlineContentData: {
    id: '1595418318650',
    name: 'Roaming pass',
    price: '5.00',
    leftIcon: 'roamingPassIcon',
    duration: 'month',
    unit: '€',
    title: 'Roaming Pass',
    subtitle: '5.00€ per month',
    rightIcon: 'roamingPassImage',
    description:
      'Traveling ? Add the roaming pass and stay in touch with everyone.',
    buttonTitle: 'Add'
  },
  addOnsCurrentPlan: {
    name: 'My Plan',
    startDate: '2022-11-01',
    endDate: '2022-12-01',
    isRenewable: true,
    value: 110.33,
    currency: '€',
    iconName: 'icMobile'
  }
}
export { addonsData }
