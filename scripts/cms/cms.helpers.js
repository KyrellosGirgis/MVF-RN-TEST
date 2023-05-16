const getFileNameFromCMSItem = (cmsData) => {
  const { id, resource } = cmsData
  return id || resource.split('/').pop()
}

module.exports = { getFileNameFromCMSItem }
