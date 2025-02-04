function calc(from, to, op) {
    switch (op) {
      case '+': return from + to;
      case '-': return from - to;
      case '*': return from * to;
      case '/': return from / to;
    }
  }
  
  const digits = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
  for (const [name, value] of Object.entries(digits)) {
    Object.defineProperty(Number.prototype, name, {
      get() {
        if (this.latest_num !== undefined && this.latest_op === undefined) {
            return undefined;
        }

        if (this.latest_op !== undefined) {
          this.latest_num = calc(this.latest_num, value, this.latest_op);
          delete this.latest_op;
        } else {
          this.latest_num = value;
        }
        return this;
      },
      configurable: true
    });
  }

  const operators = { plus: '+', minus: '-', times: '*', dividedBy: '/' };
  for (const [name, op] of Object.entries(operators)) {
    Object.defineProperty(Number.prototype, name, {
      get() {
        if (this.latest_op !== undefined) {
            return undefined;
        }

        this.latest_op = op;
        return this;
      },
      configurable: true
    });
  }
  
  Number.prototype.valueOf = function() {
    return this.latest_num !== undefined ? this.latest_num : 0;
  };
var FluentCalculator = Number(0);