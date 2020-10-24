const BASE_URL = "https://api.github.com";

export default class GitHubApi{
    static async list() {
        return await fetch(`${BASE_URL}/users?per_page=10`).then(res => res.json() ?? []);
    }

    static async profile(profileApi){
        return await fetch(profileApi).then(res => res.json() ??{});
    }
}
        