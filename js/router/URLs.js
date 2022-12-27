const urlTitle = "Online Games";

const urlRoutes = {
    404: {
        title: "404 | " + urlTitle,
        template: "/pages/404.html",
    },
    "/": {
        title: "Home | " + urlTitle,
        template: "/pages/home.html",
        script: "/js/home-view.js",
        style: "/styles/home.css"
    },
    "/about": {
        title: "About | " + urlTitle,
        template: "/pages/about.html",
    },
    "/contact": {
        title: "Contact | " + urlTitle,
        template: "/pages/contact.html",
    },
    "/login": {
        title: "Login | " + urlTitle,
        template: "/pages/login.html",
        script: "/js/login-view.js",
        style: ""
    },
    "/set-game": {
        title: "Set | " + urlTitle,
        template: "/pages/set-game.html",
        script: "/js/set-game-view.js",
        style: "/styles/set-game.css"
    },
};

export { urlRoutes }