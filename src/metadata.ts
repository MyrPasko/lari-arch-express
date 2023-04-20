import 'reflect-metadata';

function Injectable(key: string): (target: Function) => void {
  return (target: Function): void => {
    Reflect.defineMetadata(key, 1, target);

    const meta = Reflect.getMetadata(key, target);
    console.log(meta);
  };
}

function Inject(key: string): (target: object, propertyKey: string, index: number) => void {
  return (target: object, propertyKey: string, index: number): void => {
    const meta = Reflect.getMetadata(key, target);
  };
}

function Prop(target: Object, name: string): undefined {
  return undefined;
}

@Injectable('C')
export class C {
  @Prop prop: number;
}

// @Injectable("D")
// export class D {
//   @Prop prop: number;
//
//   constructor(@Inject("C") c: C) {}
// }
