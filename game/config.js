var LOCAL = "./data"

var CONFIG = {
  requiredFiles: {
    models: LOCAL + "/models.xlsx",
    trees: LOCAL + "/trees.xlsx",
    markers: LOCAL + "/markers.data",
    badges: LOCAL + "/badges.data",
    translations: LOCAL + "/translations.data",
    indicators: LOCAL + "/indicators/indicators.data",
    aeps: LOCAL + "/aeps/aeps.data",
    public_meetings:  LOCAL + "/scenarios_publics.data",
    parameters: LOCAL + "/parameters.data",
    // testScenario: LOCAL + "/scenarios/gildas@succubus.fr/gildas test 2.config"
  },

  translationsFiles: function(chosenLanguage) {
    var files = {}
    if(chosenLanguage !== "en") {
      files.aepsTranslations = LOCAL + "/aeps/aeps_translations_" + chosenLanguage + ".data"
      files.indicatorsTranslations = LOCAL + "/indicators/indicators_translations_" + chosenLanguage + ".data"
    }
    return files
  },

  requiredScripts: [
    LOCAL + "/formulas.js",
    LOCAL + "/rules.js"
  ],

  languages: ["en", "fr", "it", "pl", "fl", "es"],

  vertexConfig: {
    ServerIP: "wss://vertx.succubus.dev",
    ServerPort: 443,

    LocalStorageUserKey: "SEGAE_USER",

    Universe: "Agrocampus",
    App: "Segae"
  }
}
