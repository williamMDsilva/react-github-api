export default class UserModel{
    constructor(data){
        this.followers = data.followers;
        this.following = data.following;
    }
}