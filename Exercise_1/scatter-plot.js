import {DataVis} from "./data-vis.js";
import "https://cdn.plot.ly/plotly-2.16.2.min.js"

class ScatterPlot extends DataVis {
    constructor() {
        super();
    }

    async validateData() {
        let data = await this.dataLoaderFn();

        let areAxisDefined = (data.x !== undefined && data.y !== undefined);
        let isCoordinatesNumberEqual = (data.x?.length === data.y?.length);

        let dataIsValid = areAxisDefined && isCoordinatesNumberEqual;

        if(dataIsValid) {
            this.data = data;
        } else {
            this.displayError(
                'Data format error',
                'data loader function returns data in invalid format'
            );
        }
    }


    analyzeAndVisualizeData() {
        Plotly.newPlot(this.plotSpace, /* JSON object */ {
            "data": [{
                x: this.data.x,
                y: this.data.y,
                type: 'scatter'
            }],

        })
        // this.plotSpace.innerHTML = this.data;
    }
}


window.addEventListener('load', () => {
    window.customElements.define('scatter-plot', ScatterPlot);
})


// Delay func for simulating data loading process
const delay = ms => new Promise(res => setTimeout(res, ms));



window.getValidData = async () => {
    await delay(1000);

    return {
        x: [1999, 2000, 2001, 2002],
        y: [10, 15, 13, 17],
    };
}

window.getInvalidData = async () => {
    await delay(2000);

    return [
        [1,2,3]
    ];
}

window.syncFn = () => {
    return [
        [1,2,3],
        [4,5,6]
    ];
}