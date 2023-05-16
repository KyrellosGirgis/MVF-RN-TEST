const exitTheProcessWithError = (error, callback) => {
  if (error && error instanceof Error) {
    callback?.(error)
  }

  process.exitCode = 1
}

module.exports = { exitTheProcessWithError }
