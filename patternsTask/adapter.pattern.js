class Entity {
    constructor(options) {
        this.name = options.name || 'unknown';
    }
}

class Person extends Entity {
    constructor(options) {
        super(options);
    }

    say() {
        return 'Hello, my name is ' + this.name;
    }
}

class Dog extends Entity {
    constructor(options) {
        super(options);
    }

    voice() {
        return 'Waf, waf, waf ' + this.name;
    }
}

class Cat extends Entity {
    constructor(options) {
        super(options);
    }

    meow() {
        return 'Meow, meow, meow ' + this.name;
    }
}

/**
    It should be an interface for languages like JAVA
*/
class CatGreetingAdapter {
    constructor(cat) {
        this.cat = cat;
    }

    greeting() {
        return this.cat.meow();
    }
}

class PersonGreetingAdapter {
    constructor(person) {
        this.person = person;
    }

    greeting() {
        return this.person.say();
    }
}

class DogGreetingAdapter {
    constructor(dog) {
        this.dog = dog;
    }

    greeting() {
        return this.dog.voice();
    }
}


(function test() {
    let greetings = [
        new DogGreetingAdapter(new Dog({name: 'Alivia'})),
        new CatGreetingAdapter(new Cat({name: 'Tima'})),
        new PersonGreetingAdapter(new Person({name: 'Jack'}))
    ];

    greetings.forEach((entity) => console.log(entity.greeting()));
})();
