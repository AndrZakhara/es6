class gasTank {
    constructor(tankCapacity, gasCapacity){
      this.capacity = tankCapacity;
      this.gas = gasCapacity;
    }

    increment() {
        this.gas = this.gas >= this.capacity ? this.gas += 1 : this.gas = 50;
    }
    
    decrement() {
        this.gas = this.gas <= 0 ? this.gas = 0 : this.gas -= 1;
    }

    [Symbol.toPrimitive](hint){
      switch (hint) {
        case 'string':
          return `Tank capacity: ${this.capacity} liters. Current gas: ${this.gas}.`;
  
        case 'number':
          return this.gas;
  
        default:          
          return this.gas > 0 ? true : false;
      }
    }
  }  
  
  let suzukiAerioTank = new gasTank(50, 35);
  
  console.table(suzukiAerioTank);
  console.log(String(suzukiAerioTank));  
  console.log(!suzukiAerioTank);
  console.log(+suzukiAerioTank);
  console.log(suzukiAerioTank > 10);