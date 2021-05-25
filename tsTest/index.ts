interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
  return {
    swim() {
    },
    layEggs() {
    }
  }
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

function isString(x: string | number): x is string {
  return typeof x === 'string';
}

const a = getSmallPet() as Bird;

type Ant<T> = {
  [key in keyof T]: string | Promise<T[key]>
}
