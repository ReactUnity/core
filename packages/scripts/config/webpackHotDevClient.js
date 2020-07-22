'use strict';


var stripAnsi = require('strip-ansi');
var url = require('url');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

// Connect to WebpackDevServer via a socket.
var connection = new WebSocket(
    url.format({
        protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
        hostname: process.env.WDS_SOCKET_HOST || window.location.hostname,
        port: process.env.WDS_SOCKET_PORT || window.location.port,
        // Hardcoded in WebpackDevServer
        pathname: process.env.WDS_SOCKET_PATH || '/sockjs-node',
        slashes: true,
    }), ['ws']
);


// Remember some state related to hot module replacement.
var isFirstCompilation = true;
var mostRecentCompilationHash = null;
var hasCompileErrors = false;

function clearOutdatedErrors() {
    // Clean up outdated compile errors, if any.
    if (typeof console !== 'undefined' && typeof console.clear === 'function') {
        if (hasCompileErrors) {
            console.clear();
        }
    }
}

// Successful compilation.
function handleSuccess() {
    clearOutdatedErrors();

    var isHotUpdate = !isFirstCompilation;
    isFirstCompilation = false;
    hasCompileErrors = false;

    // Attempt to apply hot updates or reload.
    if (isHotUpdate) {
        tryApplyUpdates();
    }
}

// Compilation with warnings (e.g. ESLint).
function handleWarnings(warnings) {
    clearOutdatedErrors();

    var isHotUpdate = !isFirstCompilation;
    isFirstCompilation = false;
    hasCompileErrors = false;

    function printWarnings() {
        // Print warnings to the console.
        var formatted = formatWebpackMessages({
            warnings: warnings,
            errors: [],
        });

        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            for (var i = 0; i < formatted.warnings.length; i++) {
                if (i === 5) {
                    console.warn(
                        'There were more warnings in other files.\n' +
                        'You can find a complete log in the terminal.'
                    );
                    break;
                }
                console.warn(stripAnsi(formatted.warnings[i]));
            }
        }
    }

    printWarnings();

    // Attempt to apply hot updates or reload.
    if (isHotUpdate) {
        tryApplyUpdates();
    }
}

// Compilation with errors (e.g. syntax error or missing modules).
function handleErrors(errors) {
    clearOutdatedErrors();

    isFirstCompilation = false;
    hasCompileErrors = true;

    // "Massage" webpack messages.
    var formatted = formatWebpackMessages({
        errors: errors,
        warnings: [],
    });

    // Also log them to the console.
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
        for (var i = 0; i < formatted.errors.length; i++) {
            console.error(stripAnsi(formatted.errors[i]));
        }
    }

    // Do not attempt to reload now.
    // We will reload on next success instead.
}

// There is a newer version of the code available.
function handleAvailableHash(hash) {
    // Update last known compilation hash.
    mostRecentCompilationHash = hash;
}

// Handle messages from the server.
connection.SetOnMessage(function (e) {
    var message = JSON.parse(e.Data);
    switch (message.type) {
        case 'hash':
            handleAvailableHash(message.data);
            break;
        case 'still-ok':
        case 'ok':
            handleSuccess();
            break;
        case 'content-changed':
            // Triggered when a file from `contentBase` changed.
            window.location.reload();
            break;
        case 'warnings':
            handleWarnings(message.data);
            break;
        case 'errors':
            handleErrors(message.data);
            break;
        default:
        // Do nothing.
    }
});
connection.ConnectAsync();

// Is there a newer version of this code available?
function isUpdateAvailable() {
    /* globals __webpack_hash__ */
    // __webpack_hash__ is the hash of the current compilation.
    // It's a global variable injected by webpack.
    return mostRecentCompilationHash !== __webpack_hash__;
}

// webpack disallows updates in other states.
function canApplyUpdates() {
    return module.hot.status() === 'idle';
}

// Attempt to update code on the fly, fall back to a hard reload.
function tryApplyUpdates() {
    window.location.reload();
    return;
}
