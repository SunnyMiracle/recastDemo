
global.this = '122222'
const a = {
  name: '123',
  sayName: function () {
    console.log(this, this.name);
  },
  say: () => {
    console.log(this, this.name);
  }
}

a.sayName()
a.say();
