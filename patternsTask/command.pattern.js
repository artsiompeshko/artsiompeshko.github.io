class PizzaStore {
    constructor() {

    }

    has(pizzaName) {
        return true;
    }

    get(pizzaName) {
        return 'Some pizza';
    };
}

class Pizzeria {
    constructor(pizzaStore) {
        this.pizzaStore = pizzaStore;
    }

    createPizza(pizzaName) {
        return this.pizzaStore.get(pizzaName);
    }
}

let pizzaStore = new PizzaStore();
let pizzeria = new Pizzeria(pizzaStore);

let pizzaManager = {
    requestInfo: (pizzaName) => pizzaStore.has(pizzaName) ? 'Pizza ' + pizzaName + ' is available in our pizzeria!' : 'Pizza ' + pizzaName + ' is not available in our pizzeria!',

    buyPizza: (pizzaName) => {
        pizzeria.createPizza(pizzaName);
        return "Successfully purchased! Bon appetit!";
    }
};

pizzaManager.execute = (command, pizzaName) => pizzaManager[command](pizzaName);

(function test() {
    console.log(pizzaManager.execute('requestInfo', 'pepperoni'));
    console.log(pizzaManager.execute('buyPizza', 'pepperoni'));
})();
