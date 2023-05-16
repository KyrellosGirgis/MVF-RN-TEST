import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native'
import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import { saveLogsToFile } from 'App/Screens/DeveloperSettings/components/DeveloperSettingActions/DeveloperSettingActions.helper'

import styles from 'App/Screens/DeveloperSettings/components/SearchLogsViewComponent/SearchLogsViewComponent.styles'
import { testID } from 'App/Utils/Helpers/testId.helpers'

type SearchLogsViewComponentProps = {
  initialData: any
}
const SearchLogsViewComponent = (props: SearchLogsViewComponentProps) => {
  const { initialData } = props
  const [filteredData, setFilteredData] = useState(initialData)
  const [query, setQuery] = useState('')
  const initialDataIsArray = initialData instanceof Array
  const [path, setpath] = useState('')
  var fileName = '/logs.json'
  const onClickDownloadButton = async () => {
    const path = await saveLogsToFile(initialData, fileName)
    setpath(path)
  }
  const updateSearch = (query: String) => {
    var formatedQuery = query.toLowerCase().trim()
    setQuery(formatedQuery)
    if (formatedQuery) {
      var tempFilteredData
      if (!initialDataIsArray) {
        tempFilteredData = Object.keys(initialData)
          .filter((key) => key.toLocaleLowerCase().includes(formatedQuery))
          .reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: initialData[key]
            })
          }, {})
      } else {
        tempFilteredData = initialData.filter((key) => {
          var obj = JSON.stringify(key)
          return obj?.toLowerCase()?.includes(formatedQuery)
        })
      }
      setFilteredData(tempFilteredData)
    } else {
      setFilteredData(initialData)
    }
  }

  useEffect(() => {
    setFilteredData(initialData)
  }, [initialData])

  return (
    <>
      <Button
        testID={testID('DownloadBTN')}
        title="Download Full Logs"
        onPress={onClickDownloadButton}
      />
      <VFText testID={testID('PathTXT')} i18nKey={path} />
      <TextInput
        placeholder={'search logs'}
        onChangeText={updateSearch}
        value={query}
        style={styles.searchBar}
        testID={testID('searchBarTestId')}
      />
      <VFText
        testKey={testID('logsTestId')}
        style={styles.plainDataRowsText}
        selectable
      >
        {`${JSON.stringify(filteredData)}`}
      </VFText>
    </>
  )
}

export default SearchLogsViewComponent
