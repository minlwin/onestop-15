
export type PageSearch = {
  page?: number
  size?: number
}

export type PageResult<T> = {
    list: T[]
} & Pager

export type Pager = {
    page: number
    size: number
    totalCount: number
    totalPages: number
    links: number []
}

export const PAGEINFO:Pager = {
  links: [3 , 4, 5, 6, 7],
  page: 5,
  size: 10,
  totalCount: 152,
  totalPages: 16
}

export type MessageResult = {
    message: string
}

export type DataModificationResult<T> = {
    id: T
}

