class Bloodboil {
    cookieName = 'twitch-widget-hidden';

    constructor(id, streamerName) {
        this.id = id;
        if (this.getCookie() != 'true') {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            } else {
                this.initDOM();
                this.frame = document.getElementById('frame');
                this.frame.innerHTML = '<iframe src="https://player.trovo.live/embed/player?streamername=' + streamerName + '&muted=1&autoplay=1&hidefollow=1&hidesub=1" height="200" width="350" allowfullscreen="true"></iframe>';
                this.initListeners();
            }
        }
    }

    getCookie() {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + this.cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie() {
        document.cookie = this.cookieName + "=true; max-age=172800; secure; path=/";
    }

    initDOM() {
        this.widget = document.getElementById(this.id);
        this.widget.innerHTML = '<div id="header"><div id="text">Заходи на стрим, дружище!</div><span id="close-btn"/></div><div id="frame"></div>';
        this.widget.style.display = 'block';
    }

    initListeners() {
        let setCookie = this.setCookie.bind(this);
        let widget = this.widget;
        var close = document.getElementById('close-btn');
        close.addEventListener('click', function () {
            widget.style.display = 'none';
            widget.innerHTML = '';
            setCookie();
        });
    }
}

let TrovoPlayer = new Bloodboil('stream-widget', 'Dunduk');
