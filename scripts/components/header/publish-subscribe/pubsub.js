class PubSubSingleton {
    constructor() {
        this.topics = {};

        PubSubSingleton.instance = this;
    }

    subscribe(topic, handler) {
        if(!this.topics.topic) {
            this.topics.topic = [];
        }

        this.topics.topic.push(handler);
    }

    publish(topic, args) {
        if(!this.topics.topic) {
            return false;
        }

        var handlers = this.topics.topic;
        for (let handler of handlers) {
            if(handler) {
                handler(args);
            }
        }

        return true;
    }
}

let headerPubSubInstance = PubSubSingleton.instance ? PubSubSingleton.instance : new PubSubSingleton();
export default headerPubSubInstance;
