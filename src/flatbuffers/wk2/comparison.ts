// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

import { ComparisonType } from '../wk2/comparison-type.js';
import { DeviationType } from '../wk2/deviation-type.js';


export class Comparison {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Comparison {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsComparison(bb:flatbuffers.ByteBuffer, obj?:Comparison):Comparison {
  return (obj || new Comparison()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsComparison(bb:flatbuffers.ByteBuffer, obj?:Comparison):Comparison {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Comparison()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

condition():ComparisonType {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : ComparisonType.UNKNOWN0;
}

currentValue():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

baselineValue():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

deviation():DeviationType {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : DeviationType.UNKNOWN0;
}

baselineType():number {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

baselineStartDate():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

static startComparison(builder:flatbuffers.Builder) {
  builder.startObject(6);
}

static addCondition(builder:flatbuffers.Builder, condition:ComparisonType) {
  builder.addFieldInt8(0, condition, ComparisonType.UNKNOWN0);
}

static addCurrentValue(builder:flatbuffers.Builder, currentValue:number) {
  builder.addFieldFloat32(1, currentValue, 0.0);
}

static addBaselineValue(builder:flatbuffers.Builder, baselineValue:number) {
  builder.addFieldFloat32(2, baselineValue, 0.0);
}

static addDeviation(builder:flatbuffers.Builder, deviation:DeviationType) {
  builder.addFieldInt8(3, deviation, DeviationType.UNKNOWN0);
}

static addBaselineType(builder:flatbuffers.Builder, baselineType:number) {
  builder.addFieldInt32(4, baselineType, 0);
}

static addBaselineStartDate(builder:flatbuffers.Builder, baselineStartDate:number) {
  builder.addFieldInt32(5, baselineStartDate, 0);
}

static endComparison(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createComparison(builder:flatbuffers.Builder, condition:ComparisonType, currentValue:number, baselineValue:number, deviation:DeviationType, baselineType:number, baselineStartDate:number):flatbuffers.Offset {
  Comparison.startComparison(builder);
  Comparison.addCondition(builder, condition);
  Comparison.addCurrentValue(builder, currentValue);
  Comparison.addBaselineValue(builder, baselineValue);
  Comparison.addDeviation(builder, deviation);
  Comparison.addBaselineType(builder, baselineType);
  Comparison.addBaselineStartDate(builder, baselineStartDate);
  return Comparison.endComparison(builder);
}
}
