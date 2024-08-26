// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

import { ConditionCode } from '../wk2/condition-code.js';
import { DayPartForecast } from '../wk2/day-part-forecast.js';
import { MoonPhase } from '../wk2/moon-phase.js';
import { PrecipitationAmountByType } from '../wk2/precipitation-amount-by-type.js';
import { PrecipitationType } from '../wk2/precipitation-type.js';


export class DayWeatherConditions {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):DayWeatherConditions {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsDayWeatherConditions(bb:flatbuffers.ByteBuffer, obj?:DayWeatherConditions):DayWeatherConditions {
  return (obj || new DayWeatherConditions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsDayWeatherConditions(bb:flatbuffers.ByteBuffer, obj?:DayWeatherConditions):DayWeatherConditions {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new DayWeatherConditions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

forecastStart():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

forecastEnd():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

conditionCode():ConditionCode {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : ConditionCode.CLEAR;
}

humidityMax():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : 0;
}

humidityMin():number {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : 0;
}

maxUvIndex():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : 0;
}

moonPhase():MoonPhase {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : MoonPhase.NEW;
}

moonrise():number {
  const offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

moonset():number {
  const offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

precipitationAmount():number {
  const offset = this.bb!.__offset(this.bb_pos, 22);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

precipitationAmountByType(index: number, obj?:PrecipitationAmountByType):PrecipitationAmountByType|null {
  const offset = this.bb!.__offset(this.bb_pos, 24);
  return offset ? (obj || new PrecipitationAmountByType()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

precipitationAmountByTypeLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 24);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

precipitationChance():number {
  const offset = this.bb!.__offset(this.bb_pos, 26);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : 0;
}

precipitationType():PrecipitationType {
  const offset = this.bb!.__offset(this.bb_pos, 28);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : PrecipitationType.CLEAR;
}

snowfallAmount():number {
  const offset = this.bb!.__offset(this.bb_pos, 30);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

solarMidnight():number {
  const offset = this.bb!.__offset(this.bb_pos, 32);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

solarNoon():number {
  const offset = this.bb!.__offset(this.bb_pos, 34);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sunrise():number {
  const offset = this.bb!.__offset(this.bb_pos, 36);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sunriseCivil():number {
  const offset = this.bb!.__offset(this.bb_pos, 38);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sunriseNautical():number {
  const offset = this.bb!.__offset(this.bb_pos, 40);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sunriseAstronomical():number {
  const offset = this.bb!.__offset(this.bb_pos, 42);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sunset():number {
  const offset = this.bb!.__offset(this.bb_pos, 44);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sunsetCivil():number {
  const offset = this.bb!.__offset(this.bb_pos, 46);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sunsetNautical():number {
  const offset = this.bb!.__offset(this.bb_pos, 48);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sunsetAstronomical():number {
  const offset = this.bb!.__offset(this.bb_pos, 50);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

temperatureMax():number {
  const offset = this.bb!.__offset(this.bb_pos, 52);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

temperatureMaxTime():number {
  const offset = this.bb!.__offset(this.bb_pos, 54);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

temperatureMin():number {
  const offset = this.bb!.__offset(this.bb_pos, 56);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

temperatureMinTime():number {
  const offset = this.bb!.__offset(this.bb_pos, 58);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

windGustSpeedMax():number {
  const offset = this.bb!.__offset(this.bb_pos, 60);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

windSpeedAvg():number {
  const offset = this.bb!.__offset(this.bb_pos, 62);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

windSpeedMax():number {
  const offset = this.bb!.__offset(this.bb_pos, 64);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

visibilityMax():number {
  const offset = this.bb!.__offset(this.bb_pos, 66);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

visibilityMin():number {
  const offset = this.bb!.__offset(this.bb_pos, 68);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

daytimeForecast(obj?:DayPartForecast):DayPartForecast|null {
  const offset = this.bb!.__offset(this.bb_pos, 70);
  return offset ? (obj || new DayPartForecast()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

overnightForecast(obj?:DayPartForecast):DayPartForecast|null {
  const offset = this.bb!.__offset(this.bb_pos, 72);
  return offset ? (obj || new DayPartForecast()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

restOfDayForecast(obj?:DayPartForecast):DayPartForecast|null {
  const offset = this.bb!.__offset(this.bb_pos, 74);
  return offset ? (obj || new DayPartForecast()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

static startDayWeatherConditions(builder:flatbuffers.Builder) {
  builder.startObject(36);
}

static addForecastStart(builder:flatbuffers.Builder, forecastStart:number) {
  builder.addFieldInt32(0, forecastStart, 0);
}

static addForecastEnd(builder:flatbuffers.Builder, forecastEnd:number) {
  builder.addFieldInt32(1, forecastEnd, 0);
}

static addConditionCode(builder:flatbuffers.Builder, conditionCode:ConditionCode) {
  builder.addFieldInt8(2, conditionCode, ConditionCode.CLEAR);
}

static addHumidityMax(builder:flatbuffers.Builder, humidityMax:number) {
  builder.addFieldInt8(3, humidityMax, 0);
}

static addHumidityMin(builder:flatbuffers.Builder, humidityMin:number) {
  builder.addFieldInt8(4, humidityMin, 0);
}

static addMaxUvIndex(builder:flatbuffers.Builder, maxUvIndex:number) {
  builder.addFieldInt8(5, maxUvIndex, 0);
}

static addMoonPhase(builder:flatbuffers.Builder, moonPhase:MoonPhase) {
  builder.addFieldInt8(6, moonPhase, MoonPhase.NEW);
}

static addMoonrise(builder:flatbuffers.Builder, moonrise:number) {
  builder.addFieldInt32(7, moonrise, 0);
}

static addMoonset(builder:flatbuffers.Builder, moonset:number) {
  builder.addFieldInt32(8, moonset, 0);
}

static addPrecipitationAmount(builder:flatbuffers.Builder, precipitationAmount:number) {
  builder.addFieldFloat32(9, precipitationAmount, 0.0);
}

static addPrecipitationAmountByType(builder:flatbuffers.Builder, precipitationAmountByTypeOffset:flatbuffers.Offset) {
  builder.addFieldOffset(10, precipitationAmountByTypeOffset, 0);
}

static createPrecipitationAmountByTypeVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startPrecipitationAmountByTypeVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addPrecipitationChance(builder:flatbuffers.Builder, precipitationChance:number) {
  builder.addFieldInt8(11, precipitationChance, 0);
}

static addPrecipitationType(builder:flatbuffers.Builder, precipitationType:PrecipitationType) {
  builder.addFieldInt8(12, precipitationType, PrecipitationType.CLEAR);
}

static addSnowfallAmount(builder:flatbuffers.Builder, snowfallAmount:number) {
  builder.addFieldFloat32(13, snowfallAmount, 0.0);
}

static addSolarMidnight(builder:flatbuffers.Builder, solarMidnight:number) {
  builder.addFieldInt32(14, solarMidnight, 0);
}

static addSolarNoon(builder:flatbuffers.Builder, solarNoon:number) {
  builder.addFieldInt32(15, solarNoon, 0);
}

static addSunrise(builder:flatbuffers.Builder, sunrise:number) {
  builder.addFieldInt32(16, sunrise, 0);
}

static addSunriseCivil(builder:flatbuffers.Builder, sunriseCivil:number) {
  builder.addFieldInt32(17, sunriseCivil, 0);
}

static addSunriseNautical(builder:flatbuffers.Builder, sunriseNautical:number) {
  builder.addFieldInt32(18, sunriseNautical, 0);
}

static addSunriseAstronomical(builder:flatbuffers.Builder, sunriseAstronomical:number) {
  builder.addFieldInt32(19, sunriseAstronomical, 0);
}

static addSunset(builder:flatbuffers.Builder, sunset:number) {
  builder.addFieldInt32(20, sunset, 0);
}

static addSunsetCivil(builder:flatbuffers.Builder, sunsetCivil:number) {
  builder.addFieldInt32(21, sunsetCivil, 0);
}

static addSunsetNautical(builder:flatbuffers.Builder, sunsetNautical:number) {
  builder.addFieldInt32(22, sunsetNautical, 0);
}

static addSunsetAstronomical(builder:flatbuffers.Builder, sunsetAstronomical:number) {
  builder.addFieldInt32(23, sunsetAstronomical, 0);
}

static addTemperatureMax(builder:flatbuffers.Builder, temperatureMax:number) {
  builder.addFieldFloat32(24, temperatureMax, 0.0);
}

static addTemperatureMaxTime(builder:flatbuffers.Builder, temperatureMaxTime:number) {
  builder.addFieldInt32(25, temperatureMaxTime, 0);
}

static addTemperatureMin(builder:flatbuffers.Builder, temperatureMin:number) {
  builder.addFieldFloat32(26, temperatureMin, 0.0);
}

static addTemperatureMinTime(builder:flatbuffers.Builder, temperatureMinTime:number) {
  builder.addFieldInt32(27, temperatureMinTime, 0);
}

static addWindGustSpeedMax(builder:flatbuffers.Builder, windGustSpeedMax:number) {
  builder.addFieldFloat32(28, windGustSpeedMax, 0.0);
}

static addWindSpeedAvg(builder:flatbuffers.Builder, windSpeedAvg:number) {
  builder.addFieldFloat32(29, windSpeedAvg, 0.0);
}

static addWindSpeedMax(builder:flatbuffers.Builder, windSpeedMax:number) {
  builder.addFieldFloat32(30, windSpeedMax, 0.0);
}

static addVisibilityMax(builder:flatbuffers.Builder, visibilityMax:number) {
  builder.addFieldFloat32(31, visibilityMax, 0.0);
}

static addVisibilityMin(builder:flatbuffers.Builder, visibilityMin:number) {
  builder.addFieldFloat32(32, visibilityMin, 0.0);
}

static addDaytimeForecast(builder:flatbuffers.Builder, daytimeForecastOffset:flatbuffers.Offset) {
  builder.addFieldOffset(33, daytimeForecastOffset, 0);
}

static addOvernightForecast(builder:flatbuffers.Builder, overnightForecastOffset:flatbuffers.Offset) {
  builder.addFieldOffset(34, overnightForecastOffset, 0);
}

static addRestOfDayForecast(builder:flatbuffers.Builder, restOfDayForecastOffset:flatbuffers.Offset) {
  builder.addFieldOffset(35, restOfDayForecastOffset, 0);
}

static endDayWeatherConditions(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

}
