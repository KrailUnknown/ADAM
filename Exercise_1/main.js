customElements.define('data-vis', class DataVis extends HTMLElement {
    static get attrNames() {
        return {
            dataLoader: 'dataloader'
        };
    };

    #dataLoaderFn = null;
    #data = null;

    #shadow = null

    constructor() {
        super();
        this.#shadow = this.attachShadow({mode: 'closed'});
    }

    async connectedCallback() {
        this.#connectDataLoaderFunction()
        await this.#validateData()
        this.#printData()
    }

    get dataLoaderAttr() {
        return this.getAttribute(DataVis.attrNames.dataLoader);
    }

    #connectDataLoaderFunction() {
        console.log(this.dataLoaderAttr)
        if(this.dataLoaderAttr === null) {
            throw '"data-vis" element requires "dataLoader" attribute to be set'
        }

        let fn = window[this.dataLoaderAttr];

        if(fn === undefined || fn === null || fn.constructor.name !== 'AsyncFunction') {
            throw 'function does not exist or is not async';
        }

        this.#dataLoaderFn = fn;
    }

    async #validateData(dataToValidate) {
        let data = await this.#dataLoaderFn();

        let dataIsValid = (
            Array.isArray(data) &&
                data.length === 2
        );

        if(dataIsValid) {
            this.#data = data;
        } else {
            throw 'data loader function returns data in invalid format';
        }
    }

    #printData() {
        this.#shadow.innerHTML = this.#data;
    }
});






async function getValidData() {
    return [
        [1,2,3],
        [4,5,6]
    ];
}

async function getInvalidData() {
    return [
        [1,2,3]
    ];
}

function syncFn() {
    return [
        [1,2,3],
        [4,5,6]
    ];
}