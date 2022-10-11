export interface IVector2 {
  x: number;
  y: number;
}

export class Vector2 implements IVector2 {
  x: number;
  y: number;
  private _length = 0;
  private _ux = 0;
  private _uy = 0;
  private isDirty = false;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.isDirty = true;
  }
  get length(): number {
    if (this.isDirty) {
      this.recalc();
    }
    return this._length;
  }
  get ux(): number {
    if (this.isDirty) {
      this.recalc();
    }
    return this._ux;
  }
  get uy(): number {
    if (this.isDirty) {
      this.recalc();
    }
    return this._ux;
  }
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
  copy({ x, y }: IVector2): Vector2 {
    return this.set(x, y);
  }
  set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    this.isDirty = true;
    return this;
  }
  equals({ x, y }: IVector2): boolean {
    return this.x === x && this.y === y;
  }
  magnitude(): number {
    return this.length;
  }
  normalize(): Vector2 {
    return this.set(this.ux, this.uy);
  }
  add({ x, y }: IVector2): Vector2 {
    return this.set(this.x + x, this.y + y);
  }
  subtract({ x, y }: IVector2): Vector2 {
    return this.set(this.x - x, this.y - y);
  }
  multiply({ x, y }: IVector2): Vector2 {
    return this.set(this.x * x, this.y * y);
  }
  divide({ x, y }: IVector2): Vector2 {
    return this.set(this.x / x, this.y / y);
  }
  dot({ x, y }: IVector2): number {
    return this.x * x + this.y * y;
  }
  cross({ x, y }: IVector2): number {
    return this.x * y - this.y * x;
  }
  lerp({ x, y }: IVector2, t = 0): Vector2 {
    this.x += t * (x - this.x);
    this.y += t * (y - this.y);
    return this;
  }
  scale(x: number, y = x): Vector2 {
    return this.set(this.x * x, this.y * y);
  }
  negate(): Vector2 {
    return this.scale(-1);
  }
  distance({ x, y }: IVector2): number {
    const dx = x - this.x;
    const dy = y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  normal(): Vector2 {
    return new Vector2(-this.uy, this.ux);
  }
  recalc(): Vector2 {
    if (this.isDirty) {
      const lengthSquared = this.x * this.x + this.y * this.y;
      this._length = Math.sqrt(lengthSquared);
      this._ux = this._length ? this.x / this._length : 0;
      this._uy = this._length ? this.y / this._length : 0;
      this.isDirty = false;
    }
    return this;
  }
  angle(): number {
    return Math.atan2(-this.y, this.x);
  }
  rotate(relativeRadians: number): Vector2 {
    const cos = Math.cos(relativeRadians);
    const sin = Math.sin(relativeRadians);

    return this.set(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
  }
  project(src: Vector2): Vector2 {
    const scalar = this.dot(src) / src.dot(src);
    return this.copy(src).scale(scalar);
  }
}

export default Vector2;
