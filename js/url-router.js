const urlTitle = "Online Games";

const urlRoutes = {
    404: {
        title: "404 | " + urlTitle,
        template: "/pages/404.html",
    },
    "/": {
        title: "Home | " + urlTitle,
        template: "/pages/home.html",
        script: "/js/home.js",
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
        script: "/js/login.js",
        style: ""
    },
    "/set-game": {
        title: "Set | " + urlTitle,
        template: "/pages/set-game.html",
        script: "/js/set-game.js",
        style: "/styles/set-game.css"
    },
};

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.closest("a")?.href);
    urlHandleLocation();
};

const urlHandleLocation = async () => {
    const path = window.location.pathname;
    if (!path) {
        path = "/";
    }
    console.log(path);

    const route = urlRoutes[path] || urlRoutes[404];

    // Load the template
    const html = await fetch(route.template).then((data) => data.text());
    document.getElementById("main-content").innerHTML = html;

    document.title = route.title;

    // Remove the previous script
    const script = document.querySelector("#currentScript");
    if (script) {
        script.remove();
    }

    // Load the new script
    if (route.script) {
        const script = document.createElement("script");
        script.src = route.script;
        script.type = "module";
        script.id = "currentScript";
        document.body.appendChild(script);
    }

    // Remove the previous style sheet
    const previousStyle = document.querySelector('#currentStyle');
    if (previousStyle) {
        previousStyle.remove();
    }

    // Load the new style sheet
    if (route.style) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = route.style;
        styleLink.id = 'currentStyle';
        document.head.appendChild(styleLink);
    }
};

window.onpopstate = urlHandleLocation;
window.route = urlRoute;

document.body.addEventListener("click", (event) => {
    if (!event.target.closest("a")?.matches("[route-page]")) {
        return;
    }

    event.preventDefault();
    urlRoute(event);
});

urlHandleLocation();