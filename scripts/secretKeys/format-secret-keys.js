#!/usr/bin/env node

const fs = require('fs')

const scriptArguments = process.argv.slice(2)

const exitWithError = function (str) {
  console.log(str)
  process.exit(1)
}

try {
  const keysContentFile = fs.readFileSync(scriptArguments[0])
  const jsonKeys = JSON.parse(keysContentFile)
  const envFile = scriptArguments[1] || process.env.ENVFILE

  !envFile && exitWithError('Error: Not Valid ENVFILE')

  const finalJsonKeys = {}
  for (const [key, value] of Object.entries(jsonKeys)) {
    if (key.substring(key.indexOf('.')) === envFile) {
      finalJsonKeys[key.substring(0, key.indexOf('.'))] = value
    }
  }

  Object.keys(finalJsonKeys).length === 0 &&
    exitWithError('Error: Not Valid JSON Keys')
  console.log(JSON.stringify(finalJsonKeys))
} catch (e) {
  exitWithError(`Error: Not Valid JSON File ${e}`)
}
