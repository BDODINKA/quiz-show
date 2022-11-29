type DataType = {
  totalCount: number
  currentPage: number
  maxPages: number
  pageCount: number
  maxBtn: number
}

export const getPaginationPage = (data: DataType) => {
  let totalPages: number[] = []
  const selectMenuPages: number[] = []

  if (data.totalCount && data.currentPage) {
    if (data.maxPages <= data.maxBtn) {
      for (let i = 1; i <= data.maxPages; i++) {
        totalPages.push(i)
      }
    } else if (data.currentPage >= 4 && data.currentPage < data.maxPages) {
      for (let i = data.currentPage - 2; i <= data.currentPage + 2; i++) {
        totalPages.push(i)
      }
    } else if (data.currentPage >= 4 && data.currentPage === data.maxPages) {
      for (let i = data.currentPage - 2; i <= data.currentPage - 1; i++) {
        totalPages.push(i)
      }
    } else if (data.currentPage <= data.maxPages) {
      totalPages = Array(data.maxBtn)
        .fill(0)
        .map((_, i) => i + 1)
    } else if (data.currentPage > data.maxPages) {
      for (let i = data.maxPages - data.maxBtn; i <= data.maxPages; i++) {
        totalPages.push(i)
        totalPages = Array(data.maxBtn)
          .fill(0)
          .map((_, i) => i + 1)
      }
    }
  }

  for (let i = 1; i < data.maxPages + 1; i++) {
    selectMenuPages.push(i)
  }

  return { totalPages, selectMenuPages }
}
