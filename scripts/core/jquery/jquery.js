/*
    Very rough realization of jquery
*/


let $ = function(selector) {
    if(typeof selector === 'string' || typeof selector === 'object') {
        return new CustomJquery(selector);
    } else if(typeof selector === 'function') {
        document.addEventListener("DOMContentLoaded", selector);
    }
}

class CustomJquery {
    constructor(stringElement) {
        if(typeof stringElement === 'string') {
            let elements = this._createElement(stringElement);
            this.nodeList = Array.prototype.slice.call(elements);
        } else if (stringElement instanceof NodeList) {
            this.nodeList = Array.prototype.slice.call(stringElement);
        } else if (stringElement instanceof HTMLElement) {
            this.nodeList = [];
            this.nodeList.push(stringElement);
        }
    }

    _createElement(stringElement) {
        if(stringElement.includes('<')) {
            let div = document.createElement('div');
            div.innerHTML = stringElement;
            return div.childNodes;
        } else {
            return document.querySelectorAll(stringElement);
        }
    }

    empty() {
        while (this.nodeList[0].firstChild) {
            this.nodeList[0].removeChild(this.nodeList[0].firstChild);
        }
    }

    click(handler) {
        this._forEach((element) => {
            element.addEventListener('click', handler);
        })
    }

    find(selector) {
        return $(this.nodeList[0].querySelectorAll(selector));
    }

    append(jqueryElement) {
        this._forEach((element) => {
            element.appendChild(jqueryElement.nodeList[0]);
        });
    }

    _forEach(fn) {
        this.nodeList.forEach(fn);
    }
}
