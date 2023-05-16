const CableResponse = [
  {
    id: 'urn:vf-de-dxl-tmf:kd:cable:can-document-id:432051461-1509255285',
    href: 'https://api.vodafone.de/mva/v1/tmf-api/document/v4/document/urn:vf-de-dxl-tmf:kd:cable:can-document-id:432051461-1509255285',
    creationDate: '2021-06-08T08:38:13Z',
    documentType: 'Zentraler Druck',
    name: 'Mahnung',
    relatedParty: [
      {
        id: 'urn:vf-de-dxl-tmf:kd:cable:can:432051461',
        role: 'CUSTOMER',
        '@type': 'RelatedParty'
      }
    ],
    '@type': 'Document'
  },
  {
    id: 'urn:vf-de-dxl-tmf:kd:cable:can-document-id:432051461-1498094093',
    href: 'https://api.vodafone.de/mva/v1/tmf-api/document/v4/document/urn:vf-de-dxl-tmf:kd:cable:can-document-id:432051461-1498094093',
    creationDate: '2021-04-27T10:40:24Z',
    documentType: 'Zentraler Druck',
    name: 'Zahlungserinnerung',
    relatedParty: [
      {
        id: 'urn:vf-de-dxl-tmf:kd:cable:can:432051461',
        role: 'CUSTOMER',
        '@type': 'RelatedParty'
      }
    ],
    '@type': 'Document'
  }
]

const expectedCableMappedValues = [
  {
    title: 'Mahnung',
    extras: {
      icon: 'id_document',
      unreadIcon: 'id_document'
    },
    sentDate: '2021-06-08T08:38:13Z',
    actionText1: 'messageCenter_download_button',
    action1:
      'pdf:https://api.vodafone.de/mva/v1/tmf-api/document/v4/document/urn:vf-de-dxl-tmf:kd:cable:can-document-id:432051461-1509255285',
    withShowMore: false,
    isRead: true,
    disableOpenDetails: true
  },
  {
    title: 'Zahlungserinnerung',
    extras: {
      icon: 'id_document',
      unreadIcon: 'id_document'
    },
    sentDate: '2021-04-27T10:40:24Z',
    actionText1: 'messageCenter_download_button',
    action1:
      'pdf:https://api.vodafone.de/mva/v1/tmf-api/document/v4/document/urn:vf-de-dxl-tmf:kd:cable:can-document-id:432051461-1498094093',
    withShowMore: false,
    isRead: true,
    disableOpenDetails: true
  }
]

export { CableResponse, expectedCableMappedValues }
