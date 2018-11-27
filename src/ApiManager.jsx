
import Cookies from 'js-cookie'


class ApiManager {
    constructor() {
        this.urls = {
            'profile': '/account/profile/',
            'login': '/api_auth/login/',
            'logout': '/api_auth/logout/',
            "blog": '/api/blog/article/',
            "tag": '/api/blog/tag/',
        }
        this.account = null;
        this.get_profile();
        console.log(this.account)
    }

    get(url) {
        return fetch(url, {
            method: "GET",
            credentials: 'include',
        });
    }

    getJson(url) {
        return this.get(url).then(req => req.json());
    }

    send(url, method, body) {
        console.log(Cookies.get('csrftoken'))
        return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken'),
            },
            credentials: 'include',
        }).then(req => req.json());
    }

    async get_profile() {
        // await (() => fetch('/account/profile/').then(req => req.json()).then(js => { this.account = js }))();
        this.account = await (() => fetch('/account/profile/').then(req => req.json()))();
        // console.log(this.account)
    }

    is_authenticated() {
        // console.log(this.account)
        return Boolean(this.account && this.account.is_authenticated);
    }

    username() {
        if (!this.is_authenticated()) {
            return null;
        }
        return this.account.username;
    }

    listBlog(page, offset) {
        return this.getJson(this.urls.blog);
    }

    getBlog(blog_id) {
        return this.getJson(`${this.urls.blog}/${blog_id}/`);
    }

    addBlog(title, content, is_private, tags) {
        return this.send(this.urls.blog, "POST", {title: title, content: content, is_private: is_private, tags: tags})
    }

    updateBlog(blog_id, title, content, is_private, tags) {
        return this.send(`${this.urls.blog}/${blog_id}/`, "PUT", {title: title, content: content, is_private: is_private, tags: tags})
    }

    listTag(name, page, offset) {
        return this.getJson(this.urls.tag+`?search=${name}`);
    }

    getTag(tag_id) {
        return this.getJson(`${this.urls.tag}/${tag_id}/`);
    }

    addTag(name, is_private) {
        return this.send(this.urls.tag, "POST", {name: name, is_private: is_private})
    }

    updateTag(tag_id, name, is_private) {
        return this.send(`${this.urls.tag}/${tag_id}/`, "PUT", {name: name, is_private: is_private})
    }
}


export default ApiManager;
