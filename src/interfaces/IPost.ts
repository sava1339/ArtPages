export interface IPost{
    id:string,
    community_id:string,
    user_id:string,
    post_file_path:string,
    post_file:string,
    title:string,
    desc:string,
    votes:any,
    created_at:number,
    comment_count:number
}