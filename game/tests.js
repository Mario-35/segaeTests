
let test = undefined; // global var to know if test is initialised
let _SKORE = undefined; // global var for catch score from segae code
let _HACK = undefined; // global var to expose segae functions
let _AEPS = undefined; //  global var to expose segae aeps values
let _DEBUG = undefined; // set to true for debug

function logError(message) {
    console.error(message);
}
    
async function asyncForEach(array, callback) {
    if (array)
        for (let index = 0; index < array.length; index++) {
            // ATTENTION AWAIT Before callback is important (it send error BUT IS NOT)
            await callback(array[index], index, array);
        }
}

class Test {
    constructor() {
        /* *** ATTRIBUTS *** */
        this.aepsKeys = undefined; // list of games keys
        this.numberOfChange = undefined; // var that indicate maximum of changes in a round
        this.numberOfYear = undefined; // var that indicate maximum of changes in a round
        this.gameNumber = 1; // index number of the game
        this.savedGames = {}; // store games
        this.changeRandom = true;
        // start init
        this.initTests();
        // info for debbuging
        if (_DEBUG) {
            this.head("aepsKeys");
            console.log(this.aepsKeys);
            this.head("_HAKS");
            console.log(_HACK);
        } 
             
    } 

    head(message) {
        console.log(`================ ${message} ================`);
    }

    // Play one round
    async playOneRound(shots) {
        shots = shots || [];
        // if shots empty random it            
        if (shots.length < 1) {
            // max moves for the round
            const max = this.changeRandom === true ? this.getRandom(1, this.numberOfChange) : this.numberOfChange;
            // loop to generate shots
            for (let i = 0; i < max ; i++) {
                // create list key that not in the shots and not already selected
                const keyList = Object.keys(this.aepsKeys).filter(e => !shots.includes(e) && !_HACK.currentSelectedAepIds.includes(e));
                // random shot in list key
                shots.push(keyList[this.getRandom(0, Object.keys(keyList).length)]);
            }                
        }
            
        // return create promise of all shots to execute
        return new Promise((resolve) => {
            const coups = [];
            // loop shots
            shots.forEach(shot => {
                // test if not locked by the rules
                const test = window.applyAvailabilityRules(shot, _HACK.allChosenAepIds, _HACK.currentSelectedAepIds, _HACK.t);                
                if (test && test.available === true) {
                    // select option in segae
                    _HACK.setSelectedAep(this.aepsKeys[shot], shot);
                    // save shot
                    coups.push(shot);
                } else coups.push(shot + " locked");
            });
            // select next year in segae and segae calculate score
            _HACK.goToNextYear();
            // resolve segae generated score
            resolve({
                coups: coups,
                ... _SKORE,
            });
        });
    };   
      
    // Play all rounds
    async playAllRounds(arrayOfShots) {        
        // game finished
        let finished = undefined;
        this.savedGames = {};        
        // loop async rounds
        await asyncForEach(arrayOfShots, shots => {
            // if (!finished) 
                this.playOneRound(shots).then(tmp => {
                    this.addToGames(tmp);                
                    if (_HACK.gameState != "INGAME") {
                        finished = true;
                    }
                });

        });
        
        await this.finisheGame();
    }
    
    // fnished actual game
    async finisheGame() {
        // for testingg continue        
        let finished = undefined;
        await asyncForEach(Array(this.numberOfYear), () => {
            // while not finidhes
            if (!finished) {
                this.nextYear().then(tmp => {
                    this.addToGames(tmp);
                    // Won Or Lost stop the loop
                    if (_HACK.gameState != "INGAME") {
                        finished = true;
                        this.clickOnScreen();
                    }
                });
            }
    });
}

    async nextYear() {            
        return new Promise((resolve) => {
            _HACK.goToNextYear();
            // this.clickOnScreen();
            resolve({
                coups: [],
                ... _SKORE,
            });
        });
    };    
        
        
    async startTest() {
        // const datas =  [["A.6.4"]];
        const datas =  [["C.5.3", "C.6.3", "C.7.3", "C.8.2", "A.2.5"], ["A.7.1", "A.9.3", "A.10.3", "C.4.2", "G.1.2"], ["C.1.2", "C.9.3", "C.10.3"] ];
        // const datas =  [["C.10.1"]];
        await this.playAllRounds(datas).then(tmp => { return tmp; }); 
    }

    // return random number
    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // return all element with class name
    elementsClassName(name) {
        const list = document.getElementsByClassName(name);  
        return list;
    }
    
    clickOnScreen() {
        document.elementFromPoint(1, 1).click();
        return true;
    }

    // close button
    close() {
        const elements = this.elementsClassName("close-button"); 
        if (elements && elements[0]) {
            elements[0].click();
            return true; 
        }
        return false; 
    }
    
    // waiting close
    waitingClose() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.close();
                resolve();
            }, 100);
        });
    }    
    
    // click ang get all elements class
    
    /**
     * 
     * @param {*} element HTML element
     * @param {*} name class name to search 
     * @param {*} closeBefore boolean
     * @returns 
    */
   clickAndElementsClassName(element, name, closeBefore) {
       if(closeBefore) this.close();
       return new Promise((resolve) => {
           setTimeout(() => {
               element.click(); 
               resolve(this.elementsClassName(name));
            }, this._WAIT);
        });
    }
    
    /**
     * 
     * @param {*} name of the button 
     * @returns true if found
    */
   clickOnButton(name) {
       for (let element of this.elementsClassName("label")) { 
           if (element.innerHTML === name) {
               element.click();
               return true;
            }
        }
        return false;
    }
    
    addToGames(input) {
        const name = "partie " + this.gameNumber ;

        if( this.savedGames[name])
            this.savedGames[name].push(input);
        else 
            this.savedGames[name] = [input];
    }     
    
    
    async playAllGames(max) {
        this.savedGames = {};

        for (this.gameNumber  = 1; this.gameNumber <= max; this.gameNumber++) {
            while (_HACK.gameState == "INGAME") {
                await this.playOneRound().then(tmp => {
                    this.addToGames(tmp);
                });                
            }
            _HACK.restartGame();
            this.clickOnScreen();            
        }
        return true;        
    }
    
    // start test
    async start() {
        let nb = prompt("Nombre de partie , mouvements", "5");       
        
        if (nb != null) {
            if (nb.includes(',')) {
                this.numberOfChange = +nb.split(',')[1];
                this.changeRandom = false;

                nb = +nb.split(',')[0];
            }
            if (+nb === 0) {
                this.startTest().then(tmp => {
                    this.downloadGames();                
                });
            } else {
                this.playAllGames(+nb).then(tmp => {
                    this.downloadGames();                
                });
            }
        }
    }

    // download games file
    downloadGames() {
        if (_DEBUG) {
            console.log(this.savedGames);
            return;
        }
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.savedGames));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "resultats.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
    
    /**
     * Create list object
    */
   initTests() { 
        this.aepsKeys = {};
        if (_HACK.scenario.goals[5].group === "duration")
            this.numberOfYear = +_HACK.scenario.goals[5].value;
        else
            this.numberOfYear = 10;
            
        this.numberOfChange = +this.elementsClassName("remaining-changes-value")[0].innerText;

       if (_AEPS) {
            Object.values(_AEPS.categs).forEach(value => {
                    Object.values(value.aeps).forEach(aep => {                    
                            if (aep.category && value.name) 
                                this.aepsKeys[aep.id] = aep.category;
                });
            });
            return;
        } else 
        this.aepsKeys = { "C.1.1": "tillage_management", "C.1.2": "tillage_management", "C.1.3": "tillage_management", "C.2.1": "soil_cover", "C.2.2": "soil_cover", "C.2.3": "soil_cover", "C.3.1": "residues_management", "C.3.2": "residues_management", "C.4.1": "fertilisation", "C.4.2": "fertilisation", "C.5.1": "crop_protection_against_diseases", "C.5.2": "crop_protection_against_diseases", "C.5.3": "crop_protection_against_diseases", "C.5.4": "crop_protection_against_diseases", "C.6.1": "weed_control", "C.6.2": "weed_control", "C.6.3": "weed_control", "C.7.1": "crop_protection_against_animal_pests", "C.7.2": "crop_protection_against_animal_pests", "C.7.3": "crop_protection_against_animal_pests", "C.7.4": "crop_protection_against_animal_pests", "C.8.1": "cash_crop_cultivars", "C.8.2": "cash_crop_cultivars", "C.9.1": "temporary_grassland_composition", "C.9.2": "temporary_grassland_composition", "C.9.3": "temporary_grassland_composition", "C.10.1": "permanent_grassland_area", "C.10.2": "permanent_grassland_area", "C.10.3": "permanent_grassland_area", "C.11.1": "spatial_distribution_of_cash_crops", "C.11.2": "spatial_distribution_of_cash_crops", "C.12.1": "cropping_system_1", "C.12.2": "cropping_system_1", "C.12.3": "cropping_system_1", "C.12.4": "cropping_system_1", "C.12.5": "cropping_system_1", "C.12.6": "cropping_system_1", "C.12.7": "cropping_system_1", "C.12.8": "cropping_system_1", "C.12.9": "cropping_system_1", "C.13.1": "cropping_system_2", "C.13.2": "cropping_system_2", "C.13.3": "cropping_system_2", "C.13.4": "cropping_system_2", "C.13.5": "cropping_system_2", "C.13.6": "cropping_system_2", "C.13.7": "cropping_system_2", "C.13.8": "cropping_system_2", "C.13.9": "cropping_system_2", "C.14.1": "green_infrastructures", "C.14.2": "green_infrastructures", "C.14.3": "green_infrastructures", "C.14.4": "green_infrastructures", "C.14.5": "green_infrastructures", "C.15.1": "agroforestry", "C.15.2": "agroforestry", "E.1.1": "distribution_of_farm_profit", "E.1.2": "distribution_of_farm_profit", "E.1.3": "distribution_of_farm_profit", "G.1.1": "type_of_agriculture", "G.1.2": "type_of_agriculture", "A.1.1": "cattle_breed", "A.1.2": "cattle_breed", "A.1.3": "cattle_breed", "A.2.1": "herd_size", "A.2.2": "herd_size", "A.2.3": "herd_size", "A.2.4": "herd_size", "A.2.5": "herd_size", "A.2.6": "herd_size", "A.3.1": "male_management", "A.3.2": "male_management", "A.3.3": "male_management", "A.4.1": "cow_housing_system", "A.4.2": "cow_housing_system", "A.4.3": "cow_housing_system", "A.4.4": "cow_housing_system", "A.4.5": "cow_housing_system", "A.5.1": "heifers_bulls_and_steers_housing_system", "A.5.2": "heifers_bulls_and_steers_housing_system", "A.5.3": "heifers_bulls_and_steers_housing_system", "A.6.1": "feeding_system_for_cows", "A.6.2": "feeding_system_for_cows", "A.6.3": "feeding_system_for_cows", "A.6.4": "feeding_system_for_cows", "A.6.5": "feeding_system_for_cows", "A.6.6": "feeding_system_for_cows", "A.6.7": "feeding_system_for_cows", "A.6.8": "feeding_system_for_cows", "A.6.9": "feeding_system_for_cows", "A.6.10": "feeding_system_for_cows", "A.6.11": "feeding_system_for_cows", "A.7.1": "concentrate_supply_for_lactating_dairy_cows", "A.7.2": "concentrate_supply_for_lactating_dairy_cows", "A.7.3": "concentrate_supply_for_lactating_dairy_cows", "A.7.4": "concentrate_supply_for_lactating_dairy_cows", "A.8.1": "feeding_system_for_heifers_age_at_first_calving", "A.8.2": "feeding_system_for_heifers_age_at_first_calving", "A.8.3": "feeding_system_for_heifers_age_at_first_calving", "A.8.4": "feeding_system_for_heifers_age_at_first_calving", "A.8.5": "feeding_system_for_heifers_age_at_first_calving", "A.8.6": "feeding_system_for_heifers_age_at_first_calving", "A.8.7": "feeding_system_for_heifers_age_at_first_calving", "A.8.8": "feeding_system_for_heifers_age_at_first_calving", "A.9.1": "management_of_the_risk_of_mastitis_at_the_dry_period", "A.9.2": "management_of_the_risk_of_mastitis_at_the_dry_period", "A.9.3": "management_of_the_risk_of_mastitis_at_the_dry_period", "A.10.1": "anti_parasitic_management", "A.10.2": "anti_parasitic_management", "A.10.3": "anti_parasitic_management", "A.11.1": "feeding_system_for_calves", "A.11.2": "feeding_system_for_calves" }
}
}

// create interval to catch year when it detect
const interval = setInterval(() => {
    const elements = document.getElementsByClassName("label");
    for (let element of elements) { 
        // get year item
        if (element.innerHTML.startsWith("Year")) {
            // init tests
            if (!test) test = new Test();
            element.addEventListener("click", function() {
                // on click start tests
                test.start();
            }); 
            // delete interval
            clearInterval(interval);
        }
    }
}, 100);


function _test(imput, G, j) {
    var z = [];
    var x = {};
    imput.scenario.Scores.forEach(function(e) {
        var n = G.getIndicatorValue(e.id, !0);
        void 0 !== n && (z[e.name] = n);
    });
    
    
    
    _SKORE = {
        ...z, 
        "indicators" : G.getIndicatorValue,
    };
    if (j && j.length > 0) {
        const a = {}
        j.forEach(e => {
            a[e.name] = e.message
        })
        _SKORE["aleas"] = a;
    }
    
}


 