import { PlaylistModel } from '../types'

export interface SignupInputDTO {
    name: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutputDTO {
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}

export interface GetPlaylistsInputDTO {
    token: string | undefined
}

export type GetPlaylistsOutputDTO = PlaylistModel[]

export interface CreatePlaylistInputDTO {
    token: string | undefined,
    name: unknown
}

export interface EditPlaylistInputDTO {
    idToEdit: string,
    token: string | undefined,
    name: unknown
}

export interface DeletePlaylistInputDTO {
    idToDelete: string,
    token: string | undefined
}

export interface LikeOrDislikePlaylistInputDTO {
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}