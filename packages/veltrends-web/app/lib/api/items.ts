import { client } from '../client'
import { type Item, type GetItemsResult, LikeItemResult } from './types'
import qs from 'qs'

export async function createItem(params: CreateItemParams) {
  const response = await client.post<Item>('/api/items', params)
  return response.data
}

export async function getItems(cursor?: number) {
  const response = await client.get<GetItemsResult>(
    '/api/items'.concat(
      qs.stringify(
        { cursor },
        {
          addQueryPrefix: true,
        },
      ),
    ),
  )
  return response.data
}

export async function likeItem(itemId: number) {
  const response = await client.post<LikeItemResult>(`/api/items/${itemId}/likes`)
  return response.data
}

export async function unlikeItem(itemId: number) {
  const response = await client.delete<LikeItemResult>(`/api/items/${itemId}/likes`)
  return response.data
}

interface CreateItemParams {
  link: string
  title: string
  body: string
}
