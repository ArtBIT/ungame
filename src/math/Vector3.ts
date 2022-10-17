import { IVector2, Vector2 } from './Vector2';

export interface IVector3 extends IVector2 {
  z: number;
}

export class Vector3 implements IVector3 {
  x: number;
  y: number;
  z: number;
  private _ux = 0;
  private _uy = 0;
  private _uz = 0;
  private _length = 0;
  private _isDirty = false;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this._isDirty = true;
  }
  get length(): number {
    if (this._isDirty) {
      this.recalc();
    }
    return this._length;
  }
  get ux(): number {
    if (this._isDirty) {
      this.recalc();
    }
    return this._ux;
  }
  get uy(): number {
    if (this._isDirty) {
      this.recalc();
    }
    return this._uy;
  }
  get uz(): number {
    if (this._isDirty) {
      this.recalc();
    }
    return this._uz;
  }
  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.y);
  }
  copy({ x, y, z = 0 }: IVector3): Vector3 {
    return this.set(x, y, z);
  }
  set(x: number, y: number, z: number): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    this._isDirty = true;
    return this;
  }
  equals({ x, y, z = 0 }: IVector3): boolean {
    return this.x === x && this.y === y && this.z === z;
  }
  magnitude(): number {
    return this.length;
  }
  normalize(): Vector3 {
    return this.set(this.ux, this.uy, this.uz);
  }
  add({ x, y, z = 0 }: IVector3): Vector3 {
    return this.set(this.x + x, this.y + y, this.z + z);
  }
  subtract({ x, y, z = 0 }: IVector3): Vector3 {
    return this.set(this.x - x, this.y - y, this.z - z);
  }
  multiply({ x, y, z = 1 }: IVector3): Vector3 {
    return this.set(this.x * x, this.y * y, this.z * z);
  }
  divide({ x, y, z = 1 }: IVector3): Vector3 {
    return this.set(this.x / x, this.y / y, this.z / z);
  }
  dot({ x, y, z = 0 }: IVector3): number {
    return this.x * x + this.y * y + this.z * z;
  }
  cross({ x, y, z = this.z }: IVector3): Vector3 {
    return this.set(this.y * z - this.z * y, this.z * x - this.x * z, this.x * y - this.y * x);
  }
  lerp({ x, y, z = this.z }: IVector3, t = 0): Vector3 {
    return this.set(this.x + t * (x - this.x), this.y + t * (y - this.y), this.z + t * (z - this.z));
  }
  scale(x: number, y = x, z = x): Vector3 {
    return this.set(this.x * x, this.y * y, this.z * z);
  }
  negate(): Vector3 {
    return this.scale(-1);
  }
  distance({ x, y, z = this.z }: IVector3): number {
    const dx = x - this.x;
    const dy = y - this.y;
    const dz = z - this.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  recalc(): Vector3 {
    if (this._isDirty) {
      const lengthSquared = this.x * this.x + this.y * this.y + this.z * this.z;
      this._length = Math.sqrt(lengthSquared);
      this._ux = this._length ? this.x / this._length : 0;
      this._uy = this._length ? this.y / this._length : 0;
      this._uz = this._length ? this.z / this._length : 0;
      this._isDirty = false;
    }
    return this;
  }
  project(src: Vector3): Vector3 {
    const scalar = this.dot(src) / src.dot(src);
    return this.copy(src).scale(scalar);
  }

  static ZERO = Object.freeze(new Vector3(0, 0, 0));
  static ONE = Object.freeze(new Vector3(1, 1, 1));

  static UP = Object.freeze(new Vector3(0, 0, 1));
  static DOWN = Object.freeze(new Vector3(0, 0, -1));
  static RIGHT = Object.freeze(new Vector3(1, 0, 0));
  static LEFT = Object.freeze(new Vector3(-1, 0, 0));
  static FORWARD = Object.freeze(new Vector3(0, 1, 0));
  static BACKWARD = Object.freeze(new Vector3(0, -1, 0));
}

export default Vector3;
