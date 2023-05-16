const util = require('util')

const jestConfig = require('../../jest.config')
const exec = util.promisify(require('child_process').exec)
const { exitTheProcessWithError } = require('../helpers')

const getStderrLogsFunctions = (stderr) => {
  const stderrLines = stderr.split('\n')
  const coverageLineIndex = stderrLines.findIndex((line) =>
    line.includes('coverage threshold for lines')
  )
  const errorSummaryLines = stderr.split('\n').slice(coverageLineIndex)

  return {
    logTestCases: () => {
      stderrLines
        .slice(0, coverageLineIndex)
        .forEach((line) => console.log(line))
    },
    logCoverageSummary: () => {
      errorSummaryLines.forEach((errorLine) => console.log(errorLine))
    }
  }
}

const logCoverageTable = (stdout) => {
  const stdoutLines = stdout.split('\n')
  const coverageTableIndex = stdoutLines.findIndex((line) =>
    line.includes(' Uncovered Line')
  )
  const coverageTableRows = stdoutLines.slice(coverageTableIndex - 1)
  coverageTableRows.forEach((row) => console.log(row))
}

const detectChangedFiles = async () => {
  try {
    const { stdout, stderr } = await exec('git diff origin/develop --name-only')

    if (stderr) {
      throw new Error(stderr)
    }

    return stdout.replace(/\n/g, ' ').replace(/client\//g, ' ')
  } catch (error) {
    console.warn('No changed files, please check the following error')
    console.log(error)
  }
}

const runRelatedTests = async (isForBitrise) => {
  let changedFiles = await detectChangedFiles()

  const jestIgnoredFiles = [
    ...jestConfig.collectCoverageFrom,
    '!package.json',
    '!package-lock.json'
  ]
    .map((from) => `--collectCoverageFrom '${from}'`)
    .join(' ')

  if (!changedFiles) {
    changedFiles = ''
  }

  let collectCoverageFrom = changedFiles
    .trim()
    .split(' ')
    .map((from) => `--collectCoverageFrom '${from}'`)
    .join(' ')

  if (changedFiles.length !== 0) {
    collectCoverageFrom = collectCoverageFrom.concat(jestIgnoredFiles)
  } else {
    collectCoverageFrom = jestIgnoredFiles
  }

  let coverageThreshold = ''
  if (isForBitrise) {
    coverageThreshold = ' --coverageThreshold={}'
  }

  await exec(
    `jest --coverage --maxWorkers=8 ${collectCoverageFrom} --coverageDirectory='./coverage/changed-files-coverage'${coverageThreshold} --colors`,
    { maxBuffer: Number.MAX_SAFE_INTEGER },
    (error, stdout, stderr) => {
      const { logTestCases, logCoverageSummary } =
        getStderrLogsFunctions(stderr)
      logTestCases()
      logCoverageTable(stdout)

      if (error) {
        logCoverageSummary()
        exitTheProcessWithError()
      }
    }
  )
}
module.exports = {
  runRelatedTests
}
