class Bloodboil {
    options = {
        width: 350,
        height: 200,
        enablejsapi: true,
        origin: "https://tarkov.help",
        events: {
            onReady() {
                this.play();
                this.mute();
            },
            onStateChange(state) {
                if (state == 'ended') {
                    document.getElementById('player').style.display = 'none';
                }
            }
        }
    };

    cookieName = 'twitch-widget-hidden';

    constructor(id, streamerName) {
        this.id = id;
        this.options.streamername = streamerName;
        if (this.getCookie() != 'true') {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            } else {
                this.initDOM();
                new Trovo.TrovoPlayer('frame', this.options);
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
        var widget = document.getElementById(this.id);
        widget.innerHTML = '<div id="header"><div id="text">Заходи на стрим, дружище!</div><span id="close-btn"/></div><div id="frame"></div>';
        widget.style.display = 'block';
    }

    initListeners() {
        let setCookie = this.setCookie.bind(this);
        var close = document.getElementById('close-btn');
        close.addEventListener('click', function () {
            widget.style.display = 'none';
            widget.innerHTML = '';
            setCookie();
        });
    }
}

new Bloodboil('stream-widget', 'TheBlindShogun');
