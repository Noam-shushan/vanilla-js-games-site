const urlTitle = "Online Games";

const urlRoutes = {
    404: {
        title: "404 | " + urlTitle,
        template: "/pages/404.html",
    },
    "/": {
        title: "Home | " + urlTitle,
        template: "/pages/home.html",
        script: "/js/views/home-view.js",
        style: "/styles/home.css"
    },
    "/in-devlopment": {
        title: "In Devlopment | " + urlTitle,
        template: "/pages/in-devlopment.html"
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
        script: "/js/views/login-view.js",
        style: ""
    },
    "/set-game": {
        title: "Set | " + urlTitle,
        template: "/pages/set-game.html",
        script: "/js/views/set-game-view.js",
        style: "/styles/set-game.css"
    },
    "/floppyBird": {
        title: "floppyBird | " + urlTitle,
        template: "/pages/floppyBird.html",
        script: "/js/Games/floppyBird/floppyBird.js",
    },
};

const urlHash = {
    404: {
        title: "404 | " + urlTitle,
        template: "/pages/404.html",
    },
    "/": {
        title: "Home | " + urlTitle,
        template: "/pages/home.html",
        script: "/js/views/home-view.js",
        style: "/styles/home.css"
    },
    inDevlopment: {
        title: "In Devlopment | " + urlTitle,
        template: "/pages/in-devlopment.html"
    },
    about: {
        title: "About | " + urlTitle,
        template: "/pages/about.html",
    },
    contact: {
        title: "Contact | " + urlTitle,
        template: "/pages/contact.html",
    },
    login: {
        title: "Login | " + urlTitle,
        template: "/pages/login.html",
        script: "/js/views/login-view.js",
        style: ""
    },
    setGame: {
        title: "Set | " + urlTitle,
        template: "/pages/set-game.html",
        script: "/js/views/set-game-view.js",
        style: "/styles/set-game.css"
    },
    floppyBird: {
        title: "floppyBird | " + urlTitle,
        template: "/pages/floppyBird.html",
        script: "/js/Games/floppyBird/floppyBird.js",
    },
};

export { urlRoutes, urlHash }