
let test = undefined; // global var to know if test is initialised
let _SKORE = undefined; // global var for catch score from segae code
let _HACK = undefined; // global var to expose segae functions
let _DEBUG = undefined; // set to true for debug
let _INDICATORS = undefined; // set to true for debug

const _AEPS =  {}; // sore aeps keys and category 

function logError(message) {
    console.error(message);
}

class Test {
    constructor() {
        /* *** ATTRIBUTS *** */        
        this.numberOfGame = undefined; // number of game
        this.numberOfChange = undefined; // var that indicate maximum of changes in a round
        this.numberOfYear = undefined; // var that indicate maximum of changes in a round
        this.gameNumber = 1; // index number of the game
        this.savedGames = {}; // store games
        this.changeRandom = true; // indicate the number of change is randomize or fixed

        // start init
        this.initTests();
        // info for debbuging
        if (_DEBUG) {
            this.head("_HAKS");
            console.log(_HACK);
        } 
             
    } 

    head(message) {
        console.log(`================ ${message} ================`);
    }

    log(message) {
        if (_DEBUG) console.log(message);
    }

    async asyncForEach(array, callback) {
    if (array)
        for (let index = 0; index < array.length; index++) {
            // ATTENTION AWAIT Before callback is important (it send error BUT IS NOT)
            await callback(array[index], index, array);
        }
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
                const keyList = Object.keys(_AEPS).filter(e => !shots.includes(e) && !_HACK.currentSelectedAepIds.includes(e));
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
                    _HACK.setSelectedAep(_AEPS[shot], shot);
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
        await this.asyncForEach(arrayOfShots, shots => {
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
        await this.asyncForEach(Array(this.numberOfYear), () => {
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

    // next year for finished game
    async nextYear() {            
        return new Promise((resolve) => {
            _HACK.goToNextYear();
            resolve({
                coups: [],
                ... _SKORE,
            });
        });
    };    
     
    // test for a win game
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
    
    // click on the screen without wait
    clickOnScreen() {
        document.elementFromPoint(1, 1).click();
        return true;
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

    showForm() {
        const newDiv = document.createElement("div");
        newDiv.class = 'overlay';
        newDiv.setAttribute("id", "testOverlay");
        newDiv.innerHTML = `<div class="TreePopup">
            <div class="TreePopup-title">Tests <div class="TreePopup-close"></div>
            </div>
            <div class="TreePopup-content">
                <form>
                    <label for="nbPartie">Nombre de partie:</label><br>
                    <input type="text" id="nbPartie" name="nbPartie" value="20"><br>
                    <input type="checkbox" id="aleatoireChangement" name="aleatoireChangement" checked>
                    <label for="aleatoireChangement"> Changement aléatoire</label>
                    <br>
                    <label for="nbChangement">Nombre de changement:</label><br>
                    <input type="text" id="nbChangement" name="nbChangement" value="${+this.elementsClassName("remaining-changes-value")[0].innerText}">
                    <br>
                    <input type="checkbox" id="indicators" name="indicators">
                    <label for="indicators"> Indicateurs</label>

                    <input type="checkbox" id="debug" name="debug">
                    <label for="debug"> Mode debug</label>
                    <br>
                    <input type="button" id="goTest" value="Lancer les tests">
                </form>
            </div>
        </div>`;
        document.getElementById("game").appendChild(newDiv);
        goTest.addEventListener("click", () => {
            this.numberOfGame = nbPartie.value;
            this.numberOfChange = nbChangement.value;
            this.changeRandom = aleatoireChangement.checked;
            if (debug.checked) _DEBUG = debug.checked;
            if (indicators.checked) _INDICATORS = true;
            
            document.getElementById("testOverlay").remove();
            if (this.numberOfGame) {
                if (+this.numberOfGame === 0) {
                    this.startTest().then(tmp => {
                        this.downloadGames();                
                    });
                } else {
                    this.playAllGames(+this.numberOfGame).then(tmp => {
                        this.downloadGames();                
                    });
                }
            }
        });
    }
    
    // start test
    async start() {
        // let nb = prompt("Nombre de partie , mouvements", "5");       
        this.showForm();
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
        if (_HACK.scenario.goals[5].group === "duration")
            this.numberOfYear = +_HACK.scenario.goals[5].value;
        else
            this.numberOfYear = 10;
    }
}


// function catch score when sendScores segae is executed
function _test(imput, G, j) {
    _SKORE = [];
    imput.scenario.Scores.forEach(function(e) {
        var n = G.getIndicatorValue(e.id, !0);
        void 0 !== n && (_SKORE[e.name] = n);
    });
    
    if(_INDICATORS) _SKORE["indicators"] = G.indicatorsRoundedValues;

    // get aleas
    if (j && j.length > 0) {
        const a = {}
        j.forEach(e => {
            a[e.name] = e.message
        })
        _SKORE["aleas"] = a;
    }
    
}

// load file
fetch('./data/aeps/aeps.data')
    .then(function(response) { return response.json(); })
    .then(function(json) {
        // loop in data json to create _AEPS
        Object.values(json.data).forEach(aep => {
            // exclude null category
            if (aep.category) 
                _AEPS[aep.id] = aep.category;
            
        });
        // show results
        if (_DEBUG) {
            console.log(`================ AEPS ================`);
            console.log(_AEPS);
        }
    });

// create interval to catch year when it detect
const interval = setInterval(() => {
    const elements = document.getElementsByClassName("label");
    for (let element of elements) { 
        // get year item
        if (element.innerHTML.startsWith(_HACK.t("year") )) {
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

console.log("test v1.0 du 20/08/2026 @ADAM Mario");
