class Dinglemouse {
    stack = [];
    m = [-1, -1, -1];
  
    checkAtr(id, str) {
      if (this.m[id] !== -1) {
        this.stack[this.m[id]] = str;
      }
      else {
         this.stack.push(str);
         this.m[id] = this.stack.length - 1;
      }
    }
  
    setAge(age) {
        this.checkAtr(0, `I am ${age}.`);
        
        return this;
    }

    setSex(sex) {
        this.checkAtr(1, "I am " + (sex === 'M' ? 'male' : 'female') + '.');
        return this;
    }

    setName(name) {
        this.checkAtr(2, `My name is ${name}.`);
        return this;
    }

    hello() {
          if (!this.stack.length) return 'Hello.';
          return `Hello. ${this.stack.join(" ")}`;  
    }
}