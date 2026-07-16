
let _START = false;
let test = undefined;
let _SKORE = []

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
        this._DATAS = undefined;
        this._NEXT = undefined;
        this._YEAR = undefined;
        this._SCORE = undefined;
        this._CHANGE = undefined;        
        
        this._START = true;
        this.wait = 100;
        this.partie = 1;
        this.games = {};

        // alert("START TESTS");
        this.initTests();
        console.log(this._DATAS );
        
        
    } 

    getFormOption(input) {
        for (var title in this._DATAS ) {          
            // console.log(title);
            for (var subTitle in this._DATAS[title] ) {          
                // console.log(subTitle);
                for (var option in this._DATAS[title][subTitle] ) {          
                    if (this._DATAS[title][subTitle][option] === input) {
                        return [title, subTitle, option]
                    }
                } 
            } 
            
        } 
    }

    async playOneRound(input) {
        const shots = [];
        input.forEach(element => {
            console.log(element);
            
            const temp = this.getFormOption(element);
            if (temp) {
                this.selectGameOption(...temp)
                    .then(() => shots.push(temp.join()))
                    .catch(() => console.log("not done"));
            }
            console.log(temp);
            
        });
        this._NEXT.click(); 
        const gameOver = this.isEndGame();
        if (gameOver) {
            return {
                partie: this.partie ,
                year: +this._YEAR.innerText.split(" ")[1],
                coups: shots,
                end: gameOver.children[0].innerText,
                score: this._SCORE.innerText,
                indicateurs : this.getScore()
            };
        } else 
            return {
                partie: this.partie,
                year: +this._YEAR.innerText.split(" ")[1],
                coups: shots,
                score: this._SCORE.innerText,
                indicateurs : this.getScore()
            };
    }

    async startTest() {
        const game = [];
        // Year 1 : C.5.3 / C.6.3 / C.7.3 / C.8.2 / A.2.5
        // Year 2 : A.7.1 / A.9.3 / A.10.3 / C.4.2 / G.1.2
        // Year 3 : C.1.2 / C.9.3 / C.10.3
        this.playOneRound(["C.5.3", "C.6.3", "C.7.3", "C.8.2", "A.2.5"]).then(tmp => {
                this.addToGames(tmp);
                if(tmp["end"]) this.restartGame();
            });
        this.playOneRound(["A.7.1", "A.9.3", "A.10.3", "C.4.2", "G.1.2"]).then(tmp => {
                this.addToGames(tmp);
                if(tmp["end"]) this.restartGame();
            });
        this.playOneRound(["C.1.2", "C.9.3", "C.10.3"]).then(tmp => {
                this.addToGames(tmp);
                if(tmp["end"]) this.restartGame();
            });
        return true; 
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
            }, this._WAIT);
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
     * test if End game
     * 
     * @returns popup content
     */
    isEndGame() { 
        const elements = this.elementsClassName("GameOverPopup-top"); 
        if (elements && elements[0]) 
            return elements[0];
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

    restartGame() {
        this.clickOnButton("Restart the game");
        this.partie = this.partie + 1;
        let elements = document.getElementsByTagName("button");
        for (let element of elements) {
            if (element.innerText.toLowerCase() === "yes") {
                element.click();
                return true;
            }
        }
        return false;
    }
       
    dataInfos(title, subTitle, option) {
        if (title && subTitle && option) 
            return this._DATAS[title][subTitle][option];
    } 

    addToGames(input) {
        const name = "partie "+ input.partie;
        delete input.partie;
        
        if( this.games[name])
            this.games[name].push(input);
        else 
            this.games[name] = [input];
    }  
    
    /**
     * 
     * @param {*} shots historical shot
     * @returns array of 3 shot 
     */
    randomShot(shots) {
        let result = [];
        do { // repeat
            let input = this._DATAS;
            result = [];
            for (let i = 1; i < 4; i++) {
                const key = Object.keys(input)[this.getRandom(0, Object.keys(input).length)];
                result.push(key);
                input = input[key];
            }            
        // while the first item are not played and the threeLevel exist                
        } while (shots.includes(`${result[0]},${result[1]}`) || !result[2]);
        return result;
    }
    
    async oneRound(numberOfMoves) {
        const shots = [];
        await asyncForEach(Array(numberOfMoves), (item) => {
            const shot = this.randomShot(shots);
            this.selectGameOption(...shot)
                .then(() => shots.push(shot.join()))
                .catch(() => console.log("not done"));
        });

        this._NEXT.click(); 
    };

    async playAllGames(nb) {
        await asyncForEach(Array(nb), index => {
            this.oneRound(this.getRandom(1, this._CHANGE)).then(tmp => {
                if (+_SKORE[_SKORE.length - 1]["Game won"] != 0) this.restartGame();
            });
        });
        return true;        
    }

    async start() {
        let nb = prompt("Nombre de partie", "20");       
        
        if (nb != null) {
            if (+nb === 0) {
                this.startTest().then(tmp => {
                    console.log(this.games);                
                    this.downloadGames();                
                });
            } else {               
                nb = +nb + 1;
                this.playAllGames(nb).then(tmp => {               
                    this.downloadGames();                
                });
            }
        }
    }

    downloadGames() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(_SKORE));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "resultats.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    async selectGameOption(title, subTitle, option) {        
        this.clickAndElementsClassName(document.getElementById(title), "tab", true).then((tabsElements) => {                
            for (let tabElement of tabsElements) {
                if (tabElement.innerText === subTitle) {
                    this.clickAndElementsClassName(tabElement, 'aep').then((aepsElements) => {
                        option = this._DATAS[title][subTitle][option];
                        for (let aepElement of aepsElements) {
                            if (aepElement.children[0].title == option) {
                                if (aepElement.children[2] && aepElement.children[2].classList.contains("lock")) {
                                    this.close();
                                    return false;
                                } else {
                                    aepElement.children[0].click();                                        
                                    this.close();
                                    return true;
                                }
                            }
                        }
                    }).catch(() => logError("Error aepElements"));
                }
            }
        }).catch(() => logError("Error tabsElements"));
    }

    getScore() {
        const scores = {};
        
        for (let element of this.elementsClassName("toggle-children")) { 
            element.click();                
        }
        
        for (let element of this.elementsClassName("ind-content")) { 
            scores[element.children[0].innerText] = element.children[1].innerText;                
        }

        this.clickOnScreen();

        return scores;
    } 

    /**
     * Create _DATAS list object
     */
    initTests() { 
        const titles = []; 
        this._DATAS = {};

        for (let element of this.elementsClassName("label")) { 
            if (element.innerHTML === "Next year")
                this._NEXT = element;
            if (element.innerHTML.startsWith("Year"))
                this._YEAR = element;
        }

        this._SCORE = this.elementsClassName("profile")[0];

        this._CHANGE = +this.elementsClassName("remaining-changes-value")[0].innerText;

       // get all titles and put id on element       
       for (let element of this.elementsClassName("marker-title")) {
           titles.push(element.innerText);
           element.id = element.innerText;
       }
       
        asyncForEach(titles, (title) => {
            // get element
            const titleElement = document.getElementById(title);  
            if (titleElement) {
                // get alls tab class
                this.clickAndElementsClassName(titleElement, "tab", true).then((tabsElements) => {                    
                        // create blank object
                        const tmp = {}   
                        for (let tabElement of tabsElements) {
                            // create blank array
                            const tmpArray = {};
                            //  get all aep class
                            tabElement.click();
                            const aepsElements = document.getElementsByClassName("aep"); 
                            for (let aepElement of aepsElements) {
                                tmpArray[aepElement.children[0].innerText] = aepElement.children[0].title;
                            }
                            tmp[tabElement.innerText] = tmpArray;                            
                        }
                        this._DATAS[title] = tmp;
                    },
                )   
            } else this.logError(title + " Not found");
            this.waitingClose().then(() => {});  
        }).then(() => console.log("Init finished"));  
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


function _test(imput, G) {
    console.log("#############");
    
    var z = [];
    var x = {};
    imput.scenario.Scores.forEach(function(e) {
        var n = G.getIndicatorValue(e.id, !0);
        void 0 !== n && (z[e.name] = n);
    });
console.log(G);
// console.log({...z, "indicators" : G.indicatorsRoundedValues});

    _SKORE.push({...z, "indicators" : G.indicatorsRoundedValues});
}