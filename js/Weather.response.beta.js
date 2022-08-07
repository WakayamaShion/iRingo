// README: https://github.com/VirgilClyne/iRingo

// https://github.com/chavyleung/scripts/blob/master/Env.min.js
// prettier-ignore
// noinspection
// eslint-disable-next-line
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

const $ = new Env('Apple Weather v4.0.0-beta8');

// https://github.com/VirgilClyne/VirgilClyne/blob/main/function/URL/URLs.embedded.min.js
// noinspection
// eslint-disable-next-line
function URLs(s){return new class{constructor(s=[]){this.name="URL v1.0.0",this.opts=s,this.json={url:{scheme:"",host:"",path:""},params:{}}}parse(s){let t=s.match(/(?<scheme>.+):\/\/(?<host>[^/]+)\/?(?<path>[^?]+)?\??(?<params>.*)?/)?.groups??null;return t?.params&&(t.params=Object.fromEntries(t.params.split("&").map((s=>s.split("="))))),t}stringify(s=this.json){return s?.params?s.scheme+"://"+s.host+"/"+s.path+"?"+Object.entries(s.params).map((s=>s.join("="))).join("&"):s.scheme+"://"+s.host+"/"+s.path}}(s)}

/**
 * Get Environment Variables
 * @author VirgilClyne
 * @param {String} t - Persistent Store Key
 * @param {String} e - Platform Name
 * @param {Object} n - Default DataBase
 * @return {{Settings: Object, Caches: Object, Configs: Object}}
 */
// noinspection
// eslint-disable-next-line
function getENV(t, e, n) { const i = $.getjson(t, n); const s = i?.[e]?.Settings || n?.[e]?.Settings || n?.Default?.Settings; const g = i?.[e]?.Configs || n?.[e]?.Configs || n?.Default?.Configs; let f = i?.[e]?.Caches || void 0; if (typeof f === 'string' && (f = JSON.parse(f)), typeof $argument !== 'undefined') { if ($argument) { const t = Object.fromEntries($argument.split('&').map(((t) => t.split('=')))); const e = {}; for (const a in t)o(e, a, t[a]); Object.assign(s, e); } function o(t, e, n) { e.split('.').reduce(((t, i, s) => t[i] = e.split('.').length === ++s ? n : t[i] || {}), t); } } return { Settings: s, Caches: f, Configs: g }; }

const database = {
  Location: {
    Settings: {
      Switch: true,
      CountryCode: 'US',
      Config: {
        GEOAddressCorrection: true, LookupMaxParametersCount: true, LocalitiesAndLandmarks: true, PedestrianAR: true, '6694982d2b14e95815e44e970235e230': true, OpticalHeading: true, UseCLPedestrianMapMatchedLocations: true,
      },
    },
  },
  Weather: {
    Settings: {
      Switch: true,
      NextHour: { Switch: true, Source: 'www.weatherol.cn' },
      AQI: {
        Switch: true, Targets: ['HJ6332012'], Local: { Switch: true, Standard: 'WAQI_InstantCast' }, Source: 'www.weatherol.cn', Comparison: { Switch: true, Source: 'Local' },
      },
      Map: { AQI: false },
      APIs: {
        WeatherOL: { HTTPHeaders: { 'Content-Type': 'application/json' } },
        ColorfulClouds: {
          HTTPHeaders: { 'Content-Type': 'application/json' },
          Token: '',
          ForceCNForAQI: true,
          ForceCNForComparison: false,
        },
        WAQI: { HTTPHeaders: { 'Content-Type': 'application/json' }, Token: '' },
      },
      Log: {
        Level: 'info',
        Location: false,
      },
    },
    Configs: {
      Pollutants: {
        co: 'CO', no: 'NO', no2: 'NO2', so2: 'SO2', o3: 'OZONE', nox: 'NOX', pm25: 'PM2.5', pm10: 'PM10', other: 'OTHER',
      },
    },
    Cache: {
      aqis: {},
    },
  },
  Siri: {
    Settings: {
      Switch: true, CountryCode: 'SG', Domains: ['web', 'itunes', 'app_store', 'movies', 'restaurants', 'maps'], Functions: ['flightutilities', 'lookup', 'mail', 'messages', 'news', 'safari', 'siri', 'spotlight', 'visualintelligence'], Safari_Smart_History: true,
    },
  },
};

/** @typedef {1 | 2 | 3} supportedAppleApi */
/** @typedef {{latitude: number, longitude: number}} coordinate */
/** @typedef {{forV2: string, forV1: string}} providerLogo */

/**
 * Scale names in 2207 version
 * @typedef {
 * "CA.AQHI" | "FR.ATMO" | "UBA" | "NAQI" | "EU.EAQI" | "ICARS" | "NL.LKI" | "SG.NEA" | "KR.CAI"
 * | "DAQI" | "EPA_NowCast" | "HJ6332012"
 * } scaleNames2207
 */
/** @typedef {"ES.MITECO"} scaleName2208 */
/** @typedef {scaleNames2207|scaleName2208} scaleNames */
/** @typedef {`${scaleNames2207}.2207` | `${scaleName2208}.2208`} appleAqiScales */

/**
 * AQI info in cache
 * @typedef {Object} cachedAqi
 *
 * @property {coordinate} location - Coordinate of AQI
 * @property {string} [stationName] - `AirQuality.source` from QWeather
 * @property {scaleNames} scaleName - Part before the '.' in iOS `AirQuality.scale`
 * @property {number} aqi - Air quality index
 */

/**
 * Supported VOCs by {@link toEpaAqis}
 * @typedef {"NO2" | "NO" | "SO2" | "OZONE" | "CO"} supportedEpaVocs
 */
/**
 * Supported pollutants by EPA
 * @typedef {supportedEpaVocs | "NOX" | "PM2.5" | "PM10"} supportedEpaPollutantNames
 */
/**
 * Pollutant names used in Apple weather.
 * `C6H6` is in Germany, India, Italia and Spain, `NH3` is in India, `NMHC` in Japan.
 * @typedef {
 * supportedEpaPollutantNames | "C6H6" | "NH3" | "NMHC"
 * } applePollutantNames
 */

/** @typedef {"ppb" | "µg/m3"} pollutantUnitsV1 */
/** @typedef {"ppb" | "microgramsPerM3"} pollutantUnitsV2 */
/** @typedef {pollutantUnitsV1 | "ppm" | "mg/m3"} pollutantUnitsSlash */
/** @typedef {pollutantUnitsV2 | "ppm" | "milligramsPerM3"} pollutantUnitsText */

/**
 * Base pollutant type for `AirQuality.pollutants`
 * @typedef {Object} pollutantBase
 *
 * @property {string} name - Name of pollutant
 * @property {number} amount - Amount of pollutant
 */
/**
 * Pollutant for `air_quality.pollutants` in Apple APIv1
 * @typedef {pollutantBase} pollutantV1
 *
 * @property {pollutantUnitsV1} unit - Unit of pollutant
 */
/**
 * Pollutant for `airQuality.pollutants` in Apple APIv2 and APIv3
 * @typedef {pollutantBase} pollutantV2
 *
 * @property {pollutantUnitsV2} unit - Unit of pollutant
 */

/**
 * AQI info generated by {@link toEpaAqis}
 * @typedef {Object} aqiInfo
 *
 * @property {number} index - Air quality index
 * @property {{name: string, aqi: number}[] | []} pollutants - Aqi of each pollutant
 * @property {supportedEpaPollutantNames} [primary] - Primary pollutant
 */

/** @typedef {"unknown" | "worse" | "same" | "better"} aqiComparison */
/** @typedef {"station" | "modeled"} sourceType */
/** @typedef {0 | 1} dataSource */

/**
 * Object for {@link toMetadata}
 * @typedef {Object} metadataObject
 *
 * @property {string} [language] - Language in ISO 639 style (example: en-US)
 * @property {coordinate} [location] - Coordinate of location of data
 * @property {number} [expireTimestamp] - UNIX timestamp of expire time
 * @property {providerLogo} [providerLogo] - URL to the provider logo
 * @property {string} [providerName] - Name of the provider
 * @property {number} [readTimestamp] - UNIX timestamp of read time
 * @property {number} [reportedTimestamp] - UNIX timestamp of reported time
 * @property {dataSource} [dataSource] - Type of data source
 * @property {string} [unit] - Unit of the data
 * @property {string} [url] - URL to the data source
 */

/**
 * Metadata of next hour object for Apple Weather APIv1
 * @typedef {Object} appleMetadataBaseV1
 *
 * @property {string} [read_time] - Time in seconds
 * @property {string} [expire_time] - Time in seconds
 * @property {1} version - 1 in APIv1
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {string} [language] - Language in ISO 639 style (example: en-US)
 * @property {string} [provider_name]
 */
/**
 * Metadata of next hour object for Apple Weather APIv2
 * @typedef {Object} appleMetadataBaseV2
 *
 * @property {string} [expireTime] - Time in "YYYY-MM-DDTHH:MM:SSZ" format
 * @property {string} [language] - Language in ISO 639 style (example: en-US)
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {string} [providerName]
 * @property {string} [readTime] - Time in "YYYY-MM-DDTHH:MM:SSZ" format
 * @property {2} version - 2 in APIv2
 */
/**
 * Metadata of next hour object for Apple Weather APIv3
 * @typedef {Object} appleMetadataBaseV3
 *
 * @property {string} [attributionURL]
 * @property {string} [expireTime] - Time in "YYYY-MM-DDTHH:MM:SSZ" format
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {string} [readTime] - Time in "YYYY-MM-DDTHH:MM:SSZ" format
 * @property {1} version - 1 in APIv3
 */
/**
 * Metadata of air quality for Apple Weather APIv1
 * @typedef {appleMetadataBaseV1} appleAirQualityMetadataV1
 *
 * @property {string} [reported_time] - Time in seconds
 * @property {string} [provider_logo] - URL to the provider logo
 * @property {0 | 1} [data_source] - Type of data source. 0 means station. 1 means modeled.
 */
/**
 * Metadata of next hour for Apple Weather APIv1
 * @typedef {appleMetadataBaseV1} appleNextHourMetadataV1
 *
 * @property {0 | 1} [data_source] - Type of data source. 0 means station. 1 means modeled.
 */
/**
 * Metadata of air quality for Apple Weather APIv2
 * @typedef {appleMetadataBaseV2} appleAirQualityMetadataV2
 *
 * @property {string} [providerLogo] - URL to the provider logo
 * @property {string} [reportedTime] - Time in "YYYY-MM-DDTHH:MM:SSZ" format
 * @property {"m"} [units] - Units of data
 */
/**
 * Metadata of next hour for Apple Weather APIv2
 * @typedef {appleMetadataBaseV2} appleNextHourMetadataV2
 *
 * @property {"m"} [units] - Units of data
 */
/**
 * Metadata of air quality for Apple Weather APIv3
 * @typedef {appleMetadataBaseV3} appleAirQualityMetadataV3
 *
 * @property {string} [language] - Language in ISO 639 style (example: en-US)
 * @property {string} [providerLogo] - URL to the provider logo
 * @property {string} [providerName]
 * @property {string} [reportedTime] - Time in "YYYY-MM-DDTHH:MM:SSZ" format
 * @property {"m"} [units] - Units of data
 */
/**
 * Metadata of next hour for Apple Weather APIv3
 * @typedef {appleMetadataBaseV3} appleNextHourMetadataV3
 *
 * @property {string} [language] - Language in ISO 639 style (example: en-US)
 * @property {string} [providerName]
 * @property {"m"} [units] - Units of data
 */

/**
 * Object for {@link toAirQuality}
 * @typedef {Object} airQualityObject
 *
 * @property {pollutantV2[]} [pollutants] - Array of pollutant
 * @property {boolean} [isSignificant] - Importance of AQI info, set true will pin AQI info to top.
 * AQI info of China will always been pinned after APIv2
 * @property {string} [url] - URL to the website of AQI details
 * @property {applePollutantNames} [primary] - Name of the primary pollutant
 * @property {string} [sourceName] - Name of the source
 * @property {number} [categoryIndex] - AQI level starts from 1
 * @property {number} [aqi] - Air quality index
 * @property {appleAqiScales} [scale] - `name.version` of the AQI scale
 * @property {aqiComparison} [previousDayComparison] - (APIv2+) Comparison to the previous day
 * @property {sourceType} [sourceType] - (APIv2+) Type of the info
 */

/**
 * Air quality object for Apple Weather APIv1
 * @typedef {Object} appleAqiWithoutMetadataV1
 *
 * @property {"AirQuality"} name
 * @property {string} [source] - Station name if provider is QWeather
 * @property {string} [learnMoreURL]
 * @property {number} [airQualityIndex]
 * @property {number} [airQualityCategoryIndex]
 * @property {appleAqiScales} [airQualityScale]
 * @property {applePollutantNames} [primaryPollutant]
 * @property {boolean} [isSignificant]
 * @property {Object.<applePollutantNames, pollutantV1>} [pollutants]
 */
/**
 * Air quality object for Apple Weather APIv3
 * @typedef {Object} appleAqiWithoutMetadataV3
 *
 * @property {"AirQuality"} [name]
 * @property {number} [categoryIndex]
 * @property {number} [index]
 * @property {boolean} [isSignificant]
 * @property {string} [learnMoreURL]
 * @property {Object.<applePollutantNames, pollutantV2>} [pollutants]
 * @property {aqiComparison} [previousDayComparison]
 * @property {applePollutantNames} [primaryPollutant]
 * @property {appleAqiScales} [scale]
 * @property {sourceType} [sourceType]
 */
/**
 * Air quality object for Apple Weather APIv2
 * @typedef {appleAqiWithoutMetadataV3} appleAqiWithoutMetadataV2
 *
 * @property {string} [source] - Station name if provider is QWeather
 */
/**
 * Air quality object for Apple Weather APIv1
 * @typedef {appleAqiWithoutMetadataV1} appleAqiV1
 *
 * @property {appleAirQualityMetadataV1} metadata - Metadata of air quality
 */
/**
 * Air quality object for Apple Weather APIv2
 * @typedef {appleAqiWithoutMetadataV2} appleAqiV2
 *
 * @property {appleAirQualityMetadataV2} metadata - Metadata of air quality
 */
/**
 * Air quality object for Apple Weather APIv3
 * @typedef {appleAqiWithoutMetadataV3} appleAqiV3
 *
 * @property {appleAirQualityMetadataV3} metadata - Metadata of air quality
 */

/**
 * Precipitation types for `nextHour.summary[].condition`.
 * [PrecipitationType | Apple Developer Documentation]{@link https://developer.apple.com/documentation/weatherkitrestapi/precipitationtype}
 * @typedef {
 * "clear" | "precipitation" | "rain" | "snow" | "sleet" | "hail" | "mixed"
 * } precipitationTypes
 */
/**
 * Weather statuses for `nextHour.condition[].token`
 * @typedef {
 * "clear" | "precipitation" | "drizzle" | "flurries" | "rain" | "snow" | "heavy-rain"
 * | "heavy-snow" | "sleet" | "hail" | "mixed"
 * } weatherStatuses
 */

/**
 * Minute precipitation data
 * @typedef {Object} minute
 *
 * @property {weatherStatuses} weatherStatus - Weather status of this minute
 * @property {number} precipitation - Precipitation of this minute
 * @property {number} precipitationIntensityPerceived - Precipitation from 0 to 3,
 * can be generated by {@link toPerceived}
 * @property {number} chance - Integer from 0 to 100, percentage of chance to rain or snow
 * @property {string} shortDescription - Description that will be display in city list
 * @property {string} longDescription - Description with `firstAt`, `secondAt`, etc...
 * to present `X minutes later` dynamically base on current time.
 * @property {Object.<string, number> | {}} parameters - Object that works with `longDescription`.
 * `firstAt`, `secondAt`, etc... as keys, minutes after startTime as values.
 */
/**
 * Object for {@link toNextHour}
 * @typedef {Object} nextHourObject
 *
 * @property {minute[]} minutes - Array of minute data
 * @property {number} startTimestamp - Timestamp of precipitation started
 */

/**
 * Base minute type for `NextHourForecast.minutes`
 * @typedef {Object} nextHourMinuteBase
 *
 * @property {number} precipChance - Integer from 0 to 100, percentage of chance
 * @property {number} precipIntensity - 2 decimal places from Apple. Actually could be any number.
 */
/**
 * Minute for `next_hour.minutes` in Apple APIv1
 * @typedef {nextHourMinuteBase} nextHourMinuteV1
 *
 * @property {number} startAt - Time of the start time (in seconds)
 * @property {number} perceivedIntensity - 3 decimal places from 0 to 3,
 * can be generated by `toApplePrecipitation()`
 */
/**
 * Minute for `forecastNextHour.minutes` in Apple APIv2
 * @typedef {nextHourMinuteBase} nextHourMinuteV2
 *
 * @property {string} startTime - Time of the start time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {number} precipIntensityPerceived - 3 decimal places from 0 to 3,
 * can be generated by `toApplePrecipitation()`
 */
/**
 * Minute for `forecastNextHour.minutes` in Apple APIv3
 * @typedef {Object} nextHourMinuteV3
 *
 * @property {string} startTime - Time of the start time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {number} precipitationChance - Number from 0 to 1 with 2 decimal places,
 * percentage of chance
 * @property {number} precipitationIntensity - 2 decimal places from Apple.
 * Actually could be any number.
 * @property {number} precipitationIntensityPerceived - 3 decimal places from 0 to 3,
 * can be generated by `toApplePrecipitation()`
 */

/**
 * Base condition type for `NextHourForecast`
 * @typedef {Object} nextHourConditionBase
 *
 * @property {string} token - A tag to describe possibility, weather status and time status
 * @property {string} longTemplate - A description for current weather. Time is dynamic by
 * replacing to `{firstAt}`, `{secondAt}`, etc for `parameters`
 * @property {string} shortTemplate - As same as `longTemplate`, but no dynamic time support
 * and will be display in city list
 */
/**
 * Condition for `next_hour.condition` in Apple APIv1
 * @typedef {nextHourConditionBase} nextHourConditionV1
 *
 * @property {number} [validUntil] - Time of the end time (in seconds)
 * @property {Object.<string, number>} parameters - Key should be `firstAt`, `secondAt`, etc.
 * Value is time in seconds
 */
/**
 * Condition for `forecastNextHour.condition` in Apple APIv2
 * @typedef {nextHourConditionBase} nextHourConditionV2
 *
 * @property {string} startTime - Time of the start time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {string} [endTime] - Time of the end time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {Object.<string, string>} parameters - Key should be `firstAt`, `secondAt`, etc.
 * Value is time in YYYY-MM-DDTHH:MM:SSZ format
 */
/**
 * Condition for `forecastNextHour.condition` in Apple APIv3
 * @typedef {Object} nextHourConditionV3
 *
 * @property {string} startTime - Time of the start time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {string} [endTime] - Time of the end time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {string} token - A tag to describe possibility, weather status and time status
 * @property {Object.<string, string>} parameters - Key should be `firstAt`, `secondAt`, etc.
 * Value is time in YYYY-MM-DDTHH:MM:SSZ format. Effective to the description in Apple Weather.
 */

/**
 * Base summary type for `NextHourForecast`
 * @typedef {Object} nextHourSummaryBase
 *
 * @property {precipitationTypes} condition - Weather condition
 */
/**
 * Condition for `next_hour.summary` in Apple APIv1
 * @typedef {nextHourSummaryBase} nextHourSummaryV1
 *
 * @property {number} [validUntil] - Time of the end time (in seconds)
 * @property {number} [probability] - Precipitation chance of this minute if condition is not clear
 * @property {number} [maxIntensity] - Maximum value of {@link nextHourMinuteV1#perceivedIntensity}
 * in this range of minutes if condition is not clear
 * @property {number} [minIntensity] - Minimum value of {@link nextHourMinuteV1#perceivedIntensity}
 * in this range of minutes if condition is not clear
 */
/**
 * Condition for `forecastNextHour.summary` in Apple APIv2
 * @typedef {nextHourSummaryBase} nextHourSummaryV2
 *
 * @property {string} startTime - Time of the start time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {string} [endTime] - Time of the end time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {number} [precipChance] - Precipitation chance of this minute if condition is not clear
 * @property {number} [precipIntensity] - Maximum value of `precipIntensityPerceived` in
 * {@link nextHourMinuteV2} in this range of minutes if condition is not clear
 */
/**
 * Condition for `forecastNextHour.summary` in Apple APIv3
 * @typedef {nextHourSummaryBase} nextHourSummaryV3
 *
 * @property {string} startTime - Time of the start time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {string} [endTime] - Time of the end time (in YYYY-MM-DDTHH:MM:SSZ format)
 * @property {number} precipitationChance - Maximum precipitation chance of this summary
 * @property {number} precipitationIntensity - Maximum value of `precipitationIntensityPerceived` in
 * {@link nextHourMinuteV3} in this range of minutes if condition is not clear
 */

/**
 * Next hour object for Apple Weather APIv1
 * @typedef {Object} appleNextHourWithoutMetadataV1
 *
 * @property {"NextHourForecast"} name
 * @property {nextHourConditionV1[]} [condition]
 * @property {nextHourSummaryV1[]} [summary]
 * @property {number} [startTime] - Time in seconds
 * @property {nextHourMinuteV1[]} [minutes]
 */
/**
 * Base next hour object for Apple Weather APIv2
 * @typedef {Object} appleNextHourWithoutMetadataV2
 *
 * @property {"NextHourForecast"} name
 * @property {nextHourConditionV2[]} [condition]
 * @property {nextHourSummaryV2[]} [summary]
 * @property {string} [startTime] - Time in "YYYY-MM-DDTHH:MM:SSZ" format
 * @property {nextHourMinuteV2[]} [minutes]
 */
/**
 * Base next hour object for Apple Weather APIv3
 * @typedef {Object} appleNextHourWithoutMetadataV3
 *
 * @property {"NextHourForecast"} name
 * @property {nextHourConditionV3[]} [condition]
 * @property {nextHourSummaryV3[]} [summary]
 * @property {string} [forecastStart] - Time in "YYYY-MM-DDTHH:MM:SSZ" format
 * @property {string} [forecastEnd] - Time in "YYYY-MM-DDTHH:MM:SSZ" format
 * @property {nextHourMinuteV3[]} [minutes]
 */
/**
 * Next hour object for Apple Weather APIv1
 * @typedef {appleNextHourWithoutMetadataV1} appleNextHourV1
 *
 * @property {appleNextHourMetadataV1} metadata - Metadata of air quality
 */
/**
 * Next hour object for Apple Weather APIv2
 * @typedef {appleNextHourWithoutMetadataV2} appleNextHourV2
 *
 * @property {appleNextHourMetadataV2} metadata - Metadata of air quality
 */
/**
 * Next hour object for Apple Weather APIv3
 * @typedef {appleNextHourWithoutMetadataV3} appleNextHourV3
 *
 * @property {appleNextHourMetadataV3} metadata - Metadata of air quality
 */

/**
 * @typedef {Object} range
 *
 * @property {Number} LOWER - lower of range
 * @property {Number} UPPER - upper of range
 */

/**
 * Precipitation level and its range
 * @typedef {Object} precipitationLevel
 *
 * @property {number} VALUE - Value of precipitation level for comparing
 * @property {range} RANGE - Precipitation range of level
 */
/** @typedef {"NO" | "LIGHT" | "MODERATE" | "HEAVY" | "STORM"} precipitationLevelNames */
/** @typedef {Object.<precipitationLevelNames, precipitationLevel>} precipitationLevels */

/**
 * AQI level and its range
 * @typedef {Object} aqiLevel
 *
 * @property {number} VALUE - AQI level value for `airQuality.categoryIndex`. Should be start at 1.
 * @property {range} RANGE - Range of AQI level
 */

/**
 * Concentration range for pollutant
 * @typedef {Object} concentrationRange
 *
 * @property {range} AMOUNT - Range of concentration amount
 * @property {range} AQI - AQI range for its concentration amount range
 */

/**
 * @typedef {Object} concentration
 *
 * @property {pollutantUnitsText} UNIT - Unit of concentration
 * @property {Object.<string, concentrationRange>} RANGES - Concentration range for pollutant
 */

/**
 * AQI standard
 * @typedef {Object} aqiStandard
 *
 * @property {appleAqiScales} APPLE_SCALE - Value of `airQuality.scale`
 * @property {Object.<string, aqiLevel>} AQI_LEVELS - Value and ranges of AQI levels
 * @property {number} SIGNIFICANT_LEVEL - AQI will be pinned if `airQuality.categoryIndex`
 * greater or equals than this
 * @property {Object.<string, concentration>} CONCENTRATIONS - Key should be the pollutant name.
 */

/**
 * Version 1 of next hour settings
 * @typedef {Object} nextHourSettingsV1
 *
 * @property {boolean} switch - Switch of the next hour
 * @property {string} source - API source of next hour
 */
/**
 * Version 1 settings of local converter of AQI
 * @typedef {Object} aqiLocalSettingsV1
 *
 * @property {boolean} switch - Switch of the AQI local converter
 * @property {string} standard - Name of the converter
 */
/**
 * Version 1 of AQI comparison settings
 * @typedef {Object} aqiComparisonSettingsV1
 *
 * @property {boolean} switch - Switch of the AQI comparison
 * @property {string} source - API source of AQI comparison
 */
/**
 * Version 1 of AQI settings
 * @typedef {Object} aqiSettingsV1
 *
 * @property {boolean} switch - Switch of the AQI
 * @property {string[]} targets - AQI with matched scales will be edited by module
 * @property {aqiLocalSettingsV1} local - Settings of local converter of AQI
 * @property {aqiComparisonSettingsV1} comparison - AQI comparison settings
 * @property {string} source - API source of AQI
 */
/**
 * Base API settings
 * @typedef {Object} baseApiSettingsV1
 *
 * @property {Object} httpHeaders - HTTP headers for requesting API
 */
/**
 * Base API with token settings
 * @typedef {baseApiSettingsV1} baseApiTokenSettingsV1
 *
 * @property {string} token - Token for the API
 */
/**
 * Version 1 of WeatherOL API settings
 * @typedef {baseApiSettingsV1} weatherOlSettingsV1
 */
/**
 * Version 1 of ColorfulClouds API settings
 * @typedef {baseApiTokenSettingsV1} colorfulCloudsSettingsV1
 *
 * @property {boolean} forceCnForAqi - Force to use China standard in AQI data
 * @property {boolean} forceCnForComparison - Force to use China standard in AQI comparison data
 */
/**
 * Version 1 of The World Air Quality Project API settings
 * @typedef {baseApiTokenSettingsV1} waqiSettingsV1
 */
/**
 * Version 1 of APIs settings
 * @typedef {Object} apisSettingsV1
 *
 * @property {weatherOlSettingsV1} weatherOl - API settings of WeatherOL
 * @property {colorfulCloudsSettingsV1} colorfulClouds - API settings of ColorfulClouds
 * @property {waqiSettingsV1} waqi - API settings of WAQI
 */
/**
 * Version 1 of log settings
 * @typedef {Object} logSettingsV1
 *
 * @property {"debug" | "info" | "warn" | "error"} level - Log level
 * @property {boolean} location - Print location info to logs
 */
/**
 * Version 1 of settings
 * @typedef {Object} settingsV1
 *
 * @property {boolean} switch - Switch of the module
 * @property {nextHourSettingsV1} nextHour - Settings of next hour
 * @property {aqiSettingsV1} aqi - Settings of AQI
 * @property {apisSettingsV1} apis - Settings of APIs
 * @property {logSettingsV1} log - Settings of log
 */

/**
 * Version 1 of AQI cache
 * @typedef {Object} aqiCacheV1
 *
 * @property {coordinate} location - Location of AQI info
 * @property {scaleNames} scaleName - Scale of AQI info
 * @property {number} aqi - AQI index
 */
