let headerPubSubInstance = {
    topics: {},

    subscribe: function(topic, handler) {
        if(!this.topics.topic) {
            this.topics.topic = [];
        }

        this.topics.topic.push(handler);
    },

    publish: function(topic, args) {
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
};
