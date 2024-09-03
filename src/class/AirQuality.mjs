export default class AirQuality {
    constructor(options = {}) {
		this.Name = "AirQuality";
        this.Version = "2.2.2";
        this.Author = "Virgil Clyne & Wordless Echo";
		console.log(`\n🟧 ${this.Name} v${this.Version} by ${this.Author}\n`, "");
        Object.assign(this, options);
    };

    static #Config = {
        "Scales": {
            "EPA_NowCast": {
                "scale": 'EPA_NowCast',
                "categoryIndex": {
                    "-1": [Number.MIN_VALUE, -1], // INVALID
                    "1": [0, 50], // GOOD
                    "2": [51, 100], // MODERATE
                    "3": [101, 150], // UNHEALTHY_FOR_SENSITIVE
                    "4": [151, 200], // UNHEALTHY
                    "5": [201, 300], // VERY_UNHEALTHY
                    "6": [301, 500], // HAZARDOUS
                    "7": [500, Number.MAX_VALUE], // OVER_RANGE
                },
                "significant": 3,
                "pollutants": {
                    "OZONE_8H": {
                        "units": 'PARTS_PER_MILLION',
                        "ppxToXGM3": 1.97,
                        "ranges": {
                            "1": [0, 0.054], // GOOD
                            "2": [0.055, 0.070], // MODERATE
                            "3": [0.071, 0.085], // UNHEALTHY_FOR_SENSITIVE
                            "4": [0.086, 0.105], // UNHEALTHY
                            "5": [0.106, 0.200], // VERY_UNHEALTHY
                        }
                    },
                    "OZONE": {
                        "units": 'PARTS_PER_MILLION',
                        "ppxToXGM3": 1.97,
                        "ranges": {
                            "3": [0.125, 0.164], // UNHEALTHY_FOR_SENSITIVE
                            "4": [0.165, 0.204], // UNHEALTHY
                            "5": [0.205, 0.404], // VERY_UNHEALTHY
                            "6": [0.405, 0.604], // HAZARDOUS
                        }
                    },
                    "PM2_5": {
                        "units": 'MICROGRAMS_PER_CUBIC_METER',
                        "ppxToXGM3": -1,
                        "ranges": {
                            "1": [0.0, 9.0], // GOOD
                            "2": [9.1, 35.4], // MODERATE
                            "3": [35.5, 55.4], // UNHEALTHY_FOR_SENSITIVE
                            "4": [55.5, 125.4], // UNHEALTHY
                            "5": [125.5, 225.4], // VERY_UNHEALTHY
                            "6": [225.5, 325.4], // HAZARDOUS
                        }
                    },
                    "PM10": {
                        "units": 'MICROGRAMS_PER_CUBIC_METER',
                        "ppxToXGM3": -1,
                        "ranges": {
                            "1": [0, 54], // GOOD
                            "2": [55, 154], // MODERATE
                            "3": [155, 254], // UNHEALTHY_FOR_SENSITIVE
                            "4": [255, 354], // UNHEALTHY
                            "5": [355, 424], // VERY_UNHEALTHY
                            "6": [425, 604], // HAZARDOUS
                        }
                    },
                    "CO": {
                        "units": 'PARTS_PER_MILLION',
                        "ppxToXGM3": 1.14,
                        "ranges": {
                            "1": [0.0, 4.4], // GOOD
                            "2": [4.5, 9.4], // MODERATE
                            "3": [9.5, 12.4], // UNHEALTHY_FOR_SENSITIVE
                            "4": [12.5, 15.4], // UNHEALTHY
                            "5": [15.5, 30.4], // VERY_UNHEALTHY
                            "6": [30.5, 50.4], // HAZARDOUS
                        }
                    },
                    "SO2": {
                        "units": 'PARTS_PER_BILLION',
                        "ppxToXGM3": 2.62,
                        "ranges": {
                            "1": [0, 35], // GOOD
                            "2": [36, 75], // MODERATE
                            "3": [76, 185], // UNHEALTHY_FOR_SENSITIVE
                            "4": [186, 304], // UNHEALTHY
                        }
                    },
                    "SO2_24H": {
                        "units": 'PARTS_PER_BILLION',
                        "ppxToXGM3": -1,
                        "ranges": {
                            "5": [305, 604], // VERY_UNHEALTHY
                            "6": [605, 1004], // HAZARDOUS
                        }
                    },
                    "SO2_MAX_1H": {
                        "units": 'PARTS_PER_BILLION',
                        "ppxToXGM3": -1,
                        "ranges": {
                            "5": [305, 604], // VERY_UNHEALTHY
                            "6": [605, Number.MAX_VALUE], // HAZARDOUS
                        }
                    },
                    "NO2": {
                        "units": 'PARTS_PER_BILLION',
                        "ppxToXGM3": 1.88,
                        "ranges": {
                            "1": [0, 53], // GOOD
                            "2": [54, 100], // MODERATE
                            "3": [101, 360], // UNHEALTHY_FOR_SENSITIVE
                            "4": [361, 649], // UNHEALTHY
                            "5": [650, 1249], // VERY_UNHEALTHY
                            "6": [1250, 2049], // HAZARDOUS
                        }
                    },
                }
            },
            "WAQI_InstantCast": {
                "scale": 'EPA_NowCast',
                "categoryIndex": {
                    "-1": [Number.MIN_VALUE, -1], // INVALID
                    "1": [0, 50], // GOOD
                    "2": [51, 100], // MODERATE
                    "3": [101, 150], // UNHEALTHY_FOR_SENSITIVE
                    "4": [151, 200], // UNHEALTHY
                    "5": [201, 300], // VERY_UNHEALTHY
                    "6": [301, 500], // HAZARDOUS
                    "7": [500, Number.MAX_VALUE], // OVER_RANGE
                },
                "significant": 3,
                "pollutants": {
                    "OZONE": {
                        "units": 'PARTS_PER_BILLION',
                        "ppxToXGM3": 1.97,
                        "ranges": {
                            "1": [0, 61.5], // GOOD
                            "2": [62.5, 100.5], // MODERATE
                            "3": [101.5, 151.5], // UNHEALTHY_FOR_SENSITIVE
                            "4": [152.5, 204], // UNHEALTHY
                            "5": [205, 404], // VERY_UNHEALTHY
                            "6": [405, 605], // HAZARDOUS
                        },
                    },
                    "SO2": {
                        "units": 'PARTS_PER_BILLION',
                        "ppxToXGM3": 2.62,
                        "ranges": {
                            "1": [0, 35], // GOOD
                            "2": [36, 75], // MODERATE
                            "3": [76, 185], // UNHEALTHY_FOR_SENSITIVE
                            "4": [186, 304], // UNHEALTHY
                        },
                    },
                    "SO2_MAX_1H": {
                        "units": 'PARTS_PER_BILLION',
                        "ppxToXGM3": -1,
                        "ranges": {
                            "5": [305, 604], // VERY_UNHEALTHY
                            "6": [605, Number.MAX_VALUE], // HAZARDOUS
                        },
                    },
                    "NO2": {
                        "units": 'PARTS_PER_BILLION',
                        "ppxToXGM3": 1.88,
                        "ranges": {
                            "1": [0, 53], // GOOD
                            "2": [54, 100], // MODERATE
                            "3": [101, 360], // UNHEALTHY_FOR_SENSITIVE
                            "4": [361, 649], // UNHEALTHY
                            "5": [650, 1249], // VERY_UNHEALTHY
                            "6": [1250, 2049], // HAZARDOUS
                        },
                    },
                    "PM2_5": {
                        "units": 'MICROGRAMS_PER_CUBIC_METER',
                        "ppxToXGM3": -1,
                        "ranges": {
                            "1": [0.0, 9.0], // GOOD
                            "2": [9.1, 35.4], // MODERATE
                            "3": [35.5, 55.4], // UNHEALTHY_FOR_SENSITIVE
                            "4": [55.5, 125.4], // UNHEALTHY
                            "5": [125.5, 225.4], // VERY_UNHEALTHY
                            "6": [225.5, 325.4], // HAZARDOUS
                        },
                    },
                    "PM10": {
                        "units": 'MICROGRAMS_PER_CUBIC_METER',
                        "ppxToXGM3": -1,
                        "ranges": {
                            "1": [0, 54], // GOOD
                            "2": [55, 154], // MODERATE
                            "3": [155, 254], // UNHEALTHY_FOR_SENSITIVE
                            "4": [255, 354], // UNHEALTHY
                            "5": [355, 424], // VERY_UNHEALTHY
                            "6": [425, 604], // HAZARDOUS
                        },
                    },
                    "CO": {
                        "units": 'PARTS_PER_MILLION',
                        "ppxToXGM3": 1.14,
                        "ranges": {
                            "1": [0.0, 4.4], // GOOD
                            "2": [4.5, 9.4], // MODERATE
                            "3": [9.5, 12.4], // UNHEALTHY_FOR_SENSITIVE
                            "4": [12.5, 15.4], // UNHEALTHY
                            "5": [15.5, 30.4], // VERY_UNHEALTHY
                            "6": [30.5, 50.4], // HAZARDOUS
                        },
                    },
                }
            },
        },
        "Pollutants": {
            "co": "CO",
            "no": "NO",
            "no2": "NO2",
            "so2": "SO2",
            "o3": "OZONE",
            "nox": "NOX",
            "pm25": "PM2_5",
            "pm10": "PM10",
            "other": "NOT_AVAILABLE"
        },
    };

    static Pollutants(pollutants = [], scale = "WAQI_InstantCast") {
        console.log(`☑️ Pollutants, scale: ${scale}`, "");
        pollutants = pollutants.map(pollutant => {
            // Convert unit based on standard
            const PollutantStandard = this.#Config.Scales[scale].pollutants[pollutant.pollutantType];
            pollutant.convertedAmount = this.ConvertUnit(pollutant.amount, pollutant.units, PollutantStandard.units, PollutantStandard.ppxToXGM3);
            pollutant.convertedUnits = PollutantStandard.units;
            pollutant = { ...PollutantStandard, ...pollutant };
            // Calculate AQI for each pollutant
            let categoryIndexKey;
            for (const [key, value] of Object.entries(pollutant.ranges)) {
                categoryIndexKey = parseInt(key, 10);
                if (pollutant.convertedAmount >= value[0] && pollutant.convertedAmount <= value[1]) break;
            };
            pollutant.range = pollutant.ranges[categoryIndexKey];
            pollutant.categoryIndex = parseInt(categoryIndexKey, 10);
            pollutant.category = this.#Config.Scales[scale].categoryIndex[categoryIndexKey];
            pollutant.AQI = Math.round(
                ((pollutant.category[1] - pollutant.category[0]) * (pollutant.convertedAmount - pollutant.range[0])) / (pollutant.range[1] - pollutant.range[0])
                + pollutant.category[0],
            );
            return pollutant;
        });
        console.log(`🚧 Pollutants, pollutants: ${JSON.stringify(pollutants, null, 2)}`, "");
        console.log(`✅ Pollutants`, "");
        return pollutants;
    };

    static ConvertScale(pollutants = [], scale = "WAQI_InstantCast", convertUnits = false) {
        console.log(`☑️ ConvertScale`, "");
        pollutants = this.Pollutants(pollutants, scale);
        const { AQI: index, pollutantType: primaryPollutant } = pollutants.reduce((previous, current) => previous.AQI > current.AQI ? previous : current);
        let airQuality = {
            "index": index,
            "pollutants": pollutants,
            "scale": this.#Config.Scales[scale].scale,
            "primaryPollutant": primaryPollutant,
            "categoryIndex": this.CategoryIndex(index, scale),
        };
        airQuality.isSignificant = airQuality.categoryIndex >= this.#Config.Scales[scale].significant;
        if (convertUnits) airQuality.pollutants = airQuality.pollutants.map(pollutant => {
            pollutant.amount = pollutant.convertedAmount;
            pollutant.units = pollutant.convertedUnits;
            return pollutant;
        });
        console.log(`🚧 ConvertScale, airQuality: ${JSON.stringify(airQuality, null, 2)}`, "");
        console.log(`✅ ConvertScale`, "");
        return airQuality;
    };

    static ConvertUnit(amount = Number(), unitFrom, unitTo, ppxToXGM3Value = -1) {
        //console.log(`☑️ ConvertUnit\namount: ${amount}   ppxToXGM3Value: ${ppxToXGM3Value}\nunitFrom: ${unitFrom}   unitTo: ${unitTo}`, "");
        if (amount < 0) amount = -1;
        else switch (unitFrom) {
            case 'PARTS_PER_MILLION':
                switch (unitTo) {
                    case 'PARTS_PER_MILLION':
                        break;
                    case 'PARTS_PER_BILLION':
                        amount = amount * 1000;
                        break;
                    case 'MILLIGRAMS_PER_CUBIC_METER':
                        amount = amount * ppxToXGM3Value;
                        break;
                    case 'MICROGRAMS_PER_CUBIC_METER': {
                        const inPpb = this.ConvertUnit(amount, unitFrom, 'PARTS_PER_BILLION', ppxToXGM3Value);
                        amount = inPpb * ppxToXGM3Value;
                        break;
                    };
                    default:
                        amount = -1;
                        break;
                };
                break;
            case 'PARTS_PER_BILLION':
                switch (unitTo) {
                    case 'PARTS_PER_BILLION':
                        break;
                    case 'PARTS_PER_MILLION':
                        amount = amount * 0.001;
                        break;
                    case 'MILLIGRAMS_PER_CUBIC_METER': {
                        const inPpm = this.ConvertUnit(amount, unitFrom, 'PARTS_PER_MILLION', ppxToXGM3Value);
                        amount = inPpm * ppxToXGM3Value;
                        break;
                    };
                    case 'MICROGRAMS_PER_CUBIC_METER':
                        amount = amount * ppxToXGM3Value;
                        break;
                    default:
                        amount = -1;
                        break;
                };
                break;
            case 'MILLIGRAMS_PER_CUBIC_METER':
                switch (unitTo) {
                    case 'MILLIGRAMS_PER_CUBIC_METER':
                        break;
                    case 'MICROGRAMS_PER_CUBIC_METER':
                        amount = amount * 1000;
                        break;
                    case 'PARTS_PER_MILLION':
                        amount = amount / ppxToXGM3Value;
                        break;
                    case 'PARTS_PER_BILLION': {
                        const inUgM3 = this.ConvertUnit(amount, unitFrom, 'MICROGRAMS_PER_CUBIC_METER', ppxToXGM3Value);
                        amount = inUgM3 / ppxToXGM3Value;
                        break;
                    };
                    default:
                        amount = -1;
                        break;
                };
                break;
            case 'MICROGRAMS_PER_CUBIC_METER':
                switch (unitTo) {
                    case 'MICROGRAMS_PER_CUBIC_METER':
                        break;
                    case 'MILLIGRAMS_PER_CUBIC_METER':
                        amount = amount * 0.001;
                        break;
                    case 'PARTS_PER_MILLION': {
                        const inMgM3 = this.ConvertUnit(amount, unitFrom, 'MILLIGRAMS_PER_CUBIC_METER', ppxToXGM3Value);
                        amount = inMgM3 / ppxToXGM3Value;
                        break;
                    };
                    case 'PARTS_PER_BILLION':
                        amount = amount / ppxToXGM3Value;
                        break;
                    default:
                        amount = -1;
                        break;
                };
                break;
            default:
                amount = -1;
                break;
        };
        //console.log(`✅ ConvertUnit, amount: ${amount}`, "");
        return amount;
    };

    static CategoryIndex(aqi = Number(), scale = "WAQI_InstantCast") {
        switch (typeof aqi) {
            case "number":
                break;
            case "string":
                aqi = parseInt(aqi, 10);
                break;
        };
        console.log(`☑️ CategoryIndex, aqi: ${aqi}`, "");
        let categoryIndex;
        for (const [key, value] of Object.entries(this.#Config.Scales[scale].categoryIndex)) {
            categoryIndex = parseInt(key, 10);
            if (aqi >= value[0] && aqi <= value[1]) break;
        };
        console.log(`✅ CategoryIndex, categoryIndex: ${categoryIndex}`, "");
        return categoryIndex;
    };

    static FixUnits(pollutants = []) {
        return pollutants.map(pollutant => {
            switch (pollutant.units) {
                case "PARTS_PER_MILLION":
                    pollutant.amount = AirQuality.ConvertUnit(pollutant.amount, pollutant.units, "PARTS_PER_BILLION"); // Will not convert to Xg/m3
                    pollutant.units = "PARTS_PER_BILLION";
                    break
                case 'MILLIGRAMS_PER_CUBIC_METER':
                    pollutant.amount = AirQuality.ConvertUnit(pollutant.amount, pollutant.units, "MICROGRAMS_PER_CUBIC_METER"); // Will not convert to Xg/m3
                    pollutant.units = "MICROGRAMS_PER_CUBIC_METER";
                    break;
                default:
                    break;
            };
            return pollutant;
        });
    };
};
