class Pizza {
    cpnstructor(options) {
        this.dough = options.dough || 'traditional';
    }
}

class PepperonyPizza extends Pizza {
    constructor(options) {
        super(options);
        this.sauce = 'ketchup';
        this.stuffing = 'pepperoni';
    }

}

class CustomPizza extends Pizza {
    constructor(options) {
        super(options);
        this.sauce = options.sauce || 'ketchup';
        this.stuffing = options.stuffing || 'sausage, mushrooms';
    }
}

class SeaFoodPizza extends Pizza {
    constructor(options) {
        super(options);
        this.sauce = 'some_sauce';
        this.stuffing = 'shrimps, fish';
    }
}


const PIZZA_TYPES = {
    PEPPERONI: 'PEPPERONI',
    SEAFOOD: 'SEAFOOD',
    CUSTOM: 'CUSTOM'
};


// simple factory
function PizzaFactory(options) {
    switch(options.type) {
        case PIZZA_TYPES.PEPPERONI:
            return new PepperonyPizza(options);
        case PIZZA_TYPES.SEAFOOD:
            return new SeaFoodPizza(options);
        case PIZZA_TYPES.CUSTOM:
            return new CustomPizza(options);
        default:
            throw new Error('Unknown type of pizza');
    }
}


(function test() {
    let pepperoniPizza = new PizzaFactory({type: PIZZA_TYPES.PEPPERONI});
    console.log(pepperoniPizza instanceof PepperonyPizza);

    let seaFoodPizza = new PizzaFactory({type: PIZZA_TYPES.SEAFOOD});
    console.log(seaFoodPizza instanceof SeaFoodPizza);

    let customPizza = new PizzaFactory({
        type: PIZZA_TYPES.CUSTOM,
        sauce: 'custom sauce',
        dough: 'italians',
        stuffing: 'sausage'
    });
    console.log(customPizza instanceof CustomPizza);
})();
