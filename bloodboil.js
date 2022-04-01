class Bloodboil {
    cookieName = 'twitch-widget-hidden';

    constructor(id, streamerName) {
        this.id = id;
        if (this.getCookie() != 'true') {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            } else {
                this.initDOM();
                this.player = new Trovo.TrovoPlayer('frame', {
                    width: 350,
                    height: 200,
                    enablejsapi: true,
                    streamername: streamerName,
                    origin: "https://tarkov.help",
                    events: {
                        onReady() {
                            console.log(player);
                            player.play();
                            player.mute();
                        },
                    onStateChange(state) {
                        if (state == 'ended') {
                            document.getElementById('stream-widget').style.display = 'none';
                        }
                    }
                }
                });
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
