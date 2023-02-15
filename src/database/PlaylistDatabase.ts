import { LikeDislikeDB, PlaylistDB, PlaylistWithCreatorDB, PLAYLIST_LIKE } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PlaylistDatabase extends BaseDatabase {
    public static TABLE_PLAYLISTS = "playlists"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public getPlaylistsWithCreators = async (): Promise<PlaylistWithCreatorDB[]> => {
        const result: PlaylistWithCreatorDB[] = await BaseDatabase
            .connection(PlaylistDatabase.TABLE_PLAYLISTS)
            .select(
                "playlists.id",
                "playlists.creator_id",
                "playlists.name",
                "playlists.likes",
                "playlists.dislikes",
                "playlists.created_at",
                "playlists.updated_at",
                "users.name AS creator_name"
            )
            .join("users", "playlists.creator_id", "=", "users.id")
        
        return result
    }

    public insert = async (playlistDB: PlaylistDB): Promise<void> => {
        await BaseDatabase
            .connection(PlaylistDatabase.TABLE_PLAYLISTS)
            .insert(playlistDB)
    }

    public findById = async (id: string): Promise<PlaylistDB | undefined> => {
        const result: PlaylistDB[] = await BaseDatabase
            .connection(PlaylistDatabase.TABLE_PLAYLISTS)
            .select()
            .where({ id })
        
        return result[0]
    }

    public update = async (
        id: string,
        playlistDB: PlaylistDB
    ): Promise<void> => {
        await BaseDatabase.connection(PlaylistDatabase.TABLE_PLAYLISTS)
            .update(playlistDB)
            .where({ id })
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(PlaylistDatabase.TABLE_PLAYLISTS)
            .delete()
            .where({ id })
    }

    public findPlaylistWithCreatorById = async (
        playlistId: string
    ): Promise<PlaylistWithCreatorDB | undefined> => {
        const result: PlaylistWithCreatorDB[] = await BaseDatabase
            .connection(PlaylistDatabase.TABLE_PLAYLISTS)
            .select(
                "playlists.id",
                "playlists.creator_id",
                "playlists.name",
                "playlists.likes",
                "playlists.dislikes",
                "playlists.created_at",
                "playlists.updated_at",
                "users.name AS creator_name"
            )
            .join("users", "playlists.creator_id", "=", "users.id")
            .where("playlists.id", playlistId)
        
        return result[0]
    }

    public likeOrDislikePlaylist = async (
        likeDislike: LikeDislikeDB
    ): Promise<void> => {
        await BaseDatabase.connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
            .insert(likeDislike)
    }

    public findLikeDislike = async (
        likeDislikeDBToFind: LikeDislikeDB
    ): Promise<PLAYLIST_LIKE | null> => {
        const [ likeDislikeDB ]: LikeDislikeDB[] = await BaseDatabase
            .connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: likeDislikeDBToFind.user_id,
                playlist_id: likeDislikeDBToFind.playlist_id
            })

        if (likeDislikeDB) {
            return likeDislikeDB.like === 1
                ? PLAYLIST_LIKE.ALREADY_LIKED
                : PLAYLIST_LIKE.ALREADY_DISLIKED

        } else {
            return null
        }
    }

    public removeLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
    ): Promise<void> => {
        await BaseDatabase.connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                playlist_id: likeDislikeDB.playlist_id
            })
    }

    public updateLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
    ) => {
        await BaseDatabase.connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                playlist_id: likeDislikeDB.playlist_id
            })
    }
}
