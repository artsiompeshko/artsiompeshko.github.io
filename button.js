import './styles/button.css'

$(function() {
    let loadButton = $('#loadButton');
    loadButton.on('click', e => {
            require.ensure([], function() {
                let app = require("./app");
                app();
                loadButton.hide();
            });
        }
    );
});
