export interface IChatRoom{
    id:string,
    created_at:string,
    name:string,
    members_count:number,
    member_uuids:string[],
    avatar?:string
}