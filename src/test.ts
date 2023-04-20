function Logger(): (target: Function) => void {
  console.log('[init logger]');
  return (target: Function): void => {
    console.log('[run logger]');
  };
}
function Component(id: number): (target: Function) => void {
  console.log('init component');
  return (target: Function): void => {
    console.log('[run component]');
    target.prototype.id = id;
  };
}

function Method(target: object, propertyKey: string, propertyDescriptor: PropertyDescriptor): void {
  propertyDescriptor.value = function (newId: number): number {
    return newId * 10;
  };
}

function Prop(target: object, propertyKey: string): void {
  let value: number;

  const getter = (): number => {
    console.log('[GET: ]');
    return value;
  };

  const setter = (newValue: number): void => {
    console.log('[SET: ]');
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}

function Param(target: object, propertyKey: string, index: number): void {
  console.log('[Property, index: ]', propertyKey, index);
}

@Logger()
@Component(1)
export class User {
  @Prop id: number;

  @Method
  updateId(newId: number): number {
    this.id = newId;
    return this.id;
  }
}

const newUser = new User();
console.log('[ID]', newUser.id);
console.log('[UpdatedId: ]', newUser.updateId(10));
