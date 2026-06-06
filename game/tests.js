
let _START = false;
let test = undefined;

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

    async oneRound(numberOfMoves) {
        const shot = [];
        await asyncForEach(Array(numberOfMoves), (item) => {
            let input = this._DATAS;
            const oneLevel = Object.keys(input)[this.getRandom(0, Object.keys(input).length)];
            input = input[oneLevel];        
            const twoLevel = Object.keys(input)[this.getRandom(0, Object.keys(input).length)];
            input = input[twoLevel];
            const threeLevel = Object.keys(input)[this.getRandom(0, Object.keys(input).length)];                
            if (oneLevel && twoLevel && threeLevel) 
                this.selectGameOption(oneLevel, twoLevel, threeLevel)
                    .then(() => shot.push(`${oneLevel}, ${twoLevel}, ${threeLevel}`))
                    .catch(() => console.log("not done"));
        });
        this._NEXT.click(); 
        const gameOver = this.isEndGame();
        if (gameOver) {
            return {
                partie: this.partie ,
                year: +this._YEAR.innerText.split(" ")[1],
                coups: shot,
                end: gameOver.children[0].innerText,
                score: this._SCORE.innerText,
                indicateurs : this.getScore()
            };
        } else 
            return {
                partie: this.partie,
                year: +this._YEAR.innerText.split(" ")[1],
                coups: shot,
                score: this._SCORE.innerText,
                indicateurs : this.getScore()
            };
    };

    async playAllGames(nb) {
        const game = [];
        await asyncForEach(Array(nb), index => {
            this.oneRound(this._CHANGE).then(tmp => {
                this.addToGames(tmp);
                if(tmp["end"]) this.restartGame();
            });
        });
        return true;        
    }

    async start() {
        let nb = prompt("Nombre de partie", "20");
        if (nb != null) {
            nb = +nb + 1;
            this.playAllGames(nb).then(tmp => {
                console.log(this.games);                
                this.downloadGames();                
            })
        }
    }

    downloadGames() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.games));
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
        console.log("Start ===========>");
        
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
        }).then(() => console.log("Init finished") );  
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
