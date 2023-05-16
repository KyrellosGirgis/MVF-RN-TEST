import { schedule } from 'danger'
import { istanbulCoverage } from 'danger-plugin-istanbul-coverage'

schedule(
  istanbulCoverage({
    // Set a custom success message
    customSuccessMessage: 'Congrats, coverage is good',

    // Set a custom failure message
    customFailureMessage: 'Coverage is a little low, take a look',

    // How to sort the entries in the table

    // Add a maximum number of entries to display

    // The location of the istanbul coverage file.
    coveragePath: {
      path: './coverage/changed-files-coverage/lcov.info',
      type: 'lcov'
    },

    // Which set of files to summarise from the coverage file.
    reportFileSet: 'all', // || "modified" || "created" || "createdOrModified"
    // What to do when the PR doesn't meet the minimum code coverage threshold
    reportMode: 'fail', // || "warn" || "fail"

    // Minimum coverage threshold percentages. Compared against the cumulative coverage of the reportFileSet.
    threshold: {
      lines: 80,
      branches: 0,
      functions: 0,
      statements: 0
    }
  })
)
