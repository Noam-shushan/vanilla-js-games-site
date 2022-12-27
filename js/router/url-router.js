/**
 * The router of the application
 * Handle the location change and load the new page with his script and style
 */

import { urlRoutes } from "./URLs.js";

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();

    // push the new state to the history to able to use the back and forward buttons
    window.history.pushState({}, "", event.target.closest("a")?.href);

    urlHandleLocation();
};

/**
 * Handle the location change and load the new page with his script and style
 */
const urlHandleLocation = async () => {
    const path = window.location.pathname;
    if (!path) {
        path = "/"; // go home page by default
    }
    // Get the route, or 404 if not found
    const route = urlRoutes[path] || urlRoutes[404];

    // Load the template
    const html = await fetch(route.template).then((data) => data.text());
    document.getElementById("main-content").innerHTML = html;

    document.title = route.title;

    // set the page script
    loadScript(route);

    // set the page style sheet
    loadCss(route);
};

/**
 * Load the script of the page,
 * remove the previous script if exists
 * @param {Object} route the route object
 */
function loadScript(route) {
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
}

/**
 * Load the style sheet of the page,
 * remove the previous style sheet if exists
 * @param {Object} route the route object
 */
function loadCss(route) {
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
}

window.onpopstate = urlHandleLocation;
window.route = urlRoute;

document.body.addEventListener("click", (event) => {
    // if the click is not on a link and the link is not a route page, return
    if (!event.target.closest("a")?.matches("[route-page]")) {
        return;
    }

    event.preventDefault();
    urlRoute();
});

// Load the initial page at the start
urlHandleLocation();


