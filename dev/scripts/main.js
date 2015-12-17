var showMenu = (function () {

    var init = function () {
        _setUpListners();
    };

    var _setUpListners = function () {
        // прослушка событий
        document.getElementById("sidebar-toggle").addEventListener("click", toogleMenu);
        function toogleMenu() {
            document.querySelector(".wrapper").classList.toggle("open-sidebar");
        };
    }

    return {
        init : init
    }
})();

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(showMenu.init);