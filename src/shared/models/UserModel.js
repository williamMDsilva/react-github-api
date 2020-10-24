export default class UserModel{
    constructor(data){
        this.login = data.login;
        this.node_id = data.node_id;
        this.id = data.id;
        this.html_url = data.html_url;
        this.avatar_url = data.avatar_url;
        this.url = data.url;
    }
}