import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'
import { ApiRoutes } from 'App/Services'

const loadPDF = async (PDFLink: string) => {
  try {
    const { apiId } = ApiRoutes.DXL.documentDetails
    const { data } = await DXLAxios.get(PDFLink, { apiId })
    return data
  } catch (error) {
    throw error
  }
}
export { loadPDF }
