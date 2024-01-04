import { Emitter } from '../mitt/index';
// NOTE: declare 关键字用来告诉编译器，某个类型是存在的，可以在当前文件中使用。
export declare class TinyEmitter {
  on(event: string, callback: Function, ctx?:any):this;
  once(event: string, callback: Function, ctx?:any):this;
  emit(event: string, ...args: any[]):this;
  off(event: string, callback?: Function): this;
}

interface TinyEmitterStatic {
  (): TinyEmitter;
  new(): TinyEmitter;
}

declare const Emitter:TinyEmitterStatic;

export default Emitter