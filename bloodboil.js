class Bloodboil {
    cookieName = 'twitch-widget-hidden';
    // Порядок показа стримеров (больше ключ - ниже приоритет)
    streamerOrder = [
        'tarkovhelp',
        'theblindshogun',
        'goldencargo',
        'dunduk'
    ];

    constructor(id) {
        this.id = id;
        let streamerName = '';

        if (this.getCookie() != 'true') {
            // Не показываем на мобильных устройствах
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            } else {
                for (const streamer of this.streamerOrder) {
                    if (this.checkOnline(streamer) === true) {
                        streamerName = streamer;
                        break;
                    }
                }

                if (streamerName.length > 0) {
                    this.initDOM();
                    this.frame = document.getElementById('frame');
                    this.frame.innerHTML = '<iframe src="https://player.trovo.live/embed/player?streamername=' + streamerName + '&muted=1&autoplay=1&hidefollow=1&hidesub=1" height="200" width="350" allowfullscreen="true"></iframe>';
                    this.initListeners();
                }
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

    checkOnline(streamerName) {
       let myHeaders = new Headers();
        myHeaders.append("Client-ID", "7c5066daa26a52998c95152dad2931a7");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": streamerName
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let online = false;
        
        this.fetchData(requestOptions).then(result => online = result);
        
        return online;
    }
    
    async fetchData(requestOptions)
    {
        const response = await fetch("https://open-api.trovo.live/openplatform/channels/id", requestOptions);
        const streamerInfo = await response.text();

        return streamerInfo.hasOwnProperty('is_live') && streamerInfo.is_live === true;
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

let TrovoPlayer = new Bloodboil('stream-widget');
