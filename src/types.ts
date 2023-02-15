export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
	name: string,
    role: USER_ROLES
}

export interface PlaylistModel {
    id: string,
    name: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface PlaylistDB {
    id: string,
    creator_id: string,
    name: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface PlaylistWithCreatorDB extends PlaylistDB {
    creator_name: string
}

export interface LikeDislikeDB {
    user_id: string,
    playlist_id: string,
    like: number
}

export enum PLAYLIST_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}