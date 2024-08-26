// automatically generated by the FlatBuffers compiler, do not modify
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import * as flatbuffers from 'flatbuffers';
import { ConditionCode } from '../wk2/condition-code.js';
import { Metadata } from '../wk2/metadata.js';
import { PrecipitationAmountByType } from '../wk2/precipitation-amount-by-type.js';
import { PressureTrend } from '../wk2/pressure-trend.js';
export class CurrentWeatherData {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsCurrentWeatherData(bb, obj) {
        return (obj || new CurrentWeatherData()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsCurrentWeatherData(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new CurrentWeatherData()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    metadata(obj) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? (obj || new Metadata()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    asOf() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    }
    cloudCover() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
    }
    cloudCoverLowAltPct() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
    }
    cloudCoverMidAltPct() {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
    }
    cloudCoverHighAltPct() {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
    }
    conditionCode() {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? this.bb.readInt8(this.bb_pos + offset) : ConditionCode.CLEAR;
    }
    daylight() {
        const offset = this.bb.__offset(this.bb_pos, 18);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    humidity() {
        const offset = this.bb.__offset(this.bb_pos, 20);
        return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
    }
    perceivedPrecipitationIntensity() {
        const offset = this.bb.__offset(this.bb_pos, 22);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    precipitationAmount1h() {
        const offset = this.bb.__offset(this.bb_pos, 24);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    precipitationAmount6h() {
        const offset = this.bb.__offset(this.bb_pos, 26);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    precipitationAmount24h() {
        const offset = this.bb.__offset(this.bb_pos, 28);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    precipitationAmountNext1h() {
        const offset = this.bb.__offset(this.bb_pos, 30);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    precipitationAmountNext6h() {
        const offset = this.bb.__offset(this.bb_pos, 32);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    precipitationAmountNext24h() {
        const offset = this.bb.__offset(this.bb_pos, 34);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    precipitationAmountNext1hByType(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 36);
        return offset ? (obj || new PrecipitationAmountByType()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    precipitationAmountNext1hByTypeLength() {
        const offset = this.bb.__offset(this.bb_pos, 36);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    precipitationAmountNext6hByType(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 38);
        return offset ? (obj || new PrecipitationAmountByType()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    precipitationAmountNext6hByTypeLength() {
        const offset = this.bb.__offset(this.bb_pos, 38);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    precipitationAmountNext24hByType(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 40);
        return offset ? (obj || new PrecipitationAmountByType()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    precipitationAmountNext24hByTypeLength() {
        const offset = this.bb.__offset(this.bb_pos, 40);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    precipitationAmountPrevious1hByType(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 42);
        return offset ? (obj || new PrecipitationAmountByType()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    precipitationAmountPrevious1hByTypeLength() {
        const offset = this.bb.__offset(this.bb_pos, 42);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    precipitationAmountPrevious6hByType(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 44);
        return offset ? (obj || new PrecipitationAmountByType()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    precipitationAmountPrevious6hByTypeLength() {
        const offset = this.bb.__offset(this.bb_pos, 44);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    precipitationAmountPrevious24hByType(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 46);
        return offset ? (obj || new PrecipitationAmountByType()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    precipitationAmountPrevious24hByTypeLength() {
        const offset = this.bb.__offset(this.bb_pos, 46);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    precipitationIntensity() {
        const offset = this.bb.__offset(this.bb_pos, 48);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    pressure() {
        const offset = this.bb.__offset(this.bb_pos, 50);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    pressureTrend() {
        const offset = this.bb.__offset(this.bb_pos, 52);
        return offset ? this.bb.readInt8(this.bb_pos + offset) : PressureTrend.RISING;
    }
    snowfallAmount1h() {
        const offset = this.bb.__offset(this.bb_pos, 54);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    snowfallAmount6h() {
        const offset = this.bb.__offset(this.bb_pos, 56);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    snowfallAmount24h() {
        const offset = this.bb.__offset(this.bb_pos, 58);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    snowfallAmountNext1h() {
        const offset = this.bb.__offset(this.bb_pos, 60);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    snowfallAmountNext6h() {
        const offset = this.bb.__offset(this.bb_pos, 62);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    snowfallAmountNext24h() {
        const offset = this.bb.__offset(this.bb_pos, 64);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    temperature() {
        const offset = this.bb.__offset(this.bb_pos, 66);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    temperatureApparent() {
        const offset = this.bb.__offset(this.bb_pos, 68);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    unknown34() {
        const offset = this.bb.__offset(this.bb_pos, 70);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    temperatureDewPoint() {
        const offset = this.bb.__offset(this.bb_pos, 72);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    uvIndex() {
        const offset = this.bb.__offset(this.bb_pos, 74);
        return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
    }
    visibility() {
        const offset = this.bb.__offset(this.bb_pos, 76);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    windDirection() {
        const offset = this.bb.__offset(this.bb_pos, 78);
        return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
    }
    windGust() {
        const offset = this.bb.__offset(this.bb_pos, 80);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    windSpeed() {
        const offset = this.bb.__offset(this.bb_pos, 82);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    }
    static startCurrentWeatherData(builder) {
        builder.startObject(40);
    }
    static addMetadata(builder, metadataOffset) {
        builder.addFieldOffset(0, metadataOffset, 0);
    }
    static addAsOf(builder, asOf) {
        builder.addFieldInt32(1, asOf, 0);
    }
    static addCloudCover(builder, cloudCover) {
        builder.addFieldInt8(2, cloudCover, 0);
    }
    static addCloudCoverLowAltPct(builder, cloudCoverLowAltPct) {
        builder.addFieldInt8(3, cloudCoverLowAltPct, 0);
    }
    static addCloudCoverMidAltPct(builder, cloudCoverMidAltPct) {
        builder.addFieldInt8(4, cloudCoverMidAltPct, 0);
    }
    static addCloudCoverHighAltPct(builder, cloudCoverHighAltPct) {
        builder.addFieldInt8(5, cloudCoverHighAltPct, 0);
    }
    static addConditionCode(builder, conditionCode) {
        builder.addFieldInt8(6, conditionCode, ConditionCode.CLEAR);
    }
    static addDaylight(builder, daylight) {
        builder.addFieldInt8(7, +daylight, +false);
    }
    static addHumidity(builder, humidity) {
        builder.addFieldInt8(8, humidity, 0);
    }
    static addPerceivedPrecipitationIntensity(builder, perceivedPrecipitationIntensity) {
        builder.addFieldFloat32(9, perceivedPrecipitationIntensity, 0.0);
    }
    static addPrecipitationAmount1h(builder, precipitationAmount1h) {
        builder.addFieldFloat32(10, precipitationAmount1h, 0.0);
    }
    static addPrecipitationAmount6h(builder, precipitationAmount6h) {
        builder.addFieldFloat32(11, precipitationAmount6h, 0.0);
    }
    static addPrecipitationAmount24h(builder, precipitationAmount24h) {
        builder.addFieldFloat32(12, precipitationAmount24h, 0.0);
    }
    static addPrecipitationAmountNext1h(builder, precipitationAmountNext1h) {
        builder.addFieldFloat32(13, precipitationAmountNext1h, 0.0);
    }
    static addPrecipitationAmountNext6h(builder, precipitationAmountNext6h) {
        builder.addFieldFloat32(14, precipitationAmountNext6h, 0.0);
    }
    static addPrecipitationAmountNext24h(builder, precipitationAmountNext24h) {
        builder.addFieldFloat32(15, precipitationAmountNext24h, 0.0);
    }
    static addPrecipitationAmountNext1hByType(builder, precipitationAmountNext1hByTypeOffset) {
        builder.addFieldOffset(16, precipitationAmountNext1hByTypeOffset, 0);
    }
    static createPrecipitationAmountNext1hByTypeVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startPrecipitationAmountNext1hByTypeVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addPrecipitationAmountNext6hByType(builder, precipitationAmountNext6hByTypeOffset) {
        builder.addFieldOffset(17, precipitationAmountNext6hByTypeOffset, 0);
    }
    static createPrecipitationAmountNext6hByTypeVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startPrecipitationAmountNext6hByTypeVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addPrecipitationAmountNext24hByType(builder, precipitationAmountNext24hByTypeOffset) {
        builder.addFieldOffset(18, precipitationAmountNext24hByTypeOffset, 0);
    }
    static createPrecipitationAmountNext24hByTypeVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startPrecipitationAmountNext24hByTypeVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addPrecipitationAmountPrevious1hByType(builder, precipitationAmountPrevious1hByTypeOffset) {
        builder.addFieldOffset(19, precipitationAmountPrevious1hByTypeOffset, 0);
    }
    static createPrecipitationAmountPrevious1hByTypeVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startPrecipitationAmountPrevious1hByTypeVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addPrecipitationAmountPrevious6hByType(builder, precipitationAmountPrevious6hByTypeOffset) {
        builder.addFieldOffset(20, precipitationAmountPrevious6hByTypeOffset, 0);
    }
    static createPrecipitationAmountPrevious6hByTypeVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startPrecipitationAmountPrevious6hByTypeVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addPrecipitationAmountPrevious24hByType(builder, precipitationAmountPrevious24hByTypeOffset) {
        builder.addFieldOffset(21, precipitationAmountPrevious24hByTypeOffset, 0);
    }
    static createPrecipitationAmountPrevious24hByTypeVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startPrecipitationAmountPrevious24hByTypeVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addPrecipitationIntensity(builder, precipitationIntensity) {
        builder.addFieldFloat32(22, precipitationIntensity, 0.0);
    }
    static addPressure(builder, pressure) {
        builder.addFieldFloat32(23, pressure, 0.0);
    }
    static addPressureTrend(builder, pressureTrend) {
        builder.addFieldInt8(24, pressureTrend, PressureTrend.RISING);
    }
    static addSnowfallAmount1h(builder, snowfallAmount1h) {
        builder.addFieldFloat32(25, snowfallAmount1h, 0.0);
    }
    static addSnowfallAmount6h(builder, snowfallAmount6h) {
        builder.addFieldFloat32(26, snowfallAmount6h, 0.0);
    }
    static addSnowfallAmount24h(builder, snowfallAmount24h) {
        builder.addFieldFloat32(27, snowfallAmount24h, 0.0);
    }
    static addSnowfallAmountNext1h(builder, snowfallAmountNext1h) {
        builder.addFieldFloat32(28, snowfallAmountNext1h, 0.0);
    }
    static addSnowfallAmountNext6h(builder, snowfallAmountNext6h) {
        builder.addFieldFloat32(29, snowfallAmountNext6h, 0.0);
    }
    static addSnowfallAmountNext24h(builder, snowfallAmountNext24h) {
        builder.addFieldFloat32(30, snowfallAmountNext24h, 0.0);
    }
    static addTemperature(builder, temperature) {
        builder.addFieldFloat32(31, temperature, 0.0);
    }
    static addTemperatureApparent(builder, temperatureApparent) {
        builder.addFieldFloat32(32, temperatureApparent, 0.0);
    }
    static addUnknown34(builder, unknown34) {
        builder.addFieldFloat32(33, unknown34, 0.0);
    }
    static addTemperatureDewPoint(builder, temperatureDewPoint) {
        builder.addFieldFloat32(34, temperatureDewPoint, 0.0);
    }
    static addUvIndex(builder, uvIndex) {
        builder.addFieldInt8(35, uvIndex, 0);
    }
    static addVisibility(builder, visibility) {
        builder.addFieldFloat32(36, visibility, 0.0);
    }
    static addWindDirection(builder, windDirection) {
        builder.addFieldInt16(37, windDirection, 0);
    }
    static addWindGust(builder, windGust) {
        builder.addFieldFloat32(38, windGust, 0.0);
    }
    static addWindSpeed(builder, windSpeed) {
        builder.addFieldFloat32(39, windSpeed, 0.0);
    }
    static endCurrentWeatherData(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createCurrentWeatherData(builder, metadataOffset, asOf, cloudCover, cloudCoverLowAltPct, cloudCoverMidAltPct, cloudCoverHighAltPct, conditionCode, daylight, humidity, perceivedPrecipitationIntensity, precipitationAmount1h, precipitationAmount6h, precipitationAmount24h, precipitationAmountNext1h, precipitationAmountNext6h, precipitationAmountNext24h, precipitationAmountNext1hByTypeOffset, precipitationAmountNext6hByTypeOffset, precipitationAmountNext24hByTypeOffset, precipitationAmountPrevious1hByTypeOffset, precipitationAmountPrevious6hByTypeOffset, precipitationAmountPrevious24hByTypeOffset, precipitationIntensity, pressure, pressureTrend, snowfallAmount1h, snowfallAmount6h, snowfallAmount24h, snowfallAmountNext1h, snowfallAmountNext6h, snowfallAmountNext24h, temperature, temperatureApparent, unknown34, temperatureDewPoint, uvIndex, visibility, windDirection, windGust, windSpeed) {
        CurrentWeatherData.startCurrentWeatherData(builder);
        CurrentWeatherData.addMetadata(builder, metadataOffset);
        CurrentWeatherData.addAsOf(builder, asOf);
        CurrentWeatherData.addCloudCover(builder, cloudCover);
        CurrentWeatherData.addCloudCoverLowAltPct(builder, cloudCoverLowAltPct);
        CurrentWeatherData.addCloudCoverMidAltPct(builder, cloudCoverMidAltPct);
        CurrentWeatherData.addCloudCoverHighAltPct(builder, cloudCoverHighAltPct);
        CurrentWeatherData.addConditionCode(builder, conditionCode);
        CurrentWeatherData.addDaylight(builder, daylight);
        CurrentWeatherData.addHumidity(builder, humidity);
        CurrentWeatherData.addPerceivedPrecipitationIntensity(builder, perceivedPrecipitationIntensity);
        CurrentWeatherData.addPrecipitationAmount1h(builder, precipitationAmount1h);
        CurrentWeatherData.addPrecipitationAmount6h(builder, precipitationAmount6h);
        CurrentWeatherData.addPrecipitationAmount24h(builder, precipitationAmount24h);
        CurrentWeatherData.addPrecipitationAmountNext1h(builder, precipitationAmountNext1h);
        CurrentWeatherData.addPrecipitationAmountNext6h(builder, precipitationAmountNext6h);
        CurrentWeatherData.addPrecipitationAmountNext24h(builder, precipitationAmountNext24h);
        CurrentWeatherData.addPrecipitationAmountNext1hByType(builder, precipitationAmountNext1hByTypeOffset);
        CurrentWeatherData.addPrecipitationAmountNext6hByType(builder, precipitationAmountNext6hByTypeOffset);
        CurrentWeatherData.addPrecipitationAmountNext24hByType(builder, precipitationAmountNext24hByTypeOffset);
        CurrentWeatherData.addPrecipitationAmountPrevious1hByType(builder, precipitationAmountPrevious1hByTypeOffset);
        CurrentWeatherData.addPrecipitationAmountPrevious6hByType(builder, precipitationAmountPrevious6hByTypeOffset);
        CurrentWeatherData.addPrecipitationAmountPrevious24hByType(builder, precipitationAmountPrevious24hByTypeOffset);
        CurrentWeatherData.addPrecipitationIntensity(builder, precipitationIntensity);
        CurrentWeatherData.addPressure(builder, pressure);
        CurrentWeatherData.addPressureTrend(builder, pressureTrend);
        CurrentWeatherData.addSnowfallAmount1h(builder, snowfallAmount1h);
        CurrentWeatherData.addSnowfallAmount6h(builder, snowfallAmount6h);
        CurrentWeatherData.addSnowfallAmount24h(builder, snowfallAmount24h);
        CurrentWeatherData.addSnowfallAmountNext1h(builder, snowfallAmountNext1h);
        CurrentWeatherData.addSnowfallAmountNext6h(builder, snowfallAmountNext6h);
        CurrentWeatherData.addSnowfallAmountNext24h(builder, snowfallAmountNext24h);
        CurrentWeatherData.addTemperature(builder, temperature);
        CurrentWeatherData.addTemperatureApparent(builder, temperatureApparent);
        CurrentWeatherData.addUnknown34(builder, unknown34);
        CurrentWeatherData.addTemperatureDewPoint(builder, temperatureDewPoint);
        CurrentWeatherData.addUvIndex(builder, uvIndex);
        CurrentWeatherData.addVisibility(builder, visibility);
        CurrentWeatherData.addWindDirection(builder, windDirection);
        CurrentWeatherData.addWindGust(builder, windGust);
        CurrentWeatherData.addWindSpeed(builder, windSpeed);
        return CurrentWeatherData.endCurrentWeatherData(builder);
    }
}
