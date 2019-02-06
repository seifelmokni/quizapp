! function (r, u) {
    "use strict";
    var c = "function",
        i = "undefined",
        m = "object",
        s = "model",
        e = "name",
        o = "type",
        n = "vendor",
        a = "version",
        d = "architecture",
        t = "console",
        l = "mobile",
        w = "tablet",
        b = "smarttv",
        p = "wearable",
        g = {
            extend: function (i, s) {
                var e = {};
                for (var o in i) s[o] && s[o].length % 2 == 0 ? e[o] = s[o].concat(i[o]) : e[o] = i[o];
                return e
            },
            has: function (i, s) {
                return "string" == typeof i && -1 !== s.toLowerCase().indexOf(i.toLowerCase())
            },
            lowerize: function (i) {
                return i.toLowerCase()
            },
            major: function (i) {
                return "string" == typeof i ? i.replace(/[^\d\.]/g, "").split(".")[0] : u
            },
            trim: function (i) {
                return i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            }
        },
        f = {
            rgx: function (i, s) {
                for (var e, o, r, n, a, d, t = 0; t < s.length && !a;) {
                    var l = s[t],
                        w = s[t + 1];
                    for (e = o = 0; e < l.length && !a;)
                        if (a = l[e++].exec(i))
                            for (r = 0; r < w.length; r++) d = a[++o], typeof (n = w[r]) === m && 0 < n.length ? 2 == n.length ? typeof n[1] == c ? this[n[0]] = n[1].call(this, d) : this[n[0]] = n[1] : 3 == n.length ? typeof n[1] !== c || n[1].exec && n[1].test ? this[n[0]] = d ? d.replace(n[1], n[2]) : u : this[n[0]] = d ? n[1].call(this, d, n[2]) : u : 4 == n.length && (this[n[0]] = d ? n[3].call(this, d.replace(n[1], n[2])) : u) : this[n] = d || u;
                    t += 2
                }
            },
            str: function (i, s) {
                for (var e in s)
                    if (typeof s[e] === m && 0 < s[e].length) {
                        for (var o = 0; o < s[e].length; o++)
                            if (g.has(s[e][o], i)) return "?" === e ? u : e
                    } else if (g.has(s[e], i)) return "?" === e ? u : e;
                return i
            }
        },
        h = {
            browser: {
                oldsafari: {
                    version: {
                        "1.0": "/8",
                        1.2: "/1",
                        1.3: "/3",
                        "2.0": "/412",
                        "2.0.2": "/416",
                        "2.0.3": "/417",
                        "2.0.4": "/419",
                        "?": "/"
                    }
                }
            },
            device: {
                amazon: {
                    model: {
                        "Fire Phone": ["SD", "KF"]
                    }
                },
                sprint: {
                    model: {
                        "Evo Shift 4G": "7373KT"
                    },
                    vendor: {
                        HTC: "APA",
                        Sprint: "Sprint"
                    }
                }
            },
            os: {
                windows: {
                    version: {
                        ME: "4.90",
                        "NT 3.11": "NT3.51",
                        "NT 4.0": "NT4.0",
                        2e3: "NT 5.0",
                        XP: ["NT 5.1", "NT 5.2"],
                        Vista: "NT 6.0",
                        7: "NT 6.1",
                        8: "NT 6.2",
                        8.1: "NT 6.3",
                        10: ["NT 6.4", "NT 10.0"],
                        RT: "ARM"
                    }
                }
            }
        },
        v = {
            browser: [
                [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                [e, a],
                [/(opios)[\/\s]+([\w\.]+)/i],
                [
                    [e, "Opera Mini"], a
                ],
                [/\s(opr)\/([\w\.]+)/i],
                [
                    [e, "Opera"], a
                ],
                [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i],
                [e, a],
                [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                [
                    [e, "IE"], a
                ],
                [/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i],
                [
                    [e, "Edge"], a
                ],
                [/(yabrowser)\/([\w\.]+)/i],
                [
                    [e, "Yandex"], a
                ],
                [/(puffin)\/([\w\.]+)/i],
                [
                    [e, "Puffin"], a
                ],
                [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
                [
                    [e, "UCBrowser"], a
                ],
                [/(comodo_dragon)\/([\w\.]+)/i],
                [
                    [e, /_/g, " "], a
                ],
                [/(micromessenger)\/([\w\.]+)/i],
                [
                    [e, "WeChat"], a
                ],
                [/(qqbrowserlite)\/([\w\.]+)/i],
                [e, a],
                [/(QQ)\/([\d\.]+)/i],
                [e, a],
                [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
                [e, a],
                [/(BIDUBrowser)[\/\s]?([\w\.]+)/i],
                [e, a],
                [/(2345Explorer)[\/\s]?([\w\.]+)/i],
                [e, a],
                [/(MetaSr)[\/\s]?([\w\.]+)/i],
                [e],
                [/(LBBROWSER)/i],
                [e],
                [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                [a, [e, "MIUI Browser"]],
                [/;fbav\/([\w\.]+);/i],
                [a, [e, "Facebook"]],
                [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i],
                [e, a],
                [/headlesschrome(?:\/([\w\.]+)|\s)/i],
                [a, [e, "Chrome Headless"]],
                [/\swv\).+(chrome)\/([\w\.]+)/i],
                [
                    [e, /(.+)/, "$1 WebView"], a
                ],
                [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
                [
                    [e, /(.+(?:g|us))(.+)/, "$1 $2"], a
                ],
                [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
                [a, [e, "Android Browser"]],
                [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
                [e, a],
                [/(dolfin)\/([\w\.]+)/i],
                [
                    [e, "Dolphin"], a
                ],
                [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                [
                    [e, "Chrome"], a
                ],
                [/(coast)\/([\w\.]+)/i],
                [
                    [e, "Opera Coast"], a
                ],
                [/fxios\/([\w\.-]+)/i],
                [a, [e, "Firefox"]],
                [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                [a, [e, "Mobile Safari"]],
                [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                [a, e],
                [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                [
                    [e, "GSA"], a
                ],
                [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                [e, [a, f.str, h.browser.oldsafari.version]],
                [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                [e, a],
                [/(navigator|netscape)\/([\w\.-]+)/i],
                [
                    [e, "Netscape"], a
                ],
                [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
                [e, a]
            ],
            cpu: [
                [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                [
                    [d, "amd64"]
                ],
                [/(ia32(?=;))/i],
                [
                    [d, g.lowerize]
                ],
                [/((?:i[346]|x)86)[;\)]/i],
                [
                    [d, "ia32"]
                ],
                [/windows\s(ce|mobile);\sppc;/i],
                [
                    [d, "arm"]
                ],
                [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                [
                    [d, /ower/, "", g.lowerize]
                ],
                [/(sun4\w)[;\)]/i],
                [
                    [d, "sparc"]
                ],
                [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
                [
                    [d, g.lowerize]
                ]
            ],
            device: [
                [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                [s, n, [o, w]],
                [/applecoremedia\/[\w\.]+ \((ipad)/],
                [s, [n, "Apple"],
                    [o, w]
                ],
                [/(apple\s{0,1}tv)/i],
                [
                    [s, "Apple TV"],
                    [n, "Apple"]
                ],
                [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
                [n, s, [o, w]],
                [/(kf[A-z]+)\sbuild\/.+silk\//i],
                [s, [n, "Amazon"],
                    [o, w]
                ],
                [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
                [
                    [s, f.str, h.device.amazon.model],
                    [n, "Amazon"],
                    [o, l]
                ],
                [/android.+aft([bms])\sbuild/i],
                [s, [n, "Amazon"],
                    [o, b]
                ],
                [/\((ip[honed|\s\w*]+);.+(apple)/i],
                [s, n, [o, l]],
                [/\((ip[honed|\s\w*]+);/i],
                [s, [n, "Apple"],
                    [o, l]
                ],
                [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
                [n, s, [o, l]],
                [/\(bb10;\s(\w+)/i],
                [s, [n, "BlackBerry"],
                    [o, l]
                ],
                [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],
                [s, [n, "Asus"],
                    [o, w]
                ],
                [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                [
                    [n, "Sony"],
                    [s, "Xperia Tablet"],
                    [o, w]
                ],
                [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],
                [s, [n, "Sony"],
                    [o, l]
                ],
                [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                [n, s, [o, t]],
                [/android.+;\s(shield)\sbuild/i],
                [s, [n, "Nvidia"],
                    [o, t]
                ],
                [/(playstation\s[34portablevi]+)/i],
                [s, [n, "Sony"],
                    [o, t]
                ],
                [/(sprint\s(\w+))/i],
                [
                    [n, f.str, h.device.sprint.vendor],
                    [s, f.str, h.device.sprint.model],
                    [o, l]
                ],
                [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
                [n, s, [o, w]],
                [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],
                [n, [s, /_/g, " "],
                    [o, l]
                ],
                [/(nexus\s9)/i],
                [s, [n, "HTC"],
                    [o, w]
                ],
                [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i],
                [s, [n, "Huawei"],
                    [o, l]
                ],
                [/(microsoft);\s(lumia[\s\w]+)/i],
                [n, s, [o, l]],
                [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                [s, [n, "Microsoft"],
                    [o, t]
                ],
                [/(kin\.[onetw]{3})/i],
                [
                    [s, /\./g, " "],
                    [n, "Microsoft"],
                    [o, l]
                ],
                [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i],
                [s, [n, "Motorola"],
                    [o, l]
                ],
                [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                [s, [n, "Motorola"],
                    [o, w]
                ],
                [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                [
                    [n, g.trim],
                    [s, g.trim],
                    [o, b]
                ],
                [/hbbtv.+maple;(\d+)/i],
                [
                    [s, /^/, "SmartTV"],
                    [n, "Samsung"],
                    [o, b]
                ],
                [/\(dtv[\);].+(aquos)/i],
                [s, [n, "Sharp"],
                    [o, b]
                ],
                [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
                [
                    [n, "Samsung"], s, [o, w]
                ],
                [/smart-tv.+(samsung)/i],
                [n, [o, b], s],
                [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i],
                [
                    [n, "Samsung"], s, [o, l]
                ],
                [/sie-(\w*)/i],
                [s, [n, "Siemens"],
                    [o, l]
                ],
                [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
                [
                    [n, "Nokia"], s, [o, l]
                ],
                [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
                [s, [n, "Acer"],
                    [o, w]
                ],
                [/android.+([vl]k\-?\d{3})\s+build/i],
                [s, [n, "LG"],
                    [o, w]
                ],
                [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                [
                    [n, "LG"], s, [o, w]
                ],
                [/(lg) netcast\.tv/i],
                [n, s, [o, b]],
                [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i],
                [s, [n, "LG"],
                    [o, l]
                ],
                [/android.+(ideatab[a-z0-9\-\s]+)/i],
                [s, [n, "Lenovo"],
                    [o, w]
                ],
                [/linux;.+((jolla));/i],
                [n, s, [o, l]],
                [/((pebble))app\/[\d\.]+\s/i],
                [n, s, [o, p]],
                [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
                [n, s, [o, l]],
                [/crkey/i],
                [
                    [s, "Chromecast"],
                    [n, "Google"]
                ],
                [/android.+;\s(glass)\s\d/i],
                [s, [n, "Google"],
                    [o, p]
                ],
                [/android.+;\s(pixel c)\s/i],
                [s, [n, "Google"],
                    [o, w]
                ],
                [/android.+;\s(pixel [xl2]{1,2}|pixel)\s/i],
                [s, [n, "Google"],
                    [o, l]
                ],
                [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],
                [
                    [s, /_/g, " "],
                    [n, "Xiaomi"],
                    [o, l]
                ],
                [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],
                [
                    [s, /_/g, " "],
                    [n, "Xiaomi"],
                    [o, w]
                ],
                [/android.+;\s(m[1-5]\snote)\sbuild/i],
                [s, [n, "Meizu"],
                    [o, w]
                ],
                [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i],
                [s, [n, "OnePlus"],
                    [o, l]
                ],
                [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
                [s, [n, "RCA"],
                    [o, w]
                ],
                [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
                [s, [n, "Dell"],
                    [o, w]
                ],
                [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
                [s, [n, "Verizon"],
                    [o, w]
                ],
                [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
                [
                    [n, "Barnes & Noble"], s, [o, w]
                ],
                [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
                [s, [n, "NuVision"],
                    [o, w]
                ],
                [/android.+;\s(k88)\sbuild/i],
                [s, [n, "ZTE"],
                    [o, w]
                ],
                [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
                [s, [n, "Swiss"],
                    [o, l]
                ],
                [/android.+[;\/]\s*(zur\d{3})\s+build/i],
                [s, [n, "Swiss"],
                    [o, w]
                ],
                [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
                [s, [n, "Zeki"],
                    [o, w]
                ],
                [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],
                [
                    [n, "Dragon Touch"], s, [o, w]
                ],
                [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
                [s, [n, "Insignia"],
                    [o, w]
                ],
                [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
                [s, [n, "NextBook"],
                    [o, w]
                ],
                [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
                [
                    [n, "Voice"], s, [o, l]
                ],
                [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
                [
                    [n, "LvTel"], s, [o, l]
                ],
                [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
                [s, [n, "Envizen"],
                    [o, w]
                ],
                [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
                [n, s, [o, w]],
                [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
                [s, [n, "MachSpeed"],
                    [o, w]
                ],
                [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
                [n, s, [o, w]],
                [/android.+[;\/]\s*TU_(1491)\s+build/i],
                [s, [n, "Rotor"],
                    [o, w]
                ],
                [/android.+(KS(.+))\s+build/i],
                [s, [n, "Amazon"],
                    [o, w]
                ],
                [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
                [n, s, [o, w]],
                [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                [
                    [o, g.lowerize], n, s
                ],
                [/(android[\w\.\s\-]{0,9});.+build/i],
                [s, [n, "Generic"]]
            ],
            engine: [
                [/windows.+\sedge\/([\w\.]+)/i],
                [a, [e, "EdgeHTML"]],
                [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                [e, a],
                [/rv\:([\w\.]{1,9}).+(gecko)/i],
                [a, e]
            ],
            os: [
                [/microsoft\s(windows)\s(vista|xp)/i],
                [e, a],
                [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
                [e, [a, f.str, h.os.windows.version]],
                [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                [
                    [e, "Windows"],
                    [a, f.str, h.os.windows.version]
                ],
                [/\((bb)(10);/i],
                [
                    [e, "BlackBerry"], a
                ],
                [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, /linux;.+(sailfish);/i],
                [e, a],
                [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
                [
                    [e, "Symbian"], a
                ],
                [/\((series40);/i],
                [e],
                [/mozilla.+\(mobile;.+gecko.+firefox/i],
                [
                    [e, "Firefox OS"], a
                ],
                [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i],
                [e, a],
                [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                [
                    [e, "Chromium OS"], a
                ],
                [/(sunos)\s?([\w\.\d]*)/i],
                [
                    [e, "Solaris"], a
                ],
                [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
                [e, a],
                [/(haiku)\s(\w+)/i],
                [e, a],
                [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],
                [
                    [a, /_/g, "."],
                    [e, "iOS"]
                ],
                [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
                [
                    [e, "Mac OS"],
                    [a, /_/g, "."]
                ],
                [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]*)/i],
                [e, a]
            ]
        },
        x = function (i, s) {
            if ("object" == typeof i && (s = i, i = u), !(this instanceof x)) return new x(i, s).getResult();
            var e = i || (r && r.navigator && r.navigator.userAgent ? r.navigator.userAgent : ""),
                o = s ? g.extend(v, s) : v;
            return this.getBrowser = function () {
                var i = {
                    name: u,
                    version: u
                };
                return f.rgx.call(i, e, o.browser), i.major = g.major(i.version), i
            }, this.getCPU = function () {
                var i = {
                    architecture: u
                };
                return f.rgx.call(i, e, o.cpu), i
            }, this.getDevice = function () {
                var i = {
                    vendor: u,
                    model: u,
                    type: u
                };
                return f.rgx.call(i, e, o.device), i
            }, this.getEngine = function () {
                var i = {
                    name: u,
                    version: u
                };
                return f.rgx.call(i, e, o.engine), i
            }, this.getOS = function () {
                var i = {
                    name: u,
                    version: u
                };
                return f.rgx.call(i, e, o.os), i
            }, this.getResult = function () {
                return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU()
                }
            }, this.getUA = function () {
                return e
            }, this.setUA = function (i) {
                return e = i, this
            }, this
        };
    x.VERSION = "0.7.18", x.BROWSER = {
        NAME: e,
        MAJOR: "major",
        VERSION: a
    }, x.CPU = {
        ARCHITECTURE: d
    }, x.DEVICE = {
        MODEL: s,
        VENDOR: n,
        TYPE: o,
        CONSOLE: t,
        MOBILE: l,
        SMARTTV: b,
        TABLET: w,
        WEARABLE: p,
        EMBEDDED: "embedded"
    }, x.ENGINE = {
        NAME: e,
        VERSION: a
    }, x.OS = {
        NAME: e,
        VERSION: a
    }, typeof exports !== i ? (typeof module !== i && module.exports && (exports = module.exports = x), exports.UAParser = x) : typeof define === c && define.amd ? define(function () {
        return x
    }) : r && (r.UAParser = x);
    var k = r && (r.jQuery || r.Zepto);
    if (typeof k !== i && !k.ua) {
        var y = new x;
        k.ua = y.getResult(), k.ua.get = function () {
            return y.getUA()
        }, k.ua.set = function (i) {
            y.setUA(i);
            var s = y.getResult();
            for (var e in s) k.ua[e] = s[e]
        }
    }
}("object" == typeof window ? window : this);
var oSpPOptions = {
    sAppUrl: "https://quizvideo.com",
    sAppUrlShow: "https://quizvideo.com",
    sOrigUrl: "https://quizvideo.com",
    sOrigFFUrl: "https://quizvideo.com",
    sPushHost: "a99adac6e62846541d596a1c701158a0",
    bHttps: oSpP = !1,
    bSendToParent: false,
    aBrowser: {},
    sBrowser: "",
    sOs: "",
    sSafariPushId: "web.com.sendpulse.push",
    sServerApi: "https://pushdata.sendpulse.com:4434",
    sServerStatApi: "https://pushdata.sendpulse.com:4435",
    gcmServer: "https://android.googleapis.com/gcm/send/",
    bAutoSubscribe: true,
    sAppKey: "8e6687c4d84313986dfd8723e5bfee42",
    prompt_settings: "",
    prompt_title: "",
    prompt_text: "",
    prompt_description: "-",
    currentDB: null,
    parentEvent: null,
    initedPage: !1,
    parentVariables: {},
    pushedVariables: {},
    pushedInterval: !1,
    sFirefoxServer: "https://updates.push.services.mozilla.com/push/",
    sFirefoxServer2: "https://updates.push.services.mozilla.com/wpush/v1/",
    bWasPrompt: !1,
    startTime: 0,
    isParentAutoSubscribe: false,
    bSentToServer: !1,
    bSentStatOpened: !1,
    bSentStatPermission: !1,
    bMobileEnabled: true,
    show_splogo: "1",
    spdomain_website: "https://sendpulse.com/webpush-powered-by-sendpulse?sn=c29meW1hLmNvbQ%3D%3D&from=6912989",
    aPoweredbySendpulse: {
        ru: "ÐŸÑ€ÐµÐ´Ð¾ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð¾ SendPulse",
        en: "Powered by SendPulse",
        ua: "ÐÐ°Ð´Ð°Ð½Ð¾ SendPulse"
    },
    iPromptDelay: "0"
};

function oSendpulsePush() {
    var s = oSpPOptions.sAppUrl,
        t = oSpPOptions.sAppUrlShow,
        u = oSpPOptions.sOrigUrl,
        n = oSpPOptions.sOrigFFUrl,
        c = oSpPOptions.sPushHost,
        r = oSpPOptions.bHttps,
        d = oSpPOptions.bSendToParent,
        m = oSpPOptions.aBrowser,
        i = oSpPOptions.sBrowser,
        S = oSpPOptions.sOs,
        o = oSpPOptions.sSafariPushId,
        P = oSpPOptions.sServerApi,
        p = (oSpPOptions.sServerStatApi, oSpPOptions.gcmServer),
        a = oSpPOptions.bAutoSubscribe,
        b = oSpPOptions.sAppKey,
        y = oSpPOptions.prompt_settings,
        O = oSpPOptions.prompt_title,
        D = oSpPOptions.prompt_text,
        l = oSpPOptions.prompt_description,
        h = oSpPOptions.currentDB,
        f = oSpPOptions.parentEvent,
        g = oSpPOptions.initedPage,
        v = oSpPOptions.parentVariables,
        w = oSpPOptions.pushedVariables,
        A = oSpPOptions.pushedInterval,
        k = oSpPOptions.sFirefoxServer,
        x = oSpPOptions.sFirefoxServer2,
        T = oSpPOptions.bWasPrompt,
        _ = oSpPOptions.startTime,
        C = oSpPOptions.isParentAutoSubscribe,
        I = oSpPOptions.bSentToServer,
        E = oSpPOptions.bSentStatOpened,
        L = oSpPOptions.bSentStatPermission,
        M = oSpPOptions.bMobileEnabled,
        H = oSpPOptions.show_splogo,
        B = oSpPOptions.spdomain_website,
        V = oSpPOptions.aPoweredbySendpulse,
        e = oSpPOptions.iPromptDelay,
        N = new Date,
        U = new Date(N.getFullYear(), N.getMonth() + 1, N.getDate()).getTime();
    this.start = function () {
        if (!oSpP.detectSite()) return oSpP.log("Application allowed only for " + s), !1;
        if ("iOS" == oSpP.detectOs()) return oSpP.log("Application can not work on iOS"), !1;
        if (S = oSpP.detectOs(), !M && ("iOS" == S || "Android" == S)) return oSpP.log("Application disabled for your device"), !1;
        if (oSpP.detectHttps(), m = oSpP.detectBrowser(), "firefox" == (i = m.name.toLowerCase()) && parseFloat(m.version) < 44) return oSpP.log("Application can not work with Firefox browser version less then 44"), !1;
        if ("opera" == i && parseFloat(m.version) < 43) return oSpP.log("Application can not work with Opera browser version less then 43"), !1;
        if ("firefox" == i && (u = n), d) {
            C && (L = E = !0);
            var e = setInterval(function () {
                I && E && L && (oSpP.sendToParent("closeme"), clearInterval(e))
            }, 50)
        }
        if (r)
            if (a) oSpP.startDelayedSubscription(function () {
                oSpP.startSubscription(), "safari" != i && "chrome" != i && "firefox" != i && "opera" != i || oSpP.showhelpPromptText(), oSpP.isServiceWorkerChromeSupported() && oSpP.showPushLabel()
            });
            else {
                oSpP.getDbValue("SPIDs", "PromptClosed", function (e) {
                    void 0 === e.target.result && ("safari" != i && "chrome" != i && "firefox" != i && "opera" != i || oSpP.startDelayedSubscription(function () {
                        oSpP.showCustomPrompt()
                    }))
                });
                for (var t = document.querySelectorAll(".sp_notify_prompt"), o = 0; o < t.length; o++) t[o].addEventListener("click", function () {
                    oSpP.startSubscription()
                })
            } d && window.addEventListener("message", function (e) {
            if (oSpP.detectOrigin(e.origin))
                if ("init" == e.data)(f = e).source.postMessage("initend", f.origin);
                else if (0 === e.data.indexOf("initpage")) {
                2 == (t = e.data.split("|")).length && (g = t[1], localStorage.setItem("source_url", g))
            } else if (0 === e.data.indexOf("initvariables")) {
                var t = e.data.split("|");
                v = JSON.parse(t[1])
            }
        }, !1)
    }, this.startSubscription = function () {
        switch (i) {
            case "safari":
                if (oSpP.isSafariNotificationSupported()) {
                    var e = window.safari.pushNotification.permission(o);
                    oSpP.checkSafariPermission(e)
                }
                break;
            case "chrome":
            case "firefox":
            case "opera":
                if (r) {
                    var t = document.createElement("link");
                    t.rel = "manifest", t.href = "/sp-push-manifest.json", document.head.insertBefore(t, document.head.firstChild)
                }
                oSpP.isServiceWorkerChromeSupported() && (oSpP.log("ASK for Permission"), _ = Date.now(), Notification.requestPermission(oSpP.doActionsWithPermissions), oSpP.registerChrome())
        }
    }, this.clearDomain = function (e) {
        return e.replace("://www.", "://").replace("://www2.", "://")
    }, this.detectSite = function () {
        var e = !(-1 === oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(s.toLowerCase())));
        return e || (e = !(-1 === oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(t.toLowerCase())))), e
    }, this.detectOrigin = function (e) {
        return !(-1 === oSpP.clearDomain(e.toLowerCase()).indexOf(oSpP.clearDomain(u.toLowerCase())))
    }, this.detectHttps = function () {
        r = 0 === window.location.href.indexOf("https://")
    }, this.log = function (e) {}, this.detectBrowser = function () {
        var e, t = navigator.userAgent,
            o = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
            s = t.match(/(edge(?=\/))\/?\s*(\d+)/i) || [];
        return "Edge" === s[1] ? {
            name: s[1],
            version: s[2]
        } : /trident/i.test(o[1]) ? {
            name: "IE",
            version: (e = /\brv[ :]+(\d+)/g.exec(t) || [])[1] || ""
        } : "Chrome" === o[1] && null != (e = t.match(/\bOPR\/(\d+)/)) ? {
            name: "Opera",
            version: e[1]
        } : (o = o[2] ? [o[1], o[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = t.match(/version\/(\d+)/i)) && o.splice(1, 1, e[1]), {
            name: o[0],
            version: o[1]
        })
    }, this.isServiceWorkerChromeSupported = function () {
        return "serviceWorker" in navigator
    }, this.isSafariNotificationSupported = function () {
        return "safari" in window && "pushNotification" in window.safari
    }, this.getBrowserlanguage = function () {
        return navigator.language.substring(0, 2)
    }, this.setCookie = function (e, t, o) {
        var s = new Date;
        s.setTime(s.getTime() + 24 * o * 60 * 60 * 1e3);
        var n = "expires=" + s.toUTCString();
        document.cookie = e + "=" + t + "; " + n
    }, this.checkCookie = function (e) {
        for (var t = e + "=", o = document.cookie.split(";"), s = 0; s < o.length; s++) {
            for (var n = o[s];
                " " == n.charAt(0);) n = n.substring(1);
            if (0 == n.indexOf(t)) return n.substring(t.length, n.length)
        }
        return ""
    }, this.doActionsWithPermissions = function (e) {
        var t = Date.now() - _;
        switch (T = !(t < 50), oSpP.log("[DD] Permissions: " + e), oSpP.log("[DD] Time diff: " + t), e) {
            case "granted":
                switch (C || T && oSpP.getDbValue("SPIDs", "PromptShowed", function (e) {
                    void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.sendPromptStat("prompt_granted"), oSpP.putValueToDb("SPIDs", {
                        type: "PromptShowed",
                        value: 1
                    })) : (oSpP.sendPromptStat("prompt_showed_again"), oSpP.sendPromptStat("prompt_granted"))
                }), i) {
                    case "chrome":
                    case "firefox":
                    case "opera":
                        oSpP.subscribe()
                }
                break;
            case "default":
                C || T && oSpP.getDbValue("SPIDs", "PromptShowed", function (e) {
                    void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.sendPromptStat("prompt_closed"), oSpP.putValueToDb("SPIDs", {
                        type: "PromptShowed",
                        value: 1
                    })) : (oSpP.sendPromptStat("prompt_showed_again"), oSpP.sendPromptStat("prompt_closed"))
                });
                break;
            case "denied":
                C || T && oSpP.getDbValue("SPIDs", "PromptShowed", function (e) {
                    void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.sendPromptStat("prompt_denied"), oSpP.putValueToDb("SPIDs", {
                        type: "PromptShowed",
                        value: 1
                    })) : (oSpP.sendPromptStat("prompt_showed_again"), oSpP.sendPromptStat("prompt_denied"))
                })
        }
        a ? "default" == e ? oSpP.closePromptHelpText(!1) : oSpP.closePromptHelpText(!0) : "default" == e ? oSpP.closeCustomPrompt(!1) : oSpP.closeCustomPrompt(!0), oSpP.closePushLabel()
    }, this.registerChrome = function () {
        navigator.serviceWorker.register("/sp-push-worker.js").then(function (e) {
            e.installing ? oSpP.log("Service worker installing") : e.waiting ? oSpP.log("Service worker installed") : e.active && oSpP.log("Service worker active")
        })
    }, this.checkSafariPermission = function (e) {
        oSpP.log("[DD] Permissions: " + e.permission), "default" === e.permission ? (a ? oSpP.closePromptHelpText(!1) : oSpP.closeCustomPrompt(!1), T = !0, oSpP.getDbValue("SPIDs", "PromptShowed", function (e) {
            void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.putValueToDb("SPIDs", {
                type: "PromptShowed",
                value: 1
            })) : oSpP.sendPromptStat("prompt_showed_again")
        }), window.safari.pushNotification.requestPermission(P, o, {
            appkey: b
        }, oSpP.checkSafariPermission)) : "denied" === e.permission ? (a ? oSpP.closePromptHelpText(!0) : oSpP.closeCustomPrompt(!0), T && oSpP.sendPromptStat("prompt_denied")) : "granted" === e.permission && (oSpP.uns(), a ? oSpP.closePromptHelpText(!0) : oSpP.closeCustomPrompt(!0), T && oSpP.sendPromptStat("prompt_granted"), oSpP.subscribe()), oSpP.closePushLabel()
    }, this.initialiseState = function (e) {
        e.showNotification || oSpP.log("Notifications aren't supported on service workers."), "denied" !== Notification.permission ? "PushManager" in window || oSpP.log("Push messaging isn't supported.") : oSpP.log("The user has blocked notifications.")
    }, this.endpointWorkaround = function (e) {
        switch (i) {
            case "chrome":
            case "opera":
                if ("subscriptionId" in e) var t = e.subscriptionId;
                else t = e.endpoint;
                return ~t.indexOf(p) ? t.split(p)[1] : t;
            case "firefox":
                return ~(t = e.endpoint).indexOf(k) ? t.split(k)[1] : ~t.indexOf(x) ? t.split(x)[1] : t
        }
    }, this.subscribe = function () {
        switch (i) {
            case "chrome":
            case "firefox":
            case "opera":
                navigator.serviceWorker.ready.then(function (e) {
                    e.pushManager.subscribe({
                        userVisibleOnly: !0
                    }).then(function (e) {
                        var t = oSpP.endpointWorkaround(e),
                            o = e.getKey ? e.getKey("p256dh") : "",
                            s = o ? btoa(String.fromCharCode.apply(null, new Uint8Array(o))) : "",
                            n = e.getKey ? e.getKey("auth") : "",
                            r = n ? btoa(String.fromCharCode.apply(null, new Uint8Array(n))) : "";
                        oSpP.checkLocalSubsctoption(t, s, r), d && oSpP.sendToParent(t)
                    })
                });
                break;
            case "safari":
                var e = window.safari.pushNotification.permission(o);
                if ("granted" === e.permission) {
                    var t = e.deviceToken;
                    oSpP.checkLocalSubsctoption(t), d && oSpP.sendToParent(t)
                }
        }
    }, this.checkLocalSubsctoption = function (t, o, s) {
        oSpP.log("[DD] subscribe :: subscriptionId: " + t), oSpP.getDbValue("SPIDs", "SubscriptionId", function (e) {
            void 0 === e.target.result ? (oSpP.sendSubscribeDataToServer(t, "subscribe", void 0, o, s), oSpP.putValueToDb("SPIDs", {
                type: "SubscriptionId",
                value: t
            })) : e.target.result.value !== t && (oSpP.sendSubscribeDataToServer(e.target.result.value, "unsubscribe"), oSpP.sendSubscribeDataToServer(t, "subscribe", void 0, o, s), oSpP.putValueToDb("SPIDs", {
                type: "SubscriptionId",
                value: t
            }))
        })
    }, this.unsubscribe = function () {
        switch (i) {
            case "chrome":
            case "firefox":
            case "opera":
                navigator.serviceWorker.ready.then(function (e) {
                    e.pushManager.getSubscription().then(function (e) {
                        oSpP.endpointWorkaround(e);
                        e && e.unsubscribe().then(function (e) {})
                    })
                });
                break;
            case "safari":
                var e = window.safari.pushNotification.permission(safariPushId);
                if ("granted" === e.permission) e.deviceToken
        }
    }, this.getUserVariables = function () {
        for (var e = {}, t = document.querySelectorAll("input.sp_push_custom_data"), o = 0; o < t.length; o++) switch (t[o].type) {
            case "text":
            case "hidden":
                e[t[o].name] = t[o].value;
                break;
            case "checkbox":
                e[t[o].name] = t[o].checked ? 1 : 0;
                break;
            case "radio":
                t[o].checked && (e[t[o].name] = t[o].value)
        }
        return e
    }, this.sendSubscribeDataToServer = function (e, t, o, s, n) {
        var r = new XMLHttpRequest;
        d && "subscribe" == t && (r.onreadystatechange = function () {
            4 == r.readyState && 200 == r.status && (I = !0)
        }), r.open("POST", P, !0), r.setRequestHeader("Content-Type", "application/json"), void 0 === o && ((o = {}).uname = oSpP.checkCookie("lgn"), o.os = oSpP.detectOs()), void 0 === s && (s = ""), o.variables = d ? v : oSpP.getUserVariables();
        var i, p = -(new Date).getTimezoneOffset() / 60;
        if (o.timezoneoffset = p, g) i = g;
        else {
            var a = localStorage.getItem("source_url");
            i = a || window.location.href
        }
        var l = {
            action: "subscription",
            subscriptionId: e,
            subscription_action: t,
            appkey: b,
            browser: m,
            lang: oSpP.getBrowserlanguage(),
            url: i,
            sPubKey: s,
            sAuthKey: n,
            sPushHostHash: c,
            custom_data: o
        };
        r.send(JSON.stringify(l))
    }, this.initDb = function (t) {
        if (h) t();
        else {
            var e = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open("sendpulse_push_db", 2);
            e.onsuccess = function (e) {
                h = e.target.result, t()
            }, e.onupgradeneeded = function (e) {
                e.target.result.createObjectStore("SPIDs", {
                    keyPath: "type"
                })
            }
        }
    }, this.getDbValue = function (e, t, o) {
        oSpP.initDb(function () {
            h.transaction([e], "readonly").objectStore(e).get(t).onsuccess = o
        })
    }, this.putValueToDb = function (e, t) {
        oSpP.initDb(function () {
            h.transaction([e], "readwrite").objectStore(e).put(t)
        })
    }, this.deleteDbValue = function (e, t) {
        oSpP.initDb(function () {
            h.transaction([e], "readwrite").objectStore(e).delete(t)
        })
    }, this.uns = function () {
        oSpP.deleteDbValue("SPIDs", "SubscriptionId")
    }, this.detectOs = function () {
        return -1 != navigator.userAgent.indexOf("Windows") ? "Windows" : -1 != navigator.userAgent.indexOf("Android") ? "Android" : -1 != navigator.userAgent.indexOf("Linux") ? "Linux" : -1 != navigator.userAgent.indexOf("iPhone") ? "iOS" : -1 != navigator.userAgent.indexOf("iPad") ? "iOS" : -1 != navigator.userAgent.indexOf("Mac") ? "Mac OS" : -1 != navigator.userAgent.indexOf("FreeBSD") ? "FreeBSD" : ""
    }, this.sendToParent = function (e) {
        if (null === f) var t = setInterval(function () {
            null !== f && (f.source.postMessage(e, f.origin), clearInterval(t))
        }, 100);
        else f.source.postMessage(e, f.origin)
    }, this.push = function (e, t) {
        if (!oSpP.detectSite()) return oSpP.log("Application allowed only for " + s), !1;
        w[e] = t, oSpP.getDbValue("SPIDs", "SubscriptionId", function (e) {
            void 0 === e.target.result ? A || (A = setInterval(function () {
                oSpP.getDbValue("SPIDs", "SubscriptionId", function (e) {
                    void 0 !== e.target.result && (oSpP.sendUpdatesToServer(e.target.result.value), clearInterval(A), A = !1)
                })
            }, 1e3)) : oSpP.sendUpdatesToServer(e.target.result.value)
        })
    }, this.sendUpdatesToServer = function (e) {
        var t = new XMLHttpRequest;
        t.open("POST", P, !0), t.setRequestHeader("Content-Type", "application/json");
        var o = {
            action: "subscription",
            subscriptionId: e,
            subscription_action: "update_variables",
            appkey: b,
            sPushHostHash: c,
            custom_data: {
                variables: w
            }
        };
        t.send(JSON.stringify(o))
    }, this.sendPromptStat = function (e) {}, this.showhelpPromptText = function () {
        var e = document.getElementsByTagName("head")[0],
            t = document.createElement("link");
        if (t.rel = "stylesheet", t.type = "text/css", t.href = "https://cdn.sendpulse.com/dist/css/push/sendpulse-prompt.min.css?v=" + U, t.media = "all", e.appendChild(t), 0 <= l.length && "-" != l) {
            var o = document.createElement("div");
            o.setAttribute("class", "sendpulse-backdrop-info"), o.setAttribute("style", "display:none;");
            var s = document.createElement("div");
            s.setAttribute("class", "backdrop-close"), s.innerHTML += "<big>Ã—</big><br><small>ESC</small>", s.setAttribute("onclick", "oSpP.closePromptHelpText(false); return false;"), o.appendChild(s);
            var n = document.createElement("div");
            n.setAttribute("class", "backdrop-message"), n.innerHTML += l, o.appendChild(n), document.body.insertBefore(o, document.body.childNodes[0]), setTimeout(function () {
                oSpP.getDbValue("SPIDs", "PromptClosed", function (e) {
                    void 0 === e.target.result && (o.className += o.className ? " show-prompt" : "show-prompt")
                })
            }, 1e3)
        }
    }, this.showPushLabel = function () {
        var e = !0,
            t = new UAParser,
            o = t.getBrowser();
        if (o.os = t.getOS().name, void 0 !== H && 0 == H && (e = !1), e) {
            var s = document.createElement("div"),
                n = '<a class="sp-brand-link" target="_blank" href="' + B + (-1 !== B.indexOf("?") ? "&" : "?") + "utm_source=" + encodeURI(u.replace(/(^\w+:|^)\/\//, "")) + '&utm_medium=referral&utm_campaign=pushrequest">Web Push <span>SendPulse</span></a>';
            if (document.getElementsByClassName("sendpulse-backdrop-info").length) s.setAttribute("class", "sp-bottom-push-label sp-show"), s.innerHTML += n, document.getElementsByClassName("sendpulse-backdrop-info")[0].appendChild(s);
            else {
                var r = "sp-" + S.toLowerCase().replace(" ", ""),
                    i = "sp-lang-" + oSpP.getBrowserlanguage().toLowerCase().replace(" ", ""),
                    p = "sp-" + o.name.toLowerCase().replace(" ", ""),
                    a = p + o.major;
                s.setAttribute("style", "display:none"), s.setAttribute("class", "sp-webpush-label " + r + " " + p + " " + i + " " + a), s.setAttribute("onclick", "this.remove();");
                var l = document.createElement("div");
                l.setAttribute("class", "sp-inner-content"), l.innerHTML += n, s.appendChild(l), document.body.insertBefore(s, document.body.childNodes[0])
            }
            setTimeout(function () {
                if (null !== document.querySelector(".sp-webpush-label")) {
                    var e = document.querySelector(".sp-webpush-label");
                    e.setAttribute("class", e.getAttribute("class") + " sp-show")
                }
            }, 1e3)
        }
    }, this.showCustomPrompt = function () {
        oSpP.getDbValue("SPIDs", "PromptShowed", function (e) {
            void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.putValueToDb("SPIDs", {
                type: "PromptShowed",
                value: 1
            })) : oSpP.sendPromptStat("prompt_showed_again")
        });
        var e, t = document.getElementsByTagName("head")[0],
            o = document.createElement("link");
        o.rel = "stylesheet", o.type = "text/css", o.href = "https://cdn.sendpulse.com/dist/css/push/sendpulse-prompt.min.css?v=" + U, o.media = "all", t.appendChild(o);
        var s = "sendpulse-popover",
            n = "display:none;",
            r = !0;
        void 0 !== H && 0 == H && (r = !1);
        var i = oSpP.getMessageLang(oSpP.getBrowserlanguage());
        if (0 < y.length) {
            var p = '<svg style="display: none;"><symbol id="sp_bell_icon"><path d="M139.165 51.42L103.39 15.558C43.412 61.202 3.74 132.185 0 212.402h50.174c3.742-66.41 37.877-124.636 88.99-160.98zM474.98 212.403h50.173c-3.742-80.217-43.413-151.2-103.586-196.845L385.704 51.42c51.398 36.346 85.533 94.572 89.275 160.982zm-49.388 12.582c0-77-53.39-141.463-125.424-158.487v-17.09c0-20.786-16.76-37.613-37.592-37.613s-37.592 16.827-37.592 37.614v17.09C152.95 83.52 99.56 148.004 99.56 224.983v137.918L49.408 413.01v25.076h426.336V413.01l-50.152-50.108V224.984zM262.576 513.358c3.523 0 6.76-.22 10.065-1.007 16.237-3.237 29.825-14.528 36.06-29.626 2.517-5.952 4.05-12.494 4.05-19.54H212.4c0 27.593 22.582 50.174 50.174 50.174z" /></symbol></svg>';
            s = (e = JSON.parse(y)).style;
            var a = document.createElement("div");
            a.setAttribute("class", "sendpulse-prompt " + s), 0 < e.backgroundcolor.length && (n = n + "background-color: " + e.backgroundcolor + ";"), a.setAttribute("style", n);
            var l = document.createElement("div");
            l.setAttribute("class", "sendpulse-prompt-message");
            var u = document.createElement("img");
            if (u.setAttribute("class", "sendpulse-bell-icon"), u.setAttribute("width", "14"), u.setAttribute("height", "14"), u.setAttribute("src", "https://cdn.sendpulse.com/img/push/icon-ring.svg"), r) {
                var c = document.createElement("span");
                c.setAttribute("class", "sp-link-wrapper");
                var d = document.createElement("a");
                d.setAttribute("class", "sp-link"), d.setAttribute("href", B), d.setAttribute("target", "_blank");
                var m = document.createElement("span");
                m.innerHTML = V[i], "sendpulse-bar" != s && (d.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAk1BMVEUNkaAmtrIltLEMj58Mj58mtrIks7EfrK0MkKD///8Pk6EmtrIisK8cp6oTmaQRlqIZoqkVnKaz4OL7/v7t+PhjvsT4/P3l9vbY8PDM6uy74+Ww3uGc2dt3ysx1xMoyrLLx+fro9vat4+Kj2t2NztOB0dF/yc5myMhevsNMwL8/u7pMsLlDr7cyuLY9sbY7p7IkpazkILODAAAABnRSTlPn5ubmSkmZnvKZAAAAiElEQVQI10XHVRbCQBBE0SJGeoCxuONu+18dpDPn5P7UK4SL1WwRwovYnl7jeIgmBd14sWZ3ogsHlqwjOnG4b8uknf6G7dqi5oAevelalXo4ZBqaiIYu+Vr622oYY9K+qcwzy865NZBS2iY9ypGREkqpPqGHciCE+FAuhQPEsUjr2AECP575wQ+doQxkp1hUBQAAAABJRU5ErkJggg==">'), d.appendChild(m), c.appendChild(d)
            }
            if ("sendpulse-bar" == s) {
                (b = document.createElement("div")).setAttribute("class", "sendpulse-prompt-info sendpulse-prompt-message-text"), b.setAttribute("style", "color: " + e.textcolor + " !important;"), b.innerHTML += D;
                var S = document.createElement("span");
                l.innerHTML += p + '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon"><use class="sendpulse-bell-path" style="fill: ' + e.textcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>'
            } else if ("sendpulse-fab" == s) {
                (b = document.createElement("div")).setAttribute("class", "sendpulse-prompt-title sendpulse-prompt-message-text"), 0 < e.textcolor.length && b.setAttribute("style", "color: " + e.textcolor + " !important;"), b.innerHTML = O, (S = document.createElement("div")).setAttribute("class", "sendpulse-prompt-info sendpulse-prompt-message-text"), 0 < e.textcolor.length && S.setAttribute("style", "color: " + e.textcolor + " !important;"), S.innerHTML += D;
                var P = document.createElement("div");
                P.setAttribute("class", "sendpulse-prompt-fab sp_notify_prompt"), P.setAttribute("onclick", "oSpP.startSubscription(); return false;"), 0 < e.btncolor.length && P.setAttribute("style", "background-color: " + e.btncolor + " !important;"), P.innerHTML += p + '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon" ><use class="sendpulse-bell-path bell-prompt-fab" style="fill: ' + e.iconcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" /></svg>'
            } else if ("sendpulse-modal" == s || "sendpulse-safari" == s) {
                var b;
                (b = document.createElement("div")).setAttribute("class", "sendpulse-prompt-title sendpulse-prompt-message-text"), 0 < e.textcolor.length && b.setAttribute("style", "color: " + e.textcolor + " !important;"), b.innerHTML = O, (S = document.createElement("div")).setAttribute("class", "sendpulse-prompt-info sendpulse-prompt-message-text"), 0 < e.textcolor.length && S.setAttribute("style", "color: " + e.textcolor + " !important;"), S.innerHTML += D, "sendpulse-safari" == s ? (u.setAttribute("src", "https://cdn.sendpulse.com" + e.icon), u.setAttribute("width", "64"), u.setAttribute("height", "64"), l.appendChild(u)) : l.innerHTML += p + '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon"><use class="sendpulse-bell-path" style="fill: ' + e.textcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>'
            }
            if ("sendpulse-fab" != s) {
                var h = document.createElement("div");
                h.setAttribute("class", "sendpulse-prompt-buttons");
                var f = document.createElement("button");
                f.setAttribute("class", "sendpulse-prompt-btn sendpulse-accept-btn sp_notify_prompt"), f.setAttribute("type", "button"), f.setAttribute("onclick", "oSpP.startSubscription();oSpP.closeCustomPrompt(false); return false;");
                var g = document.createElement("button");
                if (g.setAttribute("class", "sendpulse-prompt-btn sendpulse-disallow-btn"), g.setAttribute("type", "button"), g.setAttribute("onclick", "oSpP.sendPromptStat('prompt_denied');oSpP.closeCustomPrompt(true); return false;"), f.innerHTML = e.allowbtntext, g.innerHTML = e.disallowbtntext, f.setAttribute("style", "background-color:" + e.buttoncolor + " !important;border-color:" + e.buttoncolor + " !important;"), g.setAttribute("style", "color:" + e.buttoncolor + " !important;"), h.appendChild(g), h.appendChild(f), r && "sendpulse-modal" == s) {
                    var v = document.createElement("div");
                    v.innerHTML = "&nbsp;", h.appendChild(v)
                }
            }
            if (l.appendChild(b), l.appendChild(S), "sendpulse-fab" != s ? (l.appendChild(h), r && void 0 !== c && h.appendChild(c), a.appendChild(l)) : (r && void 0 !== c && l.appendChild(c), a.appendChild(l), a.appendChild(P)), "sendpulse-fab" != s) {
                var w = document.createElement("button");
                w.setAttribute("class", "sendpulse-prompt-close"), w.setAttribute("onclick", "oSpP.closeCustomPrompt(false); return false;"), w.setAttribute("style", "color:" + e.textcolor + " !important;"), w.innerHTML = "&times;", a.appendChild(w)
            }
            if (document.body.insertBefore(a, document.body.childNodes[0]), "sendpulse-modal" == s) {
                var A = document.createElement("div");
                A.setAttribute("class", "sendpulse-prompt-backdrop"), A.setAttribute("style", "display:none;"), document.body.insertBefore(A, document.body.childNodes[1])
            }
            setTimeout(function () {
                a.className += a.className ? " show-prompt" : "show-prompt"
            }, 1e3)
        }
    }, this.closeCustomPrompt = function (e) {
        oSpP.sendPromptStat("prompt_closed"), null !== document.querySelector(".sendpulse-prompt") && document.body.removeChild(document.querySelector(".sendpulse-prompt")), e && oSpP.putValueToDb("SPIDs", {
            type: "PromptClosed",
            value: 1
        })
    }, this.closePromptHelpText = function (e) {
        null !== document.querySelector(".sendpulse-backdrop-info") && document.body.removeChild(document.querySelector(".sendpulse-backdrop-info")), e && (oSpP.sendPromptStat("prompt_closed"), oSpP.putValueToDb("SPIDs", {
            type: "PromptClosed",
            value: 1
        }))
    }, this.closePushLabel = function () {
        null !== document.querySelector(".sp-bottom-push-label") && document.querySelector(".sp-bottom-push-label").remove(), null !== document.querySelector(".sp-webpush-label") && document.querySelector(".sp-webpush-label").remove()
    }, this.getMessageLang = function (e) {
        return "ua" == (e = e.substring(0, 2).toLowerCase()) || "uk" == e ? "ua" : "ru" == e ? "ru" : "en"
    }, this.getPromptDelay = function () {
        return parseInt(e)
    }, this.startDelayedSubscription = function (t) {
        if (0 < parseInt(e)) var o = setInterval(function () {
            oSpP.getDbValue("SPIDs", "PromptDelay", function (e) {
                void 0 !== e.target.result ? (new Date).getTime() >= e.target.result.value && (clearInterval(o), t()) : (clearInterval(o), t())
            })
        }, 1e3);
        else t()
    }, this.getAuthEmailFromUrl = function () {
        var e = window.location.href,
            t = new RegExp("[?&]spush(=([^&#]*)|&|#|$)").exec(e);
        if (t && t[2]) {
            var o = atob(decodeURIComponent(t[2].replace(/\+/g, " ")));
            void 0 !== o && 0 < o.length && oSpP.push("email", o)
        }
    }
}
window.addEventListener("load", function () {
    0 < oSpP.getPromptDelay() ? oSpP.getDbValue("SPIDs", "PromptDelay", function (e) {
        void 0 === e.target.result && oSpP.putValueToDb("SPIDs", {
            type: "PromptDelay",
            value: (new Date).getTime() + 1e3 * oSpP.getPromptDelay()
        }), oSpP.start()
    }) : oSpP.start(), oSpP.getAuthEmailFromUrl()
});
var oSpP = new oSendpulsePush;
document.onkeyup = function (e) {
    27 === (e = e || window.event).keyCode && oSpP.closePromptHelpText(!1)
};