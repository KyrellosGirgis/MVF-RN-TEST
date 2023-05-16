/* eslint-disable import/no-dynamic-require */
const { execSync } = require('child_process')

const regex = /^ - Merge pull request #(\d+) from am-vodafone\/(.*)\s\(.*\)/
const releaseNotes = process.env.COMMIT_CHANGELOG.split('\n')
  .filter(
    (line) => line.includes('Merge pull request') && !line.includes('--skip-rn')
  )
  .map((line) => line.replace(regex, '- $2 (PR#$1)'))
  .join('\n')
execSync(`envman add --key Release_Notes --value "${releaseNotes}"`)
