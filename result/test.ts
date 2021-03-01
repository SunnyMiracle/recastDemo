import { name } from './index';

const obj = (methods: name) => {
  methods.sayHello('123');
  methods.worker(123, 100);
}


obj({
  sayHello(name): boolean {
    return true;
  },
  worker: (name: string) => false
});