/**
 * Version 1 of caches
 * @typedef {Object} cachesV1
 *
 * @property {Object.<number, aqiCacheV1[]>} aqis - AQI caches
 * @property {{tokens: Object.<number, {timestamp: number, token: string}>}} waqi - WAQI caches
 */

/**
 * WAQI error
 * @typedef {Object} waqiError
 *
 * @property {"error"} status
 * @property {string} data - Error message
 */
/**
 * WAQI pollutant names
 * @typedef {"co" | "no2" | "o3" | "pm10" | "pm25" | "so2"} waqiPollutantNames
 */
/**
 * Data in WAQI mapq
 * @typedef {Object} waqiMapqD
 *
 * @property {string} nlo - Station name in English
 * @property {string} nna - Station name in local language
 * @property {number} t - Report time (in seconds)
 * @property {waqiPollutantNames} pol - Primary pollutant
 * @property {string} x - Station ID
 * @property {string} v - AQI
 * @property {string} u - Country/Province/Station Name
 * @property {string} key
 * @property {number} d - Distance to the location
 * @property {[number, number]} geo - Station coordinate
 * @property {string} cca2 - Country code in ISO 3166-1 alpha-2
 */
/**
 * WAQI mapq
 * @typedef {Object} waqiMapq
 *
 * @property {waqiMapqD[]} d - Data in WAQI mapq
 * @property {string} dt
 * @property {null} g
 */

/**
 * Station in WAQI mapq2
 * @typedef {Object} waqiMapq2Station
 *
 * @property {string} idx - Station ID
 * @property {string} aqi - Air quality index
 * @property {string} utime - Report time (in `YYYY-MM-DDTHH:MM:SS+/-timezone` format)
 * @property {[number, number]} geo - Station coordinate
 * @property {string} name - Station name in "English (local language)"
 * @property {string} country - Country code in ISO 3166-1 alpha-2
 * @property {number} distance - Distance to the location
 */
/**
 * Data in WAQI mapq2
 * @typedef {Object} waqiMapq2Data
 *
 * @property {null} location
 * @property {waqiMapq2Station[]} stations - Stations in mapq2
 */
/**
 * WAQI mapq2
 * @typedef {Object} waqiMapq2
 *
 * @property {waqiMapq2Data} data - Data in WAQI mapq2
 * @property {string} dt
 * @property {"ok" | "error"} status - Status of API
 */

/**
 * Attribution in WAQI feed
 * @typedef {Object} waqiFeedAttribution
 *
 * @property {string} url - URL to the source
 * @property {string} name - Name of the source
 */
/**
 * City data in WAQI feed
 * @typedef {Object} waqiFeedCity
 *
 * @property {[number, number]} geo - Station coordinate
 * @property {string} name - Station name in "English (local language)"
 * @property {string} url - URL to the data of station in WAQI
 * @property {""} location
 */
/**
 * Time data in WAQI feed
 * @typedef {Object} waqiFeedTime
 *
 * @property {string} s - Time in "YYYY-MM-DD HH:MM:SS" format
 * @property {string} tz - Timezone in "+/-HH:MM"
 * @property {number} v - Time in seconds
 * @property {string} iso - Time in "YYYY-MM-DDTHH:MM:SS+/-Timezone" format
 */
/**
 * Forecast data in WAQI feed
 * @typedef {Object} waqiFeedForecast
 *
 * @property {Object.<string, {avg: number, day: string, max: number, min: number}[]>} daily
 */
/**
 * Data in WAQI feed
 * @typedef {Object} waqiFeedData
 *
 * @property {number} aqi - Air quality index
 * @property {number} idx - Station ID
 * @property {waqiFeedAttribution[]} attributions - Sources of the data
 * @property {waqiFeedCity} city - Station info
 * @property {waqiPollutantNames} dominentpol - Primary pollutant
 * @property {Object.<waqiPollutantNames|string, {v: number}>} iaqi
 * @property {waqiFeedTime} time - Report time
 * @property {waqiFeedForecast} forecast - Country/Province/Station Name
 * @property {{sync: string}} debug
 */
/**
 * WAQI feed
 * @typedef {Object} waqiFeed
 *
 * @property {"ok" | "error"} status - Status of API
 * @property {waqiFeedData} data - Data in WAQI feed
 */

/**
 * msg data of `rxs.obs[]` of WAQI AQI feed
 * @typedef {Object} waqiAqiFeedRxsObsMsg
 *
 * @property {number} aqi - Air quality index
 * @property {number} idx - Station ID
 * @property {waqiFeedAttribution[]} attributions - Sources of the data
 * @property {waqiFeedCity} city - Station info
 * @property {waqiPollutantNames} dominentpol - Primary pollutant
 * @property {Object.<waqiPollutantNames|string, {v: number, t: string}>} iaqi -
 * t is time in "YYYY-MM-DD HH:MM:SS" format
 * @property {waqiFeedTime} time - Report time
 * @property {Object.<
 * waqiPollutantNames|string, {e: number, s: string, d: number, m: number, v: Array}
 * >} obs
 * @property {{daily: Object.<
 * waqiPollutantNames|string, {avg: number, day: string, max: number, min: number}[]
 * >, hourly: {}}} forecast
 * @property {gen: number} xsync - Time in seconds
 */
/**
 * obs data of rxs of WAQI AQI feed
 * @typedef {Object} waqiAqiFeedRxsObs
 *
 * @property {waqiAqiFeedRxsObsMsg[]} msg - Data from station
 * @property {"ok" | "error"} status - Status of API
 * @property {string} cached
 */
/**
 * rxs data of WAQI AQI feed
 * @typedef {Object} waqiAqiFeedRxs
 *
 * @property {waqiAqiFeedRxsObs[]} obs - Data from stations
 * @property {"ok" | "error"} status - Status of API
 * @property {string} ver
 */
/**
 * WAQI AQI feed
 * @typedef {Object} waqiAqiFeed
 *
 * @property {string} dt
 * @property {waqiAqiFeedRxs} rxs
 */

/**
 * msg data of `rxs.obs[]` of WAQI AQI feed
 * @typedef {Object} waqiNowFeedRxsObsMsg
 *
 * @property {number} aqi - Air quality index
 * @property {number} idx - Station ID
 * @property {waqiFeedCity} city - Station info
 * @property {waqiPollutantNames} dominentpol - Primary pollutant
 * @property {waqiFeedTime} time - Report time
 * @property {sync: string} debug - Time in YYYY-MM-DDTHH:MM:SS+/-timezone format
 */
/**
 * obs data of rxs of WAQI AQI feed
 * @typedef {Object} waqiNowFeedRxsObs
 *
 * @property {waqiNowFeedRxsObsMsg[]} msg - Data from station
 * @property {"ok" | "error"} status - Status of API
 * @property {string} cached
 */
/**
 * rxs data of WAQI AQI feed
 * @typedef {Object} waqiNowFeedRxs
 *
 * @property {waqiNowFeedRxsObs[]} obs - Data from stations
 * @property {"ok" | "error"} status - Status of API
 * @property {string} ver
 */
/**
 * WAQI now feed
 * @typedef {Object} waqiNowFeed
 *
 * @property {string} dt
 * @property {waqiNowFeedRxs} rxs
 */

/**
 * Pollutants and AQI from ColorfulClouds handled by {@link getCcAirQuality}
 * @typedef {Object} ccAirQuality
 *
 * @property {number | -1} PM2.5 - Amount in micrograms/m3
 * @property {number | -1} PM10 - Amount in micrograms/m3
 * @property {number | -1} OZONE - Amount in micrograms/m3
 * @property {number | -1} NO2 - Amount in micrograms/m3
 * @property {number | -1} SO2 - Amount in micrograms/m3
 * @property {number | -1} CO - Amount in milligrams/M3
 * @property {{chn: number | -1, usa: number | -1}} aqi - Air quality index
 */

/**
 * Air quality descriptions (zh_CN) in ColorfulClouds
 * @typedef {"缺数据" | "优" | "良" | "轻度污染" | "中度污染" | "重度污染" | "严重污染"} ccAirQualityDescriptionsZhCn
 */
/**
 * Air quality data of realtime of ColorfulClouds v2.4+
 * @typedef {Object} ccV2d4pRealtimeAirQuality
 *
 * @property {number} pm25 - Amount in micrograms/m3
 * @property {number} pm10 - Amount in micrograms/m3
 * @property {number} o3 - Amount in micrograms/m3
 * @property {number} no2 - Amount in micrograms/m3
 * @property {number} so2 - Amount in micrograms/m3
 * @property {number} co - Amount in milligrams/M3
 * @property {{chn: number, usa: number}} aqi - Air quality index
 * @property {{
 * chn: ccAirQualityDescriptionsZhCn|string, usa: ccAirQualityDescriptionsZhCn|string | ""
 * }} description - Air quality description
 */
/**
 * ColorfulClouds v2 base
 * @typedef {Object} colorfulCloudsV2Base
 *
 * @property {"ok" | "error"} status - Status of API
 * @property {string} api_version - API version starting with "v"
 * @property {"alpha" | "active"} api_status - Channel of current API version
 * @property {"zh_CN" | "zh_TW" | "en_US" | "en_GB"} lang - Affective to the descriptions
 * @property {"SI" | "imperial" | "metric:v1" | "metric:v2" | "metric"} unit - Unit of the data. [单位制 | 彩云天气 API](https://docs.caiyunapp.com/docs/tables/unit/)
 * @property {number} tzshift - Timezone in seconds
 * @property {string} timezone - Timezone in "Continent/Region" format
 * @property {number} server_time - Time in seconds
 * @property {[number, number]} location - Coordinate of current location
 */
/**
 * Result of ColorfulClouds v2
 * @typedef {Object} colorfulCloudsV2Result
 *
 * @property {Object} [alert]
 * @property {Object} [realtime]
 * @property {Object} [minutely]
 * @property {Object} [hourly]
 * @property {Object} [daily]
 * @property {number} primary
 * @property {string} forecast_keypoint - Description of current weather
 */
/**
 * ColorfulClouds v2
 * @typedef {colorfulCloudsV2Base} colorfulCloudsV2
 *
 * @property {colorfulCloudsV2Result} result
 */
/**
 * ColorfulClouds v2 error
 * @typedef {Object} colorfulCloudsV2Error
 *
 * @property {"ok" | "error"} status - Status of API
 * @property {string} error - Error message
 * @property {string} api_version - API version starting with "v"
 */

const EPA_454_AQI_LEVELS = {
  INVALID: { VALUE: -1, RANGE: { LOWER: Number.MIN_VALUE, UPPER: -1 } },
  GOOD: { VALUE: 1, RANGE: { LOWER: 0, UPPER: 50 } },
  MODERATE: { VALUE: 2, RANGE: { LOWER: 51, UPPER: 100 } },
  UNHEALTHY_FOR_SENSITIVE: { VALUE: 3, RANGE: { LOWER: 101, UPPER: 150 } },
  UNHEALTHY: { VALUE: 4, RANGE: { LOWER: 151, UPPER: 200 } },
  VERY_UNHEALTHY: { VALUE: 5, RANGE: { LOWER: 201, UPPER: 300 } },
  HAZARDOUS: { VALUE: 6, RANGE: { LOWER: 301, UPPER: 400 } },
  // Used in calculation
  VERY_HAZARDOUS: { VALUE: 6, RANGE: { LOWER: 401, UPPER: 500 } },
  OVER_RANGE: { VALUE: 7, RANGE: { LOWER: 500, UPPER: Number.MAX_VALUE } },
};

/**
 * US AQI standard, not equal to NowCast.
 * [EPA 454/B-18-007]{@link https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf}
 * @type aqiStandard
 */
const EPA_454 = {
  APPLE_SCALE: 'EPA_NowCast.2207',
  AQI_LEVELS: EPA_454_AQI_LEVELS,
  // Unhealthy for sensitive groups
  SIGNIFICANT_LEVEL: 3,

  CONCENTRATIONS: {
    OZONE: {
      UNIT: 'ppm',
      RANGES: {
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 0.125, UPPER: 0.164 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 0.165, UPPER: 0.204 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 0.205, UPPER: 0.404 },
          AQI: EPA_454_AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 0.405, UPPER: 0.504 },
          AQI: EPA_454_AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 0.505, UPPER: 0.604 },
          AQI: EPA_454_AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    OZONE_8H: {
      UNIT: 'ppm',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0.000, UPPER: 0.054 },
          AQI: EPA_454_AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 0.055, UPPER: 0.070 },
          AQI: EPA_454_AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 0.071, UPPER: 0.085 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 0.086, UPPER: 0.105 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 0.106, UPPER: 0.200 },
          AQI: EPA_454_AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
      },
    },
    'PM2.5_24H': {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0.0, UPPER: 12.0 },
          AQI: EPA_454_AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 12.1, UPPER: 35.4 },
          AQI: EPA_454_AQI_LEVELS.MODERATE.RANGE,
        },
        // If a different SHL for PM2.5 is promulgated,
        // the following numbers will change accordingly.
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 35.5, UPPER: 55.4 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 55.5, UPPER: 150.4 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 150.5, UPPER: 250.4 },
          AQI: EPA_454_AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 250.5, UPPER: 350.4 },
          AQI: EPA_454_AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 350.5, UPPER: 500.4 },
          AQI: EPA_454_AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    PM10_24H: {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 54 },
          AQI: EPA_454_AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 55, UPPER: 154 },
          AQI: EPA_454_AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 155, UPPER: 254 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 255, UPPER: 354 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 355, UPPER: 424 },
          AQI: EPA_454_AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 425, UPPER: 504 },
          AQI: EPA_454_AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 505, UPPER: 604 },
          AQI: EPA_454_AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    CO_8H: {
      UNIT: 'ppm',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0.0, UPPER: 4.4 },
          AQI: EPA_454_AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 4.5, UPPER: 9.4 },
          AQI: EPA_454_AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 9.5, UPPER: 12.4 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 12.5, UPPER: 15.4 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 15.5, UPPER: 30.4 },
          AQI: EPA_454_AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 30.5, UPPER: 40.4 },
          AQI: EPA_454_AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 40.5, UPPER: 50.4 },
          AQI: EPA_454_AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    SO2: {
      UNIT: 'ppb',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 35 },
          AQI: EPA_454_AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 36, UPPER: 75 },
          AQI: EPA_454_AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 76, UPPER: 185 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
      },
      // 1-hour SO2 values do not define higher AQI values (≥ 200).
      // AQI values of 200 or greater are calculated with 24-hour SO2 concentrations.
    },
    SO2_24H: {
      UNIT: 'ppb',
      RANGES: {
        UNHEALTHY: {
          AMOUNT: { LOWER: 186, UPPER: 304 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 305, UPPER: 604 },
          AQI: EPA_454_AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 605, UPPER: 804 },
          AQI: EPA_454_AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 805, UPPER: 1004 },
          AQI: EPA_454_AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    NO2: {
      UNIT: 'ppb',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 53 },
          AQI: EPA_454_AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 54, UPPER: 100 },
          AQI: EPA_454_AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 101, UPPER: 360 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 361, UPPER: 649 },
          AQI: EPA_454_AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 650, UPPER: 1249 },
          AQI: EPA_454_AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 1250, UPPER: 1649 },
          AQI: EPA_454_AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 1650, UPPER: 2049 },
          AQI: EPA_454_AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
  },
};

/**
 * China AQI standard.
 * [环境空气质量指数（AQI）技术规定（试行）]{@link https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/W020120410332725219541.pdf}
 * @type aqiStandard
 */
const HJ_633 = {
  APPLE_SCALE: 'HJ6332012.2207',
  AQI_LEVELS: EPA_454.AQI_LEVELS,
  SIGNIFICANT_LEVEL: EPA_454.SIGNIFICANT_LEVEL,

  CONCENTRATIONS: {
    SO2_24H: {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 50 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 51, UPPER: 150 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 151, UPPER: 475 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 476, UPPER: 800 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 801, UPPER: 1600 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 1601, UPPER: 2100 },
          AQI: EPA_454.AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 2101, UPPER: 2602 },
          AQI: EPA_454.AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    SO2: {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 150 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 151, UPPER: 500 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 501, UPPER: 650 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 651, UPPER: 800 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        // 二氧化硫（SO2）1小时平均浓度高于800 ug/m3的，不再进行其空气质量分指数计算，二氧化硫（SO2）空气质量分指数按24小时平均浓度计算的分指数报告。
      },
    },
    NO2_24H: {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 40 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 41, UPPER: 80 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 81, UPPER: 180 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 181, UPPER: 280 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 281, UPPER: 565 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 566, UPPER: 750 },
          AQI: EPA_454.AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 751, UPPER: 940 },
          AQI: EPA_454.AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    NO2: {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 100 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 101, UPPER: 200 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 201, UPPER: 700 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 701, UPPER: 1200 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 1201, UPPER: 2340 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 2341, UPPER: 3090 },
          AQI: EPA_454.AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 3091, UPPER: 3840 },
          AQI: EPA_454.AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    PM10_24H: {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 50 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 51, UPPER: 150 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 151, UPPER: 250 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 251, UPPER: 350 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 351, UPPER: 420 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 421, UPPER: 500 },
          AQI: EPA_454.AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 501, UPPER: 600 },
          AQI: EPA_454.AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    CO_24H: {
      UNIT: 'milligramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 2 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 3, UPPER: 4 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 5, UPPER: 14 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 15, UPPER: 24 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 25, UPPER: 36 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 37, UPPER: 48 },
          AQI: EPA_454.AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 49, UPPER: 60 },
          AQI: EPA_454.AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    CO: {
      UNIT: 'milligramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 5 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 6, UPPER: 10 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 11, UPPER: 35 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 36, UPPER: 60 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 61, UPPER: 90 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 91, UPPER: 120 },
          AQI: EPA_454.AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 121, UPPER: 150 },
          AQI: EPA_454.AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    OZONE: {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 160 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 161, UPPER: 200 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 201, UPPER: 300 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 301, UPPER: 400 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 401, UPPER: 800 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 801, UPPER: 1000 },
          AQI: EPA_454.AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 1001, UPPER: 1200 },
          AQI: EPA_454.AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    OZONE_8H: {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 100 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 101, UPPER: 160 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 161, UPPER: 215 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 216, UPPER: 265 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 266, UPPER: 800 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        // 臭氧（O3）8小时平均浓度值高于800 ug/m3的，不再进行其空气质量分指数计算，臭氧（O3）空气质量分指数按1小时平均浓度计算的分指数报告。
      },
    },
    'PM2.5_24H': {
      UNIT: 'microgramsPerM3',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 35 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 36, UPPER: 75 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 76, UPPER: 115 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 116, UPPER: 150 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 151, UPPER: 250 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 251, UPPER: 350 },
          AQI: EPA_454.AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 351, UPPER: 500 },
          AQI: EPA_454.AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
  },
};

/**
 * WAQI InstantCast.
 * [A Beginner's Guide to Air Quality Instant-Cast and Now-Cast.]{@link https://aqicn.org/faq/2015-03-15/air-quality-nowcast-a-beginners-guide/}
 * [Ozone AQI Scale update]{@link https://aqicn.org/faq/2016-08-10/ozone-aqi-scale-update/}
 * @type aqiStandard
 */
const WAQI_INSTANT_CAST = {
  APPLE_SCALE: EPA_454.APPLE_SCALE,
  AQI_LEVELS: EPA_454.AQI_LEVELS,
  SIGNIFICANT_LEVEL: EPA_454.SIGNIFICANT_LEVEL,

  CONCENTRATIONS: {
    ...EPA_454.CONCENTRATIONS,
    OZONE: {
      UNIT: 'ppb',
      RANGES: {
        GOOD: {
          AMOUNT: { LOWER: 0, UPPER: 61.5 },
          AQI: EPA_454.AQI_LEVELS.GOOD.RANGE,
        },
        MODERATE: {
          AMOUNT: { LOWER: 62.5, UPPER: 100.5 },
          AQI: EPA_454.AQI_LEVELS.MODERATE.RANGE,
        },
        UNHEALTHY_FOR_SENSITIVE: {
          AMOUNT: { LOWER: 101.5, UPPER: 151.5 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY_FOR_SENSITIVE.RANGE,
        },
        UNHEALTHY: {
          AMOUNT: { LOWER: 152.5, UPPER: 204 },
          AQI: EPA_454.AQI_LEVELS.UNHEALTHY.RANGE,
        },
        VERY_UNHEALTHY: {
          AMOUNT: { LOWER: 205, UPPER: 404 },
          AQI: EPA_454.AQI_LEVELS.VERY_UNHEALTHY.RANGE,
        },
        HAZARDOUS: {
          AMOUNT: { LOWER: 405, UPPER: 504 },
          AQI: EPA_454.AQI_LEVELS.HAZARDOUS.RANGE,
        },
        VERY_HAZARDOUS: {
          AMOUNT: { LOWER: 505, UPPER: 604 },
          AQI: EPA_454.AQI_LEVELS.VERY_HAZARDOUS.RANGE,
        },
      },
    },
    'PM2.5': EPA_454.CONCENTRATIONS['PM2.5_24H'],
    PM10: EPA_454.CONCENTRATIONS.PM10_24H,
    CO: EPA_454.CONCENTRATIONS.CO_8H,
    OZONE_8H: undefined,
    'PM2.5_24H': undefined,
    PM10_24H: undefined,
    CO_8H: undefined,
    SO2_24H: undefined,
  },
};

/**
 * Check passed parameter is or not an object
 * @param {any} object - Value you wish to check
 * @return {boolean} - Return `true` if passed parameter is an object
 */
const isObject = (object) => typeof object === 'object' && !Array.isArray(object) && object !== null;

/**
 * Check passed parameter is or not a non-empty string
 * @author WordlessEcho <wordless@echo.moe>
 * @param {any} string - Value you wish to check
 * @return {boolean} - Return `true` if passed parameter is a non-empty string
 */
const isNonEmptyString = (string) => typeof string === 'string' && string.length > 0;

/**
 * Check passed parameter is or not a non-NaN number
 * @author WordlessEcho <wordless@echo.moe>
 * @param {any} number - Value you wish to check
 * @return {boolean} - Return `true` if passed parameter is a non-NaN number
 */
const isNonNanNumber = (number) => typeof number === 'number' && !Number.isNaN(number);

/**
 * Check passed parameter is or not a valid latitude
 * @author WordlessEcho <wordless@echo.moe>
 * @param {number} latitude - Latitude you wish to check
 * @return {boolean} - Return `true` if passed parameter is a valid latitude
 */
const isLatitude = (latitude) => isNonNanNumber(latitude) && latitude >= -90 && latitude <= 90;

/**
 * Check passed parameter is or not a valid longitude
 * @author WordlessEcho <wordless@echo.moe>
 * @param {number} longitude - Longitude you wish to check
 * @return {boolean} - Return `true` if passed parameter is a valid longitude
 */
const isLongitude = (longitude) => (
  isNonNanNumber(longitude) && longitude >= -180 && longitude <= 180
);

/**
 * Check passed parameter is or not a valid location
 * @author WordlessEcho <wordless@echo.moe>
 * @param {coordinate} location - Location with latitude and longitude
 * @return {boolean} - Return `true` if passed parameter is a valid location
 */
const isLocation = (location) => isLatitude(location?.latitude) && isLongitude(location?.longitude);

/**
 * Parse JSON with exception handler
 * @author WordlessEcho <wordless@echo.moe>
 * @param {string} stringJson - String to be parsed
 * @param {(Error) => any} catcher
 * @return {Object|any} - Parsed JSON or returned from `catcher`
 */
const parseJson = (stringJson, catcher) => {
  // eslint-disable-next-line functional/no-try-statement
  try {
    return JSON.parse(stringJson);
  } catch (e) {
    return catcher(e);
  }
};
/**
 * Parse JSON with default value
 * @author WordlessEcho <wordless@echo.moe>
 * @param {string} stringJson - String to be parsed
 * @param {any} defaultValue - Value to be returned if failed to parse `stringJson`
 * @return {Object|any} - Parsed JSON or `defaultValue` if failed
 */
const parseJsonWithDefault = (stringJson, defaultValue) => {
  // eslint-disable-next-line functional/no-try-statement
  try {
    return JSON.parse(stringJson);
  } catch (e) {
    return defaultValue;
  }
};

/**
 * Check passed parameter is or not a valid range
 * @author WordlessEcho <wordless@echo.moe>
 * @param {any} range - Range to be checked
 * @return {boolean} - Return `true` if passed parameter is a valid range
 */
const isRange = (range) => isNonNanNumber(range?.LOWER) && isNonNanNumber(range?.UPPER);
/**
 * Check passed parameter is or not a positive with zero range
 * @author WordlessEcho <wordless@echo.moe>
 * @param {any} range - Range to be checked
 * @return {boolean} - Return `true` if passed parameter is a positive with zero range
 */
const isPositiveWithZeroRange = (range) => isRange(range) && range.LOWER >= 0 && range.UPPER >= 0;
/**
 * Check passed parameter is or not a positive range
 * @author WordlessEcho <wordless@echo.moe>
 * @param {any} range - Range to be checked
 * @return {boolean} - Return `true` if passed parameter is a positive range
 */
const isPositiveRange = (range) => (
  isPositiveWithZeroRange(range) && range.LOWER !== 0 && range.UPPER !== 0
);

/**
 * Get settings from Box.js
 * @author WordlessEcho <wordless@echo.moe>
 * @author VirgilClyne
 * @param {Object} envs - `envs` from {@link getENV}
 * @return {settingsV1} - Valid settings
 */
const toSettings = (envs) => {
  const settings = database.Weather.Settings;
  return {
    switch: parseJsonWithDefault(envs?.Settings?.Switch, settings.Switch),
    nextHour: {
      switch: parseJsonWithDefault(
        envs?.Settings?.NextHour?.Switch,
        settings.NextHour.Switch,
      ),
      source: isNonEmptyString(envs?.Settings?.NextHour?.Source) ? envs.Settings.NextHour.Source
        : settings.NextHour.Source,
    },
    aqi: {
      switch: parseJsonWithDefault(envs?.Settings?.AQI?.Switch, settings.AQI.Switch),
      targets: parseJsonWithDefault(`[${envs?.Settings?.AQI?.Targets}]`, settings.AQI.Targets),
      local: {
        switch: parseJsonWithDefault(
          envs?.Settings?.AQI?.Local?.Switch,
          settings.AQI.Local.Switch,
        ),
        standard: isNonEmptyString(envs?.Settings?.AQI?.Local?.Standard)
          ? envs.Settings.AQI.Local.Standard : settings.AQI.Local.Standard,
      },
      source: isNonEmptyString(envs?.Settings?.AQI?.Source) ? envs.Settings.AQI.Source
        : settings.AQI.Source,
      comparison: {
        switch: parseJsonWithDefault(
          envs?.Settings?.AQI?.Comparison.Switch,
          settings.AQI.Comparison.Switch,
        ),
        source: isNonEmptyString(envs?.Settings?.AQI?.Comparison?.Source)
          ? envs.Settings.AQI.Comparison.Source : settings.AQI.Comparison.Source,
      },
    },
    map: {
      aqi: parseJsonWithDefault(envs?.Settings?.Map?.AQI, settings.Map.AQI),
    },
    apis: {
      weatherOl: {
        httpHeaders: parseJsonWithDefault(
          envs?.Settings?.APIs?.WeatherOl?.HTTPHeaders,
          settings.APIs.WeatherOL.HTTPHeaders,
        ),
      },
      colorfulClouds: {
        httpHeaders: parseJsonWithDefault(
          envs?.Settings?.APIs?.ColorfulClouds?.HTTPHeaders,
          settings.APIs.ColorfulClouds.HTTPHeaders,
        ),
        token: envs?.Settings?.APIs?.ColorfulClouds?.Token,
        forceCnForAqi: parseJsonWithDefault(
          envs?.Settings?.APIs?.ColorfulClouds?.ForceCNForAQI,
          settings.APIs.ColorfulClouds.ForceCNForAQI,
        ),
        forceCnForComparison: parseJsonWithDefault(
          envs?.Settings?.APIs?.ColorfulClouds?.ForceCNForComparison,
          settings.APIs.ColorfulClouds.ForceCNForComparison,
        ),
      },
      waqi: {
        httpHeaders: parseJsonWithDefault(
          envs?.Settings?.APIs?.WAQI?.HTTPHeaders,
          settings.APIs.WAQI.HTTPHeaders,
        ),
        token: envs?.Settings?.APIs?.WAQI?.Token,
      },
    },
    log: {
      level: isNonEmptyString(envs?.Settings?.Log?.Level) ? envs.Settings.Log.Level
        : settings.Log.Level,
      Location: parseJsonWithDefault(envs?.Settings?.Log?.Location, settings.Log.Location),
    },
  };
};

/**
 * Get caches from Box.js
 * @author WordlessEcho <wordless@echo.moe>
 * @param {Object} envs - `envs` from {@link getENV}
 * @return {cachesV1} - Valid caches
 */
const toCaches = (envs) => ({
  aqis: {
    ...(isObject(envs?.Caches?.aqis) && envs.Caches.aqis),
  },
  waqi: {
    ...(isObject(envs?.Caches?.waqi) && envs.Caches.waqi),
    tokens: {
      ...(isObject(envs.Caches.waqi?.tokens) && envs.Caches.waqi.tokens),
    },
  },
});

const settings = toSettings(getENV('iRingo', 'Weather', database));

/**
 * Log helper
 * @param {"debug" | "info" | "warn" | "error"} level - Log level
 * @param {string} message - Log message
 */
const logger = (level, message) => {
  /**
   * Get emoji by log level
   * @param {"debug" | "info" | "warn" | "error"} l - Log level
   * @return {string} - Emoji for log level
   */
  const toEmoji = (l) => {
    switch (l) {
      case 'error':
        return '❗️';
      case 'warn':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'debug':
      default:
        return '🚧';
    }
  };

  /**
   * Get required tags
   * @param {"debug" | "info" | "warn" | "error"} l - Log level
   * @return {string[]} - Required tags
   */
  const matchedTags = (l) => {
    const tags = ['debug', 'info', 'warn', 'error'];
    switch (l) {
      case 'debug':
        return tags;
      case 'warn':
        return tags.slice(2);
      case 'error':
        return tags.slice(3);
      case 'info':
      default:
        return tags.slice(1);
    }
  };

  // eslint-disable-next-line functional/no-conditional-statement
  if (matchedTags(settings.log.level).includes(level)) {
    // eslint-disable-next-line functional/no-expression-statement
    $.log(`${toEmoji(level)} ${message}`, '');
  }
};

/**
 * Get AQI from cache
 * @author WordlessEcho <wordless@echo.moe>
 * @param {Object.<number, cachedAqi[]>} cachedAqis - Caches of AQIs
 * @param {number} timestamp - UNIX timestamp of cached time
 * @param {coordinate} location - Coordinate of AQI info
 * @param {?string} stationName - `AirQuality.source` from QWeather
 * @param {appleAqiScales} scaleName - Part before the '.' in iOS `AirQuality.scale`
 * @return {cachedAqi | {aqi: -1}} - Matched AQI info
 */
const getCachedAqi = (cachedAqis, timestamp, location, stationName, scaleName) => {
  const pythagoreanTheorem = (a, b) => Math.sqrt(a * a + b * b);

  if (
    isObject(cachedAqis) && isNonNanNumber(timestamp) && timestamp > 0
    && isLocation(location) && isNonEmptyString(scaleName)
  ) {
    const cacheTimestampString = Object.keys(cachedAqis).find((timestampString) => {
      const cachedTimestamp = parseInt(timestampString, 10);
      return isNonNanNumber(cachedTimestamp) && cachedTimestamp >= timestamp
        && cachedTimestamp < timestamp + 1000 * 60 * 60;
    });
    const cacheTimestamp = parseInt(cacheTimestampString, 10);

    const cache = isNonNanNumber(cacheTimestamp)
      ? cachedAqis[cacheTimestamp].find((aqiInfo) => (
        isNonEmptyString(stationName)
          ? aqiInfo?.stationName === stationName && aqiInfo?.scaleName === scaleName
          // Cannot get station name
          : pythagoreanTheorem(
            Math.abs(aqiInfo.location.longitude - location.longitude),
            Math.abs(aqiInfo.location.latitude - location.latitude),
          // 0.085 is an approximation by observing air quality map from Apple Weather
          ) < 0.085 && aqiInfo?.scaleName === scaleName
      ))
      : { aqi: -1 };

    if (isNonNanNumber(cache?.aqi) && cache.aqi >= 0) {
      logger('info', `${getCachedAqi.name}：找到了已缓存的AQI信息：AQI值为${cache.aqi}`);
      return cache;
    }
  }

  return { aqi: -1 };
};

/**
 * Get token from cache
 * @author WordlessEcho <wordless@echo.moe>
 * @param {Object.<number, {timestamp: number, token: string}>} cachedTokens - Caches of WAQI tokens
 * @param {number} stationId - Station ID
 * @return {string} - Matched token
 */
const getCachedWaqiToken = (cachedTokens, stationId) => {
  if (isObject(cachedTokens) && isNonNanNumber(stationId)) {
    // 1 hour
    const cacheLimit = (+(new Date())) - 1000 * 60 * 60;
    const cachedToken = cachedTokens?.[stationId];

    if (isNonNanNumber(cachedToken?.timestamp) && cachedToken.timestamp > cacheLimit
      && isNonEmptyString(cachedToken?.token)) {
      logger('info', `${getCachedWaqiToken.name}：找到了监测站ID ${stationId}的token缓存`);
      return cachedToken.token;
    }
  }

  return '';
};

/**
 * Return caches for `setjson`
 * @author WordlessEcho <wordless@echo.moe>
 * @param {cachesV1} caches - Caches of iRingo.Weather.Caches
 * @param {number} timestamp - UNIX timestamp of cached time
 * @param {coordinate} location - Coordinate of AQI info
 * @param {?string} stationName - `AirQuality.source` from QWeather
 * @param {scaleNames} scaleName - Part before the '.' in iOS `AirQuality.scale`
 * @param {number} aqi - Air quality index
 * @return {cachesV1} - Cache will not be edited if any parameter is invalid.
 */
const cacheAqi = (caches, timestamp, location, stationName, scaleName, aqi) => {
  // Remove caches before 36 hours ago
  const cacheLimit = (+new Date()) - 1000 * 60 * 60 * 36;

  const validAqis = isObject(caches?.aqis) ? Object.fromEntries(Object.entries(caches.aqis)
    .filter(([timestampString, aqisInfo]) => {
      const cachedTimestamp = parseInt(timestampString, 10);
      return isNonNanNumber(cachedTimestamp) && cachedTimestamp > cacheLimit
        && Array.isArray(aqisInfo);
    })
    .map(([timestampString, aqisInfo]) => [
      timestampString,
      aqisInfo.filter((aqiInfo) => (
        isNonNanNumber(aqiInfo?.aqi) && aqiInfo.aqi >= 0 && isLocation(aqiInfo?.location)
        && isNonEmptyString(aqiInfo?.scaleName)
      )),
    ])) : {};

  if (
    isNonNanNumber(timestamp) && timestamp > cacheLimit && isLocation(location)
    && isNonEmptyString(scaleName) && isNonNanNumber(aqi) && aqi >= 0
  ) {
    const cacheTimestampString = Object.keys(validAqis).find((timestampString) => {
      const cachedTimestamp = parseInt(timestampString, 10);
      return isNonNanNumber(cachedTimestamp) && cachedTimestamp >= timestamp
        && cachedTimestamp < timestamp + 1000 * 60 * 60;
    });
    const cacheTimestamp = parseInt(cacheTimestampString, 10);

    const existedCache = isNonNanNumber(cacheTimestamp)
      ? validAqis[cacheTimestamp].find((aqiInfo) => (
        isNonEmptyString(stationName)
          ? aqiInfo?.stationName === stationName && aqiInfo?.scaleName === scaleName
          // Cannot get station name
          // https://www.mee.gov.cn/gkml/hbb/bwj/201204/W020140904493567314967.pdf
          : Math.abs(aqiInfo.location.longitude - location.longitude) < 0.045
          && Math.abs(aqiInfo.location.latitude - location.latitude) < 0.045
          && aqiInfo?.scaleName === scaleName
      ))
      : { aqi: -1 };

    if (!isNonNanNumber(existedCache?.aqi) || existedCache.aqi < 0) {
      logger(
        'debug',
        `${cacheAqi.name}：已将当前AQI信息缓存，AQI信息：\n`
        + `时间：${new Date(timestamp)}\n`
        + `${settings.log.location ? `经度：${location.longitude}，纬度：${location.latitude}\n` : ''}`
        + `${isNonEmptyString(stationName) ? `监测站：${stationName}\n` : ''}`
        + `AQI标准：${scaleName}\nAQI：${aqi}`,
      );

      return {
        ...(isObject(caches) && caches),
        aqis: {
          ...validAqis,
          [isNonNanNumber(cacheTimestamp) ? cacheTimestamp : timestamp]: [
            ...(Array.isArray(validAqis?.[cacheTimestamp]) ? validAqis[cacheTimestamp] : []),
            {
              location,
              ...(isNonEmptyString(stationName) && { stationName }),
              scaleName,
              aqi,
            },
          ],
        },
      };
    }
  }

  return {
    ...(isObject(caches) && caches),
    aqis: { ...validAqis },
  };
};

/**
 * Return caches for `setjson`
 * @author WordlessEcho <wordless@echo.moe>
 * @param {cachesV1} caches - Caches of iRingo.Weather.Caches
 * @param {number} stationId - Station ID
 * @param {string} token - Token of station
 * @return {cachesV1} - Cache will not be edited if any parameter is invalid.
 */
const cacheWaqiToken = (caches, stationId, token) => {
  // Remove caches before 1 hour ago
  const cacheLimit = (+(new Date())) - 1000 * 60 * 60;

  const validTokens = isObject(caches?.waqi?.tokens)
    ? Object.fromEntries(Object.entries(caches.waqi.tokens)
      .filter(([stationIdString, tokenInfo]) => (
        isNonNanNumber(parseInt(stationIdString, 10)) && isNonNanNumber(tokenInfo?.timestamp)
        && tokenInfo.timestamp > cacheLimit && isNonEmptyString(tokenInfo?.token)
      ))) : {};

  return {
    ...(isObject(caches) && caches),
    waqi: {
      ...(isObject(caches?.waqi) && caches?.waqi),
      tokens: {
        ...validTokens,
        ...(isNonNanNumber(stationId) && isNonEmptyString(token)
          && !logger('info', `${cacheWaqiToken.name}：已缓存监测站ID ${stationId}的token`) && {
          [stationId]: { timestamp: (+(new Date())), token },
        }),
      },
    },
  };
};

// TODO: I am too afraid about regex to rewrite this
/**
 * Get Origin Parameters
 * @author VirgilClyne
 * @author WordlessEcho <wordless@echo.moe>
 * @param {String} path - Path of URL
 * @return {Object.<'ver'|'language'|'lat'|'lng'|'countryCode', string>|{}} -
 * `version`, `language`, `latitude`, `longitude` and `regionCode` from path.
 * Empty object will be returned if type of path is invalid.
 */
const getParams = (path) => {
  if (!isNonEmptyString(path)) {
    return {};
  }

  const regExp = /^(?<ver>v1|v2|v3)\/weather\/(?<language>[\w-_]+)\/(?<lat>-?\d+\.\d+)\/(?<lng>-?\d+\.\d+).*(?<countryCode>country=[A-Z]{2})?.*/i;
  const result = path.match(regExp);

  return isObject(result?.groups) ? result.groups : {};
};

/**
 * Get data from QWeather
 * @param {"developer" | "business" | "cityLookup"} type
 * @param {7 | 2} version
 * @param {string} path
 * @param {Object} parameters
 * @param {Object} [headers]
 * @return {Promise<Object>}
 */
// eslint-disable-next-line no-unused-vars
const qweather = (
  type,
  version,
  path,
  parameters,
  headers = { 'Content-Type': 'application/json' },
) => new Promise((resolve) => {
  const toSubdomain = (t) => {
    switch (t) {
      case 'developer':
        return 'devapi';
      case 'business':
        return 'api';
      case 'cityLookup':
        return 'geoapi';
      default:
        return '';
    }
  };
  const subdomain = toSubdomain(type);
  if (!isNonEmptyString(subdomain)) {
    // eslint-disable-next-line functional/no-expression-statement
    resolve({ code: '400' });
    return;
  }

  const supportedVersions = [7];
  const supportedCityLookupVersions = [2];
  if (
    (subdomain === 'geoapi' && !supportedCityLookupVersions.includes(version))
    || !supportedVersions.includes(version) || isNonEmptyString(path)
    || !isObject(parameters) || !isObject(headers)
  ) {
    // eslint-disable-next-line functional/no-expression-statement
    resolve({ code: '400' });
    return;
  }

  const parametersString = isObject(parameters)
    ? Object.entries(parameters).map(([key, value]) => `${key}=${value}`).join('&')
    : '';

  const request = {
    headers,
    url: `https://${subdomain}.qweather.com/v${version}/${path}/`
      + `${isNonEmptyString(parametersString) ? `?${parametersString}` : ''}`,
  };

  // eslint-disable-next-line functional/no-expression-statement
  $.get(request, (error, _response, data) => {
    if (error) {
      // eslint-disable-next-line functional/no-expression-statement
      resolve({
        code: '400',
        message: `${qweather.name}: Error: ${error}\n`
          + `Data: ${data}`,
      });
      return;
    }

    const result = parseJson(data, (e) => ({
      code: '400',
      message: `${qweather.name}: Data from QWeather is not a valid JSON\n`
        + `Error: ${e}\n`
        + `Data: ${data}`,
    }));

    // eslint-disable-next-line functional/no-expression-statement
    resolve(result);
  });
});

/**
 * Get the nearest station info from WAQI
 * @author WordlessEcho <wordless@echo.moe>
 * @param {coordinate} location - Location for finding the nearest station
 * @param {"mapq" | "mapq2"} mapqVersion - Version of mapq. Using 1 (mapq) if invalid.
 * @param {Object} [headers] - HTTP headers
 * @return {Promise<waqiMapq|waqiMapq2|waqiError>} - Result from WAQI in mapq2 format
 */
const waqiNearest = (
  location,
  mapqVersion,
  headers = { 'Content-Type': 'application/json' },
) => new Promise((resolve) => {
  if (!isLocation(location)) {
    // eslint-disable-next-line functional/no-expression-statement
    resolve({
      status: 'error',
      data: `${waqiNearest.name}: Invalid location`
        + `Latitude: ${location?.latitude}`
        + `Longitude: ${location?.longitude}`,
    });
    return;
  }

  // eslint-disable-next-line functional/no-expression-statement
  $.get(
    {
      headers,
      // n is stations to return
      url: `https://api.waqi.info/${mapqVersion}/nearest?n=1&geo=1/${location.latitude}/${location.longitude}`,
    },
    (error, _response, data) => {
      if (error) {
        // eslint-disable-next-line functional/no-expression-statement
        resolve({
          status: 'error',
          data: `${waqiNearest.name}: Error: ${error}\n`
            + `Data: ${data}`,
        });
        return;
      }

      const result = parseJson(data, (e) => ({
        status: 'error',
        data: `${waqiNearest.name}: Data from WAQI is not a valid JSON\n`
          + `Error: ${e}\n`
          + `Data: ${data}`,
      }));

      if (isNonEmptyString(result.status) && result.status !== 'ok') {
        // eslint-disable-next-line functional/no-expression-statement
        resolve({
          status: 'error',
          data: result?.data ?? result?.message ?? result?.reason
            ?? `${waqiNearest.name}: WAQI return a unknown error\nData: ${data}`,
        });
        return;
      }

      // eslint-disable-next-line functional/no-expression-statement
      resolve(result);
    },
  );
});

/**
 * Get token for public from WAQI
 * @author WordlessEcho <wordless@echo.moe>
 * @param {number} [stationId] - ID of station
 * @param {Object} [headers] - HTTP headers
 * @return {Promise<{status: "ok" | "error", data: string}>} -
 * Token in `data` if ok. Error message in `data` if failed.
 */
// eslint-disable-next-line no-unused-vars
const waqiToken = (stationId, headers = { 'Content-Type': 'application/json' }) => new Promise((resolve) => {
  // eslint-disable-next-line functional/no-expression-statement
  $.get(
    { headers, url: `https://api.waqi.info/api/token/${isNonNanNumber(stationId) ? stationId : ''}` },
    (error, _response, data) => {
      if (error) {
        // eslint-disable-next-line functional/no-expression-statement
        resolve({
          status: 'error',
          data: `${waqiToken.name}: Error: ${error}\n`
            + `Data: ${data}`,
        });
        return;
      }

      const result = parseJson(data, (e) => ({
        status: 'error',
        data: `${waqiToken.name}: Data from WAQI is not a valid JSON\n`
          + `Error: ${e}\n`
          + `Data: ${data}`,
      }));

      if (result.status === 'error') {
        // eslint-disable-next-line functional/no-expression-statement
        resolve(result);
        return;
      }

      if (result?.rxs?.status !== 'ok') {
        // eslint-disable-next-line functional/no-expression-statement
        resolve({
          status: 'error',
          data: `${waqiToken.name}: WAQI returned an unexpected status\n`
            + `rxs.status: ${result?.rxs?.status}`
            + `Data: ${data}`,
        });
        return;
      }

      if (!Array.isArray(result?.rxs?.obs)) {
        // eslint-disable-next-line functional/no-expression-statement
        resolve({
          status: 'error',
          data: `${waqiToken.name}: rxs.obs is not an array.\n`
            + `rxs.obs type: ${typeof result?.rxs?.obs}`
            + `Data: ${data}`,
        });
        return;
      }

      const token = result.rxs.obs.find((obs) => (isNonEmptyString(obs?.msg?.token)))?.msg?.token;
      if (!isNonEmptyString(token)) {
        // eslint-disable-next-line functional/no-expression-statement
        resolve({
          status: 'error',
          data: `${waqiToken.name}: No valid token found\n`
            + `Token type: ${typeof token}\n`
            + `Token length: ${token?.length}\n`
            + `Data: ${data}`,
        });
        return;
      }

      // eslint-disable-next-line functional/no-expression-statement
      resolve({ status: 'ok', data: token });
    },
  );
});

/**
 * Get data by using token from The World Air Quality Project.
 * [API - Air Quality Programmatic APIs]{@link https://aqicn.org/api/}
 * @author VirgilClyne
 * @author WordlessEcho <wordless@echo.moe>
 * @param {?coordinate} location - Required in feed based on location
 * @param {?number} stationId - Required in feed based on station ID
 * @param {string} token - Token for WAQI API.
 * [Air Quality Open Data Platform]{@link https://aqicn.org/data-platform/token/}
 * @param {Object} [headers] - HTTP headers
 * @return {Promise<waqiFeed|waqiError>} - Feed data from WAQI
 */
const waqiV2 = (
  location,
  stationId,
  token,
  headers = { 'Content-Type': 'application/json' },
) => new Promise((resolve) => {
  if (!isNonEmptyString(token)) {
    // eslint-disable-next-line functional/no-expression-statement
    resolve({
      status: 'error',
      data: `${waqiV2.name}: Invalid token\n`
        + `Token type: ${typeof token}\n`
        + `Token length: ${token?.length}`,
    });
    return;
  }

  /**
   * Handle errors into WAQI format
   * @author WordlessEcho <wordless@echo.moe>
   * @param {Error} err - Error from get of `Env.js`
   * @param {string} d - Data from get of `Env.js`
   * @return {waqiFeed|waqiError} - Data in WAQI format
   */
  const getResult = (err, d) => {
    if (err) {
      return {
        status: 'error',
        data: `${waqiV2.name}: Error: ${err}\n`
          + `Data: ${d}`,
      };
    }

    const result = parseJson(d, (e) => ({
      status: 'error',
      data: 'Data from WAQI is not a valid JSON\n'
        + `Error: ${e}\n`
        + `Data: ${d}`,
    }));

    if (!isNonEmptyString(result?.status)) {
      return {
        status: 'error',
        data: 'WAQI returned an unknown status\n'
          + `Data: ${d}`,
      };
    }

    return result;
  };

  const baseUrl = 'https://api.waqi.info';
  if (isLocation(location)) {
    // eslint-disable-next-line functional/no-expression-statement
    $.get(
      {
        headers,
        url: `${baseUrl}/feed/geo:${location.latitude};${location.longitude}/?token=${token}`,
      },
      (error, _response, data) => {
        // eslint-disable-next-line functional/no-expression-statement
        resolve(getResult(error, data));
      },
    );
    return;
  }

  if (isNonNanNumber(stationId)) {
    // eslint-disable-next-line functional/no-expression-statement
    $.get(
      {
        headers,
        url: `${baseUrl}/feed/@${stationId}/?token=${token}`,
      },
      (error, _response, data) => {
        // eslint-disable-next-line functional/no-expression-statement
        resolve(getResult(error, data));
      },
    );
    return;
  }

  // eslint-disable-next-line functional/no-expression-statement
  resolve({
    status: 'error',
    data: `${waqiV2.name}: Invalid parameters\n`
      + `Location: ${JSON.stringify(location)}`
      + `Station ID: ${stationId}`,
  });
});

/**
 * Get data from WAQI old API
 * @author WordlessEcho <wordless@echo.moe>
 * @param {"now" | "aqi"} type - Type of API
 * @param {number} stationId - ID of station
 * @param {?string} body - HTTP body
 * @param {Object} [headers] - HTTP headers
 * @return {Promise<waqiNowFeed|waqiAqiFeed|waqiError>} - Data from WAQI
 */
// eslint-disable-next-line no-unused-vars
const waqiV1 = (
  type,
  stationId,
  body,
  headers = { 'Content-Type': 'application/json' },
) => new Promise((resolve) => {
  if (!isNonNanNumber(stationId)) {
    // eslint-disable-next-line functional/no-expression-statement
    resolve({
      status: 'error',
      data: `${waqiV1.name}: Invalid station ID\n`
        + `Station ID: ${stationId}`,
    });
    return;
  }

  const baseUrl = 'https://api.waqi.info';

  // eslint-disable-next-line functional/no-expression-statement
  $.post(
    {
      headers,
      url: `${baseUrl}/api/feed/@${stationId}/${type}.json`,
      ...(isNonEmptyString(body) && { body }),
    },
    (error, response, data) => {
      if (error) {
        // eslint-disable-next-line functional/no-expression-statement
        resolve({
          status: 'error',
          data: `${waqiV1.name}: Error: ${error}\n`
            + `Data: ${data}`,
        });
        return;
      }

      const result = parseJson(data, (e) => ({
        status: 'error',
        data: 'Data from WAQI is not a valid JSON\n'
          + `Error: ${e}\n`
          + `Data: ${data}`,
      }));

      if (!isNonEmptyString(result?.rxs?.status)) {
        // eslint-disable-next-line functional/no-expression-statement
        resolve({
          status: 'error',
          data: 'WAQI returned an unknown status\n'
            + `Data: ${data}`,
        });
        return;
      }

      // eslint-disable-next-line functional/no-expression-statement
      resolve(result);
    },
  );
});

/**
 * Convert data from {@link waqiNearest} to feed format
 * @author WordlessEcho <wordless@echo.moe>
 * @param {"mapq" | "mapq2"} version - Version of mapq
 * @param {waqiMapq|waqiMapq2|waqiError} nearestData - Data from {@link waqiNearest}
 * @return {(waqiFeed|waqiError)[]} - Data in feed format
 */
const waqiNearestToFeed = (version, nearestData) => {
  /**
   * Get error message from WAQI
   * @author WordlessEcho <wordless@echo.moe>
   * @param {"mapq" | "mapq2"} mapqVersion - WAQI mapq version
   * @param {waqiError} data - WAQI mapq data
   * @return {string} - Error message
   */
  const toErrorMessage = (mapqVersion, data) => {
    const forUnknown = `${waqiNearestToFeed.name}: Unknown error from WAQI.\n`
      + `Data: ${JSON.stringify(nearestData)}`;

    if (isNonEmptyString(data?.data)) {
      return data.data;
    }

    switch (mapqVersion) {
      case 'mapq2':
        return isNonEmptyString(data?.reason) ? data.reason : forUnknown;
      case 'mapq':
        return isNonEmptyString(data?.message) ? data.message : forUnknown;
      default:
        return forUnknown;
    }
  };

  if (nearestData.status === 'error') {
    return [{
      status: 'error',
      data: toErrorMessage(version, nearestData),
    }];
  }

  /**
   * Convert mapq(1) time to YYYY-MM-DDTHH:MM:SS+/-timezone
   * @author WordlessEcho <wordless@echo.moe>
   * @param {{t: number} | {utime: string}} data - Data with `t` or `utime`
   * @return {string} - YYYY-MM-DDTHH:MM:SS+/-timezone format ISO time
   */
  const serverTimeToIsoString = (data) => {
    if (isNonNanNumber(data?.t) && data.t > 0) {
      return `${new Date(data.t * 1000).toISOString().slice(0, -5)}+00:00`;
    }

    if (!Number.isNaN(Date.parse(data?.utime))) {
      return data.utime;
    }

    return `${(new Date((new Date()).setMinutes(0, 0, 0))).toISOString().slice(0, -5)}+00:00`;
  };

  switch (version) {
    case 'mapq':
      if (!Array.isArray(nearestData?.d)) {
        return [{
          status: 'error',
          data: `${waqiNearestToFeed.name}: \`d\` is not an array\n`
            + `Data: ${JSON.stringify(nearestData)}`,
        }];
      }

      return nearestData.d.map((station) => {
        const aqi = parseInt(station?.v, 10);
        const stationId = parseInt(station?.x, 10);
        // nna: Local language. nlo: English.
        const stationName = station?.nna ?? station?.nlo;

        if (!isNonNanNumber(aqi) || aqi < 0) {
          return {
            status: 'error',
            data: `${waqiNearestToFeed.name}: Invalid AQI\n`
              + `AQI: ${station?.v}\n`
              + `Station data: ${JSON.stringify(station)}`,
          };
        }

        const isoTime = serverTimeToIsoString(station);

        return {
          status: 'ok',
          data: {
            aqi,
            ...(!Number.isNaN(stationId) && { idx: stationId }),
            attributions: [{
              url: 'https://waqi.info/',
              name: 'The World Air Quality Project',
            }],
            city: {
              geo: station.geo,
              ...(isNonEmptyString(stationName) && { name: stationName }),
              url: 'https://aqicn.org',
              location: '',
            },
            ...(isNonEmptyString(station?.pol) && { dominentpol: station.pol }),
            iaqi: {},
            time: {
              s: isoTime.slice(0, -6),
              tz: isoTime.slice(-6),
              v: Date.parse(isoTime) / 1000,
              iso: isoTime,
            },
            forecast: {},
            debug: {},
          },
        };
      });
    case 'mapq2':
      if (!Array.isArray(nearestData?.data?.stations)) {
        return [{
          status: 'error',
          data: `${waqiNearestToFeed.name}: \`data.stations\` is not an array\n`
            + `Data: ${JSON.stringify(nearestData)}`,
        }];
      }

      return nearestData.data.stations.map((station) => {
        const aqi = parseInt(station?.aqi, 10);
        const stationId = parseInt(station?.idx, 10);

        if (!isNonNanNumber(aqi) || aqi < 0) {
          return {
            status: 'error',
            data: `${waqiNearestToFeed.name}: Invalid AQI\n`
              + `AQI: ${station?.aqi}\n`
              + `Station data: ${JSON.stringify(station)}`,
          };
        }

        const isoTime = serverTimeToIsoString(station);

        return {
          status: 'ok',
          data: {
            aqi,
            ...(!Number.isNaN(stationId) && { idx: stationId }),
            attributions: [{
              url: 'https://waqi.info/',
              name: 'The World Air Quality Project',
            }],
            city: {
              geo: station.geo,
              ...(isNonEmptyString(station?.name) && { name: station.name }),
              url: 'https://aqicn.org',
              location: '',
            },
            iaqi: {},
            time: {
              s: isoTime.slice(0, -6),
              tz: isoTime.slice(-6),
              v: Date.parse(isoTime) / 1000,
              iso: isoTime,
            },
            forecast: {},
            debug: {},
          },
        };
      });
    default:
      return [{
        status: 'error',
        data: `${waqiNearestToFeed.name}: Unsupported mapq version.`,
      }];
  }
};

/**
 * Convert data from {@link waqiV1} to feed format
 * @author WordlessEcho <wordless@echo.moe>
 * @param {waqiNowFeed|waqiAqiFeed|waqiError} v1Data - Data from {@link waqiV1}
 * @return {(waqiFeed|waqiError)[]} - Data in feed format
 */
// eslint-disable-next-line no-unused-vars
const waqiV1ToFeed = (v1Data) => {
  const unknownError = `${waqiV1ToFeed.name}: Unknown error from WAQI\n`
    + `Data: ${JSON.stringify(v1Data)}`;

  if (v1Data?.status === 'error') {
    return [{
      status: 'error',
      data: v1Data?.data ?? unknownError,
    }];
  }

  if (v1Data?.rxs?.status !== 'ok') {
    return [{
      status: 'error',
      data: unknownError,
    }];
  }

  if (!Array.isArray(v1Data?.rxs?.obs)) {
    return [{
      status: 'error',
      data: `${waqiV1ToFeed.name}: \`d\` is not an array\n`
        + `Data: ${JSON.stringify(v1Data)}`,
    }];
  }

  /**
   * Make sure time in data is in YYYY-MM-DDTHH:MM:SS+/-timezone format
   * @author WordlessEcho <wordless@echo.moe>
   * @param {{msg: {time: {iso: string}}}} data - Data with `msg.time.iso`
   * @return {string} - YYYY-MM-DDTHH:MM:SS+/-timezone format ISO time
   */
  const serverTimeToIsoString = (data) => {
    if (!Number.isNaN(Date.parse(data?.msg?.time?.iso))) {
      return data.msg.time.iso;
    }

    return `${(new Date((new Date()).setMinutes(0, 0, 0))).toISOString().slice(0, -5)}+00:00`;
  };

  /**
   * Try to convert debug time in YYYY-MM-DDTHH:MM:SS+/-timezone format
   * @author WordlessEcho <wordless@echo.moe>
   * @param {{msg: {xsync: {gen: number}}} | {msg: {debug: {sync: string}}}} data -
   * Data with `msg.xsync.gen` or `msg.debug.sync`
   * @return {string} - Return empty string if data is invalid.
   */
  const getDebug = (data) => {
    if (isNonNanNumber(data?.msg?.xsync?.gen) && data.msg.xsync.gen > 0) {
      return `${(new Date(data.msg.xsync.gen * 1000)).toISOString().slice(0, -5)}+00:00`;
    }

    if (!Number.isNaN(Date.parse(data.msg?.debug?.sync))) {
      return data.msg.debug.sync;
    }

    return '';
  };

  return v1Data.rxs.obs.map((station) => {
    if (!isNonEmptyString(station?.status) || (station.status !== 'ok' && station.status !== 'error')) {
      return {
        status: 'error',
        data: `${waqiV1ToFeed.name}: Unknown status from WAQI\n`
          + `Station data: ${JSON.stringify(station)}`,
      };
    }

    if (!isNonNanNumber(station?.msg?.aqi) || station.msg.aqi < 0) {
      return {
        status: 'error',
        data: `${waqiV1ToFeed.name}: Invalid AQI\n`
          + `Station data: ${JSON.stringify(station)}`,
      };
    }

    const debugTime = getDebug(station);
    return {
      status: station.status,
      data: {
        ...station.msg,
        attributions: Array.isArray(station.msg?.attributions)
        && station.msg.attributions.length > 0 ? station.msg.attributions
          : [{
            url: 'https://waqi.info/',
            name: 'The World Air Quality Project',
          }],
        city: {
          url: 'https://aqicn.org',
          location: '',
          ...station.msg?.city,
        },
        iaqi: { ...station.msg?.iaqi },
        time: {
          ...station.msg?.time,
          iso: serverTimeToIsoString(station),
        },
        forecast: { ...station.msg?.forecast },
      },
      debug: { ...(debugTime.length > 0 ? { sync: debugTime } : {}) },
    };
  });
};

/**
 * Get data from "气象在线". This API could be considered as unconfigurable ColorfulClouds API.
 * [简介 | 彩云天气 API]{@link https://docs.caiyunapp.com/docs/v2.2/intro}
 * [通用预报接口/v2.2 - CaiyunWiki]{@link https://open.caiyunapp.com/%E9%80%9A%E7%94%A8%E9%A2%84%E6%8A%A5%E6%8E%A5%E5%8F%A3/v2.2}
 * @author VirgilClyne
 * @author WordlessEcho <wordless@echo.moe>
 * @param {"forecast" | "realtime"} type - `forecast` or `realtime`
 * @param {coordinate} location - { latitude, longitude }
 * @param {Object} headers - HTTP headers
 * @return {Promise<colorfulCloudsV2|colorfulCloudsV2Error>} data from "气象在线"
 */
const weatherOl = (
  type,
  location,
  headers = { 'Content-Type': 'application/json' },
) => new Promise((resolve) => {
  const apiVersion = 'v2.2';
  if (!isLocation(location)) {
    // eslint-disable-next-line functional/no-expression-statement
    resolve({
      status: 'failed',
      error: `${weatherOl.name}: Invalid location: ${JSON.stringify(location)}`,
      api_version: apiVersion,
    });
    return;
  }

  const request = {
    headers,
    url: 'https://www.weatherol.cn/api/minute/getPrecipitation'
      + `?type=${type}`
      + `&ll=${location.longitude},${location.latitude}`,
  };

  // eslint-disable-next-line functional/no-expression-statement
  $.get(request, (error, response, data) => {
    if (error || data === 'error') {
      // eslint-disable-next-line functional/no-expression-statement
      resolve({
        status: 'failed',
        error: `${weatherOl.name}: ${error && `Error: ${error}\n`}Data: ${data}`,
        api_version: apiVersion,
      });
      return;
    }

    const result = parseJson(data, (e) => ({
      status: 'failed',
      error: `${weatherOl.name}: Data from WeatherOL is not a valid JSON\n`
        + `Error: ${e}`
        + `Data: ${data}`,
    }));

    if (result?.status !== 'ok') {
      const version = isNonNanNumber(result?.api_version) ? `v${result.api_version}` : apiVersion;

      // eslint-disable-next-line functional/no-expression-statement
      resolve(isNonEmptyString(result?.status)
        // The type of api_version during error will be number
        ? {
          ...result,
          api_version: version,
        }
        : {
          status: 'failed',
          error: result?.message ?? `${weatherOl.name}: WeatherOL returned an unknown status\n`
            + `Data: ${data}`,
          api_version: version,
        });
      return;
    }

    // eslint-disable-next-line functional/no-expression-statement
    resolve(result);
  });
});

/**
 * Get data from ColorfulClouds. [简介 | 彩云天气 API]{@link https://docs.caiyunapp.com/docs/intro/}
 * @author WordlessEcho <wordless@echo.moe>
 * @author shindgewongxj
 * @param {string} token - Token for ColorfulClouds API
 * @param {coordinate} location - Coordinate of location
 * @param {string} language - Language from Apple Weather
 * @param {Object} [headers] - HTTP headers
 * @param {string} [apiVersion] - ColorfulClouds API version
 * @param {"realtime" | "minutely" | "hourly" | "daily" | "weather"} [path] -
 * @param {Object} [parameters] - Parameters pass to URL
 * @return {Promise<colorfulCloudsV2|colorfulCloudsV2Error>} Data from ColorfulClouds
 */
const colorfulClouds = (
  token,
  location,
  language,
  headers = { 'Content-Type': 'application/json' },
  path = 'weather',
  parameters = { unit: 'metric:v2' },
  apiVersion = 'v2.6',
) => {
  /**
   * Convert iOS-style language into the language supported by ColorfulClouds API.
   * [语言 | 彩云天气 API]{@link https://docs.caiyunapp.com/docs/tables/lang}
   * @author shindgewongxj
   * @author WordlessEcho <wordless@echo.moe>
   * @param {string} languageWithReigon - "zh-Hans-CA", "en-US", "ja-CA" from Apple URL
   * @returns {string} - `en_US` will be returned if language is not supported
   */
  const toColorfulCloudsLang = (languageWithReigon) => {
    if (isNonEmptyString(languageWithReigon)) {
      if (/zh-(Hans|CN)/.test(languageWithReigon)) {
        return 'zh_CN';
      }
      if (/zh-(Hant|HK|TW)/.test(languageWithReigon)) {
        return 'zh_TW';
      }
      if (languageWithReigon.includes('en-GB')) {
        return 'en_GB';
      }
      if (languageWithReigon.includes('ja')) {
        return 'ja';
      }
    }

    return 'en_US';
  };

  /**
   * Return a valid API version for ColorfulClouds.
   * @author WordlessEcho <wordless@echo.moe>
   * @param {string} version - API version to be checked
   * @return {string} - API version for ColorfulClouds.
   * `v2.6` will be returned if passed version is invalid.
   */
  const checkCcApiVersion = (version) => {
    if (isNonEmptyString(version) && version.startsWith('v')) {
      const versionCode = parseFloat(version.slice(1));

      if (!Number.isNaN(versionCode)) {
        return version;
      }
    }

    return 'v2.6';
  };

  /**
   * Check the type of parameters
   * @author WordlessEcho <wordless@echo.moe>
   * @param {string} uncheckedToken - Token of ColorfulClouds
   * @param {coordinate} uncheckedLocation - Coordinate of location
   * @return {string} - Error message to be returned.
   * Empty string will be returned if all types of parameter are correct.
   */
  const getError = (uncheckedToken, uncheckedLocation) => {
    if (!isNonEmptyString(uncheckedToken)) {
      return `${colorfulClouds.name}: Invalid token\n`
        + `Token type: ${typeof uncheckedToken}\n`
        + `Token length: ${uncheckedToken?.length}`;
    }

    if (!isLocation(uncheckedLocation)) {
      return `${colorfulClouds.name}: Invalid location: ${JSON.stringify(uncheckedLocation)}`;
    }

    return '';
  };

  return new Promise((resolve) => {
    const validApiVersion = checkCcApiVersion(apiVersion);
    const errorMessage = getError(token, location);
    if (errorMessage.length > 0) {
      // eslint-disable-next-line functional/no-expression-statement
      resolve({
        status: 'failed',
        error: errorMessage,
        api_version: validApiVersion,
      });
      return;
    }

    const parametersString = isObject(parameters)
      ? Object.entries({ lang: toColorfulCloudsLang(language), ...parameters })
        .map(([key, value]) => `${key}=${value}`).join('&')
      : '';

    const request = {
      headers,
      url: `https://api.caiyunapp.com/${apiVersion}/${token}/`
        + `${location.longitude},${location.latitude}/`
        // https://docs.caiyunapp.com/docs/weather/
        + `${path}?${parametersString}`,
    };

    // eslint-disable-next-line functional/no-expression-statement
    $.get(request, (error, response, data) => {
      if (error) {
        // eslint-disable-next-line functional/no-expression-statement
        resolve({
          status: 'failed',
          error: `${colorfulClouds.name}: Error: ${error}\n`
            + `Data: ${data}`,
          api_version: validApiVersion,
        });
        return;
      }

      const result = parseJson(data, (e) => ({
        status: 'failed',
        error: `${colorfulClouds.name}: Data from ColorfulClouds is not a valid JSON\n`
          + `Error: ${e}\n`
          + `Data: ${data}`,
      }));

      if (result?.status !== 'ok') {
        const version = isNonNanNumber(result?.api_version) ? `v${result.api_version}` : apiVersion;

        // eslint-disable-next-line functional/no-expression-statement
        resolve(isNonEmptyString(result?.status)
          // The type of api_version during error will be number
          ? {
            ...result,
            api_version: version,
          }
          : {
            status: 'failed',
            error: `${colorfulClouds.name}: ColorfulClouds returned an unknown status\n`
              + `Data: ${data}`,
            api_version: version,
          });
        return;
      }

      // eslint-disable-next-line functional/no-expression-statement
      resolve(result);
    });
  });
};

/**
 * Convert timestamp to time in Apple Weather
 * @author VirgilClyne
 * @author WordlessEcho <wordless@echo.moe>
 * @param {supportedAppleApi} apiVersion - Apple Weather API Version
 * @param {number} timestamp - UNIX timestamp
 * @returns {number|string | ""} - UNIX time in seconds for APIv1,
 * `YYYY-MM-DDTHH:MM:SSZ` format time for APIv2. Return empty string if api version is not valid.
 */
const toAppleTime = (apiVersion, timestamp) => {
  const timeDate = isNonNanNumber(timestamp) && timestamp > 0
    ? (new Date(timestamp)) : (new Date());

  switch (apiVersion) {
    case 1:
      return Math.trunc((+timeDate) / 1000);
    case 2:
    case 3:
      return `${timeDate.toISOString().split('.')[0]}Z`;
    default:
      return '';
  }
};

/**
 * Convert pollutant amount to another unit
 * @author WordlessEcho <wordless@echo.moe>
 * @param {pollutantUnitsText} unit - Unit of amount
 * @param {pollutantUnitsText} unitToConvert - Unit to convert
 * @param {number} amount - Amount of pollutant
 * @param {?supportedEpaVocs} pollutantName - For converting ppm or ppb to mg/m3 or ug/m3
 * @returns {number | -1} -
 * Converted amount or -1 if converting unsupported VOCs or unsupported units
 */
const pollutantUnitConverterUs = (unit, unitToConvert, amount, pollutantName) => {
  if (!isNonNanNumber(amount) || amount < 0) {
    return -1;
  }

  /**
   * Calculated by
   * ([Ozone AQI: Using concentrations in milligrams or ppb?]{@link https://aqicn.org/faq/2015-09-06/ozone-aqi-using-concentrations-in-milligrams-or-ppb/},
   * [Understanding Units of Measurement - Terrie K. Boguski, P.E. (CHSR)]{@link https://cfpub.epa.gov/ncer_abstracts/index.cfm/fuseaction/display.files/fileid/14285}):
   *
   * (amount * 12.187 * molecularWeight) / (temperatureInCelsius + 273.15)
   *
   * - 12.187 is the inverse of gas constant.
   * - 273.15 is the 0 celsius in kelvin.
   * - In US EPA, temperatureInCelsius is 25. In EU is 20.
   *
   * @type {Object.<supportedEpaVocs, number>}
   */
  const US_PPX_TO_XGM3 = {
    NO2: 1.88, OZONE: 1.97, NO: 1.23, SO2: 2.62, CO: 1.14,
  };

  /**
   * Check unit is ppm or ppb
   * @author WordlessEcho <wordless@echo.moe>
   * @param {pollutantUnitsText} unitToCheck - Unit to be checked
   * @returns {boolean} - True if unit is `ppm` or `ppb`
   */
  const isPpx = (unitToCheck) => unitToCheck === 'ppm' || unitToCheck === 'ppb';

  /**
   * Check unit is mg/m3 or ug/m3
   * @author WordlessEcho <wordless@echo.moe>
   * @param {pollutantUnitsText} unitToCheck - Unit to be checked
   * @returns {boolean} - True if unit is `milligramsPerM3` or `microgramsPerM3`
   */
  const isXgM3 = (unitToCheck) => (
    unitToCheck === 'milligramsPerM3' || unitToCheck === 'microgramsPerM3'
  );

  if ((isPpx(unit) && isXgM3(unitToConvert)) || (isXgM3(unit) && isPpx(unitToConvert))) {
    if (!Object.keys(US_PPX_TO_XGM3).includes(pollutantName)) {
      return -1;
    }
  }

  switch (unit) {
    case 'ppm':
      switch (unitToConvert) {
        case 'ppm':
          return amount;
        case 'ppb':
          return amount * 1000;
        case 'milligramsPerM3':
          return amount * US_PPX_TO_XGM3[pollutantName];
        case 'microgramsPerM3': {
          const inPpb = pollutantUnitConverterUs(unit, 'ppb', amount, pollutantName);
          return inPpb * US_PPX_TO_XGM3[pollutantName];
        }
        default:
          return -1;
      }
    case 'ppb':
      switch (unitToConvert) {
        case 'ppb':
          return amount;
        case 'ppm':
          return amount * 0.001;
        case 'milligramsPerM3': {
          const inPpm = pollutantUnitConverterUs(unit, 'ppm', amount, pollutantName);
          return inPpm * US_PPX_TO_XGM3[pollutantName];
        }
        case 'microgramsPerM3':
          return amount * US_PPX_TO_XGM3[pollutantName];
        default:
          return -1;
      }
    case 'milligramsPerM3':
      switch (unitToConvert) {
        case 'milligramsPerM3':
          return amount;
        case 'microgramsPerM3':
          return amount * 1000;
        case 'ppm':
          return amount / US_PPX_TO_XGM3[pollutantName];
        case 'ppb': {
          const inUgM3 = pollutantUnitConverterUs(unit, 'microgramsPerM3', amount, pollutantName);
          return inUgM3 / US_PPX_TO_XGM3[pollutantName];
        }
        default:
          return -1;
      }
    case 'microgramsPerM3':
      switch (unitToConvert) {
        case 'microgramsPerM3':
          return amount;
        case 'milligramsPerM3':
          return amount * 0.001;
        case 'ppm': {
          const inMgM3 = pollutantUnitConverterUs(unit, 'milligramsPerM3', amount, pollutantName);
          return inMgM3 / US_PPX_TO_XGM3[pollutantName];
        }
        case 'ppb':
          return amount / US_PPX_TO_XGM3[pollutantName];
        default:
          return -1;
      }
    default:
      return -1;
  }
};

/**
 * Calculate AQI by AQI range and concentration breakpoints.
 * [Technical Assistance Document for the Reporting of Daily Air Quality – the Air Quality Index (AQI)]{@link https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf}
 * [环境空气质量指数（AQI）技术规定（试行）]{@link https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/W020120410332725219541.pdf}
 * @author WordlessEcho <wordless@echo.moe>
 * @param {concentrationRange[]} concentrationRanges - concentrationBreakpoints
 * @param {number} amount - Amount of pollutant
 * @returns {number | -1} - Air quality index, -1 if amount is not a valid number
 */
const toEpaAqi = (concentrationRanges, amount) => {
  if (Array.isArray(concentrationRanges) && isNonNanNumber(amount) && amount >= 0) {
    const ranges = concentrationRanges.filter((r) => (
      isPositiveWithZeroRange(r?.AMOUNT) && isPositiveWithZeroRange(r?.AQI)
    ));

    if (ranges.length > 0) {
      const range = ranges.find(({ AMOUNT }) => amount >= AMOUNT.LOWER && amount <= AMOUNT.UPPER);

      if (isPositiveWithZeroRange(range?.AQI) && isPositiveWithZeroRange(range?.AMOUNT)) {
        const { AQI, AMOUNT } = range;
        return Math.round(
          ((AQI.UPPER - AQI.LOWER) * (amount - AMOUNT.LOWER))
          / (AMOUNT.UPPER - AMOUNT.LOWER) + AQI.LOWER,
        );
      }

      // Over range!
      const topRange = ranges.reduce((previous, current) => (
        current.AMOUNT.UPPER > previous.AMOUNT.UPPER ? current : previous
      ));

      // Or we just return `topRange.AQI.UPPER`?
      if (
        isPositiveWithZeroRange(topRange?.AMOUNT) && isPositiveWithZeroRange(topRange?.AQI)
        && amount > topRange.AMOUNT.UPPER
      ) {
        return Math.round(amount - topRange.AMOUNT.UPPER + topRange.AQI.UPPER);
      }
    }
  }

  return -1;
};

/**
 * Calculate amount of pollutants to AQIs
 * @author WordlessEcho <wordless@echo.moe>
 * @param {Object.<string, concentration>} concentrationsInfo -
 * Amount breakpoints, AQI breakpoints and unit info of concentrations
 * @param {pollutantV2[]} pollutants - Name, amount and unit info of pollutants
 * @returns {aqiInfo}
 */
const toEpaAqis = (concentrationsInfo, pollutants) => {
  if (!isObject(concentrationsInfo) || !Array.isArray(pollutants)) {
    return { index: -1, pollutants: [] };
  }

  const concentrations = Object.fromEntries(Object.entries(concentrationsInfo)
    .filter(([key, value]) => (
      isNonEmptyString(key) && isNonEmptyString(value?.UNIT) && isObject(value?.RANGES)
      && !Object.values(value.RANGES).some((rangesForLevel) => (
        !isPositiveWithZeroRange(rangesForLevel?.AMOUNT)
        || !isPositiveWithZeroRange(rangesForLevel?.AQI)
      ))
    )));

  const pollutantAqis = pollutants
    .filter((pollutant) => isNonEmptyString(pollutant?.name))
    .map((pollutant) => {
      if (
        Object.keys(concentrations).includes(pollutant.name) && isNonEmptyString(pollutant?.unit)
        && isNonNanNumber(pollutant?.amount) && pollutant.amount >= 0
      ) {
        const { name, unit, amount } = pollutant;
        const concentration = concentrations[name];
        const convertedAmount = unit === concentration.UNIT ? amount
          : pollutantUnitConverterUs(unit, concentration.UNIT, amount, name);

        return { name, aqi: toEpaAqi(Object.values(concentration.RANGES), convertedAmount) };
      }

      return { name: pollutant.name, aqi: -1 };
    });

  const validAqis = pollutantAqis?.filter(({ aqi }) => aqi !== -1);
  const primary = Array.isArray(validAqis) && validAqis.length > 0 ? validAqis.reduce(
    (previous, current) => (current.aqi > previous.aqi ? current : previous),
  ) : { aqi: -1 };

  return {
    index: primary.aqi,
    ...(isNonEmptyString(primary?.name) && { primary: primary.name }),
    pollutants: pollutantAqis,
  };
};

/**
 * Calculate Air Quality Level
 * @author WordlessEcho <wordless@echo.moe>
 * @author VirgilClyne
 * @param {aqiLevel[]} aqiLevels - Breakpoints of AQI
 * @param {number} aqi - Air quality index
 * @returns {number | -1} - -1 if AQI or aqiLevels is invalid.
 * `topLevel.VALUE` + 1 will be returned if no matched ranges.
 */
const toAqiLevel = (aqiLevels, aqi) => {
  if (Array.isArray(aqiLevels) && isNonNanNumber(aqi) && aqi >= 0) {
    const levels = aqiLevels.filter((level) => (
      isPositiveWithZeroRange(level?.RANGE) && isNonNanNumber(level?.VALUE) && level.VALUE > 0
    ));

    const level = levels.find(({ RANGE }) => (aqi >= RANGE.LOWER && aqi <= RANGE.UPPER));

    if (isNonNanNumber(level?.VALUE)) {
      return level.VALUE;
    }

    const topLevel = levels.length > 0 && levels.reduce((previous, current) => (
      current.VALUE > previous.VALUE ? current : previous
    ));

    if (isNonNanNumber(topLevel?.VALUE) && aqi > topLevel.RANGE.UPPER) {
      return topLevel.VALUE + 1;
    }
  }

  return -1;
};

/**
 * Compare Air Quality Levels
 * @author WordlessEcho <wordless@echo.moe>
 * @param {number} aqiLevelA - Value from {@link toAqiLevel} to compare
 * @param {number} aqiLevelB - Value from {@link toAqiLevel} to be compared
 * @returns {aqiComparison} - Value for `AirQuality.previousDayComparison`.
 * `unknown` will be returned if aqiLevel is invalid.
 */
const compareAqi = (aqiLevelA, aqiLevelB) => {
  if (
    !isNonNanNumber(aqiLevelA) || !isNonNanNumber(aqiLevelB) || aqiLevelA <= 0 || aqiLevelB <= 0
  ) {
    return 'unknown';
  }

  if (aqiLevelA > aqiLevelB) {
    return 'worse';
  } if (aqiLevelA < aqiLevelB) {
    return 'better';
  }

  return 'same';
};

/**
 * Fix unit of CO from QWeather
 * @author WordlessEcho <wordless@echo.moe>
 * @param {pollutantUnitsV2|pollutantUnitsV1} unit - Unit of CO
 * @param {number} amount - Amount of CO
 * @return {number | -1} - Converted CO amount. -1 will be returned if amount is invalid.
 * Amount will not be converted if unit is not `microgramsPerM3`.
 */
const fixQweatherCo = (unit, amount) => {
  if (!isNonNanNumber(amount) || amount < 0) {
    return -1;
  }

  if (unit === 'µg/m3' || unit === 'microgramsPerM3') {
    const mgAmount = pollutantUnitConverterUs(
      'microgramsPerM3',
      HJ_633.CONCENTRATIONS.CO.UNIT,
      amount,
      'CO',
    );

    if (mgAmount < 0.1) {
      const fixedAmount = pollutantUnitConverterUs(
        HJ_633.CONCENTRATIONS.CO.UNIT,
        'microgramsPerM3',
        amount,
        'CO',
      );

      logger(
        'debug',
        `${fixQweatherCo.name}：已修复一氧化碳含量，原始值：${amount}ug/m3，修复值：${fixedAmount}ug/m3`,
      );
      return fixedAmount;
    }
  }

  return amount;
};

/**
 * Convert pollutant unit into Apple APIv2 style
 * @author WordlessEcho <wordless@echo.moe>
 * @param {pollutantV1[]} pollutants - Pollutants in Apple APIv1 format
 * @return {pollutantV2[]} - Pollutants in Apple APIv2 format
 */
const convertV1Pollutants = (pollutants) => {
  const units = ['ppb', 'µg/m3'];
  const validPollutants = Array.isArray(pollutants) ? pollutants.filter(
    (pollutant) => (
      units.includes(pollutant?.unit) && isNonEmptyString(pollutant?.name)
      && isNonNanNumber(pollutant?.amount) && pollutant.amount >= 0
    ),
  ) : [];

  return validPollutants.map((pollutant) => ({
    ...pollutant, unit: pollutant.unit === 'µg/m3' ? 'microgramsPerM3' : pollutant.unit,
  }));
};

/**
 * Convert pollutants from Apple to specific EPA standard
 * @author WordlessEcho <wordless@echo.moe>
 * @param {aqiStandard} standard - EPA standard to convert
 * @param {pollutantV2[]} pollutants - Pollutants in Apple APIv2 format
 * @return {airQualityObject} - Object for {@link toAirQuality}
 */
const appleToEpaAirQuality = (standard, pollutants) => {
  if (
    !isObject(standard) || !Array.isArray(pollutants) || !isObject(standard?.CONCENTRATIONS)
    || !isObject(standard?.AQI_LEVELS)
  ) {
    return {};
  }

  const validConcentrations = Object.fromEntries(Object.entries(standard.CONCENTRATIONS).filter(
    ([, value]) => (
      isNonEmptyString(value?.UNIT) && isObject(value?.RANGES)
      && !Object.values(value.RANGES).includes((v) => (
        !isPositiveRange(v?.AMOUNT) || !isPositiveWithZeroRange(v?.AQI)
      ))
    ),
  ));

  if (Object.keys(validConcentrations) <= 0) {
    return {};
  }

  const units = ['ppb', 'microgramsPerM3'];
  const validPollutants = pollutants.filter((pollutant) => (
    Object.keys(validConcentrations).includes(pollutant?.name) && units.includes(pollutant?.unit)
    && isNonNanNumber(pollutant?.amount) && pollutant.amount >= 0
  ));

  const aqis = toEpaAqis(validConcentrations, validPollutants);
  if (!isNonNanNumber(aqis.index) || aqis.index < 0) {
    return {};
  }

  const validAqiLevelValues = Object.values(standard.AQI_LEVELS).filter((level) => (
    isNonNanNumber(level.VALUE) && isPositiveWithZeroRange(level.RANGE)
  ));

  const topAqiLevelValue = validAqiLevelValues.length > 0
    ? Math.max(...validAqiLevelValues.map(({ VALUE }) => VALUE)) : -1;
  const aqiLevel = toAqiLevel(validAqiLevelValues, aqis.index);
  const categoryIndex = aqiLevel > 0 && aqiLevel > topAqiLevelValue ? topAqiLevelValue : aqiLevel;

  return {
    isSignificant: categoryIndex >= standard.SIGNIFICANT_LEVEL,
    ...(isNonEmptyString(aqis?.primary) && { primary: aqis.primary }),
    categoryIndex,
    aqi: aqis.index,
    scale: standard.APPLE_SCALE,
  };
};

/**
 * Get air quality from ColorfulClouds
 * @author WordlessEcho <wordless@echo.moe>
 * @param {colorfulCloudsV2} dataWithRealtime - Data from ColorfulClouds with air quality info
 * @return {ccAirQuality | {aqi: {usa: -1, chn: -1}}} - Air quality data in v2.4+ format
 */
const getCcAirQuality = (dataWithRealtime) => {
  const toColorfulCloudsNames = {
    NO2: 'no2', 'PM2.5': 'pm25', SO2: 'so2', OZONE: 'o3', PM10: 'pm10', CO: 'co', aqi: 'aqi',
  };

  const apiVersion = dataWithRealtime?.api_version;
  const versionCode = isNonEmptyString(apiVersion) && apiVersion.startsWith('v')
    && parseFloat(apiVersion.slice(1));
  const validVersionCode = isNonNanNumber(versionCode) ? versionCode : -1;

  // https://open.caiyunapp.com/%E5%BD%A9%E4%BA%91%E5%A4%A9%E6%B0%94_API/v2.5#.E6.A0.BC.E5.BC.8F.E5.8F.98.E6.9B.B4
  // https://docs.caiyunapp.com/docs/v2.4/intro#%E4%B8%8D%E5%85%BC%E5%AE%B9%E7%9A%84%E6%9B%B4%E6%96%B0
  if (validVersionCode >= 2.2 && validVersionCode < 3) {
    const airQuality = validVersionCode >= 2.4
      ? dataWithRealtime?.result?.realtime?.air_quality
      : dataWithRealtime?.result;

    if (isObject(airQuality)) {
      const result = Object.fromEntries(Object.keys(toColorfulCloudsNames).map((key) => {
        const value = airQuality?.[toColorfulCloudsNames[key]];

        if (key === 'aqi') {
          const chnAqi = validVersionCode >= 2.4 ? value?.chn : value;
          const usaAqi = validVersionCode >= 2.4 ? value?.usa : -1;

          return [key, {
            usa: isNonNanNumber(usaAqi) && usaAqi >= 0 ? usaAqi : -1,
            chn: isNonNanNumber(chnAqi) && chnAqi >= 0 ? chnAqi : -1,
          }];
        }

        return [
          key,
          isNonNanNumber(value) && value >= 0 ? value : -1,
        ];
      }));

      // Detect the support of air quality
      if (
        Object.values(result).filter((value) => isNonNanNumber(value) && value <= 0).length <= 1
      ) {
        logger('debug', `${getCcAirQuality.name}：美标：${result.aqi.usa}，国标：${result.aqi.chn}`);
        return result;
      }
    }

    logger('error', `${getCcAirQuality.name}：缺少空气质量数据`);
  // eslint-disable-next-line functional/no-conditional-statement
  } else {
    logger('error', `${getCcAirQuality.name}：不支持${apiVersion}版本的API`);
  }

  return { aqi: { usa: -1, chn: -1 } };
};

/**
 * Convert seconds to timezone
 * @author WordlessEcho <wordless@echo.moe>
 * @param {number} minutes - Timezone in minutes
 * @return {string} - Timezone in "+/-HH:MM" format
 */
const minutesToIsoTimezone = (minutes) => {
  const validOffset = isNonNanNumber(minutes) ? minutes : (new Date()).getTimezoneOffset();
  return `${validOffset < 0 ? '-' : '+'}`
    + `${Math.floor(Math.abs(validOffset / 60)).toString().padStart(2, '0')}`
    + `:${(Math.abs(validOffset % 60)).toString().padStart(2, '0')}`;
};

/**
 * Get history AQI from ColorfulClouds
 * @author WordlessEcho <wordless@echo.moe>
 * @param {colorfulCloudsV2} historyData - Data with history from ColorfulClouds
 * @param {number} timestamp - Timestamp of data to get
 * @return {{usa: number | -1, chn: number | -1}} - Air quality index
 */
const colorfulCloudsHistoryAqi = (historyData, timestamp) => {
  if (!isNonNanNumber(timestamp) || timestamp <= 0) {
    return { usa: -1, chn: -1 };
  }

  const apiVersion = historyData?.api_version;
  const versionCode = isNonEmptyString(apiVersion) && apiVersion.startsWith('v')
    && parseFloat(apiVersion.slice(1));
  const validVersionCode = isNonNanNumber(versionCode) ? versionCode : -1;

  const hourTimestamp = (new Date(timestamp)).setMinutes(0, 0, 0);

  const historyAqis = validVersionCode >= 2.4
    ? historyData?.result?.hourly?.air_quality?.aqi
    : historyData?.result?.hourly?.aqi;

  // An hour as range
  const aqis = historyAqis?.find((aqi) => {
    if (!isNonEmptyString(aqi?.datetime)) {
      return false;
    }

    // https://docs.caiyunapp.com/docs/v2.3/intro#%E4%B8%8D%E5%85%BC%E5%AE%B9%E7%9A%84%E6%9B%B4%E6%96%B0
    if (
      validVersionCode < 2.3 && (!isNonNanNumber(historyData?.tzshift)
        || historyData.tzshift % 60 !== 0)
    ) {
      return false;
    }
    const ts = Date.parse(validVersionCode < 2.3
      ? `${aqi.datetime.replace(' ', 'T')}:00.000${minutesToIsoTimezone(historyData.tzshift / 60)}`
      : aqi.datetime.split('+').join(':00.000+'));

    return isNonNanNumber(ts) && ts > 0
      && ts >= hourTimestamp && ts < hourTimestamp + 1000 * 60 * 60;
  });

  const usaAqi = validVersionCode >= 2.4 ? aqis?.value?.usa : -1;
  const chnAqi = validVersionCode >= 2.4 ? aqis?.value?.chn : aqis?.value;

  return {
    usa: isNonNanNumber(usaAqi) && usaAqi >= 0 ? usaAqi : -1,
    chn: isNonNanNumber(chnAqi) && chnAqi >= 0 ? chnAqi : -1,
  };
};

/**
 * Compare AQI to the yesterday from ColorfulClouds
 * @author WordlessEcho <wordless@echo.moe>
 * @param {colorfulCloudsV2} realtimeAndHistoryData -
 * Data with realtime and history from ColorfulClouds
 * @param {boolean} forceChn - Use `aqi.chn` by force
 * @return {aqiComparison} - Result of comparison for `previousDayComparison`
 */
const colorfulCloudsToAqiComparison = (realtimeAndHistoryData, forceChn) => {
  const airQuality = getCcAirQuality(realtimeAndHistoryData);

  const serverTime = realtimeAndHistoryData?.server_time;
  const serverTimestamp = isNonNanNumber(serverTime) && serverTime > 0
    ? serverTime * 1000 : (+new Date());
  const reportedTimestamp = (new Date(serverTimestamp)).setMinutes(0, 0, 0);
  const yesterdayTimestamp = reportedTimestamp - 1000 * 60 * 60 * 24;

  const todayAqi = airQuality.aqi;
  const yesterdayAqi = colorfulCloudsHistoryAqi(realtimeAndHistoryData, yesterdayTimestamp);

  if ((typeof forceChn !== 'boolean' || !forceChn) && todayAqi.usa >= 0 && yesterdayAqi.usa >= 0) {
    const todayAqiLevel = toAqiLevel(Object.values(EPA_454.AQI_LEVELS), todayAqi.usa);
    const yesterdayAqiLevel = toAqiLevel(Object.values(EPA_454.AQI_LEVELS), yesterdayAqi.usa);

    return compareAqi(todayAqiLevel, yesterdayAqiLevel);
  }

  if (todayAqi.chn >= 0 && yesterdayAqi.chn >= 0) {
    const todayAqiLevel = toAqiLevel(Object.values(HJ_633.AQI_LEVELS), todayAqi.chn);
    const yesterdayAqiLevel = toAqiLevel(Object.values(HJ_633.AQI_LEVELS), yesterdayAqi.chn);

    return compareAqi(todayAqiLevel, yesterdayAqiLevel);
  }

  logger(
    'error',
    `${colorfulCloudsToAqiComparison.name}：无法找到AQI，今日：${JSON.stringify(todayAqi)}`
    + `，昨日：${JSON.stringify(yesterdayAqi)}`,
  );
  return 'unknown';
};

/**
 * Get AQI comparison from WAQI AQI feed
 * @param {waqiAqiFeedRxsObsMsg} aqiFeedMsg
 * @return {aqiComparison}
 */
const waqiV1AqiToAqiComparison = (aqiFeedMsg) => {
  const obsData = aqiFeedMsg?.obs;
  if (!obsData) {
    return 'unknown';
  }

  const pollutantNames = ['co', 'no2', 'o3', 'pm10', 'pm25', 'so2'];

  const parsedHistoryData = Object.fromEntries(
    Object.entries(obsData).map(([pollutantName, value]) => {
      const getTimestamp = (array, index) => {
        const isoTime = value.s.replace(' ', 'T');
        const baseTime = (+(new Date(isoTime)));
        if (index === 0) {
          return baseTime;
        }

        return array.slice(0, index + 1).map((v) => (isNonNanNumber(v) ? baseTime : v[1] * 1000))
          .reduce((previous, current) => previous + current);
      };

      const getAqi = (array, index) => {
        const relative = array[index];
        const relativeValidValue = isNonNanNumber(relative) ? relative : relative[0];
        const decimal = value.m;
        if (index === 0) {
          return relativeValidValue / decimal;
        }

        return array.slice(0, index + 1).map((v) => (isNonNanNumber(v) ? v : v[0]))
          .reduce((previous, current) => previous + current) / decimal;
      };

      return [pollutantName, value.v.map((v, index, array) => ({
        timestamp: getTimestamp(array, index),
        aqi: getAqi(array, index),
      }))];
    }),
  );

  const isoTime = aqiFeedMsg?.time?.iso;
  const timestamp = isNonEmptyString(isoTime)
    ? Date.parse(`${isoTime.slice(0, -6)}.000${isoTime.slice(-6)}`) : (+(new Date()));
  const nowHourTimestamp = isNonNanNumber(timestamp) ? (new Date(timestamp)).setMinutes(0, 0, 0)
    : (new Date()).setMinutes(0, 0, 0);
  const yesterdayTimestamp = nowHourTimestamp - 1000 * 60 * 60 * 24;
  const yesterdayAqis = pollutantNames.map((name) => {
    const historyData = parsedHistoryData?.[name];
    if (Array.isArray(historyData)) {
      const aqi = historyData.find((history) => (
        isNonNanNumber(history?.timestamp) && history.timestamp >= yesterdayTimestamp
        && history.timestamp < yesterdayTimestamp + 1000 * 60 * 60
      ))?.aqi;

      if (isNonNanNumber(aqi)) {
        return aqi;
      }
    }

    logger('warn', `${waqiV1AqiToAqiComparison.name}：缺失${name}的历史数据`);
    return -1;
  });
  const yesterdayAqi = Math.max(...yesterdayAqis);
  const todayAqi = aqiFeedMsg?.aqi;

  if (
    !isNonNanNumber(yesterdayAqi) || yesterdayAqi < 0 || !isNonNanNumber(todayAqi) || todayAqi < 0
  ) {
    logger('error', `${waqiV1AqiToAqiComparison.name}：无法找到AQI，今日AQI = ${todayAqi}，昨日AQI = ${yesterdayAqi}`);

    return 'unknown';
  }

  return compareAqi(
    toAqiLevel(Object.values(WAQI_INSTANT_CAST.AQI_LEVELS), todayAqi),
    toAqiLevel(Object.values(WAQI_INSTANT_CAST.AQI_LEVELS), yesterdayAqi),
  );
};

/**
 * Convert data from ColorfulClouds to air quality metadata
 * @author WordlessEcho <wordless@echo.moe>
 * @param {providerLogo} providerLogo - URL to the provider logo
 * @param {string} providerName - Name of the provider
 * @param {string} url - URL to the provider
 * @param {colorfulCloudsV2} data - Data from ColorfulClouds
 * @return {metadataObject | {}} - Object for {@link toMetadata}
 */
const colorfulCloudsToAqiMetadata = (providerLogo, providerName, url, data) => {
  const language = data?.lang;
  const location = { latitude: data?.location?.[0], longitude: data?.location?.[1] };
  // the unit of server_time is second
  const serverTime = data?.server_time;
  const serverTimestamp = isNonNanNumber(serverTime) && serverTime > 0
    ? serverTime * 1000 : (+(new Date()));

  const reportedTimestamp = (new Date(serverTimestamp)).setMinutes(0, 0, 0);
  const expireTimestamp = reportedTimestamp + 1000 * 60 * 60;
  const validExpireTimestamp = expireTimestamp > (+(new Date()))
    ? expireTimestamp : (+(new Date())) + 1000 * 60 * 15;

  const validProviderLogo = {
    ...(isNonEmptyString(providerLogo?.forV1) && { forV1: providerLogo.forV1 }),
    ...(isNonEmptyString(providerLogo?.forV2) && { forV2: providerLogo.forV2 }),
  };

  const variableMetadata = {
    ...(isNonEmptyString(language) && { language: language.replace('_', '-') }),
    ...(isLocation(location) && { location }),
    ...(Object.keys(validProviderLogo).length > 0 && { providerLogo: validProviderLogo }),
    ...(isNonEmptyString(providerName) && { providerName }),
    url,
  };

  return Object.keys(variableMetadata).length > 0 ? {
    ...variableMetadata,
    expireTimestamp: validExpireTimestamp,
    readTimestamp: serverTimestamp,
    reportedTimestamp,
    dataSource: 1,
    // https://developer.apple.com/documentation/weatherkitrestapi/unitssystem
    unit: 'm',
  } : {};
};

/**
 * Convert data from ColorfulClouds to object for {@link toAirQuality}
 * @author WordlessEcho <wordless@echo.moe>
 * @param {colorfulCloudsV2} realtimeAndHistoryData -
 * Data with realtime and history from ColorfulClouds
 * @param {string} url - Link to AQI info
 * @param {string} providerName - Name of the provider for `source` of Apple Weather
 * @param {boolean} aqiForceChn - Use `aqi.chn` by force for AQI
 * @param {boolean} comparisonForceChn - Use `aqi.chn` by force for comparison
 * @return {airQualityObject | {}} - Object for {@link toAirQuality}
 */
const colorfulCloudsToAqi = (
  realtimeAndHistoryData,
  url,
  providerName,
  aqiForceChn,
  comparisonForceChn,
) => {
  /**
   * Get AQI standard based on existed data
   * @author WordlessEcho <wordless@echo.moe>
   * @param {boolean} hasUsa - Existence of aqi.usa
   * @param {boolean} forceChn - Use aqi.chn by force
   * @return {aqiStandard} - AQI standard
   */
  const getCcStandard = (hasUsa, forceChn) => (
    typeof hasUsa !== 'boolean' || !hasUsa || (typeof forceChn === 'boolean' && forceChn)
      ? {
        ...HJ_633,
        CONCENTRATIONS: {
          ...HJ_633.CONCENTRATIONS,
          PM10: HJ_633.CONCENTRATIONS.PM10_24H,
          'PM2.5': HJ_633.CONCENTRATIONS['PM2.5_24H'],
        },
      } // TODO: EPA NowCast
      : WAQI_INSTANT_CAST
  );

  /**
   * Convert data from {@link getCcAirQuality} to {@link pollutantV2} object for Apple Weather
   * @author WordlessEcho <wordless@echo.moe>
   * @param {ccAirQuality} airQuality - Pollutants data from {@link getCcAirQuality}
   * @return {pollutantV2[] | []} -
   * Object for `airQuality.pollutants` of Apple Weather
   */
  const toPollutants = (airQuality) => (isObject(airQuality)
    ? Object.entries(airQuality)
      .filter(([key]) => key !== 'aqi')
      .map(([pollutantName, amount]) => ({
        name: pollutantName,
        amount: pollutantName === 'CO' ? pollutantUnitConverterUs(
          'milligramsPerM3',
          'microgramsPerM3',
          amount,
          null,
        ) : amount,
        unit: 'microgramsPerM3',
      }))
    : []);

  const airQuality = getCcAirQuality(realtimeAndHistoryData);
  const standard = getCcStandard(airQuality.aqi.usa >= 0, aqiForceChn);

  const aqi = standard.APPLE_SCALE === EPA_454.APPLE_SCALE
    ? airQuality.aqi.usa : airQuality.aqi.chn;
  if (!isNonNanNumber(aqi) || aqi < 0) {
    return {};
  }

  const categoryIndex = toAqiLevel(Object.values(standard.AQI_LEVELS), aqi);
  const pollutants = toPollutants(airQuality);
  const primaryPollutant = toEpaAqis(standard.CONCENTRATIONS, pollutants)?.primary;

  return {
    isSignificant: categoryIndex >= (isNonNanNumber(standard.SIGNIFICANT_LEVEL)
      ? standard.SIGNIFICANT_LEVEL : Number.MAX_VALUE),
    url: isNonEmptyString(url) ? url : 'https://caiyunapp.com/weather/',
    pollutants,
    // Primary pollutant must be included in pollutants
    ...(isNonEmptyString(primaryPollutant) && { primaryPollutant }),
    sourceName: isNonEmptyString(providerName) ? providerName : 'ColorfulClouds',
    categoryIndex,
    aqi,
    scale: standard.APPLE_SCALE,
    previousDayComparison:
      colorfulCloudsToAqiComparison(realtimeAndHistoryData, comparisonForceChn),
    sourceType: 'modeled',
  };
};

/**
 * Convert data from WAQI to air quality metadata
 * @author WordlessEcho <wordless@echo.moe>
 * @param {waqiFeed} feedData - Feed data from WAQI
 * @return {metadataObject | {}} - Object for {@link toMetadata}
 */
const waqiToAqiMetadata = (feedData) => {
  const location = {
    latitude: feedData?.data?.city?.geo?.[0],
    longitude: feedData?.data?.city?.geo?.[1],
  };
  if (!isLocation(location)) {
    return {};
  }

  const serverTimestamp = Date.parse(feedData?.data?.time?.iso);
  const validServerTimestamp = isNonNanNumber(serverTimestamp) && serverTimestamp > 0
    ? serverTimestamp : (+(new Date()));

  const reportedTimestamp = (new Date(validServerTimestamp)).setMinutes(0, 0, 0);
  const expireTimestamp = reportedTimestamp + 1000 * 60 * 60;
  const validExpireTimestamp = expireTimestamp > (+(new Date()))
    ? expireTimestamp : (+(new Date())) + 1000 * 60 * 15;

  return {
    language: 'en-US',
    location,
    expireTimestamp: validExpireTimestamp,
    providerLogo: {
      forV1: 'https://waqi.info/images/logo.png',
      forV2: 'https://raw.githubusercontent.com/VirgilClyne/iRingo/main/image/waqi.info.logo.png',
    },
    providerName: isNonEmptyString(feedData?.data?.city?.name)
      ? `${feedData.data.city.name} (The World Air Quality Project)`
      : 'The World Air Quality Project',
    readTimestamp: serverTimestamp,
    reportedTimestamp,
    dataSource: 0,
    // https://developer.apple.com/documentation/weatherkitrestapi/unitssystem
    unit: 'm',
    url: 'https://waqi.info',
  };
};

/**
 * Covert data from WAQI to object for {@link toAirQuality}
 * @author WordlessEcho <wordless@echo.moe>
 * @param {waqiFeed} feedData - Data with AQI from WAQI feed
 * @return {airQualityObject | {}} - Object for {@link toAirQuality}
 */
const waqiToAqi = (feedData) => {
  // TODO: Find other pollutant names for WAQI
  const toApplePollutantName = {
    no2: 'NO2', no: 'NO', nox: 'NOX', pm25: 'PM2.5', so2: 'SO2', o3: 'OZONE', pm10: 'PM10', co: 'CO', other: 'OTHER',
  };

  const aqi = feedData?.data?.aqi;
  if (!isNonNanNumber(aqi) || aqi < 0) {
    return {};
  }

  const validAqi = typeof aqi === 'number' && !Number.isNaN(aqi) && aqi >= 0 ? aqi : -1;
  const categoryIndex = toAqiLevel(Object.values(WAQI_INSTANT_CAST.AQI_LEVELS), validAqi);

  return isNonNanNumber(aqi) && aqi >= 0 ? {
    isSignificant: categoryIndex >= (isNonNanNumber(WAQI_INSTANT_CAST.SIGNIFICANT_LEVEL)
      ? WAQI_INSTANT_CAST.SIGNIFICANT_LEVEL : Number.MAX_VALUE),
    url: isNonEmptyString(feedData?.data?.city?.url) ? feedData.data.city.url : 'https://aqicn.org/',
    // Pollutant data from WAQI is AQI not amount
    pollutants: [],
    ...(Object.keys(toApplePollutantName).includes(feedData?.data?.dominentpol)
      && { primary: toApplePollutantName[feedData.data.dominentpol] }),
    sourceName: isNonEmptyString(feedData?.data?.city?.name) ? feedData.data.city.name : '',
    categoryIndex,
    aqi: validAqi,
    scale: WAQI_INSTANT_CAST.APPLE_SCALE,
    previousDayComparison: 'unknown',
    sourceType: 'station',
  } : {};
};

/**
 * Mapping the precipitation level ranges to 3 level of ranges of Apple
 * @author WordlessEcho <wordless@echo.moe>
 * @param {precipitationLevels} precipitationLevels - Range of each precipitation level
 * @param {number} precipitation - Value of precipitation
 * @return {number} - Value for `forecastNextHour.minutes[].precipIntensityPerceived`.
 * 0 will be returned if precipitation levels or precipitation is invalid.
 */
const toPerceived = (precipitationLevels, precipitation) => {
  const levels = isObject(precipitationLevels)
    ? Object.values(precipitationLevels).filter((level) => (
      isPositiveWithZeroRange(level.RANGE) && isNonNanNumber(level.VALUE)
      && level.VALUE >= 0 && level.VALUE <= 3
    ))
    : [];

  if (levels.length > 0 && isNonNanNumber(precipitation) && precipitation >= 0) {
    const topLevel = levels.reduce((previous, current) => (
      current.VALUE > previous.VALUE ? current : previous
    ));

    if (precipitation > topLevel.RANGE.UPPER) {
      return topLevel.VALUE;
    }

    const currentLevel = levels.find(({ RANGE }) => (
      precipitation >= RANGE.LOWER && precipitation < RANGE.UPPER
    ));
    const lastLevel = levels.find(({ VALUE }) => VALUE === currentLevel.VALUE - 1);

    if (
      isPositiveWithZeroRange(currentLevel?.RANGE) && isPositiveWithZeroRange(lastLevel?.RANGE)
      && isNonNanNumber(currentLevel?.VALUE) && isNonNanNumber(lastLevel?.VALUE)
    ) {
      return currentLevel.VALUE > 0
        ? lastLevel.VALUE + (((precipitation - lastLevel.RANGE.UPPER) * 1000)
        / ((currentLevel.RANGE.UPPER - currentLevel.RANGE.LOWER) * 1000))
        : 0;
    }
  }

  return 0;
};

/**
 * Get weather status for `NextHourForecast.condition[].token`
 * @author WordlessEcho <wordless@echo.moe>
 * @param {precipitationTypes} precipitationType - Type of precipitation
 * @param {number} precipitationIntensityPerceived - Apple precipitation.
 * Can be generated from {@link toPerceived}
 * @returns {weatherStatuses} - Weather status of current type and precipitation
 */
const perceivedToStatus = (precipitationType, precipitationIntensityPerceived) => {
  if (precipitationType === 'clear' || precipitationIntensityPerceived <= 0) {
    return 'clear';
  }

  if (precipitationType === 'rain' || precipitationType === 'snow') {
    if (precipitationIntensityPerceived <= 1) {
      return precipitationType === 'rain' ? 'drizzle' : 'flurries';
    }
    if (precipitationIntensityPerceived <= 2) {
      return precipitationType === 'rain' ? 'rain' : 'snow';
    }

    return precipitationType === 'rain' ? 'heavy-rain' : 'heavy-snow';
  }

  return precipitationType;
};

/**
 * Convert weather status to precipitation type
 * @author WordlessEcho <wordless@echo.moe>
 * @param {weatherStatuses} weatherStatus - Weather status to be converted
 * @returns {precipitationTypes} - `precipitation` will be returned if precipitation is invalid.
 */
const weatherStatusToType = (weatherStatus) => {
  switch (weatherStatus) {
    case 'clear':
    case 'sleet':
    case 'hail':
    case 'mixed':
      return weatherStatus;
    case 'flurries':
    case 'snow':
    case 'heavy-snow':
      return 'snow';
    case 'drizzle':
    case 'rain':
    case 'heavy-rain':
      return 'rain';
    default:
      return 'precipitation';
  }
};

/**
 * Transfer numbers into ordinal numerals. [Source code]{@link https://stackoverflow.com/a/20426113}
 * @author WordlessEcho <wordless@echo.moe>
 * @param {number} number - Number to transfer
 * @return {string} - Ordinal numeral of given number.
 * Empty string will be returned if given number is invalid.
 */
const stringifyNumber = (number) => {
  const special = [
    'zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth',
    'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth',
    'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth',
  ];
  const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

  if (!isNonNanNumber(number) || number < 0) {
    return '';
  }

  if (number < 20) {
    return special[number];
  }

  if (number % 10 === 0) {
    return `${deca[Math.floor(number / 10) - 2]}ieth`;
  }

  return `${deca[Math.floor(number / 10) - 2]}y-${special[number % 10]}`;
};

/**
 * Convert data from ColorfulClouds to next hour metadata
 * @author WordlessEcho <wordless@echo.moe>
 * @param {string} providerName - Name of the provider
 * @param {string} url - URL to the data
 * @param {colorfulCloudsV2} data - Data from ColorfulClouds
 * @return {
 * appleNextHourWithoutMetadataV1|appleNextHourWithoutMetadataV2|appleNextHourWithoutMetadataV3 | {}
 * } - Object for {@link toMetadata}
 */
const colorfulCloudsToNextHourMetadata = (providerName, url, data) => {
  const language = data?.lang;
  const location = { latitude: data?.location?.[0], longitude: data?.location?.[1] };
  const nowTimestamp = (+(new Date()));
  // the unit of server_time is second
  const serverTime = data?.server_time;
  const serverTimestamp = isNonNanNumber(serverTime) && serverTime > 0
    ? serverTime * 1000 : (+(new Date()));
  const expireTimestamp = serverTimestamp + 1000 * 60 * 15;

  return {
    language: isNonNanNumber(language) ? language.replace('_', '-') : 'zh-CN',
    ...(isLocation(location) && { location }),
    expireTimestamp: expireTimestamp < nowTimestamp
      ? nowTimestamp + 1000 * 60 * 5 : expireTimestamp,
    providerName: isNonEmptyString(providerName) ? providerName : 'ColorfulClouds',
    readTimestamp: serverTimestamp,
    dataSource: 1,
    // https://developer.apple.com/documentation/weatherkitrestapi/unitssystem
    unit: 'm',
    url,
  };
};

/**
 * Covert data from ColorfulClouds to minutes for {@link toNextHour}
 * @author WordlessEcho <wordless@echo.moe>
 * @param {string} providerName - Name of the provider. Will be used as placeholder.
 * @param {colorfulCloudsV2} dataWithMinutely - Data from ColorfulClouds with minutely
 * @return {nextHourObject | {}} nextHourObject for {@link toNextHour}
 */
const colorfulCloudsToNextHour = (providerName, dataWithMinutely) => {
  const supportedCcApis = [2];
  const supportedUnits = ['metric:v2', 'metric:v1', 'metric'];

  // [降水强度 | 彩云天气 API]{@link https://docs.caiyunapp.com/docs/tables/precip} (v2.6)
  const radarLevels = {
    NO: { VALUE: 0, RANGE: { LOWER: 0, UPPER: 0.031 } },
    LIGHT: { VALUE: 1, RANGE: { LOWER: 0.031, UPPER: 0.25 } },
    MODERATE: { VALUE: 2, RANGE: { LOWER: 0.25, UPPER: 0.35 } },
    HEAVY: { VALUE: 3, RANGE: { LOWER: 0.35, UPPER: 0.48 } },
    STORM: { VALUE: 4, RANGE: { LOWER: 0.48, UPPER: Number.MAX_VALUE } },
  };

  // [降水强度 | 彩云天气 API]{@link https://docs.caiyunapp.com/docs/tables/precip} (v2.6)
  const mmPerHourLevels = {
    NO: { VALUE: 0, RANGE: { LOWER: 0, UPPER: 0.08 } },
    LIGHT: { VALUE: 1, RANGE: { LOWER: 0.08, UPPER: 3.44 } },
    MODERATE: { VALUE: 2, RANGE: { LOWER: 3.44, UPPER: 11.33 } },
    HEAVY: { VALUE: 3, RANGE: { LOWER: 11.33, UPPER: 51.30 } },
    STORM: { VALUE: 4, RANGE: { LOWER: 51.30, UPPER: Number.MAX_VALUE } },
  };

  const KM = {
    zh_CN: '公里',
    zh_TW: '公里',
    // kilometers
    ja: 'キロメートル',
    en_US: 'km',
    en_GB: 'km',
  };

  /**
   * Get precipitation type from ColorfulClouds hourly skycons.
   * [天气现象 | 彩云天气API]{@link https://docs.caiyunapp.com/docs/tables/skycon/}
   * @author WordlessEcho <wordless@echo.moe>
   * @param {number} timestamp - UNIX timestamp of server time
   * @param {colorfulCloudsV2} dataWithHourlySkycons - Date with hourly.skycon[] from ColorfulClouds
   * @return {precipitationTypes} - Weather type or empty string if no valid sky condition
   */
  const getPrecipitationType = (timestamp, dataWithHourlySkycons) => {
    const skycons = dataWithHourlySkycons?.result?.hourly?.skycon;
    if (!Array.isArray(skycons)) {
      return 'clear';
    }

    const apiVersion = dataWithHourlySkycons?.api_version;
    const versionCode = isNonEmptyString(apiVersion) && apiVersion.startsWith('v') && parseFloat(apiVersion.slice(1));
    const validVersionCode = isNonNanNumber(versionCode) ? versionCode : -1;

    const serverTime = dataWithHourlySkycons?.server_time;
    const serverTimestamp = isNonNanNumber(serverTime) && serverTime > 0
      ? serverTime * 1000 : (+(new Date()));
    const hourTimestamp = (new Date(serverTimestamp)).setMinutes(0, 0, 0);
    const currentHourTimestamp = (new Date(timestamp)).setMinutes(0, 0, 0);

    const skyConditions = skycons.filter((skycon) => {
      if (!isNonEmptyString(skycon?.datetime)) {
        return false;
      }

      // https://docs.caiyunapp.com/docs/v2.3/intro#%E4%B8%8D%E5%85%BC%E5%AE%B9%E7%9A%84%E6%9B%B4%E6%96%B0
      if (
        validVersionCode < 2.3 && (!isNonNanNumber(dataWithHourlySkycons?.tzshift)
          || dataWithHourlySkycons.tzshift % 60 !== 0)
      ) {
        return false;
      }
      const ts = Date.parse(validVersionCode < 2.3
        ? `${skycon.datetime.replace(' ', 'T')}:00.000${minutesToIsoTimezone(dataWithHourlySkycons.tzshift / 60)}`
        : skycon.datetime.split('+').join(':00.000+'));

      return isNonNanNumber(ts) && ts > 0
        // Limit to 3 hours since ColorfulClouds provide two hours report
        && ts >= hourTimestamp && ts <= hourTimestamp + 1000 * 60 * 60 * 2;
    });

    const skyCondition = skyConditions.concat().sort((a, b) => {
      const aTimestamp = Date.parse(validVersionCode < 2.3
        ? `${a.datetime.replace(' ', 'T')}:00.000${minutesToIsoTimezone(dataWithHourlySkycons.tzshift / 60)}`
        : a.datetime.split('+').join(':00.000+'));
      const bTimestamp = Date.parse(validVersionCode < 2.3
        ? `${b.datetime.replace(' ', 'T')}:00.000${minutesToIsoTimezone(dataWithHourlySkycons.tzshift / 60)}`
        : b.datetime.split('+').join(':00.000+'));

      return currentHourTimestamp - aTimestamp - (currentHourTimestamp - bTimestamp);
    }).find((skycon) => (
      isNonEmptyString(skycon?.value) && (
        skycon.value.includes('RAIN') || skycon.value.includes('SNOW')
      )))?.value;

    if (!isNonEmptyString(skyCondition)) {
      return 'precipitation';
    }

    if (skyCondition.includes('SNOW')) {
      return 'snow';
    }

    if (skyCondition.includes('RAIN')) {
      return 'rain';
    }

    return 'precipitation';
  };

  /**
   * Convert precipitation type to weather status
   * @param {{start: number, end: number, isDrizzleOrFlurries: boolean}[]} precipitationInfo -
   * Ranges of precipitations with bounds and drizzle or flurries detection
   * @param {number} timeInMinute - Time for weather status to get
   * @param {precipitationTypes} precipitationType - Type of precipitation
   * @param {number} perceived - Precipitation intensity perceived,
   * can be generated by {@link toPerceived}
   * @return {weatherStatuses} - Weather status to specified minute
   */
  const toWeatherStatus = (precipitationInfo, timeInMinute, precipitationType, perceived) => {
    if (
      !Array.isArray(precipitationInfo) || !isNonNanNumber(timeInMinute) || timeInMinute < 0
      || precipitationInfo.some((info) => (
        !isNonNanNumber(info?.start) || !isNonNanNumber(info?.end)
      ))
    ) {
      return 'precipitation';
    }

    const status = perceivedToStatus(precipitationType, perceived);
    const rainStatus = ['rain', 'drizzle'];
    const snowStatus = ['snow', 'flurries'];
    const targets = [...rainStatus, ...snowStatus];
    if (targets.includes(status)) {
      const infoOfMinute = precipitationInfo.find((info) => (
        timeInMinute >= info.start && timeInMinute <= info.end
      ));

      if (typeof infoOfMinute?.isDrizzleOrFlurries === 'boolean') {
        if (rainStatus.includes(status)) {
          return infoOfMinute.isDrizzleOrFlurries ? 'drizzle' : 'rain';
        }

        if (snowStatus.includes(status)) {
          return infoOfMinute.isDrizzleOrFlurries ? 'flurries' : 'snow';
        }
      }
    }

    return status;
  };

  /**
   * Assign chance for each minute
   * since ColorfulClouds only provider chances for periods of 30 minutes
   * @author WordlessEcho <wordless@echo.moe>
   * @param {number[]} probabilities - `result.minutely.probability` from ColorfulClouds
   * @param {number} timeInMinute - Minutes from start time of precipitation
   * @return {number | -1} - 0 to 100 integer, -1 will be returned if probability is invalid
   */
  const getChance = (probabilities, timeInMinute) => {
    if (Array.isArray(probabilities) && isNonNanNumber(timeInMinute) && timeInMinute >= 0) {
      // Calculate order, 1 as first index.
      // Index here is relative to bound, plus bound for real index in precipitations.
      // We have only 4 chances per half hour from API.
      const chance = probabilities?.[Math.floor(timeInMinute / 30)];

      if (isNonNanNumber(chance) && chance >= 0) {
        return chance * 100;
      }
    }

    return -1;
  };

  /**
   * Mapping times to 'variable' that helpful for Apple to use cached description
   * @author WordlessEcho <wordless@echo.moe>
   * @param {string} description - Description for next two hours from ColorfulClouds
   * @param {string} ccLanguage - Language code from ColorfulClouds
   * @param {number} timeInMinute - Minutes from start time of precipitaion
   * @param {number} timeShift - Number of minutes that has expired
   * @return {{longDescription: string | "", parameters: Object.<string, number> | {}}} -
   * Short description and parameters for Apple Weather
   */
  const toDescription = (description, ccLanguage, timeInMinute, timeShift) => {
    if (!isNonEmptyString(description)) {
      return {
        longDescription: '',
        parameters: {},
      };
    }

    /**
     * Map times in description to `{firstAt}`, `{secondAt}`, etc...
     * @author WordlessEcho <wordless@echo.moe>
     * @param {string} rawDescription - Description with times
     * @return {{longDescription: string | "", parameters: Object.<string, number> | {}}} -
     * Short description and parameters for Apple Weather
     */
    const modifyDescription = (rawDescription) => {
      if (!isNonEmptyString(rawDescription)) {
        return {
          longDescription: '',
          parameters: {},
        };
      }

      /**
       * Insert 'after that' for description.
       * Times in description in Apple Weather after `{firstAt}` will be display as period.
       * @author WordlessEcho <wordless@echo.moe>
       * @param {string} language - Language from ColorfulClouds for description
       * @param {string} modifiedDescription - Description with '{firstAt}'
       * @return {string | ""} - Description after inserted.
       * Return empty string if description is invalid.
       */
      const insertAfterToDescription = (language, modifiedDescription) => {
        if (!isNonEmptyString(modifiedDescription)) {
          return '';
        }

        const FIRST_AT = '{firstAt}';
        // Words that used to insert into description
        const AFTER = {
          zh_CN: '再过',
          zh_TW: '再過',
          ja: 'その後',
          en_US: 'after that',
          // ColorfulClouds seems not prefer to display multiple times in en_GB
          en_GB: 'after that',
        };

        // Split description into two part at `{firstAt}`
        const splitDescriptions = modifiedDescription.split(FIRST_AT);
        if (splitDescriptions.length < 2) {
          return modifiedDescription;
        }

        switch (language) {
          case 'en_GB':
            return [
              ...splitDescriptions.slice(0, splitDescriptions.length - 1),
              splitDescriptions[splitDescriptions.length - 1]
                // Append `after that` to description.
                .replaceAll('} min later', `} min later ${AFTER.en_GB}`),
            ].join(FIRST_AT);
          case 'zh_CN':
            return [
              ...splitDescriptions.slice(0, splitDescriptions.length - 1),
              splitDescriptions[splitDescriptions.length - 1]
                .replaceAll('直到{', `${AFTER.zh_CN}{`),
            ].join(FIRST_AT);
          case 'zh_TW':
            return [
              ...splitDescriptions.slice(0, splitDescriptions.length - 1),
              splitDescriptions[splitDescriptions.length - 1]
                .replaceAll('直到{', `${AFTER.zh_TW}{`),
            ].join(FIRST_AT);
          case 'ja':
            // Japanese support from ColorfulClouds is broken for sometime.
            // https://lolic.at/notice/AJNH316TTSy1fRlOka

            // TODO: I am not familiar for Japanese, contributions welcome
            return [
              ...splitDescriptions.slice(0, splitDescriptions.length - 1),
              splitDescriptions[splitDescriptions.length - 1]
                .replaceAll('{', `${AFTER.ja} {`),
            ].join(FIRST_AT);
          case 'en_US':
            return [
              ...splitDescriptions.slice(0, splitDescriptions.length - 1),
              splitDescriptions[splitDescriptions.length - 1]
                .replaceAll('} min later', `} min later ${AFTER.en_US}`),
            ].join(FIRST_AT);
          default:
            return modifiedDescription;
        }
      };

      const times = rawDescription
        .match(/\d+/g).map((timeInString) => parseInt(timeInString, 10))
        .filter((time) => isNonNanNumber(time) && time > 0);

      const descriptionWithParameters = times.reduce(
        ({ longDescription, parameters }, time, index) => {
          const key = `${stringifyNumber(index + 1)}At`;
          return {
            longDescription: longDescription.replace(`${time}`, `{${key}}`),
            parameters: { ...parameters, [key]: time - timeShift },
          };
        },
        { longDescription: rawDescription, parameters: {} },
      );

      const longDescription = insertAfterToDescription(
        ccLanguage,
        descriptionWithParameters.longDescription,
      );

      return {
        longDescription,
        parameters: descriptionWithParameters.parameters,
      };
    };

    const SPLITTERS = {
      en_US: ['but ', 'and '],
      en_GB: ['but ', 'and '],
      zh_CN: ['，'],
      zh_TW: ['，'],
      ja: ['、'],
    };

    const allTimesString = description.match(/\d+/g);
    if (!Array.isArray(allTimesString)) {
      return { longDescription: '', parameters: {} };
    }

    // Split sentence by time
    const allTimes = allTimesString.map((timeInString) => parseInt(timeInString, 10))
      .filter((time) => !Number.isNaN(time) && time > 0);

    const expiredTimes = allTimes.filter((time) => time <= timeInMinute);
    if (expiredTimes.length <= 0) {
      return modifyDescription(description);
    }

    const maxExpiredTime = Math.max(...expiredTimes);
    if (maxExpiredTime === allTimes[allTimes.length - 1]) {
      return {
        longDescription: '',
        parameters: {},
      };
    }

    const startIndex = description.indexOf(`${maxExpiredTime}`) + `${maxExpiredTime}`.length;

    const splitters = SPLITTERS[ccLanguage];
    const splitIndexes = splitters.map((splitter) => (
      description.indexOf(splitter, startIndex) + splitter.length
    )).filter((index) => index !== -1);

    return modifyDescription(description.slice(Math.min(...splitIndexes)));
  };

  const provider = isNonEmptyString(providerName) ? providerName : $.name;

  const apiVersion = dataWithMinutely?.api_version;
  const versionCode = isNonEmptyString(apiVersion) && apiVersion.startsWith('v') && parseFloat(apiVersion.slice(1));
  const validVersionCode = isNonNanNumber(versionCode) ? versionCode : -1;
  const majorVersion = Math.trunc(validVersionCode);
  if (
    dataWithMinutely?.status !== 'ok'
    || !supportedCcApis.includes(majorVersion)
    || !supportedUnits.includes(dataWithMinutely?.unit)
    // ColorfulClouds: This might be deprecated in future
    || dataWithMinutely?.result?.minutely?.datasource !== 'radar'
    || !Array.isArray(dataWithMinutely.result.minutely?.precipitation_2h)
    || dataWithMinutely.result.minutely.precipitation_2h.some((p) => !isNonNanNumber(p))
    || !Array.isArray(dataWithMinutely.result.minutely?.probability)
    || dataWithMinutely.result.minutely.probability.some((p) => !isNonNanNumber(p))
  ) {
    // eslint-disable-next-line functional/no-conditional-statement
    if (dataWithMinutely?.result?.minutely?.datasource !== 'radar') {
      logger('error', `${colorfulCloudsToNextHour.name}：缺少此地的短临降水数据`);
      logger(
        'debug',
        `${colorfulCloudsToNextHour.name}：数据源：${dataWithMinutely?.result?.minutely?.datasource}`,
      );
    }

    return {};
  }

  // `server_time` is in seconds
  const serverTime = dataWithMinutely?.server_time;
  const serverTimestamp = isNonNanNumber(serverTime) && serverTime > 0
    ? serverTime * 1000 : (+(new Date()));
  const startTimestamp = (new Date()).setSeconds(0, 0) + 1000 * 60;
  const startIndex = (startTimestamp - (new Date(serverTimestamp).setSeconds(0, 0) + 1000 * 60))
    / 1000 / 60;
  const validStartIndex = startIndex >= 0 ? startIndex : 0;

  const maxPrecipitation = Math.max(...dataWithMinutely.result.minutely.precipitation_2h);
  const levels = dataWithMinutely?.unit === 'metric:v2' ? mmPerHourLevels : radarLevels;

  const precipitations = dataWithMinutely.result.minutely.precipitation_2h.slice(validStartIndex);
  const precipitationBounds = precipitations.flatMap((current, index, array) => {
    const previous = array[index - 1];

    if (index === 0 || previous < levels.NO.RANGE.UPPER) {
      if (current >= levels.NO.RANGE.UPPER) {
        return [index];
      }
    } else if (previous >= levels.NO.RANGE.UPPER) {
      if (current < levels.NO.RANGE.UPPER) {
        return [index];
      }
    }

    return [];
  });
  const precipitationInfo = precipitationBounds.flatMap((value, index, array) => {
    if (index % 2 > 0) {
      return [];
    }

    const start = value;
    const end = array?.[index + 1];
    const validEnd = isNonNanNumber(end) && end >= 0 ? end : precipitations.length;

    const slicedPrecipitations = precipitations.slice(start, validEnd);
    const sum = slicedPrecipitations.reduce((p, c) => p + c, 0);
    const average = sum / slicedPrecipitations.length;

    return [{
      start,
      end: validEnd,
      isDrizzleOrFlurries: isNonNanNumber(sum)
        && Math.max(...slicedPrecipitations) < levels.HEAVY.RANGE.LOWER
        && average < levels.MODERATE.RANGE.LOWER,
    }];
  });

  const minutes = precipitations.map((precipitation, index) => {
    const validPrecipitation = isNonNanNumber(precipitation) && precipitation >= 0
      ? precipitation : 0;

    const timeInMinute = validStartIndex + index + 1;

    const hourlyPrecipitationType = getPrecipitationType(
      serverTimestamp + 1000 * 60 * timeInMinute,
      dataWithMinutely,
    );
    const precipitationType = maxPrecipitation >= Object.values(levels)
      .find(({ VALUE }) => VALUE === 0).RANGE.UPPER ? hourlyPrecipitationType : 'clear';
    // eslint-disable-next-line functional/no-conditional-statement
    if (precipitationType === 'precipitation') {
      logger('warn', `${colorfulCloudsToNextHour.name}：无法获取雨雪类型`);
    }

    const precipitationIntensityPerceived = toPerceived(levels, validPrecipitation);

    const isClear = validPrecipitation < levels.NO.RANGE.UPPER;
    const chance = getChance(dataWithMinutely.result.minutely.probability, timeInMinute);
    const validChance = chance >= 0 ? chance : 100;

    const ccDescription = dataWithMinutely.result.minutely?.description;
    // ColorfulClouds may report no rain even if precipitation > no rain
    const descriptionWithParameters = !isNonEmptyString(ccDescription)
    || ccDescription.includes(KM[dataWithMinutely?.lang])
      ? {
        longDescription: provider,
        parameters: {},
      }
      : toDescription(
        ccDescription,
        dataWithMinutely?.lang,
        timeInMinute,
        validStartIndex,
      );

    const validDescriptionWithParameters = descriptionWithParameters.longDescription.length > 0
      ? descriptionWithParameters : { longDescription: provider, parameters: {} };

    return {
      weatherStatus: toWeatherStatus(
        precipitationInfo,
        timeInMinute,
        precipitationType,
        precipitationIntensityPerceived,
      ),
      precipitation: validPrecipitation,
      precipitationIntensityPerceived,
      // Set chance to zero if clear
      chance: isClear ? 0 : validChance,
      shortDescription: isNonEmptyString(dataWithMinutely.result?.forecast_keypoint)
        ? dataWithMinutely.result?.forecast_keypoint : provider,
      ...validDescriptionWithParameters,
    };
  });

  return {
    startTimestamp,
    minutes,
  };
};

/**
 * Append station name from QWeather to provider name
 * @author WordlessEcho <wordless@echo.moe>
 * @param {string} providerName - Provider name from metadata
 * @param {string} source - Station name in source
 * @return {string | ""} - Appended string
 */
const appendQweatherSourceToProviderName = (providerName, source) => {
  if (!isNonEmptyString(source)) {
    return isNonEmptyString(providerName) ? providerName : $.name;
  }

  switch (providerName) {
    case '和风天气':
      return `${source}（${providerName}）`;
    case 'QWeather':
      return `${source} (${providerName})`;
    default:
      return providerName;
  }
};

/**
 * Create metadata
 * @author VirgilClyne
 * @author WordlessEcho <wordless@echo.moe>
 * @param {supportedAppleApi} appleApiVersion - Apple API version
 * @param {metadataObject} metadataObject - Object of the metadata info
 * @return {
 * appleNextHourMetadataV1|appleNextHourMetadataV2|appleNextHourMetadataV3|appleAirQualityMetadataV1
 * |appleAirQualityMetadataV2|appleAirQualityMetadataV3 | {}
 * } - Metadata for air quality or next hour in Apple Weather format
 */
const toMetadata = (appleApiVersion, metadataObject) => {
  const supportedApis = [1, 2, 3];
  if (!supportedApis.includes(appleApiVersion)) {
    return {};
  }

  const sharedMetadata = {
    ...(isNonEmptyString(metadataObject?.language) && { language: metadataObject.language }),
    ...(isLatitude(metadataObject?.location?.latitude)
      && { latitude: metadataObject.location.latitude }),
    ...(isLongitude(metadataObject?.location?.longitude)
      && { longitude: metadataObject.location.longitude }),
  };

  const getSharedMetadataV2Plus = (apiVersion, metadataObj) => ({
    ...(isNonNanNumber(metadataObj?.expireTimestamp) && metadataObj.expireTimestamp > 0
      && { expireTime: toAppleTime(apiVersion, metadataObj.expireTimestamp) }),
    ...(isNonEmptyString(metadataObj?.providerLogo?.forV2)
      && { providerLogo: metadataObj.providerLogo.forV2 }),
    ...(isNonEmptyString(metadataObj?.providerName)
      && { providerName: metadataObj.providerName }),
    ...(isNonNanNumber(metadataObj?.readTimestamp) && metadataObj.readTimestamp > 0
      && { readTime: toAppleTime(apiVersion, metadataObj.readTimestamp) }),
    ...(isNonNanNumber(metadataObj?.reportedTimestamp) && metadataObj.reportedTimestamp > 0
      && { reportedTime: toAppleTime(apiVersion, metadataObj.reportedTimestamp) }),
    ...(isNonEmptyString(metadataObj?.unit) && { units: metadataObj.unit }),
  });

  /**
   * Merge metadata for Apple Weather by API version
   * @param {supportedAppleApi} apiVersion - Apple API version
   * @param {metadataObject} metadataObj - Metadata object
   * @return {
   * appleNextHourMetadataV1|appleNextHourMetadataV2|appleNextHourMetadataV3
   * |appleAirQualityMetadataV1|appleAirQualityMetadataV2|appleAirQualityMetadataV3 | {}
   * } - Metadata for air quality or next hour in Apple Weather format (without `name` property)
   */
  const getMetadata = (apiVersion, metadataObj) => {
    switch (apiVersion) {
      case 1:
        // no units for APIv1
        return {
          ...sharedMetadata,
          ...(isNonNanNumber(metadataObj?.expireTimestamp) && metadataObj.expireTimestamp > 0
            && { expire_time: toAppleTime(apiVersion, metadataObj.expireTimestamp) }),
          ...(isNonEmptyString(metadataObj?.providerLogo?.forV1)
            && { provider_logo: metadataObj.providerLogo.forV1 }),
          ...(isNonEmptyString(metadataObj?.providerName)
            && { provider_name: metadataObj.providerName }),
          ...(isNonNanNumber(metadataObj?.readTimestamp) && metadataObj.readTimestamp > 0
            && { read_time: toAppleTime(apiVersion, metadataObj.readTimestamp) }),
          ...(isNonNanNumber(metadataObj?.reportedTimestamp) && metadataObj.reportedTimestamp > 0
            && { reported_time: toAppleTime(apiVersion, metadataObj.reportedTimestamp) }),
          ...((metadataObj?.dataSource === 0 || metadataObj?.dataSource === 1)
            && { data_source: metadataObj.dataSource }),
        };
      case 2:
        // no data source for APIv2
        return {
          ...sharedMetadata,
          ...getSharedMetadataV2Plus(apiVersion, metadataObj),
        };
      case 3:
        return {
          ...(isNonEmptyString(metadataObj?.url) && { attributionURL: metadataObj.url }),
          ...sharedMetadata,
          ...getSharedMetadataV2Plus(apiVersion, metadataObj),
        };
      default:
        return {};
    }
  };

  const metadata = getMetadata(appleApiVersion, metadataObject);
  return Object.keys(sharedMetadata).length > 0 || Object.keys(metadata).length > 0
    ? {
      ...(isNonNanNumber(appleApiVersion) && appleApiVersion > 0
        && { version: appleApiVersion > 2 ? appleApiVersion - 2 : appleApiVersion }),
      ...sharedMetadata,
      ...metadata,
    } : {};
};

/**
 * Output pollutant info
 * @param {supportedAppleApi} appleApiVersion - Apple Weather API version
 * @param {applePollutantNames} name - Name of the pollutant
 * @param {number} amount - Amount of pollutant
 * @param {pollutantUnitsV2} unit - Unit of pollutant in Apple Weather types
 * @return {pollutantV1|pollutantV2 | {}} - Pollutant info for Apple Weather
 */
const toPollutant = (appleApiVersion, name, amount, unit) => {
  if (!isNonEmptyString(name) || !['ppb', 'microgramsPerM3'].includes(unit) || !isNonNanNumber(amount)) {
    return {};
  }

  switch (appleApiVersion) {
    case 1:
      return {
        name,
        amount: amount > 0 ? amount : -1,
        unit: unit === 'microgramsPerM3' ? 'µg/m3' : unit,
      };
    case 2:
    case 3:
      return {
        name,
        amount: amount > 0 ? amount : -1,
        unit,
      };
    default:
      return {};
  }
};

/**
 * Output Air Quality Data
 * @author VirgilClyne
 * @author WordlessEcho <wordless@echo.moe>
 * @param {supportedAppleApi} appleApiVersion - Apple Weather API Version
 * @param {airQualityObject} aqiObject - Object of the AQI info
 * @return {
 * appleAqiWithoutMetadataV1|appleAqiWithoutMetadataV2|appleAqiWithoutMetadataV3 | {}
 * } - Air quality data in Apple Weather style without metadata
 */
const toAirQuality = (appleApiVersion, aqiObject) => {
  const units = ['ppb', 'microgramsPerM3'];
  const comparisonValues = ['better', 'same', 'worse', 'unknown'];
  const sourceTypes = ['station', 'modeled'];

  const validPollutants = Array.isArray(aqiObject?.pollutants) ? aqiObject.pollutants.filter(
    (pollutant) => (
      units.includes(pollutant?.unit) && isNonEmptyString(pollutant?.name)
      && isNonNanNumber(pollutant?.amount) && pollutant.amount >= 0
    ),
  ) : [];

  const sharedAirQuality = {
    ...(typeof aqiObject?.isSignificant === 'boolean' && { isSignificant: aqiObject.isSignificant }),
    ...(isNonEmptyString(aqiObject?.url) && { learnMoreURL: aqiObject.url }),
    ...(isNonEmptyString(aqiObject?.primary) && { primaryPollutant: aqiObject.primary }),
    ...(validPollutants.length > 0 && {
      pollutants: Object.fromEntries(validPollutants.map(({ name, amount, unit }) => ([
        name, toPollutant(appleApiVersion, name, amount, unit),
      ]))),
    }),
    // Source was removed in APIv3
    ...(isNonEmptyString(aqiObject?.sourceName) && { source: aqiObject.sourceName }),
  };

  /**
   * Merge air quality for Apple Weather by API version
   * @param {supportedAppleApi} apiVersion - Apple API version
   * @param {airQualityObject} aqiObj - Air quality object
   * @return {appleAqiWithoutMetadataV1|appleAqiWithoutMetadataV2|appleAqiWithoutMetadataV3 | {}} -
   * Air quality object for Apple Weather (without `name` property)
   */
  const getAirQuality = (apiVersion, aqiObj) => {
    switch (apiVersion) {
      case 1:
        return {
          ...sharedAirQuality,
          ...(isNonNanNumber(aqiObj?.categoryIndex) && aqiObj.categoryIndex > 0
            && { airQualityCategoryIndex: aqiObj.categoryIndex }),
          ...(isNonNanNumber(aqiObj?.aqi) && aqiObj.aqi >= 0
            && { airQualityIndex: aqiObj.aqi }),
          ...(isNonEmptyString(aqiObj?.scale) && { airQualityScale: aqiObj.scale }),
        };
      case 2:
      case 3:
        return {
          ...sharedAirQuality,
          ...(isNonNanNumber(aqiObj?.categoryIndex) && aqiObj.categoryIndex > 0
            && { categoryIndex: aqiObj.categoryIndex }),
          ...(isNonNanNumber(aqiObj?.aqi) && aqiObj.aqi >= 0
            && { index: aqiObj.aqi }),
          ...(comparisonValues.includes(aqiObj?.previousDayComparison)
            && { previousDayComparison: aqiObj.previousDayComparison }),
          ...(isNonEmptyString(aqiObj?.scale) && { scale: aqiObj.scale }),
          ...(sourceTypes.includes(aqiObj?.sourceType) && { sourceType: aqiObj.sourceType }),
        };
      default:
        return {};
    }
  };

  const airQuality = getAirQuality(appleApiVersion, aqiObject);
  return Object.keys(sharedAirQuality).length > 0 || Object.keys(airQuality).length > 0
    ? { name: 'AirQuality', ...sharedAirQuality, ...airQuality } : {};
};

/**
 * Output object for `NextHourForecast` of Apple Weather
 * @author WordlessEcho <wordless@echo.moe>
 * @author VirgilClyne
 * @param {supportedAppleApi} appleApiVersion - Apple Weather API Version
 * @param {nextHourObject} nextHourObject - Object of the precipitation info
 * @return {
 * appleNextHourWithoutMetadataV1|appleNextHourWithoutMetadataV2|appleNextHourWithoutMetadataV3 | {}
 * } - Apple weather style data without metadata
 */
const toNextHour = (appleApiVersion, nextHourObject) => {
  if (
    !Array.isArray(nextHourObject?.minutes) || !isNonNanNumber(nextHourObject?.startTimestamp)
    || nextHourObject.startTimestamp <= 0
  ) {
    return {};
  }

  /**
   * Check type of weather status of minute
   * @param {weatherStatuses} weatherStatus - Weather status to be checked
   * @param {number} precipitation - Precipitation of the weather status
   * @return {weatherStatuses} - `weatherStatus` if valid,
   * or "precipitation"/"clear" based on precipitation
   */
  const checkWeatherStatus = (weatherStatus, precipitation) => {
    const weatherStatuses = [
      'clear', 'precipitation', 'drizzle', 'flurries', 'rain', 'snow', 'heavy-rain', 'heavy-snow',
      'sleet', 'hail', 'mixed',
    ];

    if (!weatherStatuses.includes(weatherStatus)) {
      if (isNonNanNumber(precipitation) && precipitation > 0) {
        return 'precipitation';
      }

      return 'clear';
    }

    return weatherStatus;
  };

  const minutesData = nextHourObject.minutes.map((minute) => {
    const precipitationIntensityPerceived = isNonNanNumber(minute?.precipitationIntensityPerceived)
    && minute.precipitationIntensityPerceived >= 0 ? minute.precipitationIntensityPerceived : 0;
    const fallbackChance = precipitationIntensityPerceived <= 0 ? 0 : 100;
    const chance = isNonNanNumber(minute?.chance) && minute.chance >= 0 && minute.chance <= 100
      ? minute.chance : fallbackChance;

    const validShortDescription = isNonEmptyString(minute?.shortDescription)
      ? minute.shortDescription : $.name;
    const validLongDescription = isNonEmptyString(minute?.longDescription)
      ? minute.longDescription : '';

    return {
      weatherStatus: checkWeatherStatus(minute?.weatherStatus, minute?.precipitation),
      precipitation: isNonNanNumber(minute?.precipitation) && minute.precipitation >= 0
        ? minute.precipitation : 0,
      precipitationIntensityPerceived,
      chance: Math.round(chance),
      shortDescription: validShortDescription,
      longDescription: validLongDescription,
      ...({ parameters: isObject(minute?.parameters) ? minute.parameters : {} }),
    };
  });

  /**
   * Get array of condition for `condition` in `NextHourForecast`
   * @author WordlessEcho <wordless@echo.moe>
   * @param {supportedAppleApi} apiVersion - Apple Weather API Version
   * @param {minute[]} minutes - Array of minute precipitation data
   * @param {number} startTimestamp - UNIX timestamp at condition start
   * @return {nextHourConditionV1[]|nextHourConditionV2[]|nextHourConditionV3[]|[]} -
   * Conditions for Apple Weather
   */
  const toConditions = (apiVersion, minutes, startTimestamp) => {
    const slicedMinutes = minutes.slice(0, 60);

    /**
     * Merge possibility, weather status and time status for `forecastNextHour.condition.token`
     * @author WordlessEcho <wordless@echo.moe>
     * @param {number} bound - Bound of current weather status
     * @return {string} - Token for Apple Weather
     */
    const toToken = (bound) => {
      if (!isNonNanNumber(bound) || bound < 0 || bound >= slicedMinutes.length) {
        return 'clear';
      }

      const firstStatus = slicedMinutes[bound].weatherStatus;
      const secondStatusRelatedIndex = slicedMinutes.slice(bound).findIndex((minute) => (
        minute.weatherStatus !== firstStatus));
      const secondStatusIndex = secondStatusRelatedIndex === -1
        ? -1 : secondStatusRelatedIndex + bound;
      const secondStatus = secondStatusIndex === -1 ? null
        : slicedMinutes[secondStatusIndex].weatherStatus;

      if (firstStatus === 'clear') {
        if (secondStatusIndex === -1) {
          return firstStatus;
        }

        const nextClearIndex = slicedMinutes.slice(secondStatusIndex)
          .findIndex((minute) => minute.weatherStatus === 'clear');
        if (nextClearIndex === -1) {
          const maxChance = Math.max(...slicedMinutes
            .slice(secondStatusIndex).map((minute) => minute.chance));
          // https://developer.apple.com/documentation/weatherkitrestapi/certainty
          return `${maxChance < 50 ? 'possible-' : ''}${secondStatus}.start`;
        }

        const maxChance = Math.max(...slicedMinutes
          .slice(secondStatusIndex, nextClearIndex).map((minute) => minute.chance));
        return `${maxChance < 50 ? 'possible-' : ''}${secondStatus}.start-stop`;
      }

      // If current weather is not clear
      if (secondStatus === 'clear') {
        const nextNotClearIndex = slicedMinutes.slice(secondStatusIndex)
          .findIndex((minute) => minute.weatherStatus !== 'clear');
        const maxChance = Math.max(...slicedMinutes
          .slice(bound, secondStatusIndex).map((minute) => minute.chance));

        if (nextNotClearIndex !== -1) {
          return `${maxChance < 50 ? 'possible-' : ''}${firstStatus}.stop-start`;
        }

        return `${maxChance < 50 ? 'possible-' : ''}${firstStatus}.stop`;
      }

      const maxChance = Math.max(...slicedMinutes.map((minute) => minute.chance));
      return firstStatus.startsWith('heavy-') && secondStatusIndex !== -1
        ? `${maxChance < 50 ? 'possible-' : ''}${firstStatus}-to-${secondStatus}.constant`
        : `${maxChance < 50 ? 'possible-' : ''}${firstStatus}.constant`;
    };

    const toParameters = (bounds, indexInBound, timestamp) => bounds
      .slice(indexInBound).reduce((parameters, currentBound, index) => {
        const lastStatus = slicedMinutes[
          indexInBound + index - 1 < 0 ? 0 : bounds[indexInBound + index - 1]
        ].weatherStatus;
        const currentStatus = slicedMinutes[currentBound].weatherStatus;

        if (
          currentBound + 1 === slicedMinutes.length && (currentBound <= 0
          || currentStatus === slicedMinutes[currentBound - 1].weatherStatus)
        ) {
          return parameters;
        }

        return {
          ...parameters,
          ...((lastStatus !== 'clear' || currentStatus !== 'clear') && {
            [`${stringifyNumber(Object.keys(parameters).length + 1)}At`]: toAppleTime(
              apiVersion,
              timestamp + currentBound * 60 * 1000,
            ),
          }),
        };
      }, {});

    /** @type {number[]} */
    const bounds = slicedMinutes.flatMap((current, index, array) => {
      const previous = array[index - 1];

      if (
        index === 0
        || (index + 1 !== array.length && current.weatherStatus === previous.weatherStatus)
      ) {
        return [];
      }

      return [index];
    });

    const timestamp = isNonNanNumber(startTimestamp) && startTimestamp > 0
      ? startTimestamp : (+(new Date()));

    // TODO: (FIX) Infinite loop while length of minutesData is 1
    return bounds.map((bound, index, array) => {
      const minute = slicedMinutes[bound];
      const lastBound = index === 0 ? 0 : array[index - 1];

      const token = toToken(lastBound);
      const needEndTime = !(
        index + 1 === array.length && minute.weatherStatus === minutes[bound + 1].weatherStatus
      );

      const haveLongDescription = isNonEmptyString(minute.longDescription);
      const longDescription = haveLongDescription ? minute.longDescription : $.name;

      switch (apiVersion) {
        case 1:
          return {
            ...(needEndTime && {
              validUntil: toAppleTime(apiVersion, timestamp + bound * 60 * 1000),
            }),
            token,
            longTemplate: !haveLongDescription && isNonEmptyString(minute.shortDescription)
              ? minute.shortDescription : longDescription,
            shortTemplate: minute.shortDescription,
            parameters: haveLongDescription && Object.keys(minute.parameters).length > 0
              ? Object.fromEntries(Object.entries(minute.parameters).map(([key, value]) => [
                key, toAppleTime(apiVersion, timestamp + value * 60 * 1000),
              ])) : toParameters(array, index, slicedMinutes, timestamp),
          };
        case 2:
          return {
            startTime: toAppleTime(apiVersion, timestamp + lastBound * 60 * 1000),
            ...(needEndTime && {
              endTime: toAppleTime(apiVersion, timestamp + bound * 60 * 1000),
            }),
            token,
            longTemplate: !haveLongDescription && isNonEmptyString(minute.shortDescription)
              ? minute.shortDescription : longDescription,
            shortTemplate: minute.shortDescription,
            parameters: haveLongDescription && Object.keys(minute.parameters).length > 0
              ? Object.fromEntries(Object.entries(minute.parameters).map(([key, value]) => [
                key, toAppleTime(apiVersion, timestamp + value * 60 * 1000),
              ])) : toParameters(array, index, timestamp),
          };
        case 3:
          return {
            startTime: toAppleTime(apiVersion, timestamp + lastBound * 60 * 1000),
            ...(needEndTime && {
              endTime: toAppleTime(apiVersion, timestamp + bound * 60 * 1000),
            }),
            token,
            parameters: toParameters(array, index, timestamp),
          };
        default:
          return {};
      }
    });
  };

  /**
   * Get array of summary for `summary` in `NextHourForecast`
   * @author WordlessEcho <wordless@echo.moe>
   * @param {supportedAppleApi} apiVersions - Apple Weather API Version
   * @param {minute[]} minutes - Array of minute precipitation data
   * @param {number} startTimestamp - UNIX timestamp when minutes start
   * @return {nextHourSummaryV1[]|nextHourSummaryV2[]|nextHourSummaryV3[]|[]} -
   * Summaries for Apple Weather
   */
  const toSummaries = (apiVersions, minutes, startTimestamp) => {
    /** @type number[] */
    const bounds = minutes.slice(0, 59).flatMap((current, index, array) => {
      const previous = array[index - 1];

      if (
        index === 0 || (
          index + 1 !== array.length && weatherStatusToType(current.weatherStatus)
          === weatherStatusToType(previous.weatherStatus)
        )
      ) {
        return [];
      }

      return [index];
    });

    const timestamp = isNonNanNumber(startTimestamp) && startTimestamp > 0
      ? startTimestamp : (+(new Date()));

    return bounds.map((bound, index, array) => {
      const lastBound = index === 0 ? 0 : array[index - 1];
      const minutesInSummary = minutes.slice(lastBound, bound);

      const needEndTime = !(
        index + 1 === array.length
        && minutes[bound].weatherStatus === minutes[bound + 1].weatherStatus
      );
      const condition = weatherStatusToType(minutes[lastBound].weatherStatus);

      const isNotClear = condition !== 'clear';
      const maxChance = Math.max(...minutesInSummary.map(({ chance }) => chance));
      const precipitations = minutesInSummary.map(({ precipitation }) => precipitation);

      switch (apiVersions) {
        case 1:
          return {
            ...(needEndTime && {
              validUntil: toAppleTime(apiVersions, timestamp + bound * 60 * 1000),
            }),
            condition,
            ...(isNotClear ? {
              probability: maxChance,
              maxIntensity: Math.max(...precipitations),
              minIntensity: Math.min(...precipitations),
            } : null),
          };
        // to make ESLint and JSDoc happy
        case 2:
          return {
            startTime: toAppleTime(apiVersions, timestamp + lastBound * 60 * 1000),
            ...(needEndTime && {
              endTime: toAppleTime(apiVersions, timestamp + bound * 60 * 1000),
            }),
            condition,
            ...(isNotClear && {
              precipChance: maxChance,
              precipIntensity: Math.max(...precipitations),
            }),
          };
        case 3:
          return {
            startTime: toAppleTime(apiVersions, timestamp + lastBound * 60 * 1000),
            ...(needEndTime && {
              endTime: toAppleTime(apiVersions, timestamp + bound * 60 * 1000),
            }),
            condition,
            precipitationChance: maxChance / 100,
            precipitationIntensity: Math.max(...precipitations),
          };
        default:
          return {};
      }
    });
  };

  /**
   * Get array of minutes for `minutes` in `NextHourForecast`
   * @author WordlessEcho <wordless@echo.moe>
   * @param {supportedAppleApi} apiVersions - Apple Weather API Version
   * @param {minute[]} minutes - Array of minute precipitation data
   * @param {number} startTimestamp - UNIX timestamp when minutes start
   * @return {nextHourMinuteV1[]|nextHourMinuteV2[]|nextHourMinuteV3[]|[]} -
   * Minutes for Apple Weather
   */
  const toMinutes = (apiVersions, minutes, startTimestamp) => {
    const timestamp = isNonNanNumber(startTimestamp) && startTimestamp > 0
      ? startTimestamp : (+(new Date()));

    const getSharedMinuteV2Below = (precipIntensity, precipChance) => ({
      precipIntensity,
      precipChance,
    });

    return minutes.map(
      ({ precipitation, chance, precipitationIntensityPerceived }, index) => {
        switch (apiVersions) {
          case 1:
            return {
              startAt: toAppleTime(apiVersions, timestamp + index * 60 * 1000),
              ...getSharedMinuteV2Below(precipitation, chance),
              perceivedIntensity: precipitationIntensityPerceived,
            };
          case 2:
            return {
              startTime: toAppleTime(apiVersions, timestamp + index * 60 * 1000),
              ...getSharedMinuteV2Below(precipitation, chance),
              precipIntensityPerceived: precipitationIntensityPerceived,
            };
          case 3:
            return {
              startTime: toAppleTime(apiVersions, timestamp + index * 60 * 1000),
              precipitationChance: chance / 100,
              precipitationIntensity: precipitation,
              precipitationIntensityPerceived,
            };
          default:
            return {};
        }
      },
    );
  };

  /**
   * Merge next hour object
   * @author WordlessEcho <wordless@echo.moe>
   * @param {supportedAppleApi} apiVersion - Apple API version
   * @param {?(nextHourConditionV1[]|nextHourConditionV2[]|nextHourConditionV3[])} condition -
   * Condition for Apple Weather
   * @param {?(nextHourSummaryV1[]|nextHourSummaryV2[]|nextHourSummaryV3[])} summary -
   * Summary for Apple Weather
   * @param {?(nextHourMinuteV1[]|nextHourMinuteV2[]|nextHourMinuteV3[])} minutes -
   * Minutes for Apple Weather
   * @param {number} timestamp - UNIX timestamp at next hour start
   * @return {
   * appleNextHourWithoutMetadataV1|appleNextHourWithoutMetadataV2|appleNextHourWithoutMetadataV3
   * | {}
   * } - Next hour object for Apple Weather (without `name` property)
   */
  const getNextHour = (apiVersion, condition, summary, minutes, timestamp) => {
    const sharedNextHour = {
      ...(Array.isArray(condition) && condition.length > 0 && { condition }),
      ...(Array.isArray(summary) && summary.length > 0 && { summary }),
      ...(Array.isArray(minutes) && minutes.length > 0 && { minutes }),
    };

    switch (apiVersion) {
      case 1:
      case 2:
        return {
          ...sharedNextHour,
          ...(isNonNanNumber(timestamp) && timestamp > 0
            && { startTime: toAppleTime(appleApiVersion, timestamp) }),
        };
      case 3:
        return {
          ...sharedNextHour,
          ...(isNonNanNumber(timestamp) && timestamp > 0
            && { forecastStart: toAppleTime(appleApiVersion, timestamp) }),
          ...(Array.isArray(minutes) && minutes.length > 0 && {
            forecastEnd: toAppleTime(appleApiVersion, timestamp + 1000 * 60 * minutes.length),
          }),
        };
      default:
        return {};
    }
  };

  const nextHour = getNextHour(
    appleApiVersion,
    toConditions(appleApiVersion, minutesData, nextHourObject.startTimestamp),
    toSummaries(appleApiVersion, minutesData, nextHourObject.startTimestamp),
    toMinutes(appleApiVersion, minutesData, nextHourObject.startTimestamp),
    nextHourObject.startTimestamp,
  );

  if (Object.keys(nextHour).length > 0) {
    // eslint-disable-next-line functional/no-conditional-statement
    if (nextHour.summary.some((s) => s.condition !== 'clear')) {
      logger(
        'info',
        `${toNextHour.name}：API报告此地未来一小时无降水，Apple天气上将不会显示下小时降水强度信息`,
      );
    }

    return { name: 'NextHourForecast', ...nextHour };
  }

  return {};
};

/**
 * Get name of the key for Apple Weather by API version
 * @author WordlessEcho <wordless@echo.moe>
 * @param {supportedAppleApi} apiVersion - Apple API version
 * @return {Object.<string, string> | {}} - Name of the key
 */
const getKeywords = (apiVersion) => {
  switch (apiVersion) {
    case 1:
      return {
        METADATA: 'metadata',
        AIR_QUALITY: 'air_quality',
        REQUIRE_NEXT_HOUR: 'next_hour_forecast',
        NEXT_HOUR: 'next_hour',
        NEXT_HOUR_SUMMARY: 'summary',
        NEXT_HOUR_SUMMARY_CONDITION: 'condition',
        PROVIDER_NAME: 'provider_name',
        REPORTED_TIME: 'reported_time',
        AQI_INDEX: 'airQualityIndex',
        AQI_SCALE: 'airQualityScale',
        POLLUTANTS: 'pollutants',
        PRIMARY_POLLUTANT: 'primaryPollutant',
        UNIT: 'unit',
        AMOUNT: 'amount',
        SOURCE: 'source',
        AQI_COMPARISON: '',
        TEMPORARILY_UNAVAILABLE: 'temporarily_unavailable',
      };
    case 2:
    case 3:
      return {
        METADATA: 'metadata',
        AIR_QUALITY: 'airQuality',
        REQUIRE_NEXT_HOUR: 'forecastNextHour',
        NEXT_HOUR: 'forecastNextHour',
        NEXT_HOUR_SUMMARY: 'summary',
        NEXT_HOUR_SUMMARY_CONDITION: 'condition',
        PROVIDER_NAME: 'providerName',
        REPORTED_TIME: 'reportedTime',
        AQI_INDEX: 'index',
        AQI_SCALE: 'scale',
        POLLUTANTS: 'pollutants',
        PRIMARY_POLLUTANT: 'primaryPollutant',
        UNIT: 'unit',
        AMOUNT: 'amount',
        SOURCE: 'source',
        AQI_COMPARISON: 'previousDayComparison',
        TEMPORARILY_UNAVAILABLE: 'temporarilyUnavailable',
      };
    default:
      return {};
  }
};

/**
 * Convert apple time to UNIX timestamp
 * @author WordlessEcho <wordless@echo.moe>
 * @param {supportedAppleApi} apiVersion - Apple API version
 * @param {number|string} time - Time in Apple format
 * @param {number} fallbackTimestamp - Time for fallback if convert failed
 * @return {number} - UNIX timestamp of Apple time
 */
const appleTimeToTimestamp = (apiVersion, time, fallbackTimestamp) => {
  const fallback = isNonNanNumber(fallbackTimestamp) && fallbackTimestamp > 0
    ? fallbackTimestamp : (+(new Date()));

  switch (apiVersion) {
    case 1:
      return isNonNanNumber(time) && time > 0 ? time * 1000 : fallback;
    case 2: {
      const timestamp = Date.parse(time);
      return isNonNanNumber(timestamp) && timestamp > 0 ? timestamp : fallback;
    }
    default:
      return fallback;
  }
};

/**
 * Set response
 * @param {Object} response - Response to set
 */
const setResponse = (response) => {
  // eslint-disable-next-line functional/no-conditional-statement
  if (isObject(response)) {
    // eslint-disable-next-line functional/no-expression-statement
    $.done(!$.isQuanX() ? response : { body: isNonEmptyString(response?.body) ? response?.body : '' });
  // eslint-disable-next-line functional/no-conditional-statement
  } else {
    // eslint-disable-next-line functional/no-expression-statement
    $.done({ body: '' });
  }
};

// eslint-disable-next-line functional/no-conditional-statement
if (settings.switch) {
  const supportedAppleApis = [1, 2, 3];

  // eslint-disable-next-line no-undef
  if (isNonEmptyString($request?.url)) {
    // eslint-disable-next-line no-undef
    const url = (new URLs()).parse($request.url);

    if (url) {
      const parameters = getParams(url.path);
      const appleApiVersionString = parameters?.ver;
      const appleApiVersion = isNonEmptyString(appleApiVersionString)
        ? parseInt(appleApiVersionString.slice(1), 10) : -1;

      // eslint-disable-next-line functional/no-conditional-statement
      if (!supportedAppleApis.includes(appleApiVersion)) {
        logger('error', `${$.name}：不支持${appleApiVersionString}版本的Apple API，您可能需要更新模块`);
        // eslint-disable-next-line functional/no-expression-statement,no-undef
        setResponse($response);
        // eslint-disable-next-line functional/no-conditional-statement,no-undef
      } else if ($response?.statusCode !== 200 && $response?.status !== 200) {
        logger(
          'warn',
          // eslint-disable-next-line no-undef
          `${$.name}：服务器返回非200状态码，statusCode = ${$response?.statusCode}, status = ${$response?.status}`,
        );
        // eslint-disable-next-line functional/no-expression-statement,no-undef
        setResponse($response);
        // eslint-disable-next-line functional/no-conditional-statement
      } else {
        logger('info', `${$.name}：模块开始运行`);

        // eslint-disable-next-line no-undef
        const dataFromApple = parseJsonWithDefault($response?.body, null);
        // eslint-disable-next-line functional/no-conditional-statement
        if (isObject(dataFromApple)) {
          const latitude = parseFloat(parameters?.lat);
          const longitude = parseFloat(parameters?.lng);

          // eslint-disable-next-line functional/no-conditional-statement
          if (isLatitude(latitude) && isLongitude(longitude)) {
            const languageWithRegion = parameters?.language;

            // eslint-disable-next-line functional/no-conditional-statement
            if (!isNonEmptyString(languageWithRegion)) {
              logger('warn', `${$.name}：无法获取语言信息，语言：${parameters?.language}`);
            }

            const {
              METADATA, AIR_QUALITY, REQUIRE_NEXT_HOUR, NEXT_HOUR, PROVIDER_NAME, REPORTED_TIME,
              AQI_INDEX, AQI_SCALE, POLLUTANTS, PRIMARY_POLLUTANT, UNIT, AMOUNT, SOURCE,
              AQI_COMPARISON, TEMPORARILY_UNAVAILABLE,
            } = getKeywords(appleApiVersion);

            const settingsToAqiStandard = { WAQI_InstantCast: WAQI_INSTANT_CAST };
            const scaleToAqiStandard = {
              [EPA_454.APPLE_SCALE]: EPA_454, [HJ_633.APPLE_SCALE]: HJ_633,
            };
            const supportedApis = ['www.weatherol.cn', 'api.caiyunapp.com', 'api.waqi.info'];

            /**
             * Get data requirements from Apple Weather
             * @param {supportedAppleApis} apiVersion - Apple Weather API version
             * @param {Object} parsedUrl - URL parsed by {@link URLs}
             * @return {string[]} - Data requirements
             */
            const getRequireData = (apiVersion, parsedUrl) => {
              switch (apiVersion) {
                case 1: {
                  const requirement = parsedUrl.params?.include;
                  return isNonEmptyString(requirement) ? requirement.split(',') : [];
                }
                case 2:
                case 3: {
                  const requirement = parsedUrl.params?.dataSets;
                  return isNonEmptyString(requirement) ? requirement.split(',') : [];
                }
                default:
                  return [];
              }
            };

            /**
             * Get scale of modified air quality before network requesting
             * @param {settingsV1} projectSettings - Settings of module
             * @param {appleAqiScales} appleScale - Current Apple Weather scale
             * @return {string} - Target scale of modified air quality
             */
            const getTargetScale = (projectSettings, appleScale) => {
              if (projectSettings.aqi.local.switch) {
                const scale = settingsToAqiStandard[projectSettings.aqi.local.standard]
                  ?.APPLE_SCALE;
                if (!isNonEmptyString(scale)) {
                  return '';
                }

                return settingsToAqiStandard[projectSettings.aqi.local.standard].APPLE_SCALE;
              }

              if (!projectSettings.aqi.switch) {
                return isNonEmptyString(appleScale) ? appleScale : '';
              }

              switch (projectSettings.aqi.source) {
                case 'www.weatherol.cn':
                  return HJ_633.APPLE_SCALE;
                case 'api.caiyunapp.com':
                  return projectSettings.apis.colorfulClouds.forceCnForAqi
                    ? HJ_633.APPLE_SCALE : EPA_454.APPLE_SCALE;
                case 'api.waqi.info':
                  return WAQI_INSTANT_CAST.APPLE_SCALE;
                default:
                  return '';
              }
            };

            /**
             * Missions for APIs from {@link toMissions}
             * @typedef {"aqi" | "forCompareAqi" | "nextHour"} missions
             */
            /**
             * Get missions for creating promises
             * @param {string} aqi - AQI source
             * @param {string} forCompareAqi - AQI comparison source
             * @param {string} nextHour - Next hour source
             * @return {{api: string, missions: missions[]}[]} -
             * Missions for APIs
             */
            const toMissions = (aqi, forCompareAqi, nextHour) => supportedApis
              .map((api) => ({
                api,
                missions: [
                  ...(aqi === api ? ['aqi'] : []),
                  ...(forCompareAqi === api ? ['forCompareAqi'] : []),
                  ...(nextHour === api ? ['nextHour'] : []),
                ],
              }));

            /**
             * Get path by missions for ColorfulClouds
             * @param {missions[]} missions - Mission list
             * @return {"weather" | "realtime" | "minutely" | "hourly" | "daily"} -
             * URL Path for ColofulClouds
             */
            const missionsToCcPath = (missions) => {
              if (!Array.isArray(missions) || missions.length <= 0 || missions.length > 1) {
                return 'weather';
              }

              switch (missions[0]) {
                case 'aqi':
                  return 'realtime';
                // We need hourly.skycons to detect rain or snow
                case 'nextHour':
                case 'aqiForComparison':
                default:
                  return 'weather';
              }
            };

            /**
             * Get ColorfulClouds by language
             * @param {string} language - Language from Apple Weather
             * @return {string} - Name of the ColorfulClouds
             */
            const getColorfulCloudsName = (language) => {
              // No official name for Japanese
              if (isNonEmptyString(language)) {
                if (/zh-(Hans|CN)/.test(language)) {
                  return '彩云天气';
                }
                if (/zh-(Hant|HK|TW)/.test(language)) {
                  return '彩雲天氣';
                }
              }

              return 'ColorfulClouds';
            };

            /**
             * Handle data from API to air quality
             * @param {supportedAppleApi} apiVersion - Apple Weather API version
             * @param {{
             * api: string, missions: missions[], returnedData: Object, types: string[]
             * }} promiseData - Data from promises
             * @param {string} appleLanguage - Language from Apple Weather
             * @return {appleAqiV1|appleAqiV2|appleAqiV3 | {}} -
             * Air quality object for Apple Weather
             */
            const getAirQuality = (apiVersion, promiseData, appleLanguage) => {
              if (!Array.isArray(promiseData?.missions) || !promiseData.missions.includes('aqi')) {
                return {};
              }

              switch (promiseData?.api) {
                case 'www.weatherol.cn':
                  return {
                    [METADATA]: toMetadata(apiVersion, colorfulCloudsToAqiMetadata(
                      { forV1: 'https://www.weatherol.cn/images/logo.png', forV2: '' },
                      '气象在线',
                      'https://www.weatherol.cn/',
                      promiseData?.returnedData,
                    )),
                    ...toAirQuality(apiVersion, colorfulCloudsToAqi(
                      promiseData?.returnedData,
                      'https://www.weatherol.cn/',
                      '气象在线',
                      true,
                      true,
                    )),
                  };
                case 'api.caiyunapp.com':
                  return {
                    [METADATA]: toMetadata(apiVersion, colorfulCloudsToAqiMetadata(
                      {
                        forV1: 'https://docs.caiyunapp.com/img/favicon.ico',
                        forV2: 'https://caiyunapp.com/imgs/logo/logo-website-white.png',
                      },
                      getColorfulCloudsName(appleLanguage),
                      'https://caiyunapp.com/weather/',
                      promiseData?.returnedData,
                    )),
                    ...toAirQuality(apiVersion, colorfulCloudsToAqi(
                      promiseData?.returnedData,
                      'https://caiyunapp.com/weather/',
                      getColorfulCloudsName(appleLanguage),
                      settings.apis.colorfulClouds.forceCnForAqi,
                      settings.apis.colorfulClouds.forceCnForComparison,
                    )),
                  };
                case 'api.waqi.info':
                  if (Array.isArray(promiseData?.types)) {
                    if (promiseData.types.includes((type) => type === 'locationFeed')) {
                      return {
                        [METADATA]: toMetadata(
                          apiVersion,
                          waqiToAqiMetadata(promiseData?.returnedData),
                        ),
                        ...toAirQuality(apiVersion, waqiToAqi(promiseData?.returnedData)),
                      };
                    }

                    if (promiseData.types.includes('mapq')) {
                      const dataInFeed = waqiNearestToFeed('mapq', promiseData?.returnedData).find((data) => data.status === 'ok');
                      return dataInFeed ? {
                        [METADATA]: toMetadata(
                          apiVersion,
                          waqiToAqiMetadata(dataInFeed),
                        ),
                        ...toAirQuality(apiVersion, waqiToAqi(dataInFeed)),
                      } : {};
                    }

                    if (promiseData.types.includes('v1Aqi')) {
                      const dataInFeed = waqiV1ToFeed(promiseData?.returnedData).find((data) => data.status === 'ok');
                      return dataInFeed ? {
                        [METADATA]: toMetadata(
                          apiVersion,
                          waqiToAqiMetadata(dataInFeed),
                        ),
                        ...toAirQuality(apiVersion, waqiToAqi(dataInFeed)),
                      } : {};
                    }
                  }

                  return {};
                default:
                  return {};
              }
            };

            /**
             * Handle data from API to air quality
             * @param {{
             * api: string, missions: missions[], returnedData: Object, types: string[]
             * }} promiseData - Data from promises
             * @return {aqiComparison} - AQI comparison for Apple Weather
             */
            const getAqiComparison = (promiseData) => {
              if (!Array.isArray(promiseData?.missions) || !promiseData.missions.includes('forCompareAqi')) {
                return 'unknown';
              }

              switch (promiseData?.api) {
                case 'api.caiyunapp.com':
                  return colorfulCloudsToAqiComparison(
                    promiseData?.returnedData,
                    settings.apis.colorfulClouds.forceCnForComparison,
                  );
                case 'api.waqi.info': {
                  if (Array.isArray(promiseData?.returnedData?.rxs?.obs)) {
                    const aqiFeedObs = promiseData?.returnedData.rxs.obs.find((station) => station?.status === 'ok');
                    if (aqiFeedObs?.msg) {
                      return waqiV1AqiToAqiComparison(aqiFeedObs.msg);
                    }
                  }

                  return 'unknown';
                }
                default:
                  return 'unknown';
              }
            };

            /**
             * Handle data from API to air quality
             * @param {supportedAppleApi} apiVersion - Apple Weather API version
             * @param {{
             * api: string, missions: missions[], returnedData: Object, types: string[]
             * }} promiseData - Data from promises
             * @param {string} appleLanguage - Language from Apple Weather
             * @return {appleNextHourV1|appleNextHourV2|appleNextHourV3 | {}} -
             * Air quality object for Apple Weather
             */
            const getNextHour = (apiVersion, promiseData, appleLanguage) => {
              if (!Array.isArray(promiseData?.missions) || !promiseData.missions.includes('nextHour')) {
                return {};
              }

              switch (promiseData?.api) {
                case 'www.weatherol.cn':
                  return {
                    [METADATA]: toMetadata(apiVersion, colorfulCloudsToNextHourMetadata(
                      '气象在线',
                      'https://www.weatherol.cn/',
                      promiseData?.returnedData,
                    )),
                    ...toNextHour(apiVersion, colorfulCloudsToNextHour('气象在线', promiseData?.returnedData)),
                  };
                case 'api.caiyunapp.com':
                  return {
                    [METADATA]: toMetadata(apiVersion, colorfulCloudsToNextHourMetadata(
                      getColorfulCloudsName(appleLanguage),
                      'https://caiyunapp.com/weather/',
                      promiseData?.returnedData,
                    )),
                    ...toNextHour(apiVersion, colorfulCloudsToNextHour(
                      getColorfulCloudsName(appleLanguage),
                      promiseData?.returnedData,
                    )),
                  };
                default:
                  return {};
              }
            };

            const location = { latitude, longitude };
            // eslint-disable-next-line functional/no-conditional-statement
            if (settings.log.location) {
              logger('debug', `${$.name}：经度：${longitude}，纬度：${latitude}`);
            }
            const requireData = getRequireData(appleApiVersion, url);

            const qweatherNames = ['和风天气', 'QWeather'];
            const airQuality = {
              ...dataFromApple?.[AIR_QUALITY],
              ...(qweatherNames.includes(dataFromApple?.[AIR_QUALITY]?.[METADATA]?.[PROVIDER_NAME])
                && {
                  [METADATA]: {
                    ...dataFromApple[AIR_QUALITY][METADATA],
                    [PROVIDER_NAME]: appendQweatherSourceToProviderName(
                      dataFromApple[AIR_QUALITY][METADATA][PROVIDER_NAME],
                      dataFromApple[AIR_QUALITY]?.[SOURCE],
                    ),
                  },
                  ...(isObject(dataFromApple[AIR_QUALITY]?.[POLLUTANTS]) && {
                    [POLLUTANTS]: Object.fromEntries(
                      Object.entries(dataFromApple[AIR_QUALITY][POLLUTANTS]).map(([key, value]) => {
                        if (key === 'CO') {
                          const fixedAmount = fixQweatherCo(value?.[UNIT], value?.[AMOUNT]);
                          return [key, {
                            ...value,
                            ...(fixedAmount >= 0 && { [AMOUNT]: fixedAmount }),
                          }];
                        }
                        return [key, value];
                      }),
                    ),
                  }),
                }),
            };
            const nextHour = dataFromApple?.[NEXT_HOUR];

            const aqiProvider = airQuality?.[METADATA]?.[PROVIDER_NAME];
            const aqiScale = airQuality?.[AQI_SCALE];
            const needAqi = requireData.includes(AIR_QUALITY) && settings.aqi.switch
              && (!isNonEmptyString(aqiScale) || (!settings.aqi.local.switch
                && settings.aqi.targets.includes(
                  aqiScale.slice(0, aqiScale.lastIndexOf('.')),
                )));

            const needCompareAqi = requireData.includes(AIR_QUALITY)
              && settings.aqi.comparison.switch && AQI_COMPARISON.length > 0
              && (airQuality?.[AQI_COMPARISON] === 'unknown' || needAqi);
            const nowHourTimestamp = (new Date()).setMinutes(0, 0, 0);
            const yesterdayHourTimestamp = nowHourTimestamp - 1000 * 60 * 60 * 24;
            const yesterdayReportTimestamp = needAqi ? yesterdayHourTimestamp
              : appleTimeToTimestamp(
                appleApiVersion,
                airQuality?.[METADATA]?.[REPORTED_TIME],
                nowHourTimestamp,
              ) - 1000 * 60 * 60 * 24;
            const cachedAqi = needCompareAqi ? getCachedAqi(
              toCaches(getENV('iRingo', 'Weather', database)).aqis,
              yesterdayReportTimestamp,
              location,
              qweatherNames.includes(aqiProvider) ? airQuality?.source : null,
              getTargetScale(settings, aqiScale),
            ) : { aqi: -1 };

            const nextHourProvider = nextHour?.[METADATA]?.[PROVIDER_NAME];
            const needNextHour = requireData.includes(REQUIRE_NEXT_HOUR)
              && settings.nextHour.switch && !isNonEmptyString(nextHourProvider);

            const missionList = toMissions(
              needAqi ? settings.aqi.source : null,
              needCompareAqi && cachedAqi.aqi < 0 ? settings.aqi.comparison.source : null,
              needNextHour ? settings.nextHour.source : null,
            );
            logger('info', `${$.name}：任务列表：${JSON.stringify(missionList)}`);

            const promises = Array.isArray(missionList) ? missionList
              .filter((missionObject) => (
                supportedApis.includes(missionObject?.api) && Array.isArray(missionObject?.missions)
              ))
              .flatMap(({ api, missions }) => {
                if (missions.length <= 0) {
                  return [];
                }

                switch (api) {
                  case 'www.weatherol.cn':
                    return missions.flatMap((mission) => {
                      switch (mission) {
                        case 'aqi':
                          return [
                            weatherOl('realtime', location, settings.apis.weatherOl.httpHeaders)
                              .then((returnedData) => ({
                                missions: [mission],
                                api,
                                types: ['realtime'],
                                returnedData,
                              })),
                          ];
                        case 'nextHour':
                          return [
                            weatherOl('forecast', location, settings.apis.weatherOl.httpHeaders)
                              .then((returnedData) => ({
                                missions: [mission],
                                api,
                                types: ['forecast'],
                                returnedData,
                              })),
                          ];
                        default:
                          return [];
                      }
                    });
                  case 'api.caiyunapp.com': {
                    const path = missionsToCcPath(missions);
                    const needHistory = missions.includes('forCompareAqi');

                    return [colorfulClouds(
                      settings.apis.colorfulClouds.token,
                      location,
                      languageWithRegion,
                      settings.apis.colorfulClouds.httpHeaders,
                      path,
                      {
                        unit: 'metric:v2',
                        ...(needHistory && { begin: yesterdayHourTimestamp / 1000 }),
                      },
                    ).then((returnedData) => ({
                      missions,
                      api,
                      types: [path, ...(needHistory ? ['history'] : [])],
                      returnedData,
                    }))];
                  }
                  case 'api.waqi.info': {
                    const getHistoryAqis = (stationId, fallbackData) => {
                      const getAqiData = (id, token) => waqiV1('aqi', id, `token=${token}&id=${id}`)
                        .then((returnedData) => ({
                          missions: ['aqi', 'forCompareAqi'],
                          api,
                          types: ['v1Aqi'],
                          returnedData,
                        }));
                      const cachedToken = getCachedWaqiToken(
                        toCaches(getENV('iRingo', 'Weather', database)).waqi.tokens,
                        stationId,
                      );

                      return isNonEmptyString(cachedToken)
                        ? getAqiData(stationId, cachedToken)
                        : waqiToken(stationId).then((tokenData) => {
                          if (tokenData.status === 'ok') {
                            const newCaches = cacheWaqiToken(
                              toCaches(getENV('iRingo', 'Weather', database)),
                              stationId,
                              tokenData.data,
                            );
                            // eslint-disable-next-line
                            $.setjson(
                              newCaches,
                              '@iRingo.Weather.Caches',
                            );
                            return getAqiData(stationId, tokenData.data);
                          }

                          logger('error', `${$.name}：无法获取WAQI token`);
                          return Promise.resolve({
                            missions: ['aqi'],
                            api,
                            types: ['mapq'],
                            returnedData: fallbackData,
                          });
                        });
                    };

                    if (missions.includes('aqi') || missions.includes('forCompareAqi')) {
                      const tokenFromUser = settings.apis.waqi.token;

                      if (isNonEmptyString(tokenFromUser)) {
                        return [
                          waqiV2(location, null, tokenFromUser, settings.apis.waqi.httpHeaders)
                            .then((v2Data) => {
                              if (missions.includes('forCompareAqi')) {
                                if (isNonNanNumber(v2Data?.data?.idx)) {
                                  return getHistoryAqis(v2Data.data.idx, v2Data);
                                }

                                logger('error', `${$.name}：无法获取WAQI监测站ID`);
                              }

                              return {
                                missions: ['aqi'],
                                api,
                                types: ['locationFeed'],
                                returnedData: v2Data,
                              };
                            }),
                        ];
                      }

                      return [
                        waqiNearest(location, 'mapq', settings.apis.waqi.httpHeaders)
                          .then((nearestData) => {
                            if (missions.includes('forCompareAqi')) {
                              if (Array.isArray(nearestData?.d)) {
                                const station = nearestData.d.find((s) => (
                                  isNonNanNumber(parseInt(s?.x, 10))
                                ));
                                const stationId = parseInt(station?.x, 10);

                                if (isNonNanNumber(stationId)) {
                                  return getHistoryAqis(stationId, nearestData);
                                }

                                logger('error', `${$.name}：无法获取WAQI监测站ID`);
                              // eslint-disable-next-line functional/no-conditional-statement
                              } else {
                                logger('error', `${$.name}：无法获取WAQI监测站列表`);
                              }
                            }

                            return {
                              missions: ['aqi'],
                              api,
                              types: ['mapq'],
                              returnedData: nearestData,
                            };
                          }),
                      ];
                    }

                    return [];
                  }
                  default:
                    return [];
                }
              }) : [];

            // eslint-disable-next-line functional/no-expression-statement
            Promise.all(promises).then((dataArray) => {
              if (!Array.isArray(dataArray)) {
                return dataFromApple;
              }

              const dataForAqi = dataArray.find((data) => (
                Array.isArray(data?.missions) && data.missions.includes('aqi')
              ));
              const dataForAqiComparison = dataArray.find((data) => (
                Array.isArray(data?.missions) && data.missions.includes('forCompareAqi')
              ));
              const dataForNextHour = dataArray.find((data) => (
                Array.isArray(data?.missions) && data.missions.includes('nextHour')
              ));

              const modifiedAirQuality = getAirQuality(
                appleApiVersion,
                dataForAqi,
                languageWithRegion,
              );
              if (
                dataForAqi && Object.keys(modifiedAirQuality)
                  .filter((key) => key !== METADATA && key !== AQI_COMPARISON).length <= 0
              // eslint-disable-next-line functional/no-conditional-statement
              ) {
                logger('error', `${$.name}：无法处理${dataForAqi?.api}的空气质量数据`);
                logger('debug', `API返回数据：${JSON.stringify(dataForAqi)}`);
              }
              const mergedAirQuality = {
                ...airQuality,
                ...modifiedAirQuality,
                [METADATA]: { ...airQuality?.[METADATA], ...modifiedAirQuality?.[METADATA] },
              };
              const mergedScale = mergedAirQuality?.[AQI_SCALE];
              const pollutants = isObject(mergedAirQuality?.[POLLUTANTS])
                ? Object.values(mergedAirQuality[POLLUTANTS]) : [];
              const localConvertedAirQuality = {
                ...mergedAirQuality,
                ...(settings.aqi.local.switch && pollutants.length > 0
                  && settings.aqi.targets.includes(
                    mergedScale.slice(0, mergedScale.lastIndexOf('.')),
                  )
                  // Little trick for logging
                  && !logger(
                    'info',
                    `${$.name}：已转换AQI，原始标准：${mergedAirQuality[AQI_SCALE]}，`
                    + `原始AQI：${mergedAirQuality[AQI_INDEX]}`,
                  )
                  && toAirQuality(appleApiVersion, appleToEpaAirQuality(
                    settingsToAqiStandard[settings.aqi.local.standard],
                    appleApiVersion === 1 ? convertV1Pollutants(pollutants) : pollutants,
                  ))),
              };
              const aqiLevels = scaleToAqiStandard[localConvertedAirQuality?.[AQI_SCALE]]
                ?.AQI_LEVELS;
              const modifiedCompareAqi = localConvertedAirQuality?.[AQI_INDEX] >= 0
              && cachedAqi.aqi >= 0 && isObject(aqiLevels) ? compareAqi(
                  toAqiLevel(Object.values(aqiLevels), localConvertedAirQuality[AQI_INDEX]),
                  toAqiLevel(Object.values(aqiLevels), cachedAqi.aqi),
                )
                : getAqiComparison(dataForAqiComparison);
              if (
                dataForAqiComparison && modifiedCompareAqi === 'unknown'
              // eslint-disable-next-line functional/no-conditional-statement
              ) {
                logger('error', `${$.name}：无法处理${dataForAqiComparison?.api}的对比昨日空气质量数据`);
                logger('debug', `API返回数据：${JSON.stringify(dataForAqiComparison)}`);
              }
              const modifiedNextHour = getNextHour(
                appleApiVersion,
                dataForNextHour,
                languageWithRegion,
              );
              if (
                dataForNextHour && Object.keys(modifiedNextHour)
                  .filter((key) => key !== METADATA).length <= 0
              // eslint-disable-next-line functional/no-conditional-statement
              ) {
                logger('error', `${$.name}：无法处理${dataForNextHour?.api}的下小时降水强度数据`);
                logger('debug', `API返回数据：${JSON.stringify(dataForNextHour)}`);
              }

              const primaryPollutant = localConvertedAirQuality?.[PRIMARY_POLLUTANT];

              return {
                ...dataFromApple,
                ...(requireData.includes(AIR_QUALITY) && {
                  [AIR_QUALITY]: {
                    ...localConvertedAirQuality,
                    ...(needCompareAqi && { [AQI_COMPARISON]: modifiedCompareAqi }),
                    ...(
                      isNonEmptyString(primaryPollutant) && (
                        !isObject(localConvertedAirQuality?.[POLLUTANTS])
                        || !Object.keys(localConvertedAirQuality[POLLUTANTS])
                          .some((key) => key === primaryPollutant))
                      && {
                        [POLLUTANTS]: {
                          ...localConvertedAirQuality?.[POLLUTANTS],
                          [primaryPollutant]: toPollutant(appleApiVersion, primaryPollutant, -1, 'microgramsPerM3'),
                        },
                      }
                    ),
                  },
                }),
                ...(requireData.includes(REQUIRE_NEXT_HOUR) && {
                  [NEXT_HOUR]: {
                    ...nextHour,
                    ...modifiedNextHour,
                    [METADATA]: { ...nextHour?.[METADATA], ...modifiedNextHour?.[METADATA] },
                  },
                }),
              };
            }).then((responseBody) => {
              const time = responseBody?.[AIR_QUALITY]?.[METADATA]?.[REPORTED_TIME];
              const timestamp = appleTimeToTimestamp(appleApiVersion, time, nowHourTimestamp);

              const airQualityProvider = responseBody?.[AIR_QUALITY]?.[METADATA]?.[PROVIDER_NAME];
              const airQualityScale = responseBody?.[AIR_QUALITY]?.[AQI_SCALE];

              // eslint-disable-next-line functional/no-conditional-statement
              if (isNonEmptyString(airQualityScale)) {
                // eslint-disable-next-line functional/no-expression-statement
                $.setjson(cacheAqi(
                  toCaches(getENV('iRingo', 'Weather', database)),
                  timestamp,
                  location,
                  qweatherNames.includes(airQualityProvider)
                    ? responseBody?.[AIR_QUALITY]?.[SOURCE] : null,
                  airQualityScale.slice(0, airQualityScale.indexOf('.')),
                  responseBody?.[AIR_QUALITY]?.[AQI_INDEX],
                ), '@iRingo.Weather.Caches');
              }

              const nextHourProviderName = responseBody?.[NEXT_HOUR]?.[METADATA]?.[PROVIDER_NAME];

              return {
                ...responseBody,
                ...(isNonEmptyString(airQualityProvider) && {
                  [AIR_QUALITY]: {
                    ...responseBody[AIR_QUALITY],
                    [METADATA]: {
                      ...responseBody[AIR_QUALITY][METADATA],
                      ...(
                        Object.keys(responseBody[AIR_QUALITY])
                          .filter((key) => key !== METADATA).length <= 1
                        && { [TEMPORARILY_UNAVAILABLE]: true }
                      ),
                    },
                  },
                }),
                ...(isNonEmptyString(nextHourProviderName) && {
                  [NEXT_HOUR]: {
                    ...responseBody[NEXT_HOUR],
                    [METADATA]: {
                      ...responseBody[NEXT_HOUR][METADATA],
                      ...(
                        Object.keys(responseBody[NEXT_HOUR])
                          .filter((key) => key !== METADATA && key !== AQI_COMPARISON).length <= 0
                        && { [TEMPORARILY_UNAVAILABLE]: true }
                      ),
                    },
                  },
                }),
              };
            }).then((responseBody) => {
              // eslint-disable-next-line functional/no-conditional-statement
              if (responseBody?.[AIR_QUALITY]?.[METADATA]?.[TEMPORARILY_UNAVAILABLE]) {
                logger(
                  'error',
                  `${$.name}：检测到未能成功获取空气质量数据，`
                  + `数据源：${responseBody?.[AIR_QUALITY]?.[METADATA]?.[PROVIDER_NAME]}`
                  + `${settings.log.location ? `，经度：${longitude}，纬度：${latitude}` : ''}`,
                );
              }
              // eslint-disable-next-line functional/no-conditional-statement
              if (responseBody?.[NEXT_HOUR]?.[METADATA]?.[TEMPORARILY_UNAVAILABLE]) {
                logger(
                  'error',
                  `${$.name}：检测到未能成功获取下小时降水数据，`
                  + `数据源：${responseBody?.[NEXT_HOUR]?.[METADATA]?.[PROVIDER_NAME]}`
                  + `${settings.log.location ? `，经度：${longitude}，纬度：${latitude}` : ''}`,
                );
              }

              // eslint-disable-next-line functional/no-expression-statement,no-undef
              setResponse({ ...$response, body: JSON.stringify(responseBody) });
            });
          // eslint-disable-next-line functional/no-conditional-statement
          } else {
            // eslint-disable-next-line functional/no-expression-statement
            logger('error', `${$.name}：缺失经纬度信息。经度：${parameters?.lng}，纬度：${parameters?.lat}`);
            // eslint-disable-next-line functional/no-expression-statement
            logger('debug', `${$.name}：URL参数：${JSON.stringify(parameters)}`);
            // eslint-disable-next-line functional/no-expression-statement,no-undef
            setResponse($response);
          }
        // eslint-disable-next-line functional/no-conditional-statement
        } else {
          // eslint-disable-next-line functional/no-expression-statement,no-undef
          logger('error', `${$.name}：数据解析失败，HTTP body = ${$response?.body}`);
          // eslint-disable-next-line functional/no-expression-statement,no-undef
          logger('debug', `${$.name}：响应信息：${JSON.stringify($response)}`);
          // eslint-disable-next-line functional/no-expression-statement,no-undef
          setResponse($response);
        }
      }
    // eslint-disable-next-line functional/no-conditional-statement
    } else {
      // eslint-disable-next-line functional/no-expression-statement,no-undef
      logger('error', `${$.name}：无法解析URL，url = ${url}, $response.url = ${$request?.url}`);
      // eslint-disable-next-line functional/no-expression-statement,no-undef
      logger('debug', `${$.name}：请求信息：${JSON.stringify($request)}`);
      // eslint-disable-next-line functional/no-expression-statement,no-undef
      setResponse($response);
    }
  // eslint-disable-next-line functional/no-conditional-statement
  } else {
    // eslint-disable-next-line functional/no-expression-statement,no-undef
    logger('error', `${$.name}：无法获取URL信息，$response.url = ${$request?.url}`);
    // eslint-disable-next-line functional/no-expression-statement,no-undef
    logger('debug', `${$.name}：请求信息：${JSON.stringify($request)}`);
    // eslint-disable-next-line functional/no-expression-statement,no-undef
    setResponse($response);
  }
// eslint-disable-next-line functional/no-conditional-statement
} else {
  // eslint-disable-next-line functional/no-expression-statement
  logger('warn', `${$.name}：Box.js设置内或参数内已禁用模块`);
  // eslint-disable-next-line functional/no-expression-statement,no-undef
  setResponse($response);
}
