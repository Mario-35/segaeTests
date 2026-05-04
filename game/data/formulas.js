/////////////////////////////////////////////////////////////////////////////////////////////////

// helper functions, used for many indicators

// if no registerFormula for an indicator, function MULT will be used

/////////////////////////////////////////////////////////////////////////////////////////////////



window.formulas = {} // we save formulas in global variable so we can edit them without recompiling



function registerFormula(id, formulaFunc, dependencies) {

  if(formulas[id] === undefined) {

    formulas[id] = {func: formulaFunc, deps: dependencies}

  } else {

    console.log('Double définition de formule pour ', id)

  }

}



function MULT(val, factors) { // default for every indicator

  let v = val

  for(var i in factors) { // loop over factors

    var f = factors[i] // get factor

    v = v * f // multiply current factor to value and reassign result to value

  }

  return v

}



function SUM(val, factors) {

  let v = val

  for(var i in factors) { // loop over factors

    var f = factors[i] // get factor

    v = v + f // ADD current factor to value

  }

  return v

}

//get indicator

function i(indicatorsValues, id) {

  let val = indicatorsValues[id]

  if(val === undefined) console.warn("Error indicator value for", id, "not found")

  return val

}



function FactorsContain(factors, AEP_id) {

  if(!factors) return false

  return (Object.keys(factors).indexOf(AEP_id) != -1)

}



function AepSelected(selectedAeps, aepId) {

  return selectedAeps.indexOf(aepId) > -1

}



function UAA1_Areas(def_val, factors, parameters, indicatorsValues) {

  var val = MULT(def_val, factors)

  return val * i(indicatorsValues, "indCr237")

}



function UAA2_Areas(def_val, factors, parameters, indicatorsValues) {

  var val = MULT(def_val, factors)

  return val * i(indicatorsValues, "indCr238")

}


function specialMultA7(def_val, factors) {

  let a7Factors = {}

  let noA7Factors = {}

  for (var i in factors) {

    if (i.indexOf("A.7") > -1) {

      a7Factors[i] = 0

    } else {

      noA7Factors[i] = factors[i]

    }

  }

  return MULT(def_val, noA7Factors) + SUM(0, a7Factors)

}


function MultExcludeA7SumA7(def_val, factors) {

  let a7Factors = {}

  let noA7Factors = {}

  for (var i in factors) {

    if (i.indexOf("A.7") > -1) {

      a7Factors[i] = factors[i]

    } else {

      noA7Factors[i] = factors[i]

    }

  }

  return MULT(def_val, noA7Factors) + SUM(0, a7Factors)

}



function MultExcludeA6AndA8(def_val, factors) {

  let filteredFactors = {}

  for (var i in factors) {

    if (i.indexOf("A.6") === -1 && i.indexOf("A.8") === -1) {

      filteredFactors[i] = factors[i]

    }

  }

  return MULT(def_val, filteredFactors)

}



function MultExcludeC91C92C93(def_val, factors) {

  var v = def_val

  for(var i in factors) { // loop over factors

    if(i !== "C.9.1" && i !== "C.9.2" && i!= "C.9.3") {

      var f = factors[i] // get factor

      v = v * f // multiply current factor to value and reassign result to value

    }

  }

  return v

}



function SumExcludeC91C92C93(def_val, factors) {

  var v = def_val

  for(var i in factors) { // loop over factors

    if(i !== "C.9.1" && i !== "C.9.2" && i!= "C.9.3") {

      var f = factors[i] // get factor

      v = v + f // sum current factor to value and reassign result to value

    }

  }

  return v

}



function MultExcludeC111C112(def_val, factors) {

  var v = def_val

  for(var i in factors) { // loop over factors

    if(i !== "C.11.1" && i!= "C.11.2") {

      var f = factors[i] // get factor

      v = v * f // multiply current factor to value and reassign result to value

    }

  }

  return v

}



function MultExcludeC91C92C93C111C112(def_val, factors) {

  var v = def_val

  for(var i in factors) { // loop over factors

    if(i !== "C.9.1" && i !== "C.9.2" && i!= "C.9.3" && i !== "C.11.1" && i!= "C.11.2") {

      var f = factors[i] // get factor

      v = v * f // multiply current factor to value and reassign result to value

    }

  }

  return v

}



function SumExcludeC111C112(def_val, factors) {

  var v = def_val

  for(var i in factors) { // loop over factors

    if(i !== "C.11.1" && i !== "C.11.2") {

      var f = factors[i] // get factor

      v = v + f // sum current factor to value and reassign result to value

    }

  }

  return v

}



function SumExcludeC91C92C93C111C112(def_val, factors) {

  var v = def_val

  for(var i in factors) { // loop over factors

    if(i !== "C.9.1" && i !== "C.9.2" && i!= "C.9.3" && i !== "C.11.1" && i !== "C.11.2") {

      var f = factors[i] // get factor

      v = v + f // sum current factor to value and reassign result to value

    }

  }

  return v

}



function SumX134(def_val, factors, otherValue) {

  return SUM(def_val, factors) + ( 1.34 + otherValue )

}



function Ind139To151 (indicatorsValues, ids) {

  return (

    i(indicatorsValues, ids[0]) * i(indicatorsValues, ids[1])

    + i(indicatorsValues, ids[2]) * i(indicatorsValues, ids[3])

    + i(indicatorsValues, ids[4]) * (i(indicatorsValues, ids[5]) + i(indicatorsValues, ids[6]))

    )

}



function indXindCr265(indicatorsValues, indId) {

  return i(indicatorsValues, indId) *  i(indicatorsValues, "indCr265")

}



function SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, indId) {

  let v = def_val

  for(var j in factors) { // loop over factors

    var f = factors[j] // get factor

    v = v + f // ADD current factor to value

  }

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"][indId] === void 0)) v -= factors["C.4.1"]
    if(!(allFactors["C.4.2"][indId] === void 0)) v += allFactors["C.4.2"][indId]

  }

  return v

}
///////////////////////////////////////////////////////////////////////////////////////////////////////

// formulas registrations

///////////////////////////////////////////////////////////////////////////////////////////////////////



// model CROP type 1 (begin) //////////////////////////////////////////////////////////////////////////

registerFormula("indCr19.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr20.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr21.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr22.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr23.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr24.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr24_def x PI(factors) = 1, indCr24.UAA1 = indCr19.UAA1, 0)

  if (MULT(def_val, factors) == 1) {

    return i(indicatorsValues, "indCr19.UAA1")

  } else {

    return 0

  }

}, ["indCr19.UAA1"]);

registerFormula("indCr25.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr26.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr27.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr28.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr29.UAA1", UAA1_Areas, ["indCr237"]);

registerFormula("indCr19.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr20.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr21.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr22.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr23.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr24.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr24_def x PI(factors) = 1, indCr24.UAA2 = indCr19.UAA2, 0)

  if (MULT(def_val, factors) == 1) {

    return i(indicatorsValues, "indCr19.UAA2")

  } else {

    return 0

  }

}, ["indCr19.UAA2"]);

registerFormula("indCr25.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr26.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr27.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr28.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr29.UAA2", UAA2_Areas, ["indCr238"]);

registerFormula("indCr31.UAA1", SUM);

registerFormula("indCr32.UAA1", SUM);

registerFormula("indCr33.UAA1", SUM);

registerFormula("indCr34.UAA1", SUM);

registerFormula("indCr35.UAA1", SUM);

registerFormula("indCr38.UAA1", SUM);

registerFormula("indCr40.UAA1", SUM);

registerFormula("indCr41.UAA1", SUM);

registerFormula("indCr31.UAA2", SUM);

registerFormula("indCr32.UAA2", SUM);

registerFormula("indCr33.UAA2", SUM);

registerFormula("indCr34.UAA2", SUM);

registerFormula("indCr35.UAA2", SUM);

registerFormula("indCr38.UAA2", SUM);

registerFormula("indCr40.UAA2", SUM);

registerFormula("indCr41.UAA2", SUM);

registerFormula("indCr42", SUM);

registerFormula("indCr43.UAA1", SUM);

registerFormula("indCr44.UAA1", SUM);

registerFormula("indCr45.UAA1", SUM);

registerFormula("indCr46.UAA1", SUM);

registerFormula("indCr47.UAA1", SUM);

registerFormula("indCr48.UAA1", SUM);

registerFormula("indCr49.UAA1", SUM);

registerFormula("indCr50.UAA1", SUM);

registerFormula("indCr51.UAA1", SUM);

registerFormula("indCr52.UAA1", SUM);

registerFormula("indCr53.UAA1", SUM);

registerFormula("indCr43.UAA2", SUM);

registerFormula("indCr44.UAA2", SUM);

registerFormula("indCr45.UAA2", SUM);

registerFormula("indCr46.UAA2", SUM);

registerFormula("indCr47.UAA2", SUM);

registerFormula("indCr48.UAA2", SUM);

registerFormula("indCr49.UAA2", SUM);

registerFormula("indCr50.UAA2", SUM);

registerFormula("indCr51.UAA2", SUM);

registerFormula("indCr52.UAA2", SUM);

registerFormula("indCr53.UAA2", SUM);

registerFormula("indCr54", SUM);

// model CROP type 1 (end) ////////////////////////////////////////////////////////////////////////////



// model CROP type 2 (begin) //////////////////////////////////////////////////////////////////////////

registerFormula("indCr237", function(def_val, factors, parameters, indicatorsValues) {

  // =paramF1_def × (1 - indCr30 / 100) × paramF2_def / 100

  return parameters.getDef("paramF1") * (1 - i(indicatorsValues, "indCr30") / 100) * parameters.getDef("paramF2") / 100

}, ["indCr30"]);



registerFormula("indCr238", function(def_val, factors, parameters, indicatorsValues) {

  // =paramF1_def - indCr239 - indCr237

  return parameters.getDef("paramF1") - i(indicatorsValues, "indCr239") - i(indicatorsValues, "indCr237")

}, ["indCr239", "indCr237"]);



registerFormula("indCr239", function(def_val, factors, parameters, indicatorsValues) {

  // =paramF1_def × indCr30 / 100

  return parameters.getDef("paramF1") * i(indicatorsValues, "indCr30") / 100

}, ["indCr30"]);



registerFormula("indCr241", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr1.UAA1 x paramCr13_def - indCr31.UAA1

  return i(indicatorsValues, "indCr1.UAA1") * parameters.getDef("paramCr13") - i(indicatorsValues, "indCr31.UAA1")

}, ["indCr1.UAA1", "indCr31.UAA1"]);



registerFormula("indCr242", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr3.UAA1 x paramCr14_def - indCr32.UAA1

  return i(indicatorsValues, "indCr3.UAA1") * parameters.getDef("paramCr14") - i(indicatorsValues, "indCr32.UAA1")

}, ["indCr3.UAA1", "indCr32.UAA1"]);



registerFormula("indCr243", function(def_val, factors, parameters, indicatorsValues) {

  // =paramCr15_def - indCr33.UAA1

  return parameters.getDef("paramCr15") - i(indicatorsValues, "indCr33.UAA1")

}, ["indCr33.UAA1"]);



registerFormula("indCr244", function(def_val, factors, parameters, indicatorsValues) {

  // =paramCr16_def - indCr34.UAA1

  return parameters.getDef("paramCr16") - i(indicatorsValues, "indCr34.UAA1")

}, ["indCr34.UAA1"]);



registerFormula("indCr245", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr7.UAA1 x paramCr17_def - indCr35.UAA1

  return i(indicatorsValues, "indCr7.UAA1") * parameters.getDef("paramCr17") - i(indicatorsValues, "indCr35.UAA1")

}, ["indCr7.UAA1", "indCr35.UAA1"]);



registerFormula("indCr246", function(def_val, factors, parameters, indicatorsValues) {

  // =0

  return 0

}, []);



registerFormula("indCr247", function(def_val, factors, parameters, indicatorsValues) {

  // =0

  return 0

}, []);



registerFormula("indCr248", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr10.UAA1 x paramCr20_def - indCr38.UAA1

  return i(indicatorsValues, "indCr10.UAA1") * parameters.getDef("paramCr20") - i(indicatorsValues, "indCr38.UAA1")

}, ["indCr10.UAA1", "indCr38.UAA1"]);



registerFormula("indCr249", function(def_val, factors, parameters, indicatorsValues) {

  // =0

  return 0

}, []);



registerFormula("indCr250", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr12.UAA1 x paramCr22_def - indCr40.UAA1

  return i(indicatorsValues, "indCr12.UAA1") * parameters.getDef("paramCr22") - i(indicatorsValues, "indCr40.UAA1")

}, ["indCr12.UAA1", "indCr40.UAA1"]);



registerFormula("indCr251", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =IF(C.9.2 OR C.9.3, 0, indCr13.UAA1 x paramCr23_def - indCr41.UAA1)

  if(AepSelected(selectedAeps, "C.9.2") || AepSelected(selectedAeps, "C.9.3")) {

    return 0

  } else {

    return i(indicatorsValues, "indCr13.UAA1") * parameters.getDef("paramCr23") - i(indicatorsValues, "indCr41.UAA1")

  }

}, ["indCr13.UAA1", "indCr41.UAA1"]);



registerFormula("indCr252", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr1.UAA2 x paramCr13_def - indCr31.UAA2

  return i(indicatorsValues, "indCr1.UAA2") * parameters.getDef("paramCr13") - i(indicatorsValues, "indCr31.UAA2")

}, ["indCr1.UAA2", "indCr31.UAA2"]);



registerFormula("indCr253", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr3.UAA2 x paramCr14_def - indCr32.UAA2

  return i(indicatorsValues, "indCr3.UAA2") * parameters.getDef("paramCr14") - i(indicatorsValues, "indCr32.UAA2")

}, ["indCr3.UAA2", "indCr32.UAA2"]);



registerFormula("indCr254", function(def_val, factors, parameters, indicatorsValues) {

  // =paramCr15_def - indCr33.UAA2

  return parameters.getDef("paramCr15") - i(indicatorsValues, "indCr33.UAA2")

}, ["indCr33.UAA2"]);



registerFormula("indCr255", function(def_val, factors, parameters, indicatorsValues) {

  // =paramCr16_def - indCr34.UAA2

  return parameters.getDef("paramCr16") - i(indicatorsValues, "indCr34.UAA2")

}, ["indCr34.UAA2"]);



registerFormula("indCr256", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr7.UAA2 x paramCr17_def - indCr35.UAA2

  return i(indicatorsValues, "indCr7.UAA2") * parameters.getDef("paramCr17") - i(indicatorsValues, "indCr35.UAA2")

}, ["indCr7.UAA2", "indCr35.UAA2"]);



registerFormula("indCr257", function(def_val, factors, parameters, indicatorsValues) {

  // =0

  return 0

}, []);



registerFormula("indCr258", function(def_val, factors, parameters, indicatorsValues) {

  // =0

  return 0

}, []);



registerFormula("indCr259", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr10.UAA2 x paramCr20_def - indCr38.UAA2

  return i(indicatorsValues, "indCr10.UAA2") * parameters.getDef("paramCr20") - i(indicatorsValues, "indCr38.UAA2")

}, ["indCr10.UAA2", "indCr38.UAA2"]);



registerFormula("indCr260", function(def_val, factors, parameters, indicatorsValues) {

  // =0

  return 0

}, []);



registerFormula("indCr261", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr12.UAA2 x paramCr22_def - indCr40.UAA2

  return i(indicatorsValues, "indCr12.UAA2") * parameters.getDef("paramCr22") - i(indicatorsValues, "indCr40.UAA2")

}, ["indCr12.UAA2", "indCr40.UAA2"]);



registerFormula("indCr262", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =IF(C.9.2 OR C.9.3, 0, indCr13.UAA2 x paramCr23_def - indCr41.UAA2)

  if(AepSelected(selectedAeps, "C.9.2") || AepSelected(selectedAeps, "C.9.3")) {

    return 0

  } else {

    return i(indicatorsValues, "indCr13.UAA2") * parameters.getDef("paramCr23") - i(indicatorsValues, "indCr41.UAA2")

  }

}, ["indCr13.UAA2", "indCr41.UAA2"]);



registerFormula("indCr263", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr16 x paramCr23_def - indCr42

  return i(indicatorsValues, "indCr16") * parameters.getDef("paramCr23") - i(indicatorsValues, "indCr42")

}, ["indCr16", "indCr42"]);



registerFormula("indCr264", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr241 x indCr19.UAA1 + ... + indCr251 x indCr29.UAA1 + ... + indCr252 x indCr19.UAA2 + ... + indCr262 x indCr29.UAA2 + indCr263 x indCr239



  var val = 0

  val += i(indicatorsValues, "indCr241") * i(indicatorsValues, "indCr19.UAA1")

  val += i(indicatorsValues, "indCr242") * i(indicatorsValues, "indCr20.UAA1")

  val += i(indicatorsValues, "indCr243") * i(indicatorsValues, "indCr21.UAA1")

  val += i(indicatorsValues, "indCr244") * i(indicatorsValues, "indCr22.UAA1")

  val += i(indicatorsValues, "indCr245") * i(indicatorsValues, "indCr23.UAA1")

  val += i(indicatorsValues, "indCr246") * i(indicatorsValues, "indCr24.UAA1")

  val += i(indicatorsValues, "indCr247") * i(indicatorsValues, "indCr25.UAA1")

  val += i(indicatorsValues, "indCr248") * i(indicatorsValues, "indCr26.UAA1")

  val += i(indicatorsValues, "indCr249") * i(indicatorsValues, "indCr27.UAA1")

  val += i(indicatorsValues, "indCr250") * i(indicatorsValues, "indCr28.UAA1")

  val += i(indicatorsValues, "indCr251") * i(indicatorsValues, "indCr29.UAA1")



  val += i(indicatorsValues, "indCr252") * i(indicatorsValues, "indCr19.UAA2")

  val += i(indicatorsValues, "indCr253") * i(indicatorsValues, "indCr20.UAA2")

  val += i(indicatorsValues, "indCr254") * i(indicatorsValues, "indCr21.UAA2")

  val += i(indicatorsValues, "indCr255") * i(indicatorsValues, "indCr22.UAA2")

  val += i(indicatorsValues, "indCr256") * i(indicatorsValues, "indCr23.UAA2")

  val += i(indicatorsValues, "indCr257") * i(indicatorsValues, "indCr24.UAA2")

  val += i(indicatorsValues, "indCr258") * i(indicatorsValues, "indCr25.UAA2")

  val += i(indicatorsValues, "indCr259") * i(indicatorsValues, "indCr26.UAA2")

  val += i(indicatorsValues, "indCr260") * i(indicatorsValues, "indCr27.UAA2")

  val += i(indicatorsValues, "indCr261") * i(indicatorsValues, "indCr28.UAA2")

  val += i(indicatorsValues, "indCr262") * i(indicatorsValues, "indCr29.UAA2")



  val += i(indicatorsValues, "indCr263") * i(indicatorsValues, "indCr239")



  return val



}, ["indCr241", "indCr19.UAA1", "indCr242", "indCr20.UAA1", "indCr243", "indCr21.UAA1", "indCr244", "indCr22.UAA1", "indCr245", "indCr23.UAA1", "indCr246", "indCr24.UAA1", "indCr247", "indCr25.UAA1", "indCr248", "indCr26.UAA1", "indCr249", "indCr27.UAA1", "indCr250", "indCr28.UAA1", "indCr251", "indCr29.UAA1", "indCr252", "indCr19.UAA2", "indCr253", "indCr20.UAA2", "indCr254", "indCr21.UAA2", "indCr255", "indCr22.UAA2", "indCr256", "indCr23.UAA2", "indCr257", "indCr24.UAA2", "indCr258", "indCr25.UAA2", "indCr259", "indCr26.UAA2", "indCr260", "indCr27.UAA2", "indCr261", "indCr28.UAA2", "indCr262", "indCr29.UAA2", "indCr263", "indCr239"]);



registerFormula("indCr265", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =IF(C.4.2, indF181 / indCr264, 1)

  if(AepSelected(selectedAeps, "C.4.2") && i(indicatorsValues, "indF181") < i(indicatorsValues, "indCr264")) {

    return i(indicatorsValues, "indF181") / i(indicatorsValues, "indCr264")

  } else {

    return 1

  }

}, ["indCr264", "indF181"]);



registerFormula("indCr266.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr1.UAA1 x indCr265

  return indXindCr265(indicatorsValues, "indCr1.UAA1")

}, ["indCr1.UAA1", "indCr265"]);



registerFormula("indCr267.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr2.UAA1 > 0, indCr266.UAA1 x paramCr24_def, 0)

  if(i(indicatorsValues, "indCr2.UAA1") > 0) {

    return i(indicatorsValues, "indCr266.UAA1") * parameters.getDef("paramCr24")

  } else {

    return 0

  }

}, ["indCr2.UAA1", "indCr266.UAA1"]);



registerFormula("indCr268.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr3.UAA1 x indCr265

  return indXindCr265(indicatorsValues, "indCr3.UAA1")

}, ["indCr3.UAA1", "indCr265"]);



registerFormula("indCr269.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr4.UAA1 > 0, indCr268.UAA1 x paramCr24_def, 0)

  if(i(indicatorsValues, "indCr4.UAA1") > 0) {

    return i(indicatorsValues, "indCr268.UAA1") * parameters.getDef("paramCr24")

  } else {

    return 0

  }

}, ["indCr4.UAA1", "indCr268.UAA1"]);



registerFormula("indCr270.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr5.UAA1 x indCr265

  return indXindCr265(indicatorsValues, "indCr5.UAA1")

}, ["indCr5.UAA1", "indCr265"]);



registerFormula("indCr271.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr6.UAA1 x indCr265

  return indXindCr265(indicatorsValues, "indCr6.UAA1")

}, ["indCr6.UAA1", "indCr265"]);



registerFormula("indCr272.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr7.UAA1 x indCr265

  return indXindCr265(indicatorsValues, "indCr7.UAA1")

}, ["indCr7.UAA1", "indCr265"]);



registerFormula("indCr273.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr8.UAA1

  return i(indicatorsValues, "indCr8.UAA1")

}, ["indCr8.UAA1"]);



registerFormula("indCr274.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr9.UAA1

  return i(indicatorsValues, "indCr9.UAA1")

}, ["indCr9.UAA1"]);



registerFormula("indCr275.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr10.UAA1 x indCr265

  return indXindCr265(indicatorsValues, "indCr10.UAA1")

}, ["indCr10.UAA1", "indCr265"]);



registerFormula("indCr276.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr11.UAA1

  return i(indicatorsValues, "indCr11.UAA1")

}, ["indCr11.UAA1"]);



registerFormula("indCr277.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr12.UAA1 x indCr265

  return indXindCr265(indicatorsValues, "indCr12.UAA1")

}, ["indCr12.UAA1", "indCr265"]);



registerFormula("indCr278.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr13.UAA1 x indCr265

  return indXindCr265(indicatorsValues, "indCr13.UAA1")

}, ["indCr13.UAA1", "indCr265"]);



registerFormula("indCr266.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr1.UAA2 x indCr265

  return indXindCr265(indicatorsValues, "indCr1.UAA2")

}, ["indCr1.UAA2", "indCr265"]);



registerFormula("indCr267.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr2.UAA2 > 0, indCr266.UAA2 x paramCr24_def, 0)

  if(i(indicatorsValues, "indCr2.UAA2") > 0) {

    return i(indicatorsValues, "indCr266.UAA2") * parameters.getDef("paramCr24")

  } else {

    return 0

  }

}, ["indCr2.UAA2", "indCr266.UAA2"]);



registerFormula("indCr268.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr3.UAA2 x indCr265

  return indXindCr265(indicatorsValues, "indCr3.UAA2")

}, ["indCr3.UAA2", "indCr265"]);



registerFormula("indCr269.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr4.UAA2 > 0, indCr268.UAA2 x paramCr24_def, 0)

  if(i(indicatorsValues, "indCr4.UAA2") > 0) {

    return i(indicatorsValues, "indCr268.UAA2") * parameters.getDef("paramCr24")

  } else {

    return 0

  }

}, ["indCr4.UAA2", "indCr268.UAA2"]);



registerFormula("indCr270.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr5.UAA2 x indCr265

  return indXindCr265(indicatorsValues, "indCr5.UAA2")

}, ["indCr5.UAA2", "indCr265"]);



registerFormula("indCr271.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr6.UAA2 x indCr265

  return indXindCr265(indicatorsValues, "indCr6.UAA2")

}, ["indCr6.UAA2", "indCr265"]);



registerFormula("indCr272.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr7.UAA2 x indCr265

  return indXindCr265(indicatorsValues, "indCr7.UAA2")

}, ["indCr7.UAA2", "indCr265"]);



registerFormula("indCr273.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr8.UAA2

  return i(indicatorsValues, "indCr8.UAA2")

}, ["indCr8.UAA2"]);



registerFormula("indCr274.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr9.UAA2

  return i(indicatorsValues, "indCr9.UAA2")

}, ["indCr9.UAA2"]);



registerFormula("indCr275.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr10.UAA2 x indCr265

  return indXindCr265(indicatorsValues, "indCr10.UAA2")

}, ["indCr10.UAA2", "indCr265"]);



registerFormula("indCr276.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr11.UAA2

  return i(indicatorsValues, "indCr11.UAA2")

}, ["indCr11.UAA2"]);



registerFormula("indCr277.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr12.UAA2 x indCr265

  return indXindCr265(indicatorsValues, "indCr12.UAA2")

}, ["indCr12.UAA2", "indCr265"]);



registerFormula("indCr278.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr13.UAA2 x indCr265

  return indXindCr265(indicatorsValues, "indCr13.UAA2")

}, ["indCr13.UAA2", "indCr265"]);



registerFormula("indCr279", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr16 x indCr265

  return indXindCr265(indicatorsValues, "indCr16")

}, ["indCr16", "indCr265"]);



registerFormula("indF3", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr266.UAA1 x indCr19.UAA1 + indCr266.UAA2 x indCr19.UAA2

  return i(indicatorsValues, "indCr266.UAA1") * i(indicatorsValues, "indCr19.UAA1") + i(indicatorsValues, "indCr266.UAA2") * i(indicatorsValues, "indCr19.UAA2")

}, ["indCr266.UAA1", "indCr19.UAA1", "indCr266.UAA2", "indCr19.UAA2"]);



registerFormula("indF4", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr267.UAA1 x indCr19.UAA1 + indCr267.UAA2 x indCr19.UAA2

  return i(indicatorsValues, "indCr267.UAA1") * i(indicatorsValues, "indCr19.UAA1") + i(indicatorsValues, "indCr267.UAA2") * i(indicatorsValues, "indCr19.UAA2")

}, ["indCr267.UAA1", "indCr19.UAA1", "indCr267.UAA2", "indCr19.UAA2"]);



registerFormula("indF5", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr268.UAA1 x indCr20.UAA1 + indCr268.UAA2 x indCr20.UAA2

  return i(indicatorsValues, "indCr268.UAA1") * i(indicatorsValues, "indCr20.UAA1") + i(indicatorsValues, "indCr268.UAA2") * i(indicatorsValues, "indCr20.UAA2")

}, ["indCr268.UAA1", "indCr20.UAA1", "indCr268.UAA2", "indCr20.UAA2"]);



registerFormula("indF6", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr269.UAA1 x indCr20.UAA1 + indCr269.UAA2 x indCr20.UAA2

  return i(indicatorsValues, "indCr269.UAA1") * i(indicatorsValues, "indCr20.UAA1") + i(indicatorsValues, "indCr269.UAA2") * i(indicatorsValues, "indCr20.UAA2")

}, ["indCr269.UAA1", "indCr20.UAA1", "indCr269.UAA2", "indCr20.UAA2"]);



registerFormula("indF7", function(def_val, factors, parameters, indicatorsValues) {

  // =indC270.UAA1 x indCr21.UAA1 + indCr270.UAA2 x indCr21.UAA2

  return i(indicatorsValues, "indCr270.UAA1") * i(indicatorsValues, "indCr21.UAA1") + i(indicatorsValues, "indCr270.UAA2") * i(indicatorsValues, "indCr21.UAA2")

}, ["indCr270.UAA1", "indCr21.UAA1", "indCr270.UAA2", "indCr21.UAA2"]);



registerFormula("indF8", function(def_val, factors, parameters, indicatorsValues) {

  // =indC271.UAA1 x indCr22.UAA1 + indCr271.UAA2 x indCr22.UAA2

  return i(indicatorsValues, "indCr271.UAA1") * i(indicatorsValues, "indCr22.UAA1") + i(indicatorsValues, "indCr271.UAA2") * i(indicatorsValues, "indCr22.UAA2")

}, ["indCr271.UAA1", "indCr22.UAA1", "indCr271.UAA2", "indCr22.UAA2"]);



registerFormula("indF9", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr272.UAA1 x indCr23.UAA1 + indCr272.UAA2 x indCr23.UAA2

  return i(indicatorsValues, "indCr272.UAA1") * i(indicatorsValues, "indCr23.UAA1") + i(indicatorsValues, "indCr272.UAA2") * i(indicatorsValues, "indCr23.UAA2")

}, ["indCr272.UAA1", "indCr23.UAA1", "indCr272.UAA2", "indCr23.UAA2"]);



registerFormula("indF10", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr273.UAA1 x indCr24.UAA1 + indCr273.UAA2 x indCr24.UAA2

  return i(indicatorsValues, "indCr273.UAA1") * i(indicatorsValues, "indCr24.UAA1") + i(indicatorsValues, "indCr273.UAA2") * i(indicatorsValues, "indCr24.UAA2")

}, ["indCr273.UAA1", "indCr24.UAA1", "indCr273.UAA2", "indCr24.UAA2"]);



registerFormula("indF11", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr274.UAA1 x indCr25.UAA1 + indCr275.UAA2 x indCr25.UAA2

  return i(indicatorsValues, "indCr274.UAA1") * i(indicatorsValues, "indCr25.UAA1") + i(indicatorsValues, "indCr274.UAA2") * i(indicatorsValues, "indCr25.UAA2")

}, ["indCr274.UAA1", "indCr25.UAA1", "indCr274.UAA2", "indCr25.UAA2"]);



registerFormula("indF12", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr275.UAA1 x indCr26.UAA1 + indCr275.UAA2 x indCr26.UAA2

  return i(indicatorsValues, "indCr275.UAA1") * i(indicatorsValues, "indCr26.UAA1") + i(indicatorsValues, "indCr275.UAA2") * i(indicatorsValues, "indCr26.UAA2")

}, ["indCr275.UAA1", "indCr26.UAA1", "indCr275.UAA2", "indCr26.UAA2"]);



registerFormula("indF13", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr276.UAA1 x indCr27.UAA1 + indCr276.UAA2 x indCr27.UAA2

  return i(indicatorsValues, "indCr276.UAA1") * i(indicatorsValues, "indCr27.UAA1") + i(indicatorsValues, "indCr276.UAA2") * i(indicatorsValues, "indCr27.UAA2")

}, ["indCr276.UAA1", "indCr27.UAA1", "indCr276.UAA2", "indCr27.UAA2"]);



registerFormula("indF14", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr277.UAA1 x indCr28.UAA1 + indCr277.UAA2 x indCr28.UAA2

  return i(indicatorsValues, "indCr277.UAA1") * i(indicatorsValues, "indCr28.UAA1") + i(indicatorsValues, "indCr277.UAA2") * i(indicatorsValues, "indCr28.UAA2")

}, ["indCr277.UAA1", "indCr28.UAA1", "indCr277.UAA2", "indCr28.UAA2"]);



registerFormula("indF15", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr278.UAA1 x indCr29.UAA1 + indCr278.UAA2 x indCr29.UAA2

  return i(indicatorsValues, "indCr278.UAA1") * i(indicatorsValues, "indCr29.UAA1") + i(indicatorsValues, "indCr278.UAA2") * i(indicatorsValues, "indCr29.UAA2")

}, ["indCr278.UAA1", "indCr29.UAA1", "indCr278.UAA2", "indCr29.UAA2"]);



registerFormula("indF16", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr279 x indCr239

  return i(indicatorsValues, "indCr279") * i(indicatorsValues, "indCr239")

}, ["indCr279", "indCr239"]);



registerFormula("indF48", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr19.UAA1 * indCr43.UAA1 + indCr20.UAA1 * indCr44.UAA1 + indCr21.UAA1 * indCr45.UAA1 + indCr22.UAA1 * indCr46.UAA1 + indCr23.UAA1 * indCr47.UAA1 + indCr24.UAA1 * indCr48.UAA1 + indCr25.UAA1 * indCr49.UAA1 + indCr26.UAA1 * indCr50.UAA1 + indCr27.UAA1 * indCr51.UAA1 + indCr28.UAA1 * indCr52.UAA1 + indCr29.UAA1 * indCr53.UAA1 + indCr19.UAA2 * indCr43.UAA2 + indCr20.UAA2 * indCr44.UAA2 + indCr21.UAA2 * indCr45.UAA2 + indCr22.UAA2 * indCr46.UAA2 + indCr23.UAA2 * indCr47.UAA2 + indCr24.UAA2 * indCr48.UAA2 + indCr25.UAA2 * indCr49.UAA2 + indCr26.UAA2 * indCr50.UAA2 + indCr27.UAA2 * indCr51.UAA2 + indCr28.UAA2 * indCr52.UAA2 + indCr29.UAA2 * indCr53.UAA2 + indCr239 * indCr54

  return i(indicatorsValues, "indCr19.UAA1") * i(indicatorsValues, "indCr43.UAA1") + i(indicatorsValues, "indCr20.UAA1") * i(indicatorsValues, "indCr44.UAA1") + i(indicatorsValues, "indCr21.UAA1") * i(indicatorsValues, "indCr45.UAA1") + i(indicatorsValues, "indCr22.UAA1") * i(indicatorsValues, "indCr46.UAA1") + i(indicatorsValues, "indCr23.UAA1") * i(indicatorsValues, "indCr47.UAA1") + i(indicatorsValues, "indCr24.UAA1") * i(indicatorsValues, "indCr48.UAA1") + i(indicatorsValues, "indCr25.UAA1") * i(indicatorsValues, "indCr49.UAA1") + i(indicatorsValues, "indCr26.UAA1") * i(indicatorsValues, "indCr50.UAA1") + i(indicatorsValues, "indCr27.UAA1") * i(indicatorsValues, "indCr51.UAA1") + i(indicatorsValues, "indCr28.UAA1") * i(indicatorsValues, "indCr52.UAA1") + i(indicatorsValues, "indCr29.UAA1") * i(indicatorsValues, "indCr53.UAA1") + i(indicatorsValues, "indCr19.UAA2") * i(indicatorsValues, "indCr43.UAA2") + i(indicatorsValues, "indCr20.UAA2") * i(indicatorsValues, "indCr44.UAA2") + i(indicatorsValues, "indCr21.UAA2") * i(indicatorsValues, "indCr45.UAA2") + i(indicatorsValues, "indCr22.UAA2") * i(indicatorsValues, "indCr46.UAA2") + i(indicatorsValues, "indCr23.UAA2") * i(indicatorsValues, "indCr47.UAA2") + i(indicatorsValues, "indCr24.UAA2") * i(indicatorsValues, "indCr48.UAA2") + i(indicatorsValues, "indCr25.UAA2") * i(indicatorsValues, "indCr49.UAA2") + i(indicatorsValues, "indCr26.UAA2") * i(indicatorsValues, "indCr50.UAA2") + i(indicatorsValues, "indCr27.UAA2") * i(indicatorsValues, "indCr51.UAA2") + i(indicatorsValues, "indCr28.UAA2") * i(indicatorsValues, "indCr52.UAA2") + i(indicatorsValues, "indCr29.UAA2") * i(indicatorsValues, "indCr53.UAA2") + i(indicatorsValues, "indCr239") * i(indicatorsValues, "indCr54")

}, ["indCr19.UAA1", "indCr19.UAA2", "indCr20.UAA1", "indCr20.UAA2", "indCr21.UAA1", "indCr21.UAA2", "indCr22.UAA1", "indCr22.UAA2", "indCr23.UAA1", "indCr23.UAA2", "indCr24.UAA1", "indCr24.UAA2", "indCr25.UAA1", "indCr25.UAA2", "indCr26.UAA1", "indCr26.UAA2", "indCr27.UAA1", "indCr27.UAA2", "indCr28.UAA1", "indCr28.UAA2", "indCr29.UAA1", "indCr29.UAA2", "indCr239", "indCr43.UAA1", "indCr43.UAA2", "indCr44.UAA1", "indCr44.UAA2", "indCr45.UAA1", "indCr45.UAA2", "indCr46.UAA1", "indCr46.UAA2", "indCr47.UAA1", "indCr47.UAA2", "indCr48.UAA1", "indCr48.UAA2", "indCr49.UAA1", "indCr49.UAA2", "indCr50.UAA1", "indCr50.UAA2", "indCr51.UAA1", "indCr51.UAA2", "indCr52.UAA1", "indCr52.UAA2", "indCr53.UAA1", "indCr53.UAA2", "indCr54"]);



registerFormula("indF49", function(def_val, factors, parameters, indicatorsValues) {

  // =indF48 / paramF1_def

  return i(indicatorsValues, "indF48") / parameters.getDef("paramF1")

}, ["indF48"]);



registerFormula("indF107", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr19.UAA1") > 0) {

    return i(indicatorsValues, "indCr266.UAA1")

  } else {

    return 0

  }

}, ["indCr19.UAA1", "indCr266.UAA1"]);



registerFormula("indF108", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr19.UAA1") > 0) {

    return i(indicatorsValues, "indCr267.UAA1")

  } else {

    return 0

  }

}, ["indCr19.UAA1", "indCr267.UAA1"]);



registerFormula("indF109", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr20.UAA1") > 0) {

    return i(indicatorsValues, "indCr268.UAA1")

  } else {

    return 0

  }

}, ["indCr20.UAA1", "indCr268.UAA1"]);



registerFormula("indF110", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr20.UAA1") > 0) {

    return i(indicatorsValues, "indCr269.UAA1")

  } else {

    return 0

  }

}, ["indCr20.UAA1", "indCr269.UAA1"]);



registerFormula("indF111", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr21.UAA1") > 0) {

    return i(indicatorsValues, "indCr270.UAA1")

  } else {

    return 0

  }

}, ["indCr21.UAA1", "indCr270.UAA1"]);



registerFormula("indF112", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr22.UAA1") > 0) {

    return i(indicatorsValues, "indCr271.UAA1")

  } else {

    return 0

  }

}, ["indCr22.UAA1", "indCr271.UAA1"]);



registerFormula("indF113", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr23.UAA1") > 0) {

    return i(indicatorsValues, "indCr272.UAA1")

  } else {

    return 0

  }

}, ["indCr23.UAA1", "indCr272.UAA1"]);



registerFormula("indF114", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr24.UAA1") > 0) {

    return i(indicatorsValues, "indCr273.UAA1")

  } else {

    return 0

  }

}, ["indCr24.UAA1", "indCr273.UAA1"]);



registerFormula("indF115", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr25.UAA1") > 0) {

    return i(indicatorsValues, "indCr274.UAA1")

  } else {

    return 0

  }

}, ["indCr25.UAA1", "indCr274.UAA1"]);



registerFormula("indF116", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr26.UAA1") > 0) {

    return i(indicatorsValues, "indCr275.UAA1")

  } else {

    return 0

  }

}, ["indCr26.UAA1", "indCr275.UAA1"]);



registerFormula("indF117", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr27.UAA1") > 0) {

    return i(indicatorsValues, "indCr276.UAA1")

  } else {

    return 0

  }

}, ["indCr27.UAA1", "indCr276.UAA1"]);



registerFormula("indF118", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr28.UAA1") > 0) {

    return i(indicatorsValues, "indCr277.UAA1")

  } else {

    return 0

  }

}, ["indCr28.UAA1", "indCr277.UAA1"]);



registerFormula("indF119", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    return i(indicatorsValues, "indCr278.UAA1")

  } else {

    return 0

  }

}, ["indCr29.UAA1", "indCr278.UAA1"]);



registerFormula("indF120", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr19.UAA2") > 0) {

    return i(indicatorsValues, "indCr266.UAA2")

  } else {

    return 0

  }

}, ["indCr19.UAA2", "indCr266.UAA2"]);



registerFormula("indF121", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr19.UAA2") > 0) {

    return i(indicatorsValues, "indCr267.UAA2")

  } else {

    return 0

  }

}, ["indCr19.UAA2", "indCr267.UAA2"]);



registerFormula("indF122", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr20.UAA2") > 0) {

    return i(indicatorsValues, "indCr268.UAA2")

  } else {

    return 0

  }

}, ["indCr20.UAA2", "indCr268.UAA2"]);



registerFormula("indF123", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr20.UAA2") > 0) {

    return i(indicatorsValues, "indCr269.UAA2")

  } else {

    return 0

  }

}, ["indCr20.UAA2", "indCr269.UAA2"]);



registerFormula("indF124", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr21.UAA2") > 0) {

    return i(indicatorsValues, "indCr270.UAA2")

  } else {

    return 0

  }

}, ["indCr21.UAA2", "indCr270.UAA2"]);



registerFormula("indF125", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr22.UAA2") > 0) {

    return i(indicatorsValues, "indCr271.UAA2")

  } else {

    return 0

  }

}, ["indCr22.UAA2", "indCr271.UAA2"]);



registerFormula("indF126", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr23.UAA2") > 0) {

    return i(indicatorsValues, "indCr272.UAA2")

  } else {

    return 0

  }

}, ["indCr23.UAA2", "indCr272.UAA2"]);



registerFormula("indF127", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr24.UAA2") > 0) {

    return i(indicatorsValues, "indCr273.UAA2")

  } else {

    return 0

  }

}, ["indCr24.UAA2", "indCr273.UAA2"]);



registerFormula("indF128", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr25.UAA2") > 0) {

    return i(indicatorsValues, "indCr274.UAA2")

  } else {

    return 0

  }

}, ["indCr25.UAA2", "indCr274.UAA2"]);



registerFormula("indF129", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr26.UAA2") > 0) {

    return i(indicatorsValues, "indCr275.UAA2")

  } else {

    return 0

  }

}, ["indCr26.UAA2", "indCr275.UAA2"]);



registerFormula("indF130", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr27.UAA2") > 0) {

    return i(indicatorsValues, "indCr276.UAA2")

  } else {

    return 0

  }

}, ["indCr27.UAA2", "indCr276.UAA2"]);



registerFormula("indF131", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr28.UAA2") > 0) {

    return i(indicatorsValues, "indCr277.UAA2")

  } else {

    return 0

  }

}, ["indCr28.UAA2", "indCr277.UAA2"]);



registerFormula("indF132", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    return i(indicatorsValues, "indCr278.UAA2")

  } else {

    return 0

  }

}, ["indCr29.UAA2", "indCr278.UAA2"]);



registerFormula("indF133", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr239") > 0) {

    return i(indicatorsValues, "indCr279")

  } else {

    return 0

  }

}, ["indCr239", "indCr279"]);



registerFormula("indF134", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr19.UAA1") + i(indicatorsValues, "indCr19.UAA2") > 0) {

    return (i(indicatorsValues, "indCr266.UAA1") * i(indicatorsValues, "indCr19.UAA1") + i(indicatorsValues, "indCr266.UAA2") * i(indicatorsValues, "indCr19.UAA2")) / (i(indicatorsValues, "indCr19.UAA1") + i(indicatorsValues, "indCr19.UAA2"))

  } else {

    return 0

  }

}, ["indCr19.UAA1", "indCr19.UAA2", "indCr266.UAA1", "indCr266.UAA2"]);



registerFormula("indF135", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr24.UAA1") + i(indicatorsValues, "indCr24.UAA2") > 0) {

    return (i(indicatorsValues, "indCr273.UAA1") * i(indicatorsValues, "indCr24.UAA1") + i(indicatorsValues, "indCr273.UAA2") * i(indicatorsValues, "indCr24.UAA2")) / (i(indicatorsValues, "indCr24.UAA1") + i(indicatorsValues, "indCr24.UAA2"))

  } else {

    return 0

  }

}, ["indCr24.UAA1", "indCr24.UAA2", "indCr273.UAA1", "indCr273.UAA2"]);



registerFormula("indF139", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =IFNOT(C.14.1, (paramF1_def - indCr239) x (1 - 0.95), 0)

  if(AepSelected(selectedAeps, "C.14.1")) {

    return 0

  } else {

    return (1 - 0.95) * (parameters.getDef("paramF1") - i(indicatorsValues, "indCr239"))

  }

}, ["indCr239"]);



registerFormula("indF140", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =IFNOT(C.15.1, (paramF1_def - indCr239) x (1 - 0.84), 0)

  if(AepSelected(selectedAeps, "C.15.1")) {

    return 0

  } else {

    return (1 - 0.84) * (parameters.getDef("paramF1") - i(indicatorsValues, "indCr239"))

  }

}, ["indCr239"]);



registerFormula("indF170", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr19.UAA1 + indCr19.UAA2

  return i(indicatorsValues, "indCr19.UAA1") + i(indicatorsValues, "indCr19.UAA2")

}, ["indCr19.UAA1", "indCr19.UAA2"]);



registerFormula("indF171", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr20.UAA1 + indCr20.UAA2

  return i(indicatorsValues, "indCr20.UAA1") + i(indicatorsValues, "indCr20.UAA2")

}, ["indCr20.UAA1", "indCr20.UAA2"]);



registerFormula("indF172", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr21.UAA1 + indCr21.UAA2

  return i(indicatorsValues, "indCr21.UAA1") + i(indicatorsValues, "indCr21.UAA2")

}, ["indCr21.UAA1", "indCr21.UAA2"]);



registerFormula("indF173", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr22.UAA1 + indCr22.UAA2

  return i(indicatorsValues, "indCr22.UAA1") + i(indicatorsValues, "indCr22.UAA2")

}, ["indCr22.UAA1", "indCr22.UAA2"]);



registerFormula("indF174", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr23.UAA1 + indCr23.UAA2

  return i(indicatorsValues, "indCr23.UAA1") + i(indicatorsValues, "indCr23.UAA2")

}, ["indCr23.UAA1", "indCr23.UAA2"]);



registerFormula("indF175", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr24.UAA1 + indCr24.UAA2

  return i(indicatorsValues, "indCr24.UAA1") + i(indicatorsValues, "indCr24.UAA2")

}, ["indCr24.UAA1", "indCr24.UAA2"]);



registerFormula("indF176", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr25.UAA1 + indCr25.UAA2

  return i(indicatorsValues, "indCr25.UAA1") + i(indicatorsValues, "indCr25.UAA2")

}, ["indCr25.UAA1", "indCr25.UAA2"]);



registerFormula("indF177", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr26.UAA1 + indCr26.UAA2

  return i(indicatorsValues, "indCr26.UAA1") + i(indicatorsValues, "indCr26.UAA2")

}, ["indCr26.UAA1", "indCr26.UAA2"]);



registerFormula("indF178", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr27.UAA1 + indCr27.UAA2

  return i(indicatorsValues, "indCr27.UAA1") + i(indicatorsValues, "indCr27.UAA2")

}, ["indCr27.UAA1", "indCr27.UAA2"]);



registerFormula("indF179", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr28.UAA1 + indCr28.UAA2

  return i(indicatorsValues, "indCr28.UAA1") + i(indicatorsValues, "indCr28.UAA2")

}, ["indCr28.UAA1", "indCr28.UAA2"]);



registerFormula("indF180", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr29.UAA1 + indCr29.UAA2

  return i(indicatorsValues, "indCr29.UAA1") + i(indicatorsValues, "indCr29.UAA2")

}, ["indCr29.UAA1", "indCr29.UAA2"]);

// model CROP type 2 (end) ////////////////////////////////////////////////////////////////////////////



// model ENVIRONMENT type 1 (begin) ///////////////////////////////////////////////////////////////////

registerFormula("indCr55.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr55_def x PI(factors), indCr55_def x PI(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr55_def x PI(factors, except C.9.1, C.9.2, C.9.3), indCr55_def x PI(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return MULT(def_val, factors)

    } else {

      return MultExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return MultExcludeC91C92C93(def_val, factors)

    } else {

      return MultExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr55.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr55_def x PI(factors), indCr55_def x PI(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr55_def x PI(factors, except C.9.1, C.9.2, C.9.3), indCr55_def x PI(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return MULT(def_val, factors)

    } else {

      return MultExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return MultExcludeC91C92C93(def_val, factors)

    } else {

      return MultExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr56", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr56_def x PI(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return MULT(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr57.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr57_def + SUM(factors), indCr57_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr57_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr57_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr57.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr57_def + SUM(factors), indCr57_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr57_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr57_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr58", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr58_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30")) return SUM(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr59.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr59_def x PI(factors), indCr59_def x PI(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr59_def x PI(factors, except C.9.1, C.9.2, C.9.3), indCr59_def x PI(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return MULT(def_val, factors)

    } else {

      return MultExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return MultExcludeC91C92C93(def_val, factors)

    } else {

      return MultExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr59.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr59_def x PI(factors), indCr59_def x PI(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr59_def x PI(factors, except C.9.1, C.9.2, C.9.3), indCr59_def x PI(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return MULT(def_val, factors)

    } else {

      return MultExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return MultExcludeC91C92C93(def_val, factors)

    } else {

      return MultExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr60", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr60_def x PI(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return MULT(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr61.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr61_def + SUM(factors), indCr61_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr61_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr61_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr61.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr61_def + SUM(factors), indCr61_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr61_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr61_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr62", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr62_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return SUM(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr63.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr63_def x PI(factors), indCr63_def x PI(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr63_def x PI(factors, except C.9.1, C.9.2, C.9.3), indCr63_def x PI(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return MULT(def_val, factors)

    } else {

      return MultExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return MultExcludeC91C92C93(def_val, factors)

    } else {

      return MultExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr63.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr63_def x PI(factors), indCr63_def x PI(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr63_def x PI(factors, except C.9.1, C.9.2, C.9.3), indCr63_def x PI(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return MULT(def_val, factors)

    } else {

      return MultExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return MultExcludeC91C92C93(def_val, factors)

    } else {

      return MultExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr64", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr64_def x PI(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return MULT(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr65.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr65_def + SUM(factors), indCr65_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr65_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr65_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  var val

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      val = SUM(def_val, factors)

    } else {

      val = SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      val = SumExcludeC91C92C93(def_val, factors)

    } else {

      val = SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr65.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr65.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr65.UAA1"]

  }

  return val

}, ["indCr29.UAA1", "indCr19.UAA1", "indF2"]);



registerFormula("indCr65.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr65_def + SUM(factors), indCr65_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr65_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr65_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  var val

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      val = SUM(def_val, factors)

    } else {

      val = SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      val = SumExcludeC91C92C93(def_val, factors)

    } else {

      val = SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr65.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr65.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr65.UAA2"]

  }

  return val

}, ["indCr29.UAA2", "indCr19.UAA2", "indF2"]);



registerFormula("indCr66", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr66_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return SUM(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr67.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr67_def + SUM(factors), indCr67_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr67_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr67_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr67.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr67_def + SUM(factors), indCr67_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr67_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr67_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr68", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr68_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return SUM(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr69.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr69_def + SUM(factors), indCr69_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr69_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr69_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr69.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr69_def + SUM(factors), indCr69_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr69_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr69_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr70", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr70_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return MULT(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr71.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr71_def + SUM(factors), indCr71_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr71_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr71_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr71.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr71_def + SUM(factors), indCr71_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr71_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr71_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr72", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr72_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return SUM(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr73.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr73_def + SUM(factors), indCr73_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr73_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr73_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr73.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr73_def + SUM(factors), indCr73_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr73_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr73_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr74", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr74_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return SUM(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr75.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr75_def + SUM(factors), indCr75_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr75_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr75_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr75.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr75_def + SUM(factors), indCr75_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr75_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr75_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr76", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr76_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return SUM(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr233.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr233_def + SUM(factors), indCr233_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr233_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr233_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA1", "indCr19.UAA1"]);



registerFormula("indCr233.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr233_def + SUM(factors), indCr233_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr233_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr23_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2)))

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SUM(def_val, factors)

    } else {

      return SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      return SumExcludeC91C92C93(def_val, factors)

    } else {

      return SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }

}, ["indCr29.UAA2", "indCr19.UAA2"]);



registerFormula("indCr234", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr234_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return SUM(def_val, factors)

  else return 0

}, ["indCr30"]);



registerFormula("indCr235.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA1 > 0, IF(indCr19.UAA1 > 0, indCr235_def + SUM(factors), indCr235_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA1 > 0, indCr235_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr235_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2))) + IF((indAn185 + indF2) / paramF1_def < paramF30_min, 1, IF((indAn185 + indF2) / paramF1_def > paramF30_max, -2, ((indAn185 + indF2) / paramF1_def x (-2-1) / (paramF30_max - paramF30_min) + [1 - paramF30_min x (-2-1) / (paramF30_max - paramF30_min)])))



  let val

  if(i(indicatorsValues, "indCr29.UAA1") > 0) {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      val = SUM(def_val, factors)

    } else {

      val = SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA1") > 0) {

      val = SumExcludeC91C92C93(def_val, factors)

    } else {

      val = SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }



  let testVal = (i(indicatorsValues, "indAn185") + i(indicatorsValues, "indF2")) / parameters.getDef("paramF1")

  if( testVal < parameters.getMin("paramF30") ) {

    val += 1

  } else if( testVal > parameters.getMax("paramF30") ) {

    val += -2

  } else {

    let a = -3 / ( parameters.getMax("paramF30") - parameters.getMin("paramF30") )

	let b = 1 - parameters.getMin("paramF30") * a

    val += testVal * a + b

  }



  return val

}, ["indCr29.UAA1", "indCr19.UAA1", "indAn185", "indF1", "indF2"]);



registerFormula("indCr235.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr29.UAA2 > 0, IF(indCr19.UAA2 > 0, indCr235_def + SUM(factors), indCr235_def + SUM(factors, except C.11.1, C.11.2)), IF(indCr19.UAA2 > 0, indCr235_def + SUM(factors, except C.9.1, C.9.2, C.9.3), indCr235_def + SUM(factors, except C.9.1, C.9.2, C.9.3, C.11.1, C.11.2))) + IF((indAn185 + indF2) / paramF1_def < paramF30_min, 1, IF((indAn185 + indF2) / paramF1_def > paramF30_max, -2, ((indAn185 + indF2) / paramF1_def x (-2-1) / (paramF30_max - paramF30_min) + [1 - paramF30_min x (-2-1) / (paramF30_max - paramF30_min)])))



  let val

  if(i(indicatorsValues, "indCr29.UAA2") > 0) {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      val = SUM(def_val, factors)

    } else {

      val = SumExcludeC111C112(def_val, factors)

    }

  } else {

    if(i(indicatorsValues, "indCr19.UAA2") > 0) {

      val = SumExcludeC91C92C93(def_val, factors)

    } else {

      val = SumExcludeC91C92C93C111C112(def_val, factors)

    }

  }



  let testVal = (i(indicatorsValues, "indAn185") + i(indicatorsValues, "indF2")) / parameters.getDef("paramF1")

  if( testVal < parameters.getMin("paramF30") ) {

    val += 1

  } else if( testVal > parameters.getMax("paramF30") ) {

    val += -2

  } else {

    let a = -3 / ( parameters.getMax("paramF30") - parameters.getMin("paramF30") )

	let b = 1 - parameters.getMin("paramF30") * a

    val += testVal * a + b

  }



  return val

}, ["indCr29.UAA2", "indCr19.UAA2", "indAn185", "indF1", "indF2"]);



registerFormula("indCr236", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indCr30 > 0, indCr236_def + SUM(factors), 0)

  if(i(indicatorsValues, "indCr30") > 0) return SUM(def_val, factors)

  else return 0

}, ["indCr30"]);

// model ENVIRONMENT type 1 (end) /////////////////////////////////////////////////////////////////////



// model ENVIRONMENT type 2 (begin) ///////////////////////////////////////////////////////////////////

registerFormula("indF52", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr237 x indCr55.UAA1 + indCr238 x indCr55.UAA2 + indCr239 x indCr56) / paramF1_def

  return (i(indicatorsValues, "indCr237") * i(indicatorsValues, "indCr55.UAA1")

    + i(indicatorsValues, "indCr238") * i(indicatorsValues, "indCr55.UAA2")

    + i(indicatorsValues, "indCr239") * i(indicatorsValues, "indCr56")) / parameters.getDef("paramF1")

}, ["indCr237", "indCr55.UAA1", "indCr238", "indCr55.UAA2", "indCr239", "indCr56"]);



registerFormula("indF53", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr237 x indCr57.UAA1 + indCr238 x indCr57.UAA2 + indCr239 x indCr58) / paramF1_def

  return (i(indicatorsValues, "indCr237") * i(indicatorsValues, "indCr57.UAA1")

    + i(indicatorsValues, "indCr238") * i(indicatorsValues, "indCr57.UAA2")

    + i(indicatorsValues, "indCr239") * i(indicatorsValues, "indCr58")) / parameters.getDef("paramF1")

}, ["indCr237", "indCr57.UAA1", "indCr238", "indCr57.UAA2", "indCr239", "indCr58"]);



registerFormula("indF54", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr237 x indCr59.UAA1 + indCr238 x indCr59.UAA2 + indCr239 x indCr60) / paramF1_def

  return (i(indicatorsValues, "indCr237") * i(indicatorsValues, "indCr59.UAA1")

    + i(indicatorsValues, "indCr238") * i(indicatorsValues, "indCr59.UAA2")

    + i(indicatorsValues, "indCr239") * i(indicatorsValues, "indCr60")) / parameters.getDef("paramF1")

}, ["indCr237", "indCr59.UAA1", "indCr238", "indCr59.UAA2", "indCr239", "indCr60"]);



registerFormula("indF55", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr237 x indCr61.UAA1 + indCr238 x indCr61.UAA2 + indCr239 x indCr62) / paramF1_def

  return (i(indicatorsValues, "indCr237") * i(indicatorsValues, "indCr61.UAA1")

    + i(indicatorsValues, "indCr238") * i(indicatorsValues, "indCr61.UAA2")

    + i(indicatorsValues, "indCr239") * i(indicatorsValues, "indCr62")) / parameters.getDef("paramF1")

}, ["indCr237", "indCr61.UAA1", "indCr238", "indCr61.UAA2", "indCr239", "indCr62"]);



registerFormula("indF56", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr237 x indCr63.UAA1 + indCr238 x indCr63.UAA2 + indCr239 x indCr64) / paramF1_def

  return (i(indicatorsValues, "indCr237") * i(indicatorsValues, "indCr63.UAA1")

    + i(indicatorsValues, "indCr238") * i(indicatorsValues, "indCr63.UAA2")

    + i(indicatorsValues, "indCr239") * i(indicatorsValues, "indCr64")) / parameters.getDef("paramF1")

}, ["indCr237", "indCr63.UAA1", "indCr238", "indCr63.UAA2", "indCr239", "indCr64"]);



registerFormula("indF57", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn40 x indAn1 x paramF8_def x paramF9_def + indAn41 x indAn127 + indF50 x paramF8_def x paramF9_def

  return (i(indicatorsValues, "indAn40") * i(indicatorsValues, "indAn1") * parameters.getDef("paramF8") * parameters.getDef("paramF9")

    + i(indicatorsValues, "indAn41") * i(indicatorsValues, "indAn127")

    + i(indicatorsValues, "indF50") * parameters.getDef("paramF8") * parameters.getDef("paramF9"))

}, [ "indAn40", "indAn1", "indAn41", "indAn127", "indF50" ]);



registerFormula("indF58", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn127 x paramCr44_def + indAn128 x paramCr45_def + indF17 x paramCr29_def + indF19 x paramCr30_def + indF21 x paramCr31_def

  // + indF23 x paramCr32_def x paramCr46_def / 100

  // + indF24 x paramCr33_def x paramCr47_def / 100

  // + indF25 x paramCr34_def

  // + indF27 x paramCr35_def

  // + indF28 x paramCr36_def

  // + indF30 x paramCr37_def

  // + indF32 x paramCr38_def

  // + indF34 x paramCr39_def

  // + indF36 x paramCr40_def)

  // /

  // ( indF18 x paramCr29_def

  //  + indF20 x paramCr30_def

  //  + indF22 x paramCr31_def

  //  + indAn146 x paramCr41_def

  //  + indF29 x paramCr36_def

  //  + indF31 x paramCr37_def

  //  + indF33 x paramCr38_def

  //  + indF35 x paramCr39_def

  //  + indF37x paramCr40_def

  //  + indAn150 x paramCr43_def

  //  + indAn147 x paramCr42_def)



    return ( i(indicatorsValues, "indAn127") * parameters.getDef("paramCr44")

    + i(indicatorsValues, "indAn128") * parameters.getDef("paramCr45")

    + i(indicatorsValues, "indF17") * parameters.getDef("paramCr29")

    + i(indicatorsValues, "indF19") * parameters.getDef("paramCr30")

    + i(indicatorsValues, "indF21") * parameters.getDef("paramCr31")

    + i(indicatorsValues, "indF23") * parameters.getDef("paramCr32") * parameters.getDef("paramCr46") / 100

    + i(indicatorsValues, "indF24") * parameters.getDef("paramCr33") * parameters.getDef("paramCr47") / 100

    + i(indicatorsValues, "indF25") * parameters.getDef("paramCr34")

    + i(indicatorsValues, "indF27") * parameters.getDef("paramCr35")

    + i(indicatorsValues, "indF28") * parameters.getDef("paramCr36")

    + i(indicatorsValues, "indF30") * parameters.getDef("paramCr37")

    + i(indicatorsValues, "indF32") * parameters.getDef("paramCr38")

    + i(indicatorsValues, "indF34") * parameters.getDef("paramCr39")

    + i(indicatorsValues, "indF36") * parameters.getDef("paramCr40") )

    / (

      + i(indicatorsValues, "indF18") * parameters.getDef("paramCr29")

      + i(indicatorsValues, "indF20") * parameters.getDef("paramCr30")

      + i(indicatorsValues, "indF22") * parameters.getDef("paramCr31")

      + i(indicatorsValues, "indAn146") * parameters.getDef("paramCr41")

      + i(indicatorsValues, "indF29") * parameters.getDef("paramCr36")

      + i(indicatorsValues, "indF31") * parameters.getDef("paramCr37")

      + i(indicatorsValues, "indF33") * parameters.getDef("paramCr38")

      + i(indicatorsValues, "indF35") * parameters.getDef("paramCr39")

      + i(indicatorsValues, "indF37") * parameters.getDef("paramCr40")

      + i(indicatorsValues, "indAn150") * parameters.getDef("paramCr43")

      + i(indicatorsValues, "indAn147") * parameters.getDef("paramCr42")

    )



}, ["indAn127", "indAn128", "indF17", "indF19", "indF21", "indF23", "indF24", "indF25", "indF27", "indF28", "indF30", "indF32", "indF34", "indF36", "indF18", "indF20", "indF22", "indAn146", "indF29", "indF31", "indF33", "indF35", "indF37", "indAn150", "indAn147"]);



registerFormula("indF59", function(def_val, factors, parameters, indicatorsValues) {

  // =([(indF2 + (indAn185 - indF1)) x paramF10_def] + [(((indAn52 - indAn52_def x PI(factors)) x indAn1 + (indAn53 - indAn53_def x PI(factors)) x indAn2 + (indAn54 - indAn54_def x PI(factors) + indAn55 - indAn55_def x PI(factors)) x indAn3) x paramAn32_def + ((indAn56 - indAn56_def x PI(factors)) x indAn1 + (indAn57 - indAn57_def x PI(factors)) x indAn2 + (indAn58 - indAn58_def x PI(factors) + indAn59 - indAn59_def x PI(factors)) x indAn3) x paramAn33_def) x paramF11_def]) x 44 / 28



  return (

    (

        ( (i(indicatorsValues, "indF2") + i(indicatorsValues, "indAn185") - i(indicatorsValues, "indF1")) * parameters.getDef("paramF10") )

      + (

        (

          ( ( i(indicatorsValues, "indAn52") - i(indicatorsValues, "indF99") ) * i(indicatorsValues, "indAn1")

          + ( i(indicatorsValues, "indAn53") - i(indicatorsValues, "indF100") ) * i(indicatorsValues, "indAn2")

          + ( i(indicatorsValues, "indAn54") - i(indicatorsValues, "indF101") + i(indicatorsValues, "indAn55") - i(indicatorsValues, "indF102") ) * i(indicatorsValues, "indAn3") )

          * parameters.getDef("paramAn32")

          + ( ( i(indicatorsValues, "indAn56") - i(indicatorsValues, "indF103") ) * i(indicatorsValues, "indAn1")

          + ( i(indicatorsValues, "indAn57") - i(indicatorsValues, "indF104") ) * i(indicatorsValues, "indAn2")

          + ( i(indicatorsValues, "indAn58") - i(indicatorsValues, "indF105") + i(indicatorsValues, "indAn59") - i(indicatorsValues, "indF106") ) * i(indicatorsValues, "indAn3") )

          * parameters.getDef("paramAn33")

        )

        * parameters.getDef("paramF11")

      )

    ) * 44 / 28)



}, ["indF2", "indAn185", "indF1", "indAn52", "indF99", "indAn1", "indAn53", "indF100", "indAn2", "indAn54", "indF101", "indAn55", "indF102", "indAn3", "indAn56", "indF103", "indAn57", "indF104", "indAn58", "indF105", "indAn59", "indF106"]);



registerFormula("indF60", function(def_val, factors, parameters, indicatorsValues) {

  // =[(indAn52_def x PI(factors) x indAn1 + indAn53_def x PI(factors) x indAn2 + (indAn54_def x PI(factors) + indAn55_def x PI(factors)) x indAn3) x paramAn32_def + (indAn56_def x PI(factors) x indAn1 + indAn57_def x PI(factors) x indAn2 + (indAn58_def x PI(factors) + indAn59_def x PI(factors)) x indAn3) x paramAn33_def] x paramF12_def x 44 / 28



  return (

    (

      ( i(indicatorsValues, "indF99") * i(indicatorsValues, "indAn1") + i(indicatorsValues, "indF100") * i(indicatorsValues, "indAn2") + (i(indicatorsValues, "indF101") + i(indicatorsValues, "indF102")) * i(indicatorsValues, "indAn3") )

      * parameters.getDef("paramAn32") +

      ( i(indicatorsValues, "indF103") * i(indicatorsValues, "indAn1") + i(indicatorsValues, "indF104") * i(indicatorsValues, "indAn2") + (i(indicatorsValues, "indF105") + i(indicatorsValues, "indF106")) * i(indicatorsValues, "indAn3") )

      * parameters.getDef("paramAn33")

    ) * parameters.getDef("paramF12") * 44 / 28

  )

}, [ "indF99", "indAn1", "indF100", "indAn2", "indF101", "indF102", "indAn3", "indF103", "indF104", "indF105", "indF106"]);



registerFormula("indF61", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =IF(indAn52 > 0, indAn1 x (365 - indAn60) x paramF13_def, 0)

  // + IF(indAn56 > 0, indAn1 x (365 - indAn60) x paramF15_def, 0)

  // + indAn1 x indAn60 x paramF17_def

  // + IF(indAn53 > 0 AND (A.8.1. OR A.8.5.)

  //    THEN indAn2 x 365 x paramF14_def

  //    ELSE

  //      IF(indAn53 > 0 AND (A.8.2. OR A.8.6.)

  //        THEN indAn2 x 243 x paramF14_def

  //        ELSE

  //          IF(indAn53 > 0 AND (A.8.3. OR A.8.4. OR A.8.7. OR A.8.8.)

  //            THEN indAn2 x 182,5 x paramF14_def

  // )))

  // + IF(indAn57 > 0 AND (A.8.1. OR A.8.5.)

  //    THEN indAn2 x 365 x paramF16_def

  //    ELSE

  //      IF(indAn57 > 0 AND (A.8.2. OR A.8.6.)

  //        THEN indAn2 x 243 x paramF16_def

  //        ELSE

  //          IF(indAn57 > 0 AND (A.8.3. OR A.8.4. OR A.8.7. OR A.8.8.)

  //            THEN indAn2 x 182,5 x paramF16_def)))



  // + IF(A.8.1. OR A.8.5)

  //    THEN indAn2 x 0 x paramF18_def

  //    ELSE

  //      IF(A.8.2. OR A.8.6.)

  //        THEN indAn2 x 122 x paramF18_def

  //        ELSE

  //          IF(A.8.3. OR A.8.4. OR A.8.7. OR A.8.8.)

  //            THEN indAn2 x 182,5 x paramF18_def)))



  // + IF( A.3.1. AND indAn54 > 0)

  //      THEN indAn3 x 365 x paramF14_def

  //      ELSE

  //        IF(A.3.1. AND indAn58 > 0)

  //          THEN indAn3 x 365 x paramF16_def

  //          ELSE 0



  // + IF(A.3.2. AND indAn55 > 0)

  //      THEN indAn3 x 182,5 x paramF14_def

  //      ELSE

  //        IF(A.3.2. AND indAn59 > 0)

  //          THEN indAn3 x 182,5 x paramF16_def

  //          ELSE 0



  // + IF(A.3.2)

        // THEN indAn3 x 182,5 x paramF18_def



  let val = 0



  if(i(indicatorsValues, "indAn52") > 0) { val += i(indicatorsValues, "indAn1") * (365 - i(indicatorsValues, "indAn60")) * parameters.getDef("paramF13") }

  if(i(indicatorsValues, "indAn56") > 0) { val += i(indicatorsValues, "indAn1") * (365 - i(indicatorsValues, "indAn60")) * parameters.getDef("paramF15") }

  val += i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn60") * parameters.getDef("paramF17")



  if(i(indicatorsValues, "indAn53") > 0 && (AepSelected(selectedAeps, "A.8.1") ||  AepSelected(selectedAeps, "A.8.5"))) {

    val += i(indicatorsValues, "indAn2") * 365 * parameters.getDef("paramF14")

  }

  else {

    if (i(indicatorsValues, "indAn53") > 0 && (AepSelected(selectedAeps, "A.8.2") ||  AepSelected(selectedAeps, "A.8.6"))) {

      val += i(indicatorsValues, "indAn2") * 243 * parameters.getDef("paramF14")

    }

    else {

      if(i(indicatorsValues, "indAn53") > 0 && (AepSelected(selectedAeps, "A.8.3") ||  AepSelected(selectedAeps, "A.8.4") || AepSelected(selectedAeps, "A.8.7") || AepSelected(selectedAeps, "A.8.8") )) {

        val += i(indicatorsValues, "indAn2") * 182.5 * parameters.getDef("paramF14")

      }

    }

  }

  if(i(indicatorsValues, "indAn57") > 0 && (AepSelected(selectedAeps, "A.8.1") ||  AepSelected(selectedAeps, "A.8.5"))) {

    val += i(indicatorsValues, "indAn2") * 365 * parameters.getDef("paramF16")

  }

  else {

    if(i(indicatorsValues, "indAn57") > 0  && (AepSelected(selectedAeps, "A.8.2") ||  AepSelected(selectedAeps, "A.8.6"))) {

      val += i(indicatorsValues, "indAn2") * 243 * parameters.getDef("paramF16")

    } else {

      if(i(indicatorsValues, "indAn57") > 0 && (AepSelected(selectedAeps, "A.8.3") ||  AepSelected(selectedAeps, "A.8.4") || AepSelected(selectedAeps, "A.8.7") ||  AepSelected(selectedAeps, "A.8.8") )) {

        val += i(indicatorsValues, "indAn2") * 182.5 * parameters.getDef("paramF16")

      }

    }

  }



  if( AepSelected(selectedAeps, "A.8.1") ||  AepSelected(selectedAeps, "A.8.5") ) {

    val += i(indicatorsValues, "indAn2") * 0 * parameters.getDef("paramF18")

  }

  else {

    if( AepSelected(selectedAeps, "A.8.2") ||  AepSelected(selectedAeps, "A.8.6") ) {

      val += i(indicatorsValues, "indAn2") * 122 * parameters.getDef("paramF18")

    }

    else {

      if( AepSelected(selectedAeps, "A.8.3") ||  AepSelected(selectedAeps, "A.8.4") || AepSelected(selectedAeps, "A.8.7") ||  AepSelected(selectedAeps, "A.8.8") ) {

        val += i(indicatorsValues, "indAn2") * 182.5 * parameters.getDef("paramF18")

      }

    }

  }



  if( AepSelected(selectedAeps, "A.3.1") && i(indicatorsValues, "indAn54") > 0 ) {

    val += i(indicatorsValues, "indAn3") * 365 * parameters.getDef("paramF14")

  }

  else {

    if(AepSelected(selectedAeps, "A.3.1") && i(indicatorsValues, "indAn58") > 0 ) {

      val += i(indicatorsValues, "indAn3") * 365 * parameters.getDef("paramF16")

    }

  }



  if( AepSelected(selectedAeps, "A.3.2") && i(indicatorsValues, "indAn55") > 0 ) {

    val += i(indicatorsValues, "indAn3") * 182.5 * parameters.getDef("paramF14")

  } else {

    if( AepSelected(selectedAeps, "A.3.2") && i(indicatorsValues, "indAn59") > 0 ) {

      val += i(indicatorsValues, "indAn3") * 182.5 * parameters.getDef("paramF16")

    }

  }



  if( AepSelected(selectedAeps, "A.3.2") ) {

    val += i(indicatorsValues, "indAn3") * 182.5 * parameters.getDef("paramF18")

  }



  return val



}, ["indAn52", "indAn1", "indAn60", "indAn56", "indAn53", "indAn2", "indAn57", "indAn54", "indAn3", "indAn58", "indAn55", "indAn59"]);



registerFormula("indF62", function(def_val, factors, parameters, indicatorsValues) {

  return (

    i(indicatorsValues, "indAn139") * parameters.getDef("paramCr37") + i(indicatorsValues, "indAn140") * parameters.getDef("paramCr40") + i(indicatorsValues, "indAn141") * parameters.getDef("paramCr38") + i(indicatorsValues, "indAn142") * parameters.getDef("paramCr39") + i(indicatorsValues, "indAn143") * parameters.getDef("paramCr40") + i(indicatorsValues, "indAn144") * parameters.getDef("paramCr40") + i(indicatorsValues, "indAn145") * parameters.getDef("paramCr31") + i(indicatorsValues, "indAn146") * parameters.getDef("paramCr41") + i(indicatorsValues, "indAn147") * parameters.getDef("paramCr42") + i(indicatorsValues, "indAn148") * parameters.getDef("paramCr36") + i(indicatorsValues, "indAn149") * parameters.getDef("paramCr29") + i(indicatorsValues, "indAn150") * parameters.getDef("paramCr43") + i(indicatorsValues, "indAn151") * parameters.getDef("paramCr44") + ( ( i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn113") + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn114") + i(indicatorsValues, "indAn3") * (i(indicatorsValues, "indAn115") + i(indicatorsValues, "indAn116")) ) * parameters.getDef("paramCr30")) ) * parameters.getDef("paramF19")

}, ["indAn139", "indAn140", "indAn141", "indAn142", "indAn143", "indAn144", "indAn145", "indAn146", "indAn147", "indAn148", "indAn149", "indAn150", "indAn151", "indAn1", "indAn113", "indAn2", "indAn114", "indAn3", "indAn115", "indAn116"]);



registerFormula("indF64", function(def_val, factors, parameters, indicatorsValues) {

  // =indF186 x 44 /12

  return i(indicatorsValues, "indF186") * 44 / 12

}, ["indF186"]);



registerFormula("indF65", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn40 x indAn1 x paramF8_def + indF50 x paramF8_def) x paramF20_def

  return (i(indicatorsValues, "indAn40") * i(indicatorsValues, "indAn1") + i(indicatorsValues, "indF50")) * parameters.getDef("paramF8") * parameters.getDef("paramF20")

}, ["indAn40", "indAn1", "indF50"]);



registerFormula("indF66", function(def_val, factors, parameters, indicatorsValues) {

  // =((indF59 + indF60) x paramF22_def + (indF61 + indF62) x paramF21_def - indF64 + indF65) / paramF1_def

  return ( (i(indicatorsValues, "indF59") + i(indicatorsValues, "indF60")) * parameters.getDef("paramF22") + (i(indicatorsValues, "indF61") + i(indicatorsValues, "indF62")) * parameters.getDef("paramF21") - i(indicatorsValues, "indF64") + i(indicatorsValues, "indF65") ) / parameters.getDef("paramF1")

}, ["indF59", "indF60", "indF61", "indF62", "indF64", "indF65"]);



registerFormula("indF67", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

    // =(indAn136 + indAn138) x paramF24_def x IF(

    // (A.6.5 OR A.6.6 OR A.6.7 OR A.6.8 OR A.6.9 OR A.6.11)

    //  AND (A.8.2 OR A.8.3 OR A.8.4 OR A.8.6 OR A.8.7 OR A.8.8), paramF25_def,

    // IF( (A.6.5 OR A.6.6 OR A.6.7 OR A.6.8 OR A.6.9 OR A.6.11) XOR (A.8.2 OR A.8.3 OR A.8.4 OR A.8.6 OR A.8.7 OR A.8.8), paramF26_def , 1))



    let val = (i(indicatorsValues, "indAn136") + i(indicatorsValues, "indAn138")) *  parameters.getDef("paramF24")



    if(

      (AepSelected(selectedAeps, "A.6.5") || AepSelected(selectedAeps, "A.6.6") || AepSelected(selectedAeps, "A.6.7") || AepSelected(selectedAeps, "A.6.8") || AepSelected(selectedAeps, "A.6.9") || AepSelected(selectedAeps, "A.6.11"))

      && (AepSelected(selectedAeps, "A.8.2") || AepSelected(selectedAeps, "A.8.3") || AepSelected(selectedAeps, "A.8.4") || AepSelected(selectedAeps, "A.8.6") || AepSelected(selectedAeps, "A.8.7") || AepSelected(selectedAeps, "A.8.8"))

    ) {

      val *= parameters.getDef("paramF25")

    }

    else if ( (AepSelected(selectedAeps, "A.6.5") || AepSelected(selectedAeps, "A.6.6") || AepSelected(selectedAeps, "A.6.7") || AepSelected(selectedAeps, "A.6.8") || AepSelected(selectedAeps, "A.6.9") || AepSelected(selectedAeps, "A.6.11"))

    ^ (AepSelected(selectedAeps, "A.8.2") || AepSelected(selectedAeps, "A.8.3") || AepSelected(selectedAeps, "A.8.4") || AepSelected(selectedAeps, "A.8.6") || AepSelected(selectedAeps, "A.8.7") || AepSelected(selectedAeps, "A.8.8"))) {

      val *= parameters.getDef("paramF26")

    }



    return val



}, ["indAn136", "indAn138"]);



registerFormula("indF68", function(def_val, factors, parameters, indicatorsValues) {

  // = (indAn136 - indF67 x indAn136 / (indAn136 + indAn138))

  // x paramF27_def + (indAn138 - indF67 x indAn138 / (indAn136 + indAn138))

  //  x paramF28_def + indF2 x paramF29_def



  let val = (i(indicatorsValues, "indAn136") - i(indicatorsValues, "indF67") * i(indicatorsValues, "indAn136") / (i(indicatorsValues, "indAn136") + i(indicatorsValues, "indAn138"))) * parameters.getDef("paramF27")



  val += (i(indicatorsValues, "indAn138") - i(indicatorsValues, "indF67") * i(indicatorsValues, "indAn138") / (i(indicatorsValues, "indAn136") + i(indicatorsValues, "indAn138"))) * parameters.getDef("paramF28")



  val += i(indicatorsValues, "indF2") * parameters.getDef("paramF29")



  return val



}, ["indF67", "indAn136", "indAn138", "indF2"]);



registerFormula("indF69", function(def_val, factors, parameters, indicatorsValues) {

  // =(indF67 + indF68) / paramF1_def

  return ( i(indicatorsValues, "indF67") + i(indicatorsValues, "indF68") ) / parameters.getDef("paramF1")

}, ["indF67", "indF68"]);



registerFormula("indF70", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr75.UAA1 x indCr237 + indCr75.UAA2 x indCr238 + indCr76 x indCr239) / paramF1_def

  return ( i(indicatorsValues, "indCr75.UAA1") * i(indicatorsValues, "indCr237")

    + i(indicatorsValues, "indCr75.UAA2") * i(indicatorsValues, "indCr238")

    + i(indicatorsValues, "indCr76") * i(indicatorsValues, "indCr239") ) / parameters.getDef("paramF1")

}, ["indCr237", "indCr238", "indCr239", "indCr75.UAA1", "indCr75.UAA2", "indCr76"]);



registerFormula("indF96", function(def_val, factors, parameters, indicatorsValues) {

  // =indF57 / paramF1_def

  return i(indicatorsValues, "indF57") / parameters.getDef("paramF1")

}, ["indF57"]);



registerFormula("indF182", function(def_val, factors, parameters, indicatorsValues) {

  // Grassland storage (if any)

  var val = i(indicatorsValues, "indCr29.UAA1") * parameters.getDef("paramF51")



  // Annual crop losses

  if( i(indicatorsValues, "indCr29.UAA1") > 0 ) {

    val += ( i(indicatorsValues, "indCr19.UAA1") + i(indicatorsValues, "indCr20.UAA1") + i(indicatorsValues, "indCr21.UAA1") + i(indicatorsValues, "indCr22.UAA1") + i(indicatorsValues, "indCr23.UAA1") + i(indicatorsValues, "indCr24.UAA1") + i(indicatorsValues, "indCr25.UAA1") + i(indicatorsValues, "indCr26.UAA1") + i(indicatorsValues, "indCr27.UAA1") + i(indicatorsValues, "indCr28.UAA1") ) * parameters.getDef("paramF53")

  } else {

    val += (i(indicatorsValues, "indCr19.UAA1") + i(indicatorsValues, "indCr20.UAA1") + i(indicatorsValues, "indCr21.UAA1") + i(indicatorsValues, "indCr22.UAA1") + i(indicatorsValues, "indCr23.UAA1") + i(indicatorsValues, "indCr24.UAA1") + i(indicatorsValues, "indCr25.UAA1") + i(indicatorsValues, "indCr26.UAA1") + i(indicatorsValues, "indCr27.UAA1") + i(indicatorsValues, "indCr28.UAA1")) * parameters.getDef("paramF52")

  }



  return val

}, ["indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1"]);



registerFormula("indF183", function(def_val, factors, parameters, indicatorsValues) {

  // Grassland storage (if any)

  var val = i(indicatorsValues, "indCr29.UAA2") * parameters.getDef("paramF51")



  // Annual crop losses

  if( i(indicatorsValues, "indCr29.UAA2") > 0 ) {

    val += ( i(indicatorsValues, "indCr19.UAA2") + i(indicatorsValues, "indCr20.UAA2") + i(indicatorsValues, "indCr21.UAA2") + i(indicatorsValues, "indCr22.UAA2") + i(indicatorsValues, "indCr23.UAA2") + i(indicatorsValues, "indCr24.UAA2") + i(indicatorsValues, "indCr25.UAA2") + i(indicatorsValues, "indCr26.UAA2") + i(indicatorsValues, "indCr27.UAA2") + i(indicatorsValues, "indCr28.UAA2") ) * parameters.getDef("paramF53")

  } else {

    val += (i(indicatorsValues, "indCr19.UAA2") + i(indicatorsValues, "indCr20.UAA2") + i(indicatorsValues, "indCr21.UAA2") + i(indicatorsValues, "indCr22.UAA2") + i(indicatorsValues, "indCr23.UAA2") + i(indicatorsValues, "indCr24.UAA2") + i(indicatorsValues, "indCr25.UAA2") + i(indicatorsValues, "indCr26.UAA2") + i(indicatorsValues, "indCr27.UAA2") + i(indicatorsValues, "indCr28.UAA2")) * parameters.getDef("paramF52")

  }



  return val

}, ["indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF184", function(def_val, factors, parameters, indicatorsValues) {

  // Grassland storage (if any)

  return i(indicatorsValues, "indCr239") * parameters.getDef("paramF51")

}, ["indCr239"]);



registerFormula("indF185", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  var val = 0



  if( AepSelected(selectedAeps, "C.2.3") ) {

    val += parameters.getDef("paramF54") * ( i(indicatorsValues, "indF170") + i(indicatorsValues, "indF171") + i(indicatorsValues, "indF172") + i(indicatorsValues, "indF173") + i(indicatorsValues, "indF174") + i(indicatorsValues, "indF175") + i(indicatorsValues, "indF176") + i(indicatorsValues, "indF177") + i(indicatorsValues, "indF178") + i(indicatorsValues, "indF179") )

  }



  if( AepSelected(selectedAeps, "A.4.1") || AepSelected(selectedAeps, "A.4.2") || AepSelected(selectedAeps, "A.4.4") || AepSelected(selectedAeps, "A.5.2") || AepSelected(selectedAeps, "A.5.3") ) {

    if( i(indicatorsValues, "indCr265") == 1 ) {

		val += parameters.getDef("paramF64") * ( i(indicatorsValues, "indF170") + i(indicatorsValues, "indF171") + i(indicatorsValues, "indF172") + i(indicatorsValues, "indF173") + i(indicatorsValues, "indF174") + i(indicatorsValues, "indF177") + i(indicatorsValues, "indF179") + i(indicatorsValues, "indF180") + i(indicatorsValues, "indCr239") )

	} else {

		val += parameters.getDef("paramF64") / 2 * ( i(indicatorsValues, "indF170") + i(indicatorsValues, "indF171") + i(indicatorsValues, "indF172") + i(indicatorsValues, "indF173") + i(indicatorsValues, "indF174") + i(indicatorsValues, "indF177") + i(indicatorsValues, "indF179") + i(indicatorsValues, "indF180") + i(indicatorsValues, "indCr239") )

	}

  }

  if( ( AepSelected(selectedAeps, "A.4.3") || AepSelected(selectedAeps, "A.4.5") ) && ( AepSelected(selectedAeps, "A.5.1") ) ) {

    if( i(indicatorsValues, "indCr265") < 1 ) {

		val += parameters.getDef("paramF65") * ( i(indicatorsValues, "indF170") + i(indicatorsValues, "indF171") + i(indicatorsValues, "indF172") + i(indicatorsValues, "indF173") + i(indicatorsValues, "indF174") + i(indicatorsValues, "indF177") + i(indicatorsValues, "indF179") + i(indicatorsValues, "indF180") + i(indicatorsValues, "indCr239") )

	}

  }



  if( AepSelected(selectedAeps, "C.3.2") ) {

    val += parameters.getDef("paramF63") * ( i(indicatorsValues, "indF170") + i(indicatorsValues, "indF171") )

  }



  if( !AepSelected(selectedAeps, "C.14.1") && !AepSelected(selectedAeps, "C.14.4") ) {

    val += parameters.getDef("paramF51") * i(indicatorsValues, "indF139")

  }

  if( AepSelected(selectedAeps, "C.14.4") ) {

    val += ( parameters.getDef("paramF51") + parameters.getDef("paramF66") ) * i(indicatorsValues, "indF139")

  }



  if( AepSelected(selectedAeps, "C.15.2") ) {

    val += ( parameters.getDef("paramF51") + parameters.getDef("paramF66") ) * i(indicatorsValues, "indF140")

  }



  return val

}, ["indF139", "indF140", "indF170", "indF171", "indF172", "indF173", "indF174", "indF175", "indF176", "indF177", "indF178", "indF179", "indF180", "indCr239", "indCr265"]);



registerFormula("indF186", function(def_val, factors, parameters, indicatorsValues) {

  return i(indicatorsValues, "indF182") + i(indicatorsValues, "indF183") + i(indicatorsValues, "indF184") + i(indicatorsValues, "indF185")

}, ["indF182", "indF183", "indF184", "indF185"]);



registerFormula("indCr240", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr233.UAA1 × indCr237 + indCr233.UAA2 × indCr238 + indCr234 × indCr239) / paramF1_def

  return (i(indicatorsValues, "indCr233.UAA1") * i(indicatorsValues, "indCr237")

    + i(indicatorsValues, "indCr233.UAA2") * i(indicatorsValues, "indCr238")

    + i(indicatorsValues, "indCr234") * i(indicatorsValues, "indCr239")) / parameters.getDef("paramF1")

}, ["indCr233.UAA1","indCr237","indCr233.UAA2","indCr238","indCr234","indCr239"]);



registerFormula("indCr280", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr65.UAA1 x indCr237 + indCr65.UAA2 x indCr238 + indCr66 x indCr239) / paramF1_def

  return (i(indicatorsValues, "indCr237") * i(indicatorsValues, "indCr65.UAA1")

    + i(indicatorsValues, "indCr238") * i(indicatorsValues, "indCr65.UAA2")

    + i(indicatorsValues, "indCr239") * i(indicatorsValues, "indCr66")) / parameters.getDef("paramF1")

}, ["indCr65.UAA1", "indCr237", "indCr65.UAA2", "indCr238", "indCr66", "indCr239"]);



registerFormula("indCr281", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr235.UAA1 × indCr237 + indCr235.UAA2 × indCr238 + indCr236 × indCr239) / paramF1_def

  return (i(indicatorsValues, "indCr235.UAA1") * i(indicatorsValues, "indCr237") + i(indicatorsValues, "indCr235.UAA2") * i(indicatorsValues, "indCr238") + i(indicatorsValues, "indCr236") * i(indicatorsValues, "indCr239")) / parameters.getDef("paramF1")

}, ["indCr235.UAA1", "indCr235.UAA2", "indCr236", "indCr237", "indCr238", "indCr239"]);

// model ENVIRONMENT type 2 (end) /////////////////////////////////////////////////////////////////////



// model ANIMAL type 1 (begin) ////////////////////////////////////////////////////////////////////////

registerFormula("indAn1", function(def_val, factors, parameters, indicatorsValues) {

  // =((indAn158 + indAn159) / 2) x PI(factors)

  return ((i(indicatorsValues, "indAn158") + i(indicatorsValues, "indAn159")) / 2) * MULT(def_val, factors)

}, ["indAn158", "indAn159"]);



registerFormula("indAn2", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn161 + indAn162) x PI(factors)

  return (i(indicatorsValues, "indAn161") + i(indicatorsValues, "indAn162")) * MULT(def_val, factors)

}, ["indAn161", "indAn162"]);



registerFormula("indAn3", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn183 x PI(factors)

  return i(indicatorsValues, "indAn183") * MULT(def_val, factors)

}, ["indAn183"]);



registerFormula("indAn4", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn182 / 2) x PI(factors)

  return (i(indicatorsValues, "indAn182") / 2) * MULT(def_val, factors)

}, ["indAn182"]);



registerFormula("indAn5", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn158 + indAn174 - indAn159) x PI(factors)

  return (i(indicatorsValues, "indAn158") + i(indicatorsValues, "indAn174") - i(indicatorsValues, "indAn159")) * MULT(def_val, factors)

}, ["indAn158","indAn174","indAn159"]);



registerFormula("indAn6", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn184 x PI(factors)

  return i(indicatorsValues, "indAn184") * MULT(def_val, factors)

}, ["indAn184"]);



registerFormula("indAn7", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn184 x PI(factors)

  return i(indicatorsValues, "indAn184") * MULT(def_val, factors)

}, ["indAn184"]);



registerFormula("indAn8", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn176 - indAn169 - indAn171) x PI(factors)

  return (i(indicatorsValues, "indAn176") - i(indicatorsValues, "indAn169") - i(indicatorsValues, "indAn171")) * MULT(def_val, factors)

}, ["indAn176", "indAn169", "indAn171"]);



registerFormula("indAn9", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn175 - indAn168) x PI(factors)

  return (i(indicatorsValues, "indAn175") - i(indicatorsValues, "indAn168")) * MULT(def_val, factors)

}, ["indAn175", "indAn168"]);


registerFormula("indAn19", MultExcludeA7SumA7);

registerFormula("indAn22", MultExcludeA7SumA7);

registerFormula("indAn27", MultExcludeA7SumA7);

registerFormula("indAn39", MultExcludeA7SumA7);

registerFormula("indAn42", MultExcludeA7SumA7);

registerFormula("indAn52", MultExcludeA6AndA8);

registerFormula("indAn53", MultExcludeA6AndA8);

registerFormula("indAn54", MultExcludeA6AndA8);

registerFormula("indAn55", MultExcludeA6AndA8);

registerFormula("indAn56", MultExcludeA6AndA8);

registerFormula("indAn57", MultExcludeA6AndA8);

registerFormula("indAn58", MultExcludeA6AndA8);

registerFormula("indAn59", MultExcludeA6AndA8);

registerFormula("indAn61", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {
	if(AepSelected(selectedAeps, "A.6.1") || AepSelected(selectedAeps, "A.6.4") || AepSelected(selectedAeps, "A.6.5") || AepSelected(selectedAeps, "A.6.6") || AepSelected(selectedAeps, "A.6.7") || AepSelected(selectedAeps, "A.6.8")) {
		return MultExcludeA7SumA7(def_val, factors)
	} else {
		return specialMultA7(def_val, factors)
	}
});

registerFormula("indAn73", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {
	if(AepSelected(selectedAeps, "A.6.2") || AepSelected(selectedAeps, "A.6.3")) {
		return MultExcludeA7SumA7(def_val, factors)
	} else {
		return specialMultA7(def_val, factors)
	}
});

registerFormula("indAn77", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {
	if(AepSelected(selectedAeps, "A.6.10")) {
		return MultExcludeA7SumA7(def_val, factors)
	} else {
		return specialMultA7(def_val, factors)
	}
});

registerFormula("indAn81", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {
	if(AepSelected(selectedAeps, "A.6.9") || AepSelected(selectedAeps, "A.6.11")) {
		return MultExcludeA7SumA7(def_val, factors)
	} else {
		return specialMultA7(def_val, factors)
	}
});

registerFormula("indAn85", MultExcludeA7SumA7);

registerFormula("indAn93", MultExcludeA7SumA7);

registerFormula("indAn97", MultExcludeA7SumA7);

registerFormula("indAn101", MultExcludeA7SumA7);

// model ANIMAL type 1 (end) //////////////////////////////////////////////////////////////////////////



// model ANIMAL type 2 (begin) ////////////////////////////////////////////////////////////////////////

registerFormula("indAn127", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn1 x indAn19

  return i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn19")

}, ["indAn1", "indAn19"]);



registerFormula("indAn128", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn5 x indAn16 + indAn6 x indAn17 + indAn8 x indAn18

  return (

    i(indicatorsValues, "indAn5") * i(indicatorsValues, "indAn16") +

    i(indicatorsValues, "indAn6") * i(indicatorsValues, "indAn17") +

    i(indicatorsValues, "indAn8") * i(indicatorsValues, "indAn18"))

}, ["indAn5", "indAn16", "indAn6", "indAn17", "indAn8", "indAn18" ]);



registerFormula("indAn129", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn1 x indAn35 + indAn2 x indAn36 + indAn3 x (indAn37 + indAn38)

  return (

    i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn35")

    + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn36")

    + i(indicatorsValues, "indAn3") * ( i(indicatorsValues, "indAn37") + i(indicatorsValues, "indAn38") ) )

}, ["indAn1", "indAn35", "indAn2", "indAn36", "indAn3", "indAn37", "indAn38"]);



registerFormula("indAn130", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn1 x indAn39

  return i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn39")

}, ["indAn1", "indAn39"]);



registerFormula("indAn131", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn23 + indAn2 x indAn24 + indAn3 x indAn25 + indAn3 x indAn26) / (indAn1 + indAn2 + indAn3)



  return (

    ( i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn23")

    + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn24")

    + i(indicatorsValues, "indAn3") * i(indicatorsValues, "indAn25")

    + i(indicatorsValues, "indAn3") * i(indicatorsValues, "indAn26") )

    /

    ( i(indicatorsValues, "indAn1") + i(indicatorsValues, "indAn2") + i(indicatorsValues, "indAn3") )

  )

}, [ "indAn1", "indAn2", "indAn3", "indAn23", "indAn24", "indAn25", "indAn26"]);



registerFormula("indAn133", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn42 x indAn1 + indAn43 x indAn162 + indAn44 x indAn161 + indAn45 x indAn3 + indAn46 x indAn4 + indAn47) / 1000

  return (i(indicatorsValues, "indAn42") * i(indicatorsValues, "indAn1")

  + i(indicatorsValues, "indAn43") * i(indicatorsValues, "indAn162")

  + i(indicatorsValues, "indAn44") * i(indicatorsValues, "indAn161")

  + i(indicatorsValues, "indAn45") * i(indicatorsValues, "indAn3")

  + i(indicatorsValues, "indAn46") * i(indicatorsValues, "indAn4")

  + i(indicatorsValues, "indAn47") ) / 1000

}, [ "indAn1", "indAn3", "indAn4", "indAn42", "indAn43", "indAn44", "indAn45", "indAn46", "indAn47", "indAn161", "indAn162" ]);



registerFormula("indAn134", function(def_val, factors, parameters, indicatorsValues) {

  // =( indAn1 x indAn48 + indAn2 x indAn49 + indAn3 x (indAn50 + indAn51)) + ( indAn1 x indAn113 + indAn2 x indAn114 + indAn3 x (indAn115 + indAn116))

  return (

    i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn48")

    + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn49")

    + i(indicatorsValues, "indAn3") * ( i(indicatorsValues, "indAn50") + i(indicatorsValues, "indAn51") )

    + ( i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn113")

    +   i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn114")

    +  i(indicatorsValues, "indAn3") * ( i(indicatorsValues, "indAn115") + i(indicatorsValues, "indAn116") ) )

  )



}, ["indAn1", "indAn2", "indAn3", "indAn48", "indAn49", "indAn50", "indAn51", "indAn113", "indAn114", "indAn115", "indAn116"]);



registerFormula("indAn135", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn1 x indAn52 + indAn2 x indAn53 + indAn3 x (indAn54 + indAn55)

  return (

    i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn52")

    + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn53")

    + i(indicatorsValues, "indAn3") * (i(indicatorsValues, "indAn54") + i(indicatorsValues, "indAn55")) )

}, ["indAn1", "indAn2", "indAn3", "indAn52", "indAn53", "indAn54", "indAn55"]);



registerFormula("indAn137", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn1 x indAn56 + indAn2 x indAn57 + indAn3 x (indAn58 + indAn59)

  return (

    i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn56")

    + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn57")

    + i(indicatorsValues, "indAn3") * (i(indicatorsValues, "indAn58") + i(indicatorsValues, "indAn59")) )

}, ["indAn1", "indAn2", "indAn3", "indAn56", "indAn57", "indAn58", "indAn59"]);



registerFormula("indAn139", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn61 + indAn2 x indAn62 + indAn3 x (indAn63 + indAn64))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn61", "indAn2", "indAn62", "indAn3", "indAn63", "indAn64"])

}, ["indAn1", "indAn61", "indAn2", "indAn62", "indAn3", "indAn63", "indAn64"]);



registerFormula("indAn140", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn65 + indAn2 x indAn66 + indAn3 x (indAn67 + indAn68))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn65", "indAn2", "indAn66", "indAn3", "indAn67", "indAn68"])

}, ["indAn1", "indAn65", "indAn2", "indAn66", "indAn3", "indAn67", "indAn68"]);



registerFormula("indAn141", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn69 + indAn2 x indAn70 + indAn3 x (indAn71 + indAn72))

  return Ind139To151(indicatorsValues, ["indAn1","indAn69","indAn2","indAn70","indAn3","indAn71","indAn72"])

}, ["indAn1","indAn69","indAn2","indAn70","indAn3","indAn71","indAn72"]);



registerFormula("indAn142", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn73 + indAn2 x indAn74 + indAn3 x (indAn75 + indAn76))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn73", "indAn2", "indAn74", "indAn3", "indAn75", "indAn76"])

}, ["indAn1", "indAn73", "indAn2", "indAn74", "indAn3", "indAn75", "indAn76"]);



registerFormula("indAn143", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn77 + indAn2 x indAn78 + indAn3 x (indAn79 + indAn80))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn77", "indAn2", "indAn78", "indAn3", "indAn79", "indAn80"])

}, ["indAn1", "indAn77", "indAn2", "indAn78", "indAn3", "indAn79", "indAn80"]);



registerFormula("indAn144", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn81 + indAn2 x indAn82 + indAn3 x (indAn83 + indAn84))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn81", "indAn2", "indAn82", "indAn3", "indAn83", "indAn84"])

}, ["indAn1", "indAn81", "indAn2", "indAn82", "indAn3", "indAn83", "indAn84"]);



registerFormula("indAn145", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn85 + indAn2 x indAn86 + indAn3 x (indAn87 + indAn88))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn85", "indAn2", "indAn86", "indAn3", "indAn87", "indAn88"])

}, ["indAn1", "indAn85", "indAn2", "indAn86", "indAn3", "indAn87", "indAn88"]);



registerFormula("indAn146", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn89 + indAn2 x indAn90 + indAn3 x (indAn91 + indAn92))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn89", "indAn2", "indAn90", "indAn3", "indAn91", "indAn92"])

}, ["indAn1", "indAn89", "indAn2", "indAn90", "indAn3", "indAn91", "indAn92"]);



registerFormula("indAn147", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn93 + indAn2 x indAn94 + indAn3 x (indAn95 + indAn96))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn93", "indAn2", "indAn94", "indAn3", "indAn95", "indAn96"])

}, ["indAn1", "indAn93", "indAn2", "indAn94", "indAn3", "indAn95", "indAn96"]);



registerFormula("indAn148", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn97 + indAn2 x indAn98 + indAn3 x (indAn99 + indAn100))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn97", "indAn2", "indAn98", "indAn3", "indAn99", "indAn100"])

}, ["indAn1", "indAn97", "indAn2", "indAn98", "indAn3", "indAn99", "indAn100"]);



registerFormula("indAn149", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn101 + indAn2 x indAn102 + indAn3 x (indAn103 + indAn104))

  return Ind139To151(indicatorsValues, ["indAn1", "indAn101", "indAn2", "indAn102", "indAn3", "indAn103", "indAn104"])

}, ["indAn1", "indAn101", "indAn2", "indAn102", "indAn3", "indAn103", "indAn104"]);



registerFormula("indAn150", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn105 + indAn2 x indAn106 + indAn3 x (indAn107 + indAn108)) / 1000

  return Ind139To151(indicatorsValues, ["indAn1", "indAn105", "indAn2", "indAn106", "indAn3", "indAn107", "indAn108"]) / 1000

}, ["indAn1", "indAn105", "indAn2", "indAn106", "indAn3", "indAn107", "indAn108"]);



registerFormula("indAn151", function(def_val, factors, parameters, indicatorsValues) {

  // =(indAn1 x indAn109 + indAn2 x indAn110 + indAn3 x (indAn111 + indAn112)) / 1000

  return Ind139To151(indicatorsValues, ["indAn1", "indAn109", "indAn2", "indAn110", "indAn3", "indAn111", "indAn112"]) * parameters.getDef("paramF49") / (1000 * 1000)

}, ["indAn1", "indAn109", "indAn2", "indAn110", "indAn3", "indAn111", "indAn112"]);



registerFormula("indAn158", function(def_val, factors, parameters, indicatorsValues, yearNumber, indValuesPastYear) {

  // =IF(n = 1, indAn158_def, indAn159_n-1)

  var val

  if (yearNumber === 0) {

    val = def_val

  } else {

    // var indValuesPastYear = indValuesHistory[yearNumber - 1]

    val = indValuesPastYear["indAn159"]

  }

  return val

}, []);



registerFormula("indAn159", function(def_val, factors, parameters, indicatorsValues, yearNumber) {

  // =round integer of(indAn158_def × indAn15)

  var val = Math.round(parameters.getDef("indAn158") * i(indicatorsValues, "indAn15"))

  return val

}, ["indAn15"]);



registerFormula("indAn160", function(def_val, factors, parameters, indicatorsValues) {

  // =if (indAn168 > indAn165 ) then (indAn168 - indAn165 ) else (0)

  return Math.max(i(indicatorsValues, "indAn168") - i(indicatorsValues, "indAn165"), 0)

}, ["indAn165", "indAn168"]);



registerFormula("indAn161", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn180 * 9 / 12

  return i(indicatorsValues, "indAn180") * 9 / 12

}, ["indAn180"]);



registerFormula("indAn162", function(def_val, factors, parameters, indicatorsValues) {

  //=indAn181

  return i(indicatorsValues, "indAn181")

}, ["indAn181"]);



registerFormula("indAn163", function(def_val, factors, parameters, indicatorsValues) {

  // =round integer of (indAn1 × indAn12)

  return Math.round(i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn12"))

}, ["indAn1", "indAn12"]);



registerFormula("indAn164", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn168

  return i(indicatorsValues, "indAn168")

}, ["indAn168"]);



registerFormula("indAn165", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn169

  return i(indicatorsValues, "indAn169")

}, ["indAn169"]);



registerFormula("indAn166", function(def_val, factors, parameters, indicatorsValues) {

  // =round integer of (indAn170 /2)

  return Math.round(i(indicatorsValues, "indAn170") / 2)

}, ["indAn170"]);



registerFormula("indAn167", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn170 - indAn166

  return i(indicatorsValues, "indAn170") - i(indicatorsValues, "indAn166")

}, ["indAn170", "indAn166"]);



registerFormula("indAn168", function(def_val, factors, parameters, indicatorsValues) {

  // =if (indAn158 <= indAn159 ) then (round integer of (indAn158 * indAn10) - indAn158 + indAn159) else (round integer of (indAn158 * indAn10))

  if(i(indicatorsValues, "indAn158") <= i(indicatorsValues, "indAn159")) {

    return Math.round(i(indicatorsValues, "indAn158") * i(indicatorsValues, "indAn10")) - i(indicatorsValues, "indAn158") + i(indicatorsValues, "indAn159")

  } else {

    return Math.round(i(indicatorsValues, "indAn158") * i(indicatorsValues, "indAn10"))

  }

}, ["indAn158","indAn159","indAn10"]);



registerFormula("indAn169", function(def_val, factors, parameters, indicatorsValues) {

  // =round integer of (indAn176  * indA11)

  return Math.round(i(indicatorsValues, "indAn176") * i(indicatorsValues, "indAn11"))

}, ["indAn176", "indAn11"]);



registerFormula("indAn170", function(def_val, factors, parameters, indicatorsValues) {

  // = indAn177 - indAn172

  return i(indicatorsValues, "indAn177") - i(indicatorsValues, "indAn172")

}, ["indAn177", "indAn172"]);



registerFormula("indAn171", function(def_val, factors, parameters, indicatorsValues) {

  // =round integer of (indAn176 * indA14)

  return Math.round(i(indicatorsValues, "indAn176") * i(indicatorsValues, "indAn14"))

}, ["indAn176", "indAn14"]);



registerFormula("indAn172", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn177 * indAn13

  return Math.round(i(indicatorsValues, "indAn177") * i(indicatorsValues, "indAn13"))

}, ["indAn177", "indAn13"]);



registerFormula("indAn173", function(def_val, factors, parameters, indicatorsValues) {

  // = round integer of (indAn178 * indAn14 )

  return Math.round(i(indicatorsValues, "indAn178") * i(indicatorsValues, "indAn14"))

}, ["indAn178", "indAn14"]);



registerFormula("indAn174", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn164 

  return i(indicatorsValues, "indAn164")

}, ["indAn164"]);



registerFormula("indAn175", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn165  + indAn160 

  return i(indicatorsValues, "indAn165") + i(indicatorsValues, "indAn160")

}, ["indAn165", "indAn160"]);



registerFormula("indAn176", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn166 

  return i(indicatorsValues, "indAn166")

}, ["indAn166"]);



registerFormula("indAn177", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn163

  return i(indicatorsValues, "indAn163")

}, ["indAn163"]);



registerFormula("indAn178", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn167

  return i(indicatorsValues, "indAn167")

}, ["indAn167"]);



registerFormula("indAn179", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn5

  return i(indicatorsValues, "indAn5")

}, ["indAn5"]);



registerFormula("indAn180", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn9 + indAn168

  return i(indicatorsValues, "indAn9") + i(indicatorsValues, "indAn168")

}, ["indAn9", "indAn168"]);



registerFormula("indAn181", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn169  + indAn171  + indAn8 

  return i(indicatorsValues, "indAn169") + i(indicatorsValues, "indAn171") + i(indicatorsValues, "indAn8")

}, ["indAn8", "indAn169", "indAn171"]);



registerFormula("indAn182", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn170 + indAn172

  return i(indicatorsValues, "indAn170") + i(indicatorsValues, "indAn172")

}, ["indAn170", "indAn172"]);



registerFormula("indAn183", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn173 + indAn184

  return i(indicatorsValues, "indAn173") + i(indicatorsValues, "indAn184")

}, ["indAn173", "indAn184"]);



registerFormula("indAn184", function(def_val, factors, parameters, indicatorsValues) {

  // = indAn178  - indAn173

  return i(indicatorsValues, "indAn178") - i(indicatorsValues, "indAn173")

}, ["indAn178", "indAn173"]);



registerFormula("indF190", function(def_val, factors, parameters, indicatorsValues) {

	return ( i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn27") + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn28") + i(indicatorsValues, "indAn3") * ( i(indicatorsValues, "indAn29") + i(indicatorsValues, "indAn30") ) ) / ( i(indicatorsValues, "indAn1") + i(indicatorsValues, "indAn2") + i(indicatorsValues, "indAn3") )

}, ["indAn1", "indAn2", "indAn3", "indAn27", "indAn28", "indAn29", "indAn30"]);



registerFormula("indF191", function(def_val, factors, parameters, indicatorsValues) {

	return ( i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn31") + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn32") + i(indicatorsValues, "indAn3") * ( i(indicatorsValues, "indAn33") + i(indicatorsValues, "indAn34") ) ) / ( i(indicatorsValues, "indAn1") + i(indicatorsValues, "indAn2") + i(indicatorsValues, "indAn3") )

}, ["indAn1", "indAn2", "indAn3", "indAn31", "indAn32", "indAn33", "indAn34"]);

// model ANIMAL type 2 (end) //////////////////////////////////////////////////////////////////////////



// model SOCIOECO type 1 (begin) //////////////////////////////////////////////////////////////////////

registerFormula("indCr77.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr77_def + SUM(factors) + 1,34 x indCr43.UAA1

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr43.UAA1") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr77.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr77.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr77.UAA1"]

  }

  return val

}, ["indCr43.UAA1", "indF2"]);



registerFormula("indCr78.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr78_def + SUM(factors) + 1.34 x indCr44.UAA1

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr44.UAA1") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr78.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr78.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr78.UAA1"]

  }

  return val

}, ["indCr44.UAA1", "indF2"])



registerFormula("indCr79.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr79_def + SUM(factors) + 1.34 x indCr45.UAA1

  return SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr45.UAA1") )

}, ["indCr45.UAA1"])



registerFormula("indCr80.UAA1", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr80_def + SUM(factors) + 1.34 x indCr46.UAA1

  return SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr46.UAA1") )

}, ["indCr46.UAA1"])



registerFormula("indCr81.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr81_def + SUM(factors) + 1.34 x indCr47.UAA1

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr47.UAA1") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr81.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr81.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr81.UAA1"]

  }

  return val

}, ["indCr47.UAA1", "indF2"])



registerFormula("indCr82.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr82_def + SUM(factors) + 1.34 x indCr48.UAA1

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr48.UAA1") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr82.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr82.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr82.UAA1"]

  }

  return val

}, ["indCr48.UAA1", "indF2"])



registerFormula("indCr83.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr83_def + SUM(factors) + 1.34 x indCr49.UAA1

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr49.UAA1") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr83.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr83.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr83.UAA1"]

  }

  return val

}, ["indCr49.UAA1", "indF2"])



registerFormula("indCr84.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr84_def + SUM(factors) + 1.34 x indCr50.UAA1

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr50.UAA1") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr84.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr84.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr84.UAA1"]

  }

  return val

}, ["indCr50.UAA1", "indF2"])



registerFormula("indCr85.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr85_def + SUM(factors) + 1.34 x indCr51.UAA1

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr51.UAA1") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr85.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr85.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr85.UAA1"]

  }

  return val

}, ["indCr51.UAA1", "indF2"])



registerFormula("indCr86.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr86_def + SUM(factors) + 1.34 x indCr52.UAA1

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr52.UAA1") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr86.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr86.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr86.UAA1"]

  }

  return val

}, ["indCr52.UAA1", "indF2"])



registerFormula("indCr87.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =IF(C9.2 OR C9.3, indCr87_def + SUM(factors, except those of A.4 AND A.5) + 1.34 x indCr53.UAA1, indCr87_def + SUM(factors) + 1.34 x indCr53.UAA1)

  var val = 0

  var sum = 0

  if(AepSelected(selectedAeps, "C.9.2") || AepSelected(selectedAeps, "C.9.3")) {

    // SUM(factors, except those of A.4 AND A.5)

    let new_factors = {}

    Object.keys(factors)

      .filter(f_key => f_key.indexOf("A.4") === -1 && f_key.indexOf("A.5") === -1) // removing A.4.* and A.5.* factors

      .forEach(f_key => { new_factors[f_key] = factors[f_key] });



    sum = SUM(def_val, new_factors)

  } else {

    sum = SUM(def_val, factors)

  }

  val += sum + 1.34 * i(indicatorsValues, "indCr53.UAA1")

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr87.UAA1"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr87.UAA1"] === void 0)) val += allFactors["C.4.2"]["indCr87.UAA1"]

  }

  return val

}, ["indCr53.UAA1", "indF2"]);



registerFormula("indCr77.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr77_def + SUM(factors) + 1,34 x indCr43.UAA2

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr43.UAA2") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr77.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr77.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr77.UAA2"]

  }

  return val

}, ["indCr43.UAA2", "indF2"]);



registerFormula("indCr78.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr78_def + SUM(factors) + 1,34 x indCr44.UAA2

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr44.UAA2") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr78.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr78.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr78.UAA2"]

  }

  return val

}, ["indCr44.UAA2", "indF2"]);



registerFormula("indCr79.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr79_def + SUM(factors) + 1.34 x indCr45.UAA2

  return SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr45.UAA2") )

}, ["indCr45.UAA2"])



registerFormula("indCr80.UAA2", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr80_def + SUM(factors) + 1.34 x indCr46.UAA2

  return SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr46.UAA2") )

}, ["indCr46.UAA2"])



registerFormula("indCr81.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr78_def + SUM(factors) + 1,34 x indCr47.UAA2

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr47.UAA2") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr81.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr81.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr81.UAA2"]

  }

  return val

}, ["indCr47.UAA2", "indF2"]);



registerFormula("indCr82.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr82_def + SUM(factors) + 1.34 x indCr48.UAA2

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr48.UAA2") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr82.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr82.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr82.UAA2"]

  }

  return val

}, ["indCr48.UAA2", "indF2"])



registerFormula("indCr83.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr83_def + SUM(factors) + 1.34 x indCr49.UAA2

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr49.UAA2") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr83.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr83.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr83.UAA2"]

  }

  return val

}, ["indCr49.UAA2", "indF2"])



registerFormula("indCr84.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr84_def + SUM(factors) + 1.34 x indCr50.UAA2

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr50.UAA2") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr84.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr84.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr84.UAA2"]

  }

  return val

}, ["indCr50.UAA2", "indF2"])



registerFormula("indCr85.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr85_def + SUM(factors) + 1.34 x indCr51.UAA2

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr51.UAA2") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr85.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr85.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr85.UAA2"]

  }

  return val

}, ["indCr51.UAA2", "indF2"])



registerFormula("indCr86.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =indCr86_def + SUM(factors) + 1.34 x indCr52.UAA2

  var val

  val = SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr52.UAA2") )

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr86.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr86.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr86.UAA2"]

  }

  return val

}, ["indCr52.UAA2", "indF2"])



registerFormula("indCr87.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  // =IF(C9.2 OR C9.3, indCr87_def + SUM(factors, except those of A.4 AND A.5) + 1.34 x indCr53.UAA2, indCr87_def + SUM(factors) + 1.34 x indCr53.UAA2)

  var val = 0

  var sum = 0

  if(AepSelected(selectedAeps, "C.9.2") || AepSelected(selectedAeps, "C.9.3")) {

    // SUM(factors, except those of A.4 AND A.5)

    let new_factors = {}

    Object.keys(factors)

      .filter(f_key => f_key.indexOf("A.4") === -1 && f_key.indexOf("A.5") === -1) // removing A.4.* and A.5.* factors

      .forEach(f_key => { new_factors[f_key] = factors[f_key] });



    sum = SUM(def_val, new_factors)

  } else {

    sum = SUM(def_val, factors)

  }

  val += sum + 1.34 * i(indicatorsValues, "indCr53.UAA2")

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indCr87.UAA2"] === void 0)) val -= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indCr87.UAA2"] === void 0)) val += allFactors["C.4.2"]["indCr87.UAA2"]

  }

  return val

}, ["indCr53.UAA2", "indF2"]);



registerFormula("indCr88", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr88_def + SUM(factors) + 1.34 x indCr54

  return SUM(def_val, factors) + ( 1.34 * i(indicatorsValues, "indCr54") )

}, ["indCr54"])



registerFormula("indCr89.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr89.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr90.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr90.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr91.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr91.UAA1 March") }, ["indF2"]);

registerFormula("indCr92.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr92.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr93.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr93.UAA1 May") }, ["indF2"]);

registerFormula("indCr94.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr94.UAA1 June") }, ["indF2"]);

registerFormula("indCr95.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr95.UAA1 July") }, ["indF2"]);

registerFormula("indCr96.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr96.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr97.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr97.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr98.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr98.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr99.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr99.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr100.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr100.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr101.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr101.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr102.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr102.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr103.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr103.UAA1 March") }, ["indF2"]);

registerFormula("indCr104.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr104.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr105.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr105.UAA1 May") }, ["indF2"]);

registerFormula("indCr106.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr106.UAA1 June") }, ["indF2"]);

registerFormula("indCr107.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr107.UAA1 July") }, ["indF2"]);

registerFormula("indCr108.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr108.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr109.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr109.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr110.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr110.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr111.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr111.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr112.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr112.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr113.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr113.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr114.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr114.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr115.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr115.UAA1 March") }, ["indF2"]);

registerFormula("indCr116.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr116.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr117.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr117.UAA1 May") }, ["indF2"]);

registerFormula("indCr118.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr118.UAA1 June") }, ["indF2"]);

registerFormula("indCr119.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr119.UAA1 July") }, ["indF2"]);

registerFormula("indCr120.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr120.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr121.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr121.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr122.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr122.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr123.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr123.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr124.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr124.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr125.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr125.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr126.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr126.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr127.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr127.UAA1 March") }, ["indF2"]);

registerFormula("indCr128.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr128.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr129.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr129.UAA1 May") }, ["indF2"]);

registerFormula("indCr130.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr130.UAA1 June") }, ["indF2"]);

registerFormula("indCr131.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr131.UAA1 July") }, ["indF2"]);

registerFormula("indCr132.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr132.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr133.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr133.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr134.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr134.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr135.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr135.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr136.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr136.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr137.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr137.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr138.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr138.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr139.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr139.UAA1 March") }, ["indF2"]);

registerFormula("indCr140.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr140.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr141.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr141.UAA1 May") }, ["indF2"]);

registerFormula("indCr142.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr142.UAA1 June") }, ["indF2"]);

registerFormula("indCr143.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr143.UAA1 July") }, ["indF2"]);

registerFormula("indCr144.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr144.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr145.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr145.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr146.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr146.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr147.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr147.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr148.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr148.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr149.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr149.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr150.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr150.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr151.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr151.UAA1 March") }, ["indF2"]);

registerFormula("indCr152.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr152.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr153.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr153.UAA1 May") }, ["indF2"]);

registerFormula("indCr154.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr154.UAA1 June") }, ["indF2"]);

registerFormula("indCr155.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr155.UAA1 July") }, ["indF2"]);

registerFormula("indCr156.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr156.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr157.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr157.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr158.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr158.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr159.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr159.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr160.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr160.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr161.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr161.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr162.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr162.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr163.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr163.UAA1 March") }, ["indF2"]);

registerFormula("indCr164.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr164.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr165.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr165.UAA1 May") }, ["indF2"]);

registerFormula("indCr166.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr166.UAA1 June") }, ["indF2"]);

registerFormula("indCr167.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr167.UAA1 July") }, ["indF2"]);

registerFormula("indCr168.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr168.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr169.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr169.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr170.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr170.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr171.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr171.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr172.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr172.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr173.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr173.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr174.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr174.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr175.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr175.UAA1 March") }, ["indF2"]);

registerFormula("indCr176.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr176.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr177.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr177.UAA1 May") }, ["indF2"]);

registerFormula("indCr178.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr178.UAA1 June") }, ["indF2"]);

registerFormula("indCr179.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr179.UAA1 July") }, ["indF2"]);

registerFormula("indCr180.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr180.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr181.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr181.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr182.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr182.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr183.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr183.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr184.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr184.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr185.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr185.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr186.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr186.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr187.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr187.UAA1 March") }, ["indF2"]);

registerFormula("indCr188.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr188.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr189.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr189.UAA1 May") }, ["indF2"]);

registerFormula("indCr190.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr190.UAA1 June") }, ["indF2"]);

registerFormula("indCr191.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr191.UAA1 July") }, ["indF2"]);

registerFormula("indCr192.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr192.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr193.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr193.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr194.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr194.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr195.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr195.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr196.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr196.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr197.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr197.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr198.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr198.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr199.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr199.UAA1 March") }, ["indF2"]);

registerFormula("indCr200.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr200.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr201.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr201.UAA1 May") }, ["indF2"]);

registerFormula("indCr202.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr202.UAA1 June") }, ["indF2"]);

registerFormula("indCr203.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr203.UAA1 July") }, ["indF2"]);

registerFormula("indCr204.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr204.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr205.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr205.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr206.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr206.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr207.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr207.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr208.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr208.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr209.UAA1 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr209.UAA1 Jan") }, ["indF2"]);

registerFormula("indCr210.UAA1 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr210.UAA1 Feb") }, ["indF2"]);

registerFormula("indCr211.UAA1 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr211.UAA1 March") }, ["indF2"]);

registerFormula("indCr212.UAA1 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr212.UAA1 Apr") }, ["indF2"]);

registerFormula("indCr213.UAA1 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr213.UAA1 May") }, ["indF2"]);

registerFormula("indCr214.UAA1 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr214.UAA1 June") }, ["indF2"]);

registerFormula("indCr215.UAA1 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr215.UAA1 July") }, ["indF2"]);

registerFormula("indCr216.UAA1 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr216.UAA1 Aug") }, ["indF2"]);

registerFormula("indCr217.UAA1 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr217.UAA1 Sept") }, ["indF2"]);

registerFormula("indCr218.UAA1 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr218.UAA1 Oct") }, ["indF2"]);

registerFormula("indCr219.UAA1 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr219.UAA1 Nov") }, ["indF2"]);

registerFormula("indCr220.UAA1 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr220.UAA1 Dec") }, ["indF2"]);

registerFormula("indCr89.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr89.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr90.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr90.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr91.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr91.UAA2 March") }, ["indF2"]);

registerFormula("indCr92.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr92.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr93.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr93.UAA2 May") }, ["indF2"]);

registerFormula("indCr94.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr94.UAA2 June") }, ["indF2"]);

registerFormula("indCr95.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr95.UAA2 July") }, ["indF2"]);

registerFormula("indCr96.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr96.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr97.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr97.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr98.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr98.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr99.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr99.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr100.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr100.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr101.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr101.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr102.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr102.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr103.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr103.UAA2 March") }, ["indF2"]);

registerFormula("indCr104.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr104.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr105.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr105.UAA2 May") }, ["indF2"]);

registerFormula("indCr106.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr106.UAA2 June") }, ["indF2"]);

registerFormula("indCr107.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr107.UAA2 July") }, ["indF2"]);

registerFormula("indCr108.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr108.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr109.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr109.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr110.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr110.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr111.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr111.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr112.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr112.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr113.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr113.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr114.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr114.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr115.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr115.UAA2 March") }, ["indF2"]);

registerFormula("indCr116.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr116.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr117.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr117.UAA2 May") }, ["indF2"]);

registerFormula("indCr118.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr118.UAA2 June") }, ["indF2"]);

registerFormula("indCr119.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr119.UAA2 July") }, ["indF2"]);

registerFormula("indCr120.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr120.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr121.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr121.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr122.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr122.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr123.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr123.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr124.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr124.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr125.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr125.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr126.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr126.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr127.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr127.UAA2 March") }, ["indF2"]);

registerFormula("indCr128.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr128.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr129.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr129.UAA2 May") }, ["indF2"]);

registerFormula("indCr130.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr130.UAA2 June") }, ["indF2"]);

registerFormula("indCr131.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr131.UAA2 July") }, ["indF2"]);

registerFormula("indCr132.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr132.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr133.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr133.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr134.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr134.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr135.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr135.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr136.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr136.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr137.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr137.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr138.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr138.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr139.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr139.UAA2 March") }, ["indF2"]);

registerFormula("indCr140.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr140.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr141.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr141.UAA2 May") }, ["indF2"]);

registerFormula("indCr142.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr142.UAA2 June") }, ["indF2"]);

registerFormula("indCr143.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr143.UAA2 July") }, ["indF2"]);

registerFormula("indCr144.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr144.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr145.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr145.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr146.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr146.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr147.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr147.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr148.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr148.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr149.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr149.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr150.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr150.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr151.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr151.UAA2 March") }, ["indF2"]);

registerFormula("indCr152.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr152.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr153.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr153.UAA2 May") }, ["indF2"]);

registerFormula("indCr154.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr154.UAA2 June") }, ["indF2"]);

registerFormula("indCr155.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr155.UAA2 July") }, ["indF2"]);

registerFormula("indCr156.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr156.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr157.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr157.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr158.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr158.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr159.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr159.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr160.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr160.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr161.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr161.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr162.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr162.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr163.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr163.UAA2 March") }, ["indF2"]);

registerFormula("indCr164.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr164.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr165.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr165.UAA2 May") }, ["indF2"]);

registerFormula("indCr166.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr166.UAA2 June") }, ["indF2"]);

registerFormula("indCr167.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr167.UAA2 July") }, ["indF2"]);

registerFormula("indCr168.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr168.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr169.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr169.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr170.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr170.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr171.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr171.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr172.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr172.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr173.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr173.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr174.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr174.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr175.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr175.UAA2 March") }, ["indF2"]);

registerFormula("indCr176.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr176.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr177.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr177.UAA2 May") }, ["indF2"]);

registerFormula("indCr178.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr178.UAA2 June") }, ["indF2"]);

registerFormula("indCr179.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr179.UAA2 July") }, ["indF2"]);

registerFormula("indCr180.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr180.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr181.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr181.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr182.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr182.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr183.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr183.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr184.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr184.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr185.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr185.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr186.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr186.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr187.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr187.UAA2 March") }, ["indF2"]);

registerFormula("indCr188.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr188.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr189.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr189.UAA2 May") }, ["indF2"]);

registerFormula("indCr190.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr190.UAA2 June") }, ["indF2"]);

registerFormula("indCr191.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr191.UAA2 July") }, ["indF2"]);

registerFormula("indCr192.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr192.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr193.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr193.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr194.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr194.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr195.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr195.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr196.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr196.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr197.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr197.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr198.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr198.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr199.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr199.UAA2 March") }, ["indF2"]);

registerFormula("indCr200.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr200.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr201.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr201.UAA2 May") }, ["indF2"]);

registerFormula("indCr202.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr202.UAA2 June") }, ["indF2"]);

registerFormula("indCr203.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr203.UAA2 July") }, ["indF2"]);

registerFormula("indCr204.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr204.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr205.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr205.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr206.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr206.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr207.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr207.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr208.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr208.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr209.UAA2 Jan", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr209.UAA2 Jan") }, ["indF2"]);

registerFormula("indCr210.UAA2 Feb", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr210.UAA2 Feb") }, ["indF2"]);

registerFormula("indCr211.UAA2 March", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr211.UAA2 March") }, ["indF2"]);

registerFormula("indCr212.UAA2 Apr", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr212.UAA2 Apr") }, ["indF2"]);

registerFormula("indCr213.UAA2 May", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr213.UAA2 May") }, ["indF2"]);

registerFormula("indCr214.UAA2 June", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr214.UAA2 June") }, ["indF2"]);

registerFormula("indCr215.UAA2 July", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr215.UAA2 July") }, ["indF2"]);

registerFormula("indCr216.UAA2 Aug", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr216.UAA2 Aug") }, ["indF2"]);

registerFormula("indCr217.UAA2 Sept", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr217.UAA2 Sept") }, ["indF2"]);

registerFormula("indCr218.UAA2 Oct", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr218.UAA2 Oct") }, ["indF2"]);

registerFormula("indCr219.UAA2 Nov", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr219.UAA2 Nov") }, ["indF2"]);

registerFormula("indCr220.UAA2 Dec", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr220.UAA2 Dec") }, ["indF2"]);

registerFormula("indCr221", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr221") }, ["indF2"]);

registerFormula("indCr222", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr222") }, ["indF2"]);

registerFormula("indCr223", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr223") }, ["indF2"]);

registerFormula("indCr224", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr224") }, ["indF2"]);

registerFormula("indCr225", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr225") }, ["indF2"]);

registerFormula("indCr226", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr226") }, ["indF2"]);

registerFormula("indCr227", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr227") }, ["indF2"]);

registerFormula("indCr228", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr228") }, ["indF2"]);

registerFormula("indCr229", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr229") }, ["indF2"]);

registerFormula("indCr230", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr230") }, ["indF2"]);

registerFormula("indCr231", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr231") }, ["indF2"]);

registerFormula("indCr232", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) { return SUMindF2(def_val, factors, indicatorsValues, selectedAeps, allFactors, "indCr232") }, ["indF2"]);



registerFormula("indEc1.UAA1", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  var val

  val = MULT(def_val, factors)

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indEc1.UAA1"] === void 0)) val /= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indEc1.UAA1"] === void 0)) val *= allFactors["C.4.2"]["indEc1.UAA1"]

  }

  return val

}, ["indF2"]);



registerFormula("indEc1.UAA2", function(def_val, factors, parameters, indicatorsValues, yearNumber, previousIndicatorsValues, selectedAeps, prevSelectedAeps, allFactors) {

  var val

  val = MULT(def_val, factors)

  if(i(indicatorsValues, "indF2") == 0 && AepSelected(selectedAeps, "C.4.1")) {

    if(!(allFactors["C.4.1"]["indEc1.UAA2"] === void 0)) val /= factors["C.4.1"]
    if(!(allFactors["C.4.2"]["indEc1.UAA2"] === void 0)) val *= allFactors["C.4.2"]["indEc1.UAA2"]

  }

  return val

}, ["indF2"]);



registerFormula("indEc2", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(PI(factors) <= 0.8^2, indEc2_def x 0.8, indEc2_def)

  if(MULT(1, factors) <= 0.8 * 0.8 ) {

    return def_val * 0.8

  } else {

    return def_val

  }

}, []);



registerFormula("indEc3", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(SUM(factors) <> 6, 0, indEc3_def)

  if(SUM(0, factors) != 6 ) {

    return 0

  } else {

    return def_val

  }

}, []);



registerFormula("indAn126", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps, prevSelectedAeps) {

  if(yearNumber === 0) return 0



  var val = def_val



  var changedAeps = selectedAeps.filter(x => !prevSelectedAeps.includes(x))



  var wasA4modified = changedAeps.filter(aepId => aepId.indexOf("A.4") > -1).length > 0

  var wasA5modified = changedAeps.filter(aepId => aepId.indexOf("A.5") > -1).length > 0

  var wasC152modified = changedAeps.filter(aepId => aepId.indexOf("C.15.2") > -1).length > 0



  var sumF187F188 = i(indicatorsValues, "indF187") + i(indicatorsValues, "indF188")

  if(AepSelected(selectedAeps, "A.2.3") && sumF187F188 < 2) {

	val += parameters.getDef("indAn158") * (i(indicatorsValues, "indAn15") - 1) * parameters.getDef("paramAn34")

  }



  if(AepSelected(selectedAeps, "A.2.4") && i(indicatorsValues, "indF188") < 2) {

	if(i(indicatorsValues, "indF187") < 1) {

		val += ( parameters.getDef("indAn158") * (i(indicatorsValues, "indAn15") - 1) * parameters.getDef("paramAn34") ) + parameters.getDef("paramF55")

	} else {

		val += ( parameters.getDef("indAn158") * ((i(indicatorsValues, "indAn15") - 1) / 2) * parameters.getDef("paramAn34") ) + parameters.getDef("paramF55")

	}

  }



  if(wasA4modified) {

    if(i(indicatorsValues, "indAn1") <= 120 ) {

      val += SUM(0, factors)

    } else {

      val += SUM(0, factors) + 60000

    }

  }



  if(wasA5modified) {

    if(AepSelected(selectedAeps, "A.5.1")) {

      val += (i(indicatorsValues, "indAn2") + i(indicatorsValues, "indAn3")) *  parameters.getDef("paramAn35")

    }

    else if(AepSelected(selectedAeps, "A.5.2") || AepSelected(selectedAeps, "A.5.3")) {

      val += (i(indicatorsValues, "indAn2") + i(indicatorsValues, "indAn3")) * parameters.getDef("paramAn36")

    }

  }



  if(wasC152modified) {

    val += parameters.getDef("paramF23") * (parameters.getDef("paramF1") - i(indicatorsValues, "indCr239"))

  }



  return val

}, ["indAn1", "indAn158", "indAn159", "indAn2", "indAn3", "indCr239", "indF187", "indF188", "indAn15"]);



registerFormula("indGl1", SUM)

registerFormula("indGl2", SUM)

// model SOCIOECO type 1 (end) ////////////////////////////////////////////////////////////////////////



// model SOCIOECO type 2 (begin) //////////////////////////////////////////////////////////////////////

registerFormula("indF40", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =(indF18 x paramAn28_def + indF20 x paramAn31_def + indF22 x paramAn26_def + indF29 x paramAn27_def + indF31 x paramAn20_def + indF33 x paramAn22_def + indF35 x paramAn23_def + indF37 x paramAn21_def + indF26 x paramAn18_def + indAn147 x paramAn19_def + indF38 x paramAn29_def) x IF(G.1.1, 1, 1 + paramAn5_def)



  var val = (

    i(indicatorsValues, "indF18") * parameters.getDef("paramAn28") +

    i(indicatorsValues, "indF20") * parameters.getDef("paramAn31") +

    i(indicatorsValues, "indF22") * parameters.getDef("paramAn26") +

    i(indicatorsValues, "indF29") * parameters.getDef("paramAn27") +

    i(indicatorsValues, "indF31") * parameters.getDef("paramAn20") +

    i(indicatorsValues, "indF33") * parameters.getDef("paramAn22") +

    i(indicatorsValues, "indF35") * parameters.getDef("paramAn23") +

    i(indicatorsValues, "indF37") * parameters.getDef("paramAn21") +

    i(indicatorsValues, "indF26") * parameters.getDef("paramAn18") +

    i(indicatorsValues, "indAn147") * parameters.getDef("paramAn19") +

    i(indicatorsValues, "indF38") * parameters.getDef("paramAn29")

  )

  if(AepSelected(selectedAeps, "G.1.1")) {

    return val

  } else {

    return val * (1 + parameters.getDef("paramAn5"))

  }

}, ["indF18", "indF20", "indF22", "indF29", "indF31", "indF33", "indF35", "indF37", "indF26", "indAn147", "indF38"]);



registerFormula("indF41", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =IF(G1.1, indAn127 x paramAn1_def / 1000, indAn127 x (paramAn1_def + paramAn2_def) / 1000)

  if(AepSelected(selectedAeps, "G.1.1")) {

    return i(indicatorsValues, "indAn127") * parameters.getDef("paramAn1") / 1000

  } else {

    return i(indicatorsValues, "indAn127") * (parameters.getDef("paramAn1") + parameters.getDef("paramAn2")) / 1000

  }

}, ["indAn127"]);



registerFormula("indF42", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =IF(A.1.1)

  // THEN indAn5 x indAn16 x paramAn6_def + indAn6 x indAn17 x paramAn7_def + indAn7 x paramAn8_def + indAn8 x indAn18 x paramAn7_def + indAn9 x paramAn9_def,

  // ELSE IF(A.1.2)

    // THEN indAn5 x indAn16 x paramAn10_def + indAn6 x indAn17 x paramAn11_def + indAn7 x paramAn12_def + indAn8 x indAn18 x paramAn11_def + indAn9 x paramAn13_def,

    // ELSE IF(A.1.3)

      // THEN indAn5 x indAn16 x paramAn14_def + indAn6 x indAn17 x paramAn15_def + indAn7 x paramAn16_def + indAn8 x indAn18 x paramAn15_def + indAn9 x paramAn17_def

      // ELSE 0))) x IF(G.1.1, 1, 1 + paramAn5_def)

  let val

  if(AepSelected(selectedAeps, "A.1.1")) {

    // indAn5 x indAn16 x paramAn6_def + indAn6 x indAn17 x paramAn7_def + indAn7 x paramAn8_def + indAn8 x indAn18 x paramAn7_def + indAn9 x paramAn9_def,

    val = ( i(indicatorsValues, "indAn5") * i(indicatorsValues, "indAn16") * parameters.getDef("paramAn6")

    + i(indicatorsValues, "indAn6") * i(indicatorsValues, "indAn17") * parameters.getDef("paramAn7")

    + i(indicatorsValues, "indAn7") * parameters.getDef("paramAn8")

    + i(indicatorsValues, "indAn8") * i(indicatorsValues, "indAn18") * parameters.getDef("paramAn7")

    + i(indicatorsValues, "indAn9") * parameters.getDef("paramAn9") )

  } else if(AepSelected(selectedAeps, "A.1.2")) {

    // indAn5 x indAn16 x paramAn10_def + indAn6 x indAn17 x paramAn11_def + indAn7 x paramAn12_def + indAn8 x indAn18 x paramAn11_def + indAn9 x paramAn13_def

   val = ( i(indicatorsValues, "indAn5") * i(indicatorsValues, "indAn16") * parameters.getDef("paramAn10")

    + i(indicatorsValues, "indAn6") * i(indicatorsValues, "indAn17") * parameters.getDef("paramAn11")

    + i(indicatorsValues, "indAn7") * parameters.getDef("paramAn12")

    + i(indicatorsValues, "indAn8") * i(indicatorsValues, "indAn18") * parameters.getDef("paramAn11")

    + i(indicatorsValues, "indAn9") * parameters.getDef("paramAn13") )

  } else if(AepSelected(selectedAeps, "A.1.3")) {

    // indAn5 x indAn16 x paramAn14_def + indAn6 x indAn17 x paramAn15_def + indAn7 x paramAn16_def + indAn8 x indAn18 x paramAn15_def + indAn9 x paramAn17_def

    val =( i(indicatorsValues, "indAn5") * i(indicatorsValues, "indAn16") * parameters.getDef("paramAn14")

    + i(indicatorsValues, "indAn6") * i(indicatorsValues, "indAn17") * parameters.getDef("paramAn15")

    + i(indicatorsValues, "indAn7") * parameters.getDef("paramAn16")

    + i(indicatorsValues, "indAn8") * i(indicatorsValues, "indAn18") * parameters.getDef("paramAn15")

    + i(indicatorsValues, "indAn9") * parameters.getDef("paramAn17") )

  } else {

    val = 0

  }



  if(!AepSelected(selectedAeps, "G.1.1")) {

    val = val * (1 + parameters.getDef("paramAn5"))

  }



  return val

}, ["indAn5", "indAn6", "indAn7", "indAn8", "indAn9", "indAn16", "indAn17", "indAn18"]);



registerFormula("indF43", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =indAn129 + indAn130 + indAn40 x indAn1 x paramF5_def + indAn41 x indAn127 x paramF50_def + indAn133 x paramF3_def + IF(A.1.1, indAn160 x paramAn9_def, IF(A.1.2, indAn160 x paramAn13_def, indAn160 x paramAn17_def, 0)) x IF(G.1.1, 1, 1 + paramAn5_def) + paramF58 x paramF1

  let val = 0

  if(AepSelected(selectedAeps, "A.1.1")) {

    val += i(indicatorsValues, "indAn160") * parameters.getDef("paramAn9")

  } else if(AepSelected(selectedAeps, "A.1.2")) {

    val += i(indicatorsValues, "indAn160") * parameters.getDef("paramAn13")

  } else {

    val += i(indicatorsValues, "indAn160") * parameters.getDef("paramAn17")

  }



  if(!AepSelected(selectedAeps, "G.1.1")) {

    val = val * (1 + parameters.getDef("paramAn5"))

  }



  val += i(indicatorsValues, "indAn129") + i(indicatorsValues, "indAn130") + (i(indicatorsValues, "indAn40") * i(indicatorsValues, "indAn1") * parameters.getDef("paramF5")) + (i(indicatorsValues, "indAn41") * i(indicatorsValues, "indAn127") * parameters.getDef("paramF50")) + i(indicatorsValues, "indAn133") * parameters.getDef("paramF3") + parameters.getDef("paramF58") * parameters.getDef("paramF1")



  return val

}, [ "indAn129", "indAn130", "indAn40", "indAn1", "indAn41", "indAn127", "indAn133", "indAn160" ]);



registerFormula("indF44", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =(indF17 x paramCr9_def + indF21 x paramCr7_def + indF23 x paramCr25_def + indF24 x paramCr28_def + indF25 x paramCr26_def + indF27 x paramCr27_def + indF28 x paramCr8_def + indF30 x paramCr1_def + indF32 x paramCr3_def + indF34 x paramCr4_def + indF36 x paramCr2_def + indF19 x paramCr10_def) x IF(G.1.1, 1, 1 + paramAn5_def)

  let val = (

    i(indicatorsValues, "indF17") * parameters.getDef("paramCr9") +

    i(indicatorsValues, "indF21") * parameters.getDef("paramCr7") +

    i(indicatorsValues, "indF23") * parameters.getDef("paramCr25") +

    i(indicatorsValues, "indF24") * parameters.getDef("paramCr28") +

    i(indicatorsValues, "indF25") * parameters.getDef("paramCr26") +

    i(indicatorsValues, "indF27") * parameters.getDef("paramCr27") +

    i(indicatorsValues, "indF28") * parameters.getDef("paramCr8") +

    i(indicatorsValues, "indF30") * parameters.getDef("paramCr1") +

    i(indicatorsValues, "indF32") * parameters.getDef("paramCr3")+

    i(indicatorsValues, "indF34") * parameters.getDef("paramCr4") +

    i(indicatorsValues, "indF36") * parameters.getDef("paramCr2") +

    i(indicatorsValues, "indF19") * parameters.getDef("paramCr10")

  )

  if(!AepSelected(selectedAeps, "G.1.1")) {

    val = val * (1 + parameters.getDef("paramAn5"))

  }

  return val

}, ["indF17", "indF19", "indF21", "indF23", "indF24", "indF25", "indF27", "indF28", "indF30", "indF32", "indF34", "indF36" ]);



registerFormula("indF45", function(def_val, factors, parameters, indicatorsValues) {

  // =indF137 + indF136

  return i(indicatorsValues, "indF137") + i(indicatorsValues, "indF136")

}, ["indF137", "indF136"]);



registerFormula("indF46", function(def_val, factors, parameters, indicatorsValues) {

  // =indF48 * paramCr11_def

  return i(indicatorsValues, "indF48") * parameters.getDef("paramCr11")

}, ["indF48"]);



registerFormula("indF47", function(def_val, factors, parameters, indicatorsValues) {

  // =indF50 * paramF5_def

  return i(indicatorsValues, "indF50") * parameters.getDef("paramF5")

}, ["indF50"]);



registerFormula("indF50", function(def_val, factors, parameters, indicatorsValues) {

  // =indCr19.UAA1 * indCr77.UAA1 + indCr20.UAA1 * indCr78.UAA1 + indCr21.UAA1 * indCr79.UAA1 + indCr22.UAA1 * indCr80.UAA1 + indCr23.UAA1 * indCr81.UAA1 + indCr24.UAA1 * indCr82.UAA1 + indCr25.UAA1 * indCr83.UAA1 + indCr26.UAA1 * indCr84.UAA1 + indCr27.UAA1 * indCr85.UAA1 + indCr28.UAA1 * indCr86.UAA1 + indCr29.UAA1 * indCr87.UAA1 + indCr19.UAA2 * indCr77.UAA2 + indCr20.UAA2 * indCr78.UAA2 + indCr21.UAA2 * indCr79.UAA2 + indCr22.UAA2 * indCr80.UAA2 + indCr23.UAA2 * indCr81.UAA2 + indCr24.UAA2 * indCr82.UAA2 + indCr25.UAA2 * indCr83.UAA2 + indCr26.UAA2 * indCr84.UAA2 + indCr27.UAA2 * indCr85.UAA2 + indCr28.UAA2 * indCr86.UAA2 + indCr29.UAA2 * indCr87.UAA2 + indCr239 * indCr88

  return i(indicatorsValues, "indCr19.UAA1") * i(indicatorsValues, "indCr77.UAA1") + i(indicatorsValues, "indCr20.UAA1") * i(indicatorsValues, "indCr78.UAA1") + i(indicatorsValues, "indCr21.UAA1") * i(indicatorsValues, "indCr79.UAA1") + i(indicatorsValues, "indCr22.UAA1") * i(indicatorsValues, "indCr80.UAA1") + i(indicatorsValues, "indCr23.UAA1") * i(indicatorsValues, "indCr81.UAA1") + i(indicatorsValues, "indCr24.UAA1") * i(indicatorsValues, "indCr82.UAA1") + i(indicatorsValues, "indCr25.UAA1") * i(indicatorsValues, "indCr83.UAA1") + i(indicatorsValues, "indCr26.UAA1") * i(indicatorsValues, "indCr84.UAA1") + i(indicatorsValues, "indCr27.UAA1") * i(indicatorsValues, "indCr85.UAA1") + i(indicatorsValues, "indCr28.UAA1") * i(indicatorsValues, "indCr86.UAA1") + i(indicatorsValues, "indCr29.UAA1") * i(indicatorsValues, "indCr87.UAA1") + i(indicatorsValues, "indCr19.UAA2") * i(indicatorsValues, "indCr77.UAA2") + i(indicatorsValues, "indCr20.UAA2") * i(indicatorsValues, "indCr78.UAA2") + i(indicatorsValues, "indCr21.UAA2") * i(indicatorsValues, "indCr79.UAA2") + i(indicatorsValues, "indCr22.UAA2") * i(indicatorsValues, "indCr80.UAA2") + i(indicatorsValues, "indCr23.UAA2") * i(indicatorsValues, "indCr81.UAA2") + i(indicatorsValues, "indCr24.UAA2") * i(indicatorsValues, "indCr82.UAA2") + i(indicatorsValues, "indCr25.UAA2") * i(indicatorsValues, "indCr83.UAA2") + i(indicatorsValues, "indCr26.UAA2") * i(indicatorsValues, "indCr84.UAA2") + i(indicatorsValues, "indCr27.UAA2") * i(indicatorsValues, "indCr85.UAA2") + i(indicatorsValues, "indCr28.UAA2") * i(indicatorsValues, "indCr86.UAA2") + i(indicatorsValues, "indCr29.UAA2") * i(indicatorsValues, "indCr87.UAA2") + i(indicatorsValues, "indCr239") * i(indicatorsValues, "indCr88")

},  ["indCr19.UAA1", "indCr19.UAA2", "indCr20.UAA1", "indCr20.UAA2", "indCr21.UAA1", "indCr21.UAA2", "indCr22.UAA1", "indCr22.UAA2", "indCr23.UAA1", "indCr23.UAA2", "indCr24.UAA1", "indCr24.UAA2", "indCr25.UAA1", "indCr25.UAA2", "indCr26.UAA1", "indCr26.UAA2", "indCr27.UAA1", "indCr27.UAA2", "indCr28.UAA1", "indCr28.UAA2", "indCr29.UAA1", "indCr29.UAA2", "indCr239", "indCr77.UAA1", "indCr77.UAA2", "indCr78.UAA1", "indCr78.UAA2", "indCr79.UAA1", "indCr79.UAA2", "indCr80.UAA1", "indCr80.UAA2", "indCr81.UAA1", "indCr81.UAA2", "indCr82.UAA1", "indCr82.UAA2", "indCr83.UAA1", "indCr83.UAA2", "indCr84.UAA1", "indCr84.UAA2", "indCr85.UAA1", "indCr85.UAA2", "indCr86.UAA1", "indCr86.UAA2", "indCr87.UAA1", "indCr87.UAA2", "indCr88"]);



registerFormula("indF51", function(def_val, factors, parameters, indicatorsValues) {

  // =indF50 / paramF1_def

  return i(indicatorsValues, "indF50") / parameters.getDef("paramF1")

}, ["indF50"]);



registerFormula("indF71", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr89.UAA1 Jan") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr101.UAA1 Jan") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr113.UAA1 Jan") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr125.UAA1 Jan") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr137.UAA1 Jan") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr149.UAA1 Jan") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr161.UAA1 Jan") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr173.UAA1 Jan") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr185.UAA1 Jan") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr197.UAA1 Jan") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr209.UAA1 Jan") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr89.UAA2 Jan") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr101.UAA2 Jan") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr113.UAA2 Jan") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr125.UAA2 Jan") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr137.UAA2 Jan") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr149.UAA2 Jan") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr161.UAA2 Jan") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr173.UAA2 Jan") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr185.UAA2 Jan") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr197.UAA2 Jan") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr209.UAA2 Jan") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr221") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr89.UAA1 Jan", "indCr101.UAA1 Jan", "indCr113.UAA1 Jan", "indCr125.UAA1 Jan", "indCr137.UAA1 Jan", "indCr149.UAA1 Jan", "indCr161.UAA1 Jan", "indCr173.UAA1 Jan", "indCr185.UAA1 Jan", "indCr197.UAA1 Jan", "indCr209.UAA1 Jan", "indCr89.UAA2 Jan" , "indCr101.UAA2 Jan", "indCr113.UAA2 Jan", "indCr125.UAA2 Jan", "indCr137.UAA2 Jan", "indCr149.UAA2 Jan", "indCr161.UAA2 Jan", "indCr173.UAA2 Jan", "indCr185.UAA2 Jan", "indCr197.UAA2 Jan", "indCr209.UAA2 Jan", "indCr221", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF72", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr90.UAA1 Feb") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr102.UAA1 Feb") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr114.UAA1 Feb") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr126.UAA1 Feb") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr138.UAA1 Feb") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr150.UAA1 Feb") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr162.UAA1 Feb") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr174.UAA1 Feb") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr186.UAA1 Feb") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr198.UAA1 Feb") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr210.UAA1 Feb") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr90.UAA2 Feb") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr102.UAA2 Feb") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr114.UAA2 Feb") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr126.UAA2 Feb") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr138.UAA2 Feb") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr150.UAA2 Feb") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr162.UAA2 Feb") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr174.UAA2 Feb") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr186.UAA2 Feb") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr198.UAA2 Feb") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr210.UAA2 Feb") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr222") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr90.UAA1 Feb", "indCr102.UAA1 Feb", "indCr114.UAA1 Feb", "indCr126.UAA1 Feb", "indCr138.UAA1 Feb", "indCr150.UAA1 Feb", "indCr162.UAA1 Feb", "indCr174.UAA1 Feb", "indCr186.UAA1 Feb", "indCr198.UAA1 Feb", "indCr210.UAA1 Feb", "indCr90.UAA2 Feb" , "indCr102.UAA2 Feb", "indCr114.UAA2 Feb", "indCr126.UAA2 Feb", "indCr138.UAA2 Feb", "indCr150.UAA2 Feb", "indCr162.UAA2 Feb", "indCr174.UAA2 Feb", "indCr186.UAA2 Feb", "indCr198.UAA2 Feb", "indCr210.UAA2 Feb", "indCr222", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF73", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr91.UAA1 March") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr103.UAA1 March") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr115.UAA1 March") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr127.UAA1 March") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr139.UAA1 March") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr151.UAA1 March") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr163.UAA1 March") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr175.UAA1 March") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr187.UAA1 March") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr199.UAA1 March") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr211.UAA1 March") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr91.UAA2 March") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr103.UAA2 March") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr115.UAA2 March") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr127.UAA2 March") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr139.UAA2 March") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr151.UAA2 March") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr163.UAA2 March") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr175.UAA2 March") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr187.UAA2 March") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr199.UAA2 March") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr211.UAA2 March") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr223") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr91.UAA1 March", "indCr103.UAA1 March", "indCr115.UAA1 March", "indCr127.UAA1 March", "indCr139.UAA1 March", "indCr151.UAA1 March", "indCr163.UAA1 March", "indCr175.UAA1 March", "indCr187.UAA1 March", "indCr199.UAA1 March", "indCr211.UAA1 March", "indCr91.UAA2 March" , "indCr103.UAA2 March", "indCr115.UAA2 March", "indCr127.UAA2 March", "indCr139.UAA2 March", "indCr151.UAA2 March", "indCr163.UAA2 March", "indCr175.UAA2 March", "indCr187.UAA2 March", "indCr199.UAA2 March", "indCr211.UAA2 March", "indCr223", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF74", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr92.UAA1 Apr") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr104.UAA1 Apr") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr116.UAA1 Apr") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr128.UAA1 Apr") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr140.UAA1 Apr") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr152.UAA1 Apr") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr164.UAA1 Apr") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr176.UAA1 Apr") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr188.UAA1 Apr") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr200.UAA1 Apr") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr212.UAA1 Apr") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr92.UAA2 Apr") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr104.UAA2 Apr") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr116.UAA2 Apr") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr128.UAA2 Apr") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr140.UAA2 Apr") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr152.UAA2 Apr") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr164.UAA2 Apr") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr176.UAA2 Apr") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr188.UAA2 Apr") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr200.UAA2 Apr") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr212.UAA2 Apr") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr224") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr92.UAA1 Apr", "indCr104.UAA1 Apr", "indCr116.UAA1 Apr", "indCr128.UAA1 Apr", "indCr140.UAA1 Apr", "indCr152.UAA1 Apr", "indCr164.UAA1 Apr", "indCr176.UAA1 Apr", "indCr188.UAA1 Apr", "indCr200.UAA1 Apr", "indCr212.UAA1 Apr", "indCr92.UAA2 Apr" , "indCr104.UAA2 Apr", "indCr116.UAA2 Apr", "indCr128.UAA2 Apr", "indCr140.UAA2 Apr", "indCr152.UAA2 Apr", "indCr164.UAA2 Apr", "indCr176.UAA2 Apr", "indCr188.UAA2 Apr", "indCr200.UAA2 Apr", "indCr212.UAA2 Apr", "indCr224", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF75", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr93.UAA1 May") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr105.UAA1 May") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr117.UAA1 May") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr129.UAA1 May") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr141.UAA1 May") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr153.UAA1 May") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr165.UAA1 May") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr177.UAA1 May") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr189.UAA1 May") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr201.UAA1 May") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr213.UAA1 May") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr93.UAA2 May") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr105.UAA2 May") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr117.UAA2 May") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr129.UAA2 May") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr141.UAA2 May") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr153.UAA2 May") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr165.UAA2 May") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr177.UAA2 May") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr189.UAA2 May") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr201.UAA2 May") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr213.UAA2 May") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr225") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr93.UAA1 May", "indCr105.UAA1 May", "indCr117.UAA1 May", "indCr129.UAA1 May", "indCr141.UAA1 May", "indCr153.UAA1 May", "indCr165.UAA1 May", "indCr177.UAA1 May", "indCr189.UAA1 May", "indCr201.UAA1 May", "indCr213.UAA1 May", "indCr93.UAA2 May" , "indCr105.UAA2 May", "indCr117.UAA2 May", "indCr129.UAA2 May", "indCr141.UAA2 May", "indCr153.UAA2 May", "indCr165.UAA2 May", "indCr177.UAA2 May", "indCr189.UAA2 May", "indCr201.UAA2 May", "indCr213.UAA2 May", "indCr225", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF76", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr94.UAA1 June") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr106.UAA1 June") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr118.UAA1 June") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr130.UAA1 June") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr142.UAA1 June") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr154.UAA1 June") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr166.UAA1 June") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr178.UAA1 June") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr190.UAA1 June") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr202.UAA1 June") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr214.UAA1 June") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr94.UAA2 June") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr106.UAA2 June") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr118.UAA2 June") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr130.UAA2 June") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr142.UAA2 June") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr154.UAA2 June") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr166.UAA2 June") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr178.UAA2 June") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr190.UAA2 June") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr202.UAA2 June") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr214.UAA2 June") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr226") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr94.UAA1 June", "indCr106.UAA1 June", "indCr118.UAA1 June", "indCr130.UAA1 June", "indCr142.UAA1 June", "indCr154.UAA1 June", "indCr166.UAA1 June", "indCr178.UAA1 June", "indCr190.UAA1 June", "indCr202.UAA1 June", "indCr214.UAA1 June", "indCr94.UAA2 June" , "indCr106.UAA2 June", "indCr118.UAA2 June", "indCr130.UAA2 June", "indCr142.UAA2 June", "indCr154.UAA2 June", "indCr166.UAA2 June", "indCr178.UAA2 June", "indCr190.UAA2 June", "indCr202.UAA2 June", "indCr214.UAA2 June", "indCr226", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF77", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr95.UAA1 July") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr107.UAA1 July") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr119.UAA1 July") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr131.UAA1 July") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr143.UAA1 July") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr155.UAA1 July") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr167.UAA1 July") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr179.UAA1 July") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr191.UAA1 July") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr203.UAA1 July") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr215.UAA1 July") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr95.UAA2 July") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr107.UAA2 July") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr119.UAA2 July") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr131.UAA2 July") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr143.UAA2 July") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr155.UAA2 July") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr167.UAA2 July") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr179.UAA2 July") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr191.UAA2 July") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr203.UAA2 July") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr215.UAA2 July") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr227") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr95.UAA1 July", "indCr107.UAA1 July", "indCr119.UAA1 July", "indCr131.UAA1 July", "indCr143.UAA1 July", "indCr155.UAA1 July", "indCr167.UAA1 July", "indCr179.UAA1 July", "indCr191.UAA1 July", "indCr203.UAA1 July", "indCr215.UAA1 July", "indCr95.UAA2 July" , "indCr107.UAA2 July", "indCr119.UAA2 July", "indCr131.UAA2 July", "indCr143.UAA2 July", "indCr155.UAA2 July", "indCr167.UAA2 July", "indCr179.UAA2 July", "indCr191.UAA2 July", "indCr203.UAA2 July", "indCr215.UAA2 July", "indCr227", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF78", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr96.UAA1 Aug") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr108.UAA1 Aug") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr120.UAA1 Aug") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr132.UAA1 Aug") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr144.UAA1 Aug") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr156.UAA1 Aug") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr168.UAA1 Aug") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr180.UAA1 Aug") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr192.UAA1 Aug") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr204.UAA1 Aug") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr216.UAA1 Aug") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr96.UAA2 Aug") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr108.UAA2 Aug") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr120.UAA2 Aug") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr132.UAA2 Aug") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr144.UAA2 Aug") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr156.UAA2 Aug") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr168.UAA2 Aug") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr180.UAA2 Aug") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr192.UAA2 Aug") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr204.UAA2 Aug") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr216.UAA2 Aug") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr228") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr96.UAA1 Aug", "indCr108.UAA1 Aug", "indCr120.UAA1 Aug", "indCr132.UAA1 Aug", "indCr144.UAA1 Aug", "indCr156.UAA1 Aug", "indCr168.UAA1 Aug", "indCr180.UAA1 Aug", "indCr192.UAA1 Aug", "indCr204.UAA1 Aug", "indCr216.UAA1 Aug", "indCr96.UAA2 Aug" , "indCr108.UAA2 Aug", "indCr120.UAA2 Aug", "indCr132.UAA2 Aug", "indCr144.UAA2 Aug", "indCr156.UAA2 Aug", "indCr168.UAA2 Aug", "indCr180.UAA2 Aug", "indCr192.UAA2 Aug", "indCr204.UAA2 Aug", "indCr216.UAA2 Aug", "indCr228", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF79", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr97.UAA1 Sept") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr109.UAA1 Sept") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr121.UAA1 Sept") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr133.UAA1 Sept") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr145.UAA1 Sept") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr157.UAA1 Sept") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr169.UAA1 Sept") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr181.UAA1 Sept") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr193.UAA1 Sept") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr205.UAA1 Sept") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr217.UAA1 Sept") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr97.UAA2 Sept") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr109.UAA2 Sept") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr121.UAA2 Sept") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr133.UAA2 Sept") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr145.UAA2 Sept") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr157.UAA2 Sept") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr169.UAA2 Sept") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr181.UAA2 Sept") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr193.UAA2 Sept") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr205.UAA2 Sept") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr217.UAA2 Sept") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr229") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr97.UAA1 Sept", "indCr109.UAA1 Sept", "indCr121.UAA1 Sept", "indCr133.UAA1 Sept", "indCr145.UAA1 Sept", "indCr157.UAA1 Sept", "indCr169.UAA1 Sept", "indCr181.UAA1 Sept", "indCr193.UAA1 Sept", "indCr205.UAA1 Sept", "indCr217.UAA1 Sept", "indCr97.UAA2 Sept", "indCr109.UAA2 Sept", "indCr121.UAA2 Sept", "indCr133.UAA2 Sept", "indCr145.UAA2 Sept", "indCr157.UAA2 Sept", "indCr169.UAA2 Sept", "indCr181.UAA2 Sept", "indCr193.UAA2 Sept", "indCr205.UAA2 Sept", "indCr217.UAA2 Sept", "indCr229", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF80", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr98.UAA1 Oct") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr110.UAA1 Oct") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr122.UAA1 Oct") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr134.UAA1 Oct") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr146.UAA1 Oct") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr158.UAA1 Oct") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr170.UAA1 Oct") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr182.UAA1 Oct") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr194.UAA1 Oct") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr206.UAA1 Oct") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr218.UAA1 Oct") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr98.UAA2 Oct") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr110.UAA2 Oct") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr122.UAA2 Oct") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr134.UAA2 Oct") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr146.UAA2 Oct") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr158.UAA2 Oct") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr170.UAA2 Oct") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr182.UAA2 Oct") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr194.UAA2 Oct") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr206.UAA2 Oct") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr218.UAA2 Oct") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr230") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr98.UAA1 Oct", "indCr110.UAA1 Oct", "indCr122.UAA1 Oct", "indCr134.UAA1 Oct", "indCr146.UAA1 Oct", "indCr158.UAA1 Oct", "indCr170.UAA1 Oct", "indCr182.UAA1 Oct", "indCr194.UAA1 Oct", "indCr206.UAA1 Oct", "indCr218.UAA1 Oct", "indCr98.UAA2 Oct", "indCr110.UAA2 Oct", "indCr122.UAA2 Oct", "indCr134.UAA2 Oct", "indCr146.UAA2 Oct", "indCr158.UAA2 Oct", "indCr170.UAA2 Oct", "indCr182.UAA2 Oct", "indCr194.UAA2 Oct", "indCr206.UAA2 Oct", "indCr218.UAA2 Oct", "indCr230", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF81", function(def_val, factors, parameters, indicatorsValues) {

  return (

    (i(indicatorsValues, "indCr99.UAA1 Nov") * i(indicatorsValues, "indCr19.UAA1")

  + i(indicatorsValues, "indCr111.UAA1 Nov") * i(indicatorsValues, "indCr20.UAA1")

  + i(indicatorsValues, "indCr123.UAA1 Nov") * i(indicatorsValues, "indCr21.UAA1")

  + i(indicatorsValues, "indCr135.UAA1 Nov") * i(indicatorsValues, "indCr22.UAA1")

  + i(indicatorsValues, "indCr147.UAA1 Nov") * i(indicatorsValues, "indCr23.UAA1")

  + i(indicatorsValues, "indCr159.UAA1 Nov") * i(indicatorsValues, "indCr24.UAA1")

  + i(indicatorsValues, "indCr171.UAA1 Nov") * i(indicatorsValues, "indCr25.UAA1")

  + i(indicatorsValues, "indCr183.UAA1 Nov") * i(indicatorsValues, "indCr26.UAA1")

  + i(indicatorsValues, "indCr195.UAA1 Nov") * i(indicatorsValues, "indCr27.UAA1")

  + i(indicatorsValues, "indCr207.UAA1 Nov") * i(indicatorsValues, "indCr28.UAA1")

  + i(indicatorsValues, "indCr219.UAA1 Nov") * i(indicatorsValues, "indCr29.UAA1"))

  + (i(indicatorsValues, "indCr99.UAA2 Nov") * i(indicatorsValues, "indCr19.UAA2")

  + i(indicatorsValues, "indCr111.UAA2 Nov") * i(indicatorsValues, "indCr20.UAA2")

  + i(indicatorsValues, "indCr123.UAA2 Nov") * i(indicatorsValues, "indCr21.UAA2")

  + i(indicatorsValues, "indCr135.UAA2 Nov") * i(indicatorsValues, "indCr22.UAA2")

  + i(indicatorsValues, "indCr147.UAA2 Nov") * i(indicatorsValues, "indCr23.UAA2")

  + i(indicatorsValues, "indCr159.UAA2 Nov") * i(indicatorsValues, "indCr24.UAA2")

  + i(indicatorsValues, "indCr171.UAA2 Nov") * i(indicatorsValues, "indCr25.UAA2")

  + i(indicatorsValues, "indCr183.UAA2 Nov") * i(indicatorsValues, "indCr26.UAA2")

  + i(indicatorsValues, "indCr195.UAA2 Nov") * i(indicatorsValues, "indCr27.UAA2")

  + i(indicatorsValues, "indCr207.UAA2 Nov") * i(indicatorsValues, "indCr28.UAA2")

  + i(indicatorsValues, "indCr219.UAA2 Nov") * i(indicatorsValues, "indCr29.UAA2"))

  + i(indicatorsValues, "indCr231") * i(indicatorsValues, "indCr239")

  + i(indicatorsValues, "indAn153") / 12)

}, ["indCr99.UAA1 Nov", "indCr111.UAA1 Nov", "indCr123.UAA1 Nov", "indCr135.UAA1 Nov", "indCr147.UAA1 Nov", "indCr159.UAA1 Nov", "indCr171.UAA1 Nov", "indCr183.UAA1 Nov", "indCr195.UAA1 Nov", "indCr207.UAA1 Nov", "indCr219.UAA1 Nov", "indCr99.UAA2 Nov", "indCr111.UAA2 Nov", "indCr123.UAA2 Nov", "indCr135.UAA2 Nov", "indCr147.UAA2 Nov", "indCr159.UAA2 Nov", "indCr171.UAA2 Nov", "indCr183.UAA2 Nov", "indCr195.UAA2 Nov", "indCr207.UAA2 Nov", "indCr219.UAA2 Nov", "indCr231", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF82", function(def_val, factors, parameters, indicatorsValues) {

   return (

   (i(indicatorsValues, "indCr100.UAA1 Dec") * i(indicatorsValues, "indCr19.UAA1")

   + i(indicatorsValues, "indCr112.UAA1 Dec") * i(indicatorsValues, "indCr20.UAA1")

   + i(indicatorsValues, "indCr124.UAA1 Dec") * i(indicatorsValues, "indCr21.UAA1")

   + i(indicatorsValues, "indCr136.UAA1 Dec") * i(indicatorsValues, "indCr22.UAA1")

   + i(indicatorsValues, "indCr148.UAA1 Dec") * i(indicatorsValues, "indCr23.UAA1")

   + i(indicatorsValues, "indCr160.UAA1 Dec") * i(indicatorsValues, "indCr24.UAA1")

   + i(indicatorsValues, "indCr172.UAA1 Dec") * i(indicatorsValues, "indCr25.UAA1")

   + i(indicatorsValues, "indCr184.UAA1 Dec") * i(indicatorsValues, "indCr26.UAA1")

   + i(indicatorsValues, "indCr196.UAA1 Dec") * i(indicatorsValues, "indCr27.UAA1")

   + i(indicatorsValues, "indCr208.UAA1 Dec") * i(indicatorsValues, "indCr28.UAA1")

   + i(indicatorsValues, "indCr220.UAA1 Dec") * i(indicatorsValues, "indCr29.UAA1"))

   + (i(indicatorsValues, "indCr100.UAA2 Dec") * i(indicatorsValues, "indCr19.UAA2")

   + i(indicatorsValues, "indCr112.UAA2 Dec") * i(indicatorsValues, "indCr20.UAA2")

   + i(indicatorsValues, "indCr124.UAA2 Dec") * i(indicatorsValues, "indCr21.UAA2")

   + i(indicatorsValues, "indCr136.UAA2 Dec") * i(indicatorsValues, "indCr22.UAA2")

   + i(indicatorsValues, "indCr148.UAA2 Dec") * i(indicatorsValues, "indCr23.UAA2")

   + i(indicatorsValues, "indCr160.UAA2 Dec") * i(indicatorsValues, "indCr24.UAA2")

   + i(indicatorsValues, "indCr172.UAA2 Dec") * i(indicatorsValues, "indCr25.UAA2")

   + i(indicatorsValues, "indCr184.UAA2 Dec") * i(indicatorsValues, "indCr26.UAA2")

   + i(indicatorsValues, "indCr196.UAA2 Dec") * i(indicatorsValues, "indCr27.UAA2")

   + i(indicatorsValues, "indCr208.UAA2 Dec") * i(indicatorsValues, "indCr28.UAA2")

   + i(indicatorsValues, "indCr220.UAA2 Dec") * i(indicatorsValues, "indCr29.UAA2"))

   + i(indicatorsValues, "indCr232") * i(indicatorsValues, "indCr239")

   + i(indicatorsValues, "indAn153") / 12)

}, ["indCr100.UAA1 Dec", "indCr112.UAA1 Dec", "indCr124.UAA1 Dec", "indCr136.UAA1 Dec", "indCr148.UAA1 Dec", "indCr160.UAA1 Dec", "indCr172.UAA1 Dec", "indCr184.UAA1 Dec", "indCr196.UAA1 Dec", "indCr208.UAA1 Dec", "indCr220.UAA1 Dec", "indCr100.UAA2 Dec", "indCr112.UAA2 Dec", "indCr124.UAA2 Dec", "indCr136.UAA2 Dec", "indCr148.UAA2 Dec", "indCr160.UAA2 Dec", "indCr172.UAA2 Dec", "indCr184.UAA2 Dec", "indCr196.UAA2 Dec", "indCr208.UAA2 Dec", "indCr220.UAA2 Dec", "indCr232", "indCr239", "indAn153", "indCr19.UAA1", "indCr20.UAA1", "indCr21.UAA1", "indCr22.UAA1", "indCr23.UAA1", "indCr24.UAA1", "indCr25.UAA1", "indCr26.UAA1", "indCr27.UAA1", "indCr28.UAA1", "indCr29.UAA1", "indCr19.UAA2", "indCr20.UAA2", "indCr21.UAA2", "indCr22.UAA2", "indCr23.UAA2", "indCr24.UAA2", "indCr25.UAA2", "indCr26.UAA2", "indCr27.UAA2", "indCr28.UAA2", "indCr29.UAA2"]);



registerFormula("indF83", function(def_val, factors, parameters, indicatorsValues) {

  // =indF71 + indF72 + indF73 + indF74 + indF75 + indF76 + indF77 + indF78 + indF79 + indF80 + indF81 + indF82

  return i(indicatorsValues, "indF71") + i(indicatorsValues, "indF72") + i(indicatorsValues, "indF73") + i(indicatorsValues, "indF74") + i(indicatorsValues, "indF75") + i(indicatorsValues, "indF76") + i(indicatorsValues, "indF77") + i(indicatorsValues, "indF78") + i(indicatorsValues, "indF79") + i(indicatorsValues, "indF80") + i(indicatorsValues, "indF81") + i(indicatorsValues, "indF82")

}, ["indF71", "indF72", "indF73", "indF74", "indF75", "indF76", "indF77", "indF78", "indF79", "indF80", "indF81", "indF82"]);



registerFormula("indF84", function(def_val, factors, parameters, indicatorsValues) {

  // = IF(indF71 > paramF7_def x paramF6_def, indF71 - paramF31_def x paramF6_def, 0)

  // + IF(indF72 > paramF7_def x paramF6_def, indF72 - paramF31_def x paramF6_def, 0)

  // + IF(indF73 > paramF7_def x paramF6_def, indF73 - paramF31_def x paramF6_def, 0)

  // + IF(indF74 > paramF7_def x paramF6_def, indF74 - paramF31_def x paramF6_def, 0)

  // + IF(indF75 > paramF7_def x paramF6_def, indF75 - paramF31_def x paramF6_def, 0)

  // + IF(indF76 > paramF7_def x paramF6_def, indF76 - paramF31_def x paramF6_def, 0)

  // + IF(indF77 > paramF7_def x paramF6_def, indF77 - paramF31_def x paramF6_def, 0)

  // + IF(indF78 > paramF7_def x paramF6_def, indF78 - paramF31_def x paramF6_def, 0)

  // + IF(indF79 > paramF7_def x paramF6_def, indF79 - paramF31_def x paramF6_def, 0)

  // + IF(indF80 > paramF7_def x paramF6_def, indF80 - paramF31_def x paramF6_def, 0)

  // + IF(indF81 > paramF7_def x paramF6_def, indF81 - paramF31_def x paramF6_def, 0)

  // + IF(indF82 > paramF7_def x paramF6_def, indF82 - paramF31_def x paramF6_def, 0)



  var __calc = function(indId) {

    var v = indicatorsValues[indId]

    if(v > parameters.getDef("paramF7") * parameters.getDef("paramF6")) {

      return v - (parameters.getDef("paramF31") * parameters.getDef("paramF6"))

    } else {

      return 0

    }

  }

  var val = __calc("indF71") + __calc("indF72") + __calc("indF73") + __calc("indF74") + __calc("indF75") + __calc("indF76") + __calc("indF77") + __calc("indF78") + __calc("indF79") + __calc("indF80") + __calc("indF81") + __calc("indF82")



  return val

}, ["indF71", "indF72", "indF73", "indF74", "indF75", "indF76", "indF77", "indF78", "indF79", "indF80", "indF81", "indF82"]);



registerFormula("indF85", function(def_val, factors, parameters, indicatorsValues) {

  // =indF84 x paramF4_def

  return i(indicatorsValues, "indF84") * parameters.getDef("paramF4")

}, ["indF84"]);



registerFormula("indF86", function(def_val, factors, parameters, indicatorsValues) {

  // =indF84 / paramF32_def

  return i(indicatorsValues, "indF84") / parameters.getDef("paramF32")

}, ["indF84"]);



registerFormula("indF87", function(def_val, factors, parameters, indicatorsValues) {

  // = IF(indF71 / paramF6_def > paramF31_def AND indF71 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF72 / paramF6_def > paramF31_def AND indF72 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF73 / paramF6_def > paramF31_def AND indF73 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF74 / paramF6_def > paramF31_def AND indF74 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF75 / paramF6_def > paramF31_def AND indF75 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF76 / paramF6_def > paramF31_def AND indF76 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF77 / paramF6_def > paramF31_def AND indF77 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF78 / paramF6_def > paramF31_def AND indF78 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF79 / paramF6_def > paramF31_def AND indF79 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF80 / paramF6_def > paramF31_def AND indF80 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF81 / paramF6_def > paramF31_def AND indF81 / paramF6_def < paramF7_def, 1, 0)

  // + IF(indF82 / paramF6_def > paramF31_def AND indF82 / paramF6_def < paramF7_def, 1, 0)



  var __calc = function(indId) {

    var v = indicatorsValues[indId] / parameters.getDef("paramF6")

    if( v > parameters.getDef("paramF31") && v <  parameters.getDef("paramF7")) {

      return 1

    } else {

      return 0

    }

  }

  return __calc("indF71") + __calc("indF72") + __calc("indF73") + __calc("indF74") + __calc("indF75") + __calc("indF76") + __calc("indF77") + __calc("indF78") + __calc("indF79") + __calc("indF80") + __calc("indF81") + __calc("indF82")



}, ["indF71", "indF72", "indF73", "indF74", "indF75", "indF76", "indF77", "indF78", "indF79", "indF80", "indF81", "indF82"]);



registerFormula("indF90", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indEc5 < 0, 0, ((1 - indEc4) x indEc5) / paramF6_def)

  if(i(indicatorsValues, "indEc5") < 0){

    return 0

  } else {

    return ((1 - i(indicatorsValues, "indEc4")) * i(indicatorsValues, "indEc5")) / parameters.getDef("paramF6")

  }

}, ["indEc4", "indEc5"]);



registerFormula("indF91", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {

  // =IF(n = 1, indF91_def, indF91_n-1 + indEc5 x indEc4 - indAn126)

  if(yearNumber == 0) {

    return def_val

  } else {

    let oldVal = prevIndValues["indF91"]

    let val = oldVal + (i(indicatorsValues, "indEc5") * i(indicatorsValues, "indEc4")) - i(indicatorsValues, "indAn126")

    return val

  }



}, ["indEc5", "indEc4", "indAn126"]);



registerFormula("indF97", function(def_val, factors, parameters, indicatorsValues) {

  return (i(indicatorsValues, "indF83") - i(indicatorsValues, "indF84")) / parameters.getDef("paramF6") / 52

}, ["indF83", "indF84"]);



registerFormula("indF98", function(def_val, factors, parameters, indicatorsValues) {

  return i(indicatorsValues, "indAn156") / ( i(indicatorsValues, "indAn156") + i(indicatorsValues, "indAn157") )

}, ["indAn156", "indAn157"]);



registerFormula("indF136", function(def_val, factors, parameters, indicatorsValues) {

  // =indEc1.UAA1 x indCr237 + indEc1.UAA2 x indCr238

  return i(indicatorsValues, "indEc1.UAA1") * i(indicatorsValues, "indCr237") + i(indicatorsValues, "indEc1.UAA2") * i(indicatorsValues, "indCr238")

}, ["indEc1.UAA1", "indCr237", "indEc1.UAA2", "indCr238"]);



registerFormula("indF137", function(def_val, factors, parameters, indicatorsValues) {

  // =indF2 / 1000 x paramCr12_def / 0,335

  return i(indicatorsValues, "indF2") / 1000 * parameters.getDef("paramCr12") / 0.335

}, ["indF2"]);



registerFormula("indF141", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn153 / 12

  return i(indicatorsValues, "indAn153") / 12

}, ["indAn153"]);



registerFormula("indF142", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF71 > paramF7_def x paramF6_def;indF154 - indF195;indF71 - indF195)

  if(i(indicatorsValues, "indF71") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF195")

  } else {

    return i(indicatorsValues, "indF71") - i(indicatorsValues, "indF195")

  }

}, ["indF71", "indF154", "indF195"]);



registerFormula("indF143", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF72 > paramF7_def x paramF6_def;indF154 - indF196;indF72 - indF196)

  if(i(indicatorsValues, "indF72") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF196")

  } else {

    return i(indicatorsValues, "indF72") - i(indicatorsValues, "indF196")

  }

}, ["indF72", "indF154", "indF196"]);



registerFormula("indF144", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF73 > paramF7_def x paramF6_def;indF154 - indF197;indF73 - indF197)

  if(i(indicatorsValues, "indF73") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF197")

  } else {

    return i(indicatorsValues, "indF73") - i(indicatorsValues, "indF197")

  }

}, ["indF73", "indF154", "indF197"]);



registerFormula("indF145", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF74 > paramF7_def x paramF6_def;indF154 - indF198;indF74 - indF198)

  if(i(indicatorsValues, "indF74") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF198")

  } else {

    return i(indicatorsValues, "indF74") - i(indicatorsValues, "indF198")

  }

}, ["indF74", "indF154", "indF198"]);



registerFormula("indF146", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF75 > paramF7_def x paramF6_def;indF154 - indF199;indF75 - indF199)

  if(i(indicatorsValues, "indF75") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF199")

  } else {

    return i(indicatorsValues, "indF75") - i(indicatorsValues, "indF199")

  }

}, ["indF75", "indF154", "indF199"]);



registerFormula("indF147", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF76 > paramF7_def x paramF6_def;indF154 - indF200;indF76 - indF200)

  if(i(indicatorsValues, "indF76") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF200")

  } else {

    return i(indicatorsValues, "indF76") - i(indicatorsValues, "indF200")

  }

}, ["indF76", "indF154", "indF200"]);



registerFormula("indF148", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF77 > paramF7_def x paramF6_def;indF154 - indF201;indF77 - indF201)

  if(i(indicatorsValues, "indF77") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF201")

  } else {

    return i(indicatorsValues, "indF77") - i(indicatorsValues, "indF201")

  }

}, ["indF77", "indF154", "indF201"]);



registerFormula("indF149", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF78 > paramF7_def x paramF6_def;indF154 - indF202;indF78 - indF202)

  if(i(indicatorsValues, "indF78") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF202")

  } else {

    return i(indicatorsValues, "indF78") - i(indicatorsValues, "indF202")

  }

}, ["indF78", "indF154", "indF202"]);



registerFormula("indF150", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF79 > paramF7_def x paramF6_def;indF154 - indF203;indF79 - indF203)

  if(i(indicatorsValues, "indF79") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF203")

  } else {

    return i(indicatorsValues, "indF79") - i(indicatorsValues, "indF203")

  }

}, ["indF79", "indF154", "indF203"]);



registerFormula("indF151", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF80 > paramF7_def x paramF6_def;indF154 - indF204;indF80 - indF204)

  if(i(indicatorsValues, "indF80") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF204")

  } else {

    return i(indicatorsValues, "indF80") - i(indicatorsValues, "indF204")

  }

}, ["indF80", "indF154", "indF204"]);



registerFormula("indF152", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF81 > paramF7_def x paramF6_def;indF154 - indF205;indF81 - indF205)

  if(i(indicatorsValues, "indF81") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF205")

  } else {

    return i(indicatorsValues, "indF81") - i(indicatorsValues, "indF205")

  }

}, ["indF81", "indF154", "indF205"]);



registerFormula("indF153", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF82 > paramF7_def x paramF6_def;indF154 - indF206;indF82 - indF206)

  if(i(indicatorsValues, "indF82") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF154") - i(indicatorsValues, "indF206")

  } else {

    return i(indicatorsValues, "indF82") - i(indicatorsValues, "indF206")

  }

}, ["indF82", "indF154", "indF206"]);



registerFormula("indF154", function(def_val, factors, parameters, indicatorsValues) {

  // =paramF31_def x paramF6_def

  return parameters.getDef("paramF31") * parameters.getDef("paramF6")

});



registerFormula("indF155", function(def_val, factors, parameters, indicatorsValues) {

  // =(paramF7_def - paramF31_def) x paramF6_def

  return (parameters.getDef("paramF7") - parameters.getDef("paramF31")) * parameters.getDef("paramF6")

});



registerFormula("indF156", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF71 > paramF7_def x paramF6_def;indF71 - indF154;0)

  if(i(indicatorsValues, "indF71") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF71") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF71", "indF154"]);



registerFormula("indF157", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF72 > paramF7_def x paramF6_def;indF72 - indF154;0)

  if(i(indicatorsValues, "indF72") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF72") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF72", "indF154"]);



registerFormula("indF158", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF73 > paramF7_def x paramF6_def;indF73 - indF154;0)

  if(i(indicatorsValues, "indF73") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF73") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF73", "indF154"]);



registerFormula("indF159", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF74 > paramF7_def x paramF6_def;indF74 - indF154;0)

  if(i(indicatorsValues, "indF74") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF74") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF74", "indF154"]);



registerFormula("indF160", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF75 > paramF7_def x paramF6_def;indF75 - indF154;0)

  if(i(indicatorsValues, "indF75") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF75") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF75", "indF154"]);



registerFormula("indF161", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF76 > paramF7_def x paramF6_def;indF76 - indF154;0)

  if(i(indicatorsValues, "indF76") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF76") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF76", "indF154"]);



registerFormula("indF162", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF77 > paramF7_def x paramF6_def;indF77 - indF154;0)

  if(i(indicatorsValues, "indF77") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF77") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF77", "indF154"]);



registerFormula("indF163", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF78 > paramF7_def x paramF6_def;indF78 - indF154;0)

  if(i(indicatorsValues, "indF78") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF78") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF78", "indF154"]);



registerFormula("indF164", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF79 > paramF7_def x paramF6_def;indF79 - indF154;0)

  if(i(indicatorsValues, "indF79") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF79") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF79", "indF154"]);



registerFormula("indF165", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF80 > paramF7_def x paramF6_def;indF79 - indF154;0)

  if(i(indicatorsValues, "indF80") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF80") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF80", "indF154"]);



registerFormula("indF166", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF81 > paramF7_def x paramF6_def;indF79 - indF154;0)

  if(i(indicatorsValues, "indF81") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF81") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF81", "indF154"]);



registerFormula("indF167", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF82 > paramF7_def x paramF6_def;indF82 - indF154;0)

  if(i(indicatorsValues, "indF82") > (parameters.getDef("paramF7") * parameters.getDef("paramF6"))) {

    return i(indicatorsValues, "indF82") - i(indicatorsValues, "indF154")

  } else {

    return 0

  }

}, ["indF82", "indF154"]);



registerFormula("indF195", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF71 > paramF7_def x paramF6_def && indF143 > paramF31_def x paramF6_def, paramF31_def x paramF6_def, indF141)

  if(i(indicatorsValues, "indF71") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF71", "indF141"]);



registerFormula("indF196", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF72 > paramF7_def x paramF6_def && indF143 > paramF31_def x paramF6_def, paramF31_def x paramF6_def, indF141)

  if(i(indicatorsValues, "indF72") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF72", "indF141"]);



registerFormula("indF197", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF73") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF73", "indF141"]);



registerFormula("indF198", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF74") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF74", "indF141"]);



registerFormula("indF199", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF75") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF75", "indF141"]);



registerFormula("indF200", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF76") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF76", "indF141"]);



registerFormula("indF201", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF77") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF77", "indF141"]);



registerFormula("indF202", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF78") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF78", "indF141"]);



registerFormula("indF203", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF79") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF79", "indF141"]);



registerFormula("indF204", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF80") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF80", "indF141"]);



registerFormula("indF205", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF81") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF81", "indF141"]);



registerFormula("indF206", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF82") > (parameters.getDef("paramF7") * parameters.getDef("paramF6")) && i(indicatorsValues, "indF141") > (parameters.getDef("paramF31") * parameters.getDef("paramF6"))) {

    return parameters.getDef("paramF31") * parameters.getDef("paramF6")

  } else {

    return i(indicatorsValues, "indF141")

  }

}, ["indF82", "indF141"]);



registerFormula("indAn153", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn1 x (indAn117 + indAn118 + indAn120 + indAn122 + indAn124) + (indAn2 + indAn3) x (indAn119 + indAn121 + indAn123 + indAn125)

  return (i(indicatorsValues, "indAn1")

    * (i(indicatorsValues, "indAn117") + i(indicatorsValues, "indAn118") + i(indicatorsValues, "indAn120") + i(indicatorsValues, "indAn122") + i(indicatorsValues, "indAn124"))

    + (i(indicatorsValues, "indAn2") + i(indicatorsValues, "indAn3"))

    * (i(indicatorsValues, "indAn119") + i(indicatorsValues, "indAn121") + i(indicatorsValues, "indAn123") + i(indicatorsValues, "indAn125"))

  )

}, [ "indAn1", "indAn2", "indAn3", "indAn117", "indAn118", "indAn119", "indAn120", "indAn121", "indAn122", "indAn123", "indAn124", "indAn125" ]);



registerFormula("indAn156", function(def_val, factors, parameters, indicatorsValues) {

  // =indF41 + indF42 - indF40 - indF43

  return i(indicatorsValues, "indF41") + i(indicatorsValues, "indF42") - i(indicatorsValues, "indF40") - i(indicatorsValues, "indF43")

}, ["indF41", "indF42", "indF40", "indF43"]);



registerFormula("indAn157", function(def_val, factors, parameters, indicatorsValues) {

  // =indF44 - indF45 - indF46 - indF47

  return i(indicatorsValues, "indF44") - i(indicatorsValues, "indF45") - i(indicatorsValues, "indF46") - i(indicatorsValues, "indF47")

}, ["indF44", "indF45", "indF46", "indF47"]);



registerFormula("indEc5", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn156 + inAn157 + indF168 + indF169 - indF85

  return i(indicatorsValues, "indAn156") + i(indicatorsValues, "indAn157") + i(indicatorsValues, "indF168") + i(indicatorsValues, "indF169") - i(indicatorsValues, "indF85")

}, ["indAn156", "indAn157", "indF168", "indF169", "indF85"]);



registerFormula("indF168", function(def_val, factors, parameters, indicatorsValues) {

  // ==indEc2 x paramF1_def

  return i(indicatorsValues, "indEc2") * parameters.getDef("paramF1")

}, ["indEc2"]);



registerFormula("indF169", function(def_val, factors, parameters, indicatorsValues) {

  // ==indEc3 x paramF1_def

  return i(indicatorsValues, "indEc3") * parameters.getDef("paramF1")

}, ["indEc3"]);



registerFormula("indF187", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  if(AepSelected(selectedAeps, "A.2.3")) {

    return prevValues["indF187"] + 1

  } else {

    return prevValues["indF187"]

  }

}, []);



registerFormula("indF188", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  if(AepSelected(selectedAeps, "A.2.4")) {

    return prevValues["indF188"] + 1

  } else {

    return prevValues["indF188"]

  }

}, []);

// model SOCIOECO type 2 (end) ////////////////////////////////////////////////////////////////////////



// GLOBAL type 2 (begin) //////////////////////////////////////////////////////////////////////////////

registerFormula("indAn132", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn40 x indAn1 x paramF8_def x paramF9_def + indAn41 x indAn127

  return (i(indicatorsValues, "indAn40") * i(indicatorsValues, "indAn1") * parameters.getDef("paramF8") * parameters.getDef("paramF9")) + (i(indicatorsValues, "indAn41") * i(indicatorsValues, "indAn127"))

}, ["indAn40", "indAn41", "indAn1", "indAn127"]);



registerFormula("indAn136", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn135 x paramAn32_def

  return i(indicatorsValues, "indAn135") * parameters.getDef("paramAn32")

}, ["indAn135"]);



registerFormula("indAn138", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn137 x paramAn33_def

  return i(indicatorsValues, "indAn137") * parameters.getDef("paramAn33")

}, ["indAn137"]);



registerFormula("indAn185", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn136 + indAn138 - indF67

  return i(indicatorsValues, "indAn136") + i(indicatorsValues, "indAn138") - i(indicatorsValues, "indF67")

}, ["indAn136", "indAn138", "indF67"]);



registerFormula("indF1", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indCr264") - i(indicatorsValues, "indF181") < 0) {

    return (i(indicatorsValues, "indF181") - i(indicatorsValues, "indCr264")) / (i(indicatorsValues, "indF181") / i(indicatorsValues, "indAn185"))

  } else {

    return 0;

  }

}, ["indCr264", "indF181", "indAn185"]);



registerFormula("indF2", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  // =IF(indCr264-indF181 > 0 & C.4.1, indCr264-indF181, 0)

  if((i(indicatorsValues, "indCr264") - i(indicatorsValues, "indF181") > 0) && AepSelected(selectedAeps, "C.4.1")) {

    return i(indicatorsValues, "indCr264") - i(indicatorsValues, "indF181")

  } else {

    return 0;

  }

}, ["indCr264", "indF181"]);



registerFormula("indF17", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF3-indAn149 > 0, indF3-indAn149, 0)

  var val = i(indicatorsValues, "indF3") - i(indicatorsValues, "indAn149")

  if(val > 0) {

    return val

  } else {

    return 0;

  }

}, ["indF3", "indAn149"]);



registerFormula("indF18", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF3-indAn149 < 0, indAn149-indF3, 0)

  var val = i(indicatorsValues, "indF3") - i(indicatorsValues, "indAn149")

  if(val < 0) {

    return val * -1

  } else {

    return 0;

  }

}, ["indF3", "indAn149"]);



registerFormula("indF19", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF4+indF6-indAn134 > 0, indF4+indF6-indAn134, 0)

  var val = i(indicatorsValues, "indF4") + i(indicatorsValues, "indF6") - i(indicatorsValues, "indAn134")

  if(val > 0) {

    return val

  } else {

    return 0;

  }

}, ["indF4", "indF6", "indAn134"]);



registerFormula("indF20", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF4+indF6-indAn134 < 0, indAn134-indF4-indF6, 0)

  var val = i(indicatorsValues, "indF4") + i(indicatorsValues, "indF6") - i(indicatorsValues, "indAn134")

  if(val < 0) {

    return i(indicatorsValues, "indAn134") - i(indicatorsValues, "indF4") - i(indicatorsValues, "indF6")

  } else {

    return 0;

  }

}, ["indF4", "indF6", "indAn134"]);



registerFormula("indF21", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF5-indAn145 > 0, indF5-indAn145, 0)

  return Math.max(i(indicatorsValues, "indF5") - i(indicatorsValues, "indAn145"), 0)

}, ["indF5", "indAn145"]);



registerFormula("indF22", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF5-indAn145 < 0, indAn145-indF5, 0)

  var val = i(indicatorsValues, "indF5") - i(indicatorsValues, "indAn145")

  if(val < 0) return val * -1

  return 0

}, ["indF5", "indAn145"]);



registerFormula("indF23", function(def_val, factors, parameters, indicatorsValues) {

  // =indF7

  return i(indicatorsValues, "indF7")

}, ["indF7"]);



registerFormula("indF24", function(def_val, factors, parameters, indicatorsValues) {

  // =indF8

  return i(indicatorsValues, "indF8")

}, ["indF8"]);



registerFormula("indF25", function(def_val, factors, parameters, indicatorsValues) {

  // =indF9

  return i(indicatorsValues, "indF9")

}, ["indF9"]);



registerFormula("indF26", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn146

  return i(indicatorsValues, "indAn146")

}, ["indAn146"]);



registerFormula("indF27", function(def_val, factors, parameters, indicatorsValues) {

  // =indF10

  return i(indicatorsValues, "indF10")

}, ["indF10"]);



registerFormula("indF28", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF11-indAn148 > 0, indF11-indAn148, 0)

  return Math.max(i(indicatorsValues, "indF11") - i(indicatorsValues, "indAn148"), 0)

}, ["indF11", "indAn148"]);



registerFormula("indF29", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF11-indAn148 < 0, indAn148-indF11, 0)

  var val = (i(indicatorsValues, "indF11") - i(indicatorsValues, "indAn148"))

  if(val < 0) return val * -1

  return 0

}, ["indF11", "indAn148"]);



registerFormula("indF30", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF12-indAn139>0, indF12-indAn139, 0)

  return Math.max(i(indicatorsValues, "indF12") - i(indicatorsValues, "indAn139"), 0)

}, ["indF12", "indAn139"]);



registerFormula("indF31", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF12-indAn139<0, indAn139-indF12, 0)

  var val = (i(indicatorsValues, "indF12") - i(indicatorsValues, "indAn139"))

  if(val < 0) return val * -1

  return 0

}, ["indF12", "indAn139"]);



registerFormula("indF32", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF13-indAn141 > 0, indF13-indAn141, 0)

  return Math.max(i(indicatorsValues, "indF13") - i(indicatorsValues, "indAn141"), 0)

}, ["indF13", "indAn141"]);



registerFormula("indF33", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF13-indAn141 < 0, indAn141-indF13, 0)

  var val = (i(indicatorsValues, "indF13") - i(indicatorsValues, "indAn141"))

  if(val < 0) return val * -1

  return 0

}, ["indF13", "indAn141"]);



registerFormula("indF34", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF14-indAn142 > 0, indF14-indAn142, 0)

  return Math.max(i(indicatorsValues, "indF14") - i(indicatorsValues, "indAn142"), 0)

}, ["indF14", "indAn142"]);



registerFormula("indF35", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF14-indAn142 < 0, indAn142-indF14, 0)

  var val = (i(indicatorsValues, "indF14") - i(indicatorsValues, "indAn142"))

  if(val < 0) return val * -1

  return 0

}, ["indF14", "indAn142"]);



registerFormula("indF36", function(def_val, factors, parameters, indicatorsValues) {

  // =IF((indF15+indF16)-(indAn140+indAn143+indAn144) > 0, (indF15+indF16)-(indAn140+indAn143+indAn144), 0)

  var val = (i(indicatorsValues, "indF15") + i(indicatorsValues, "indF16")) - (i(indicatorsValues, "indAn140") + i(indicatorsValues, "indAn143") + i(indicatorsValues, "indAn144"))

  if (val > 0) return val

  else return 0

}, ["indF15", "indF16", "indAn140", "indAn143", "indAn144"]);



registerFormula("indF37", function(def_val, factors, parameters, indicatorsValues) {

  // =IF((indF15+indF16)-(indAn140+indAn143+indAn144)<0, (indAn140+indAn143+indAn144)-(indF15+indF16), 0)

  var val = (i(indicatorsValues, "indF15") + i(indicatorsValues, "indF16")) - (i(indicatorsValues, "indAn140") + i(indicatorsValues, "indAn143") + i(indicatorsValues, "indAn144"))

  if (val < 0) return (i(indicatorsValues, "indAn140") + i(indicatorsValues, "indAn143") + i(indicatorsValues, "indAn144")) - (i(indicatorsValues, "indF15") + i(indicatorsValues, "indF16"))

  else return 0

}, ["indF15", "indF16", "indAn140", "indAn143", "indAn144"]);



registerFormula("indF38", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn150

  return i(indicatorsValues, "indAn150")

}, ["indAn150"]);



registerFormula("indF88", function(def_val, factors, parameters, indicatorsValues) {

  // =(indCr266.UAA1 / indCr1_def x indCr19.UAA1 + indCr268.UAA1 / indCr3_def x indCr20.UAA1 + indCr270.UAA1 / indCr5_def x indCr21.UAA1 + indCr271.UAA1 / indCr6_def x indCr22.UAA1 + indCr272.UAA1 / indCr7_def x indCr23.UAA1 + indCr273.UAA1 / indCr8_def x indCr24.UAA1 + indCr274.UAA1 / indCr9_def x indCr25.UAA1 + indCr275.UAA1 / indCr10_def x indCr26.UAA1 + indCr276.UAA1 / indCr11_def x indCr27.UAA1 + indCr277.UAA1 / indCr12_def x indCr28.UAA1 + indCr278.UAA1 / indCr13_def x indCr29.UAA1 + indCr266.UAA2 / indCr1_def x indCr19.UAA2 + indCr268.UAA2 / indCr3_def x indCr20.UAA2 + indCr270.UAA2 / indCr5_def x indCr21.UAA2 + indCr271.UAA2  / indCr6_def x indCr22.UAA2 + indCr272.UAA2 / indCr7_def x indCr23.UAA2 + indCr273.UAA2 / indCr8_def x indCr24.UAA2 + indCr9.UAA2  / indCr9_def  x indCr27.UAA2 + indCr275.UAA2 / indCr10_def x indCr26.UAA2 + indCr276.UAA2 / indCr11_def x indCr27.UAA2 + indCr277.UAA2 / indCr12_def x indCr28.UAA2 + indCr278.UAA2 / indCr13_def x indCr29.UAA2 + indCr279 / indCr16_def x indCr239) / paramF1_def



  var val = 0

  val += i(indicatorsValues, "indCr266.UAA1") / parameters.getDef("indCr1") * i(indicatorsValues, "indCr19.UAA1")

  val += i(indicatorsValues, "indCr268.UAA1") / parameters.getDef("indCr3") * i(indicatorsValues, "indCr20.UAA1")

  val += i(indicatorsValues, "indCr270.UAA1") / parameters.getDef("indCr5") * i(indicatorsValues, "indCr21.UAA1")

  val += i(indicatorsValues, "indCr271.UAA1") / parameters.getDef("indCr6") * i(indicatorsValues, "indCr22.UAA1")

  val += i(indicatorsValues, "indCr272.UAA1") / parameters.getDef("indCr7") * i(indicatorsValues, "indCr23.UAA1")

  val += i(indicatorsValues, "indCr273.UAA1") / parameters.getDef("indCr8") * i(indicatorsValues, "indCr24.UAA1")

  val += i(indicatorsValues, "indCr274.UAA1") / parameters.getDef("indCr9") * i(indicatorsValues, "indCr25.UAA1")

  val += i(indicatorsValues, "indCr275.UAA1") / parameters.getDef("indCr10") * i(indicatorsValues, "indCr26.UAA1")

  val += i(indicatorsValues, "indCr276.UAA1") / parameters.getDef("indCr11") * i(indicatorsValues, "indCr27.UAA1")

  val += i(indicatorsValues, "indCr277.UAA1") / parameters.getDef("indCr12") * i(indicatorsValues, "indCr28.UAA1")

  val += i(indicatorsValues, "indCr278.UAA1") / parameters.getDef("indCr13") * i(indicatorsValues, "indCr29.UAA1")

  val += i(indicatorsValues, "indCr266.UAA2") / parameters.getDef("indCr1") * i(indicatorsValues, "indCr19.UAA2")

  val += i(indicatorsValues, "indCr268.UAA2") / parameters.getDef("indCr3") * i(indicatorsValues, "indCr20.UAA2")

  val += i(indicatorsValues, "indCr270.UAA2") / parameters.getDef("indCr5") * i(indicatorsValues, "indCr21.UAA2")

  val += i(indicatorsValues, "indCr271.UAA2") / parameters.getDef("indCr6") * i(indicatorsValues, "indCr22.UAA2")

  val += i(indicatorsValues, "indCr272.UAA2") / parameters.getDef("indCr7") * i(indicatorsValues, "indCr23.UAA2")

  val += i(indicatorsValues, "indCr273.UAA2") / parameters.getDef("indCr8") * i(indicatorsValues, "indCr24.UAA2")

  val += i(indicatorsValues, "indCr274.UAA2") / parameters.getDef("indCr9") * i(indicatorsValues, "indCr25.UAA2")

  val += i(indicatorsValues, "indCr275.UAA2") / parameters.getDef("indCr10") * i(indicatorsValues, "indCr26.UAA2")

  val += i(indicatorsValues, "indCr276.UAA2") / parameters.getDef("indCr11") * i(indicatorsValues, "indCr27.UAA2")

  val += i(indicatorsValues, "indCr277.UAA2") / parameters.getDef("indCr12") * i(indicatorsValues, "indCr28.UAA2")

  val += i(indicatorsValues, "indCr278.UAA2") / parameters.getDef("indCr13") * i(indicatorsValues, "indCr29.UAA2")

  val += i(indicatorsValues, "indCr279") / parameters.getDef("indCr16") * i(indicatorsValues, "indCr239")



  val = val / parameters.getDef("paramF1")



  return val



}, ["indCr266.UAA1", "indCr19.UAA1", "indCr268.UAA1", "indCr20.UAA1", "indCr270.UAA1", "indCr21.UAA1", "indCr271.UAA1", "indCr22.UAA1", "indCr272.UAA1", "indCr23.UAA1", "indCr273.UAA1", "indCr24.UAA1", "indCr274.UAA1", "indCr25.UAA1", "indCr275.UAA1", "indCr26.UAA1", "indCr276.UAA1", "indCr27.UAA1", "indCr277.UAA1", "indCr28.UAA1", "indCr278.UAA1", "indCr29.UAA1", "indCr266.UAA2", "indCr19.UAA2", "indCr268.UAA2", "indCr20.UAA2", "indCr270.UAA2", "indCr21.UAA2", "indCr271.UAA2", "indCr22.UAA2", "indCr272.UAA2", "indCr23.UAA2", "indCr273.UAA2", "indCr24.UAA2", "indCr274.UAA2", "indCr25.UAA2", "indCr275.UAA2", "indCr26.UAA2", "indCr276.UAA2", "indCr27.UAA2", "indCr277.UAA2", "indCr28.UAA2", "indCr278.UAA2", "indCr29.UAA2", "indCr279", "indCr239"]);



registerFormula("indF89", function(def_val, factors, parameters, indicatorsValues) {

  return (i(indicatorsValues, "indAn127") / (parameters.getDef("indAn19") + 1000) + (i(indicatorsValues, "indAn5") * i(indicatorsValues, "indAn16")) / (parameters.getDef("indAn16") * 1.06) + (i(indicatorsValues, "indAn6") * i(indicatorsValues, "indAn17")) / parameters.getDef("indAn17") + (i(indicatorsValues, "indAn8") * i(indicatorsValues, "indAn18")) / parameters.getDef("indAn18")) / (i(indicatorsValues, "indAn1") + i(indicatorsValues, "indAn5") + i(indicatorsValues, "indAn6") + i(indicatorsValues, "indAn8"))

}, ["indAn127", "indAn5", "indAn16", "indAn6", "indAn17", "indAn8", "indAn18", "indAn1"]);



registerFormula("indF138", function(def_val, factors, parameters, indicatorsValues) {

  // =indAn147

  return i(indicatorsValues, "indAn147")

}, ["indAn147"]);



registerFormula("indF181", function(def_val, factors, parameters, indicatorsValues) {

  // ==(indAn136 - indF67 x indAn136 / (indAn136 + indAn138)) x paramF47_def + (indAn138 - indF67 x indAn138 / (indAn136 + indAn138)) x paramF48_def

  return ((i(indicatorsValues, "indAn136") - i(indicatorsValues, "indF67") * i(indicatorsValues, "indAn136") / (i(indicatorsValues, "indAn136") + i(indicatorsValues, "indAn138"))) * parameters.getDef("paramF47")) + ((i(indicatorsValues, "indAn138") - i(indicatorsValues, "indF67") * i(indicatorsValues, "indAn138") / (i(indicatorsValues, "indAn136") + i(indicatorsValues, "indAn138"))) * parameters.getDef("paramF48"))

}, ["indAn136", "indAn138", "indF67"]);



registerFormula("indF189", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

	var val = 0



	if(AepSelected(selectedAeps, "A.3.1")) {

		val += i(indicatorsValues, "indAn3") * parameters.getDef("paramF61")

	} else if(AepSelected(selectedAeps, "A.3.2")) {

		val += i(indicatorsValues, "indAn3") * parameters.getDef("paramF62")

	}



	val += i(indicatorsValues, "indAn1") * parameters.getDef("paramF59") + i(indicatorsValues, "indAn2") * parameters.getDef("paramF60")

	return val /= (i(indicatorsValues, "indF177") + i(indicatorsValues, "indF178") + i(indicatorsValues, "indF179") + i(indicatorsValues, "indF180") + i(indicatorsValues, "indCr239"))

}, ["indAn1", "indAn2", "indAn3", "indF177", "indF178", "indF179", "indF180", "indCr239"]);



registerFormula("indF192", function(def_val, factors, parameters, indicatorsValues) {

	var straw_feed = i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn113") + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn114") + i(indicatorsValues, "indAn3") * ( i(indicatorsValues, "indAn115") + i(indicatorsValues, "indAn116") )



	var ratio = 0

	if( i(indicatorsValues, "indAn134") > 0 ) {

		ratio = straw_feed / i(indicatorsValues, "indAn134")

	}



	return ( ( ( i(indicatorsValues, "indF4") + i(indicatorsValues, "indF6") ) * ratio ) + i(indicatorsValues, "indF12") + i(indicatorsValues, "indF13") + i(indicatorsValues, "indF14") + i(indicatorsValues, "indF15") + i(indicatorsValues, "indF16") - i(indicatorsValues, "indF19") * ratio - i(indicatorsValues, "indF30") - i(indicatorsValues, "indF32") - i(indicatorsValues, "indF34") - i(indicatorsValues, "indF36") ) / ( i(indicatorsValues, "indAn139") + i(indicatorsValues, "indAn140") + i(indicatorsValues, "indAn141") + i(indicatorsValues, "indAn142") + i(indicatorsValues, "indAn143") + i(indicatorsValues, "indAn144") + straw_feed )

}, ["indF4", "indF6", "indF12", "indF13", "indF14", "indF15", "indF16", "indF19", "indF30", "indF32", "indF34", "indF36", "indAn139", "indAn140", "indAn141", "indAn142", "indAn143", "indAn144", "indAn1", "indAn2", "indAn3", "indAn113", "indAn114", "indAn115", "indAn116", "indAn134"]);



registerFormula("indF193", function(def_val, factors, parameters, indicatorsValues) {

	var rapeseed_num = 0

	if( 0.56 * i(indicatorsValues, "indF9") > i(indicatorsValues, "indAn146") ) {

		rapeseed_num = i(indicatorsValues, "indAn146")

	} else {

		rapeseed_num = 0.56 * i(indicatorsValues, "indF9")

	}



	return ( i(indicatorsValues, "indF3") + i(indicatorsValues, "indF5") + i(indicatorsValues, "indF11") + rapeseed_num - i(indicatorsValues, "indF17") - i(indicatorsValues, "indF21") - i(indicatorsValues, "indF28") ) / ( i(indicatorsValues, "indAn145") + i(indicatorsValues, "indAn146") + i(indicatorsValues, "indAn147") + i(indicatorsValues, "indAn148") + i(indicatorsValues, "indAn149") )

}, ["indF3", "indF5", "indF9", "indF11", "indAn145", "indAn146", "indAn147", "indAn148", "indAn149"]);



registerFormula("indF194", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

	var straw_feed = i(indicatorsValues, "indAn1") * i(indicatorsValues, "indAn113") + i(indicatorsValues, "indAn2") * i(indicatorsValues, "indAn114") + i(indicatorsValues, "indAn3") * ( i(indicatorsValues, "indAn115") + i(indicatorsValues, "indAn116") )



	var ratio = 0

	if( i(indicatorsValues, "indAn134") > 0 ) {

		ratio = straw_feed / i(indicatorsValues, "indAn134")

	}



	var grass_prot = parameters.getDef("paramCr56")

	if( AepSelected(selectedAeps, "C.9.2") || AepSelected(selectedAeps, "C.9.3") ) {

		grass_prot = parameters.getDef("paramCr59")

	}



	var rapeseed_num = 0.56 * i(indicatorsValues, "indF9")

	if( 0.56 * i(indicatorsValues, "indF9") > i(indicatorsValues, "indAn146") ) {

		rapeseed_num = i(indicatorsValues, "indAn146")

	}



	var prod_grass_TG = 0
	var prod_grass_PG = 0

	if( (i(indicatorsValues, "indF15") + i(indicatorsValues, "indF16")) > 0 ) {

		prod_grass_TG = i(indicatorsValues, "indF36") * i(indicatorsValues, "indF15") / ( i(indicatorsValues, "indF15") + i(indicatorsValues, "indF16") )
		prod_grass_PG = i(indicatorsValues, "indF36") * i(indicatorsValues, "indF16") / ( i(indicatorsValues, "indF15") + i(indicatorsValues, "indF16") )

	}



	return ( ( ( i(indicatorsValues, "indF4") + i(indicatorsValues, "indF6") ) * ratio ) * parameters.getDef("paramCr49") + i(indicatorsValues, "indF3") * parameters.getDef("paramCr48") + i(indicatorsValues, "indF5") * parameters.getDef("paramCr50") + i(indicatorsValues, "indF11") * parameters.getDef("paramCr52") + i(indicatorsValues, "indF12") * parameters.getDef("paramCr53") + i(indicatorsValues, "indF13") * parameters.getDef("paramCr54") + i(indicatorsValues, "indF14") * parameters.getDef("paramCr55") + i(indicatorsValues, "indF15") * grass_prot + i(indicatorsValues, "indF16") * parameters.getDef("paramCr59") + rapeseed_num - i(indicatorsValues, "indF19") * ratio * parameters.getDef("paramCr49") - i(indicatorsValues, "indF17") * parameters.getDef("paramCr48") - i(indicatorsValues, "indF21") * parameters.getDef("paramCr50") - i(indicatorsValues, "indF28") * parameters.getDef("paramCr52") - i(indicatorsValues, "indF30") * parameters.getDef("paramCr53") - i(indicatorsValues, "indF32") * parameters.getDef("paramCr54") - i(indicatorsValues, "indF34") * parameters.getDef("paramCr55") - prod_grass_TG * grass_prot - prod_grass_PG * parameters.getDef("paramCr59") ) / ( i(indicatorsValues, "indAn139") * parameters.getDef("paramCr53") + ( i(indicatorsValues, "indAn140") + i(indicatorsValues, "indAn143") + i(indicatorsValues, "indAn144") ) * parameters.getDef("paramCr56") + i(indicatorsValues, "indAn141") * parameters.getDef("paramCr54") + i(indicatorsValues, "indAn142") * parameters.getDef("paramCr55") + i(indicatorsValues, "indAn145") * parameters.getDef("paramCr50") + i(indicatorsValues, "indAn146") * parameters.getDef("paramCr57") + i(indicatorsValues, "indAn147") * parameters.getDef("paramCr58") + i(indicatorsValues, "indAn148") * parameters.getDef("paramCr52") + i(indicatorsValues, "indAn149") * parameters.getDef("paramCr48") + straw_feed * parameters.getDef("paramCr49") )

}, ["indF3", "indF4", "indF5", "indF6", "indF9", "indF11", "indF12", "indF13", "indF14", "indF15", "indF16", "indF17", "indF19","indF21", "indF28", "indF30", "indF32", "indF34", "indF36", "indAn1", "indAn2", "indAn3", "indAn113", "indAn114", "indAn115", "indAn116", "indAn134", "indAn139", "indAn140", "indAn141", "indAn142", "indAn143", "indAn144", "indAn145", "indAn146", "indAn147", "indAn148", "indAn149"]);



registerFormula("indT1", function(def_val, factors, parameters, indicatorsValues) {

  // =(indF54 - indF54_min) / (indF54_max - indF54_min)

  return (i(indicatorsValues, "indF54") - parameters.getMin("indF54")) / (parameters.getMax("indF54") - parameters.getMin("indF54"))

}, ["indF54"]);



registerFormula("indT2", function(def_val, factors, parameters, indicatorsValues) {

  // =(indF55 - indF55_min) / (indF55_max - indF55_min)

  return (i(indicatorsValues, "indF55") - parameters.getMin("indF55")) / (parameters.getMax("indF55") - parameters.getMin("indF55"))

}, ["indF55"]);



registerFormula("indT3", function(def_val, factors, parameters, indicatorsValues) {

  // =(indF53 - indF53_min) / (indF53_max - indF53_min)

  return (i(indicatorsValues, "indF53") - parameters.getMin("indF53")) / (parameters.getMax("indF53") - parameters.getMin("indF53"))

}, ["indF53"]);



registerFormula("indT4", function(def_val, factors, parameters, indicatorsValues) {

  // =indT1_def x indT1 + indT2_def x indT2 + indT3_def x indT3

  return parameters.getDef("indT1") * i(indicatorsValues, "indT1") + parameters.getDef("indT2") * i(indicatorsValues, "indT2") + parameters.getDef("indT3") * i(indicatorsValues, "indT3")

}, ["indT1", "indT2", "indT3"]);



registerFormula("indT5", function(def_val, factors, parameters, indicatorsValues) {

  // =(indF52 - indF52_min) / (indF52_max - indF52_min)

  return (i(indicatorsValues, "indF52") - parameters.getMin("indF52")) / (parameters.getMax("indF52") - parameters.getMin("indF52"))

}, ["indF52"]);



registerFormula("indT6", function(def_val, factors, parameters, indicatorsValues) {

  // =(indF56 - indF56_min) / (indF56_max - indF56_min)

  return (i(indicatorsValues, "indF56") - parameters.getMin("indF56")) / (parameters.getMax("indF56") - parameters.getMin("indF56"))

}, ["indF56"]);



registerFormula("indT7", function(def_val, factors, parameters, indicatorsValues) {

  // =indT5_def x indT5 + indT6_def x indT6

  return parameters.getDef("indT5") * i(indicatorsValues, "indT5") + parameters.getDef("indT6") * i(indicatorsValues, "indT6")

}, ["indT5", "indT6"]);



registerFormula("indT8", function(def_val, factors, parameters, indicatorsValues) {

  // =indT4_def x indT4 + indT7_def x indT7

  return parameters.getDef("indT4") * i(indicatorsValues, "indT4") + parameters.getDef("indT7") * i(indicatorsValues, "indT7")

}, ["indT4", "indT7"]);



registerFormula("indT9", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF96 > paramF35_max, 0, IF(indF96 < paramF35_min, 1, 1 - [(indF96 - paramF35_min) / (paramF35_max - paramF35_min)]))

  if(i(indicatorsValues, "indF96") > parameters.getMax("paramF35")) {

    return 0

  } else if(i(indicatorsValues, "indF96") < parameters.getMin("paramF35")) {

    return 1

  } else {

    return 1 - ( (i(indicatorsValues, "indF96") - parameters.getMin("paramF35")) / (parameters.getMax("paramF35") - parameters.getMin("paramF35")) )

  }

}, ["indF96"]);



registerFormula("indT10", function(def_val, factors, parameters, indicatorsValues) {

  // =(indF58 - indF58_min) / (indF58_max - indF58_min)

  return (i(indicatorsValues, "indF58") - parameters.getMin("indF58")) / (parameters.getMax("indF58") - parameters.getMin("indF58"))

}, ["indF58"]);



registerFormula("indT11", function(def_val, factors, parameters, indicatorsValues) {

  // =indT9_def x indT9 + indT10_def x indT10

  return (parameters.getDef("indT9") * i(indicatorsValues, "indT9")) + (parameters.getDef("indT10") * i(indicatorsValues, "indT10"))

}, ["indT9", "indT10"]);



registerFormula("indT12", function(def_val, factors, parameters, indicatorsValues) {

  if(i(indicatorsValues, "indF66") > parameters.getMax("paramF36")) {

    return 0

  } else if(i(indicatorsValues, "indF66") < parameters.getMin("paramF36")) {

    return 1

  } else {

    return 1 - ( (i(indicatorsValues, "indF66") - parameters.getMin("paramF36")) / (parameters.getMax("paramF36") - parameters.getMin("paramF36")) )

  }

}, ["indF66"]);



registerFormula("indT13", function(def_val, factors, parameters, indicatorsValues) {

  // =indT11_def x indT11 + indT12_def x indT12

  return parameters.getDef("indT11") * i(indicatorsValues, "indT11") + parameters.getDef("indT12") * i(indicatorsValues, "indT12")

}, ["indT11", "indT12"]);



registerFormula("indT14", function(def_val, factors, parameters, indicatorsValues) {

	// =(indCr240 - indCr240_min) / (indCr240_max - indCr240_min)

	return (i(indicatorsValues, "indCr240") - parameters.getMin("indCr240")) / (parameters.getMax("indCr240") - parameters.getMin("indCr240"))

}, ["indCr240"]);



registerFormula("indT15", function(def_val, factors, parameters, indicatorsValues) {

	// =(indCr281 - indCr281_min) / (indCr281_max - indCr281_min)

	return (i(indicatorsValues, "indCr281") - parameters.getMin("indCr281")) / (parameters.getMax("indCr281") - parameters.getMin("indCr281"))

}, ["indCr281"]);



registerFormula("indT16", function(def_val, factors, parameters, indicatorsValues) {

	// =indT14_def x indT14 + indT15_def x indT15

	return parameters.getDef("indT14") * i(indicatorsValues, "indT14") + parameters.getDef("indT15") * i(indicatorsValues, "indT15")

}, ["indT14", "indT15"]);



registerFormula("indT17", function(def_val, factors, parameters, indicatorsValues) {

	// =IF(indF69 < paramF37_min, 1, IF(indF69 > paramF37_max, 0, 1 - (indF69 - paramF37_min) / (paramF37_max - paramF37_min)))

  if(i(indicatorsValues, "indF69") < parameters.getMin("paramF37")) {

    return 1

  } else if(i(indicatorsValues, "indF69") > parameters.getMax("paramF37")) {

    return 0

  } else {

    return 1 - (i(indicatorsValues, "indF69") - parameters.getMin("paramF37")) / (parameters.getMax("paramF37") - parameters.getMin("paramF37"))

  }

}, ["indF69"]);



registerFormula("indT18", function(def_val, factors, parameters, indicatorsValues) {

	// =IF(indF49 < paramF38_min, 1, IF(indF49 > paramF38_max, 0, 1 - (indF49 - paramF38_min) / (paramF38_max - paramF38_min)))

  if(i(indicatorsValues, "indF49") < parameters.getMin("paramF38")) {

    return 1

  } else if(i(indicatorsValues, "indF49") > parameters.getMax("paramF38")) {

    return 0

  } else {

    return 1 - (i(indicatorsValues, "indF49") - parameters.getMin("paramF38")) / (parameters.getMax("paramF38") - parameters.getMin("paramF38"))

  }

}, ["indF49"]);



registerFormula("indT19", function(def_val, factors, parameters, indicatorsValues) {

	// =indT17_def x indT17 + indT18_def x indT18

	return parameters.getDef("indT17") * i(indicatorsValues, "indT17") + parameters.getDef("indT18") * i(indicatorsValues, "indT18")

}, ["indT17", "indT18"]);



registerFormula("indT20", function(def_val, factors, parameters, indicatorsValues) {

	// =(indCr280 - indCr280_min) / (indCr280_max - indCr280_min)

	return (i(indicatorsValues, "indCr280") - parameters.getMin("indCr280")) / (parameters.getMax("indCr280") - parameters.getMin("indCr280"))

}, ["indCr280"]);



registerFormula("indT21", function(def_val, factors, parameters, indicatorsValues) {

	// =(indF70 - indF70_min) / (indF70_max - indF70_min)

	return (i(indicatorsValues, "indF70") - parameters.getMin("indF70")) / (parameters.getMax("indF70") - parameters.getMin("indF70"))

}, ["indF70"]);



registerFormula("indT22", function(def_val, factors, parameters, indicatorsValues) {

	// =indT20_def x indT20 + indT21_def x indT21

	return parameters.getDef("indT20") * i(indicatorsValues, "indT20") + parameters.getDef("indT21") * i(indicatorsValues, "indT21")

}, ["indT20", "indT21"]);



registerFormula("indT23", function(def_val, factors, parameters, indicatorsValues) {

	// =indT16_def x indT16 + indT19_def x indT19 + indT22_def x indT22

	return parameters.getDef("indT16") * i(indicatorsValues, "indT16") + parameters.getDef("indT19") * i(indicatorsValues, "indT19") + parameters.getDef("indT22") * i(indicatorsValues, "indT22")

}, ["indT16", "indT19", "indT22"]);



registerFormula("indT24", function(def_val, factors, parameters, indicatorsValues) {

	// =1/3 x indT8 + 1/3 x indT13 + 1/3 x indT23

  return parameters.getDef("indT8") * i(indicatorsValues, "indT8") + parameters.getDef("indT13") * i(indicatorsValues, "indT13") + parameters.getDef("indT23") * i(indicatorsValues, "indT23")

}, ["indT8", "indT13", "indT23"]);



registerFormula("indT25", function(def_val, factors, parameters, indicatorsValues) {

	// =(indAn131 - indAn131_min) / (indAn131_max - indAn131_min)

	return (i(indicatorsValues, "indAn131") - parameters.getMin("indAn131")) / (parameters.getMax("indAn131") - parameters.getMin("indAn131"))

}, ["indAn131"]);



registerFormula("indT26", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF86 > paramF39_min, 1, indF86)

  if(i(indicatorsValues, "indF86") > parameters.getMin("paramF39")) {

    return 1

  } else {

    return i(indicatorsValues, "indF86")

  }

}, ["indF86"]);



registerFormula("indT27", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF88 > paramF45_max, 1, IF(indF88 < paramF45_min, 0, (indF88 - paramF45_min) / (paramF45_max - paramF45_min)))

  var if88 = i(indicatorsValues, "indF88")

  var p45max = parameters.getMax("paramF45")

  var p45min = parameters.getMin("paramF45")



  if(if88 > p45max) {

    return 1

  } else if (if88 < p45min){

    return 0

  } else {

    return (if88 - p45min) / (p45max - p45min)

  }

}, ["indF88"]);



registerFormula("indT28", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF89 > paramF45_max, 1, IF(indF89 < paramF45_min, 0, (indF89 - paramF45_min) / (paramF45_max - paramF45_min)))

  var if89 = i(indicatorsValues, "indF89")

  var p45max = parameters.getMax("paramF45")

  var p45min = parameters.getMin("paramF45")



  if(if89 > p45max) {

    return 1

  } else if (if89 < p45min){

    return 0

  } else {

    return (if89 - p45min) / (p45max - p45min)

  }

}, ["indF89"]);



registerFormula("indT29", function(def_val, factors, parameters, indicatorsValues) {

	// =indT27_def x indT27 + indT28_def x indT28

	return parameters.getDef("indT27") * i(indicatorsValues, "indT27") + parameters.getDef("indT28") * i(indicatorsValues, "indT28")

}, ["indT27", "indT28"]);



registerFormula("indT30", function(def_val, factors, parameters, indicatorsValues) {

	// =indT23_def x indT25 + indT26_def x indT26 + indT29_def x indT29

	return parameters.getDef("indT25") * i(indicatorsValues, "indT25") + parameters.getDef("indT26") * i(indicatorsValues, "indT26") + parameters.getDef("indT29") * i(indicatorsValues, "indT29")

}, ["indT25", "indT26", "indT29"]);



registerFormula("indT31", function(def_val, factors, parameters, indicatorsValues) {

	// =1 - indF87 / 12

	return 1 - i(indicatorsValues, "indF87") / 12

}, ["indF87"]);



registerFormula("indT32", function(def_val, factors, parameters, indicatorsValues) {

	// =IF((indF83 - indF84) / paramF6_def <= paramF32_def, 1, IF((indF83 - indF84) / paramF6_def >= paramF31_def x 12, 0, 1 - ((indF83 - indF84) / paramF6_def - paramF32_def) / (paramF31_def x 12 - paramF32_def)))

	if( (i(indicatorsValues, "indF83") - i(indicatorsValues, "indF84")) / parameters.getDef("paramF6") <= parameters.getDef("paramF32")) {

    return 1

  } else if( (i(indicatorsValues, "indF83") - i(indicatorsValues, "indF84")) / parameters.getDef("paramF6") >= parameters.getDef("paramF31") * 12) {

    return 0

  } else {

    return ( 1 - ((i(indicatorsValues, "indF83") - i(indicatorsValues, "indF84")) / parameters.getDef("paramF6") - parameters.getDef("paramF32")) / (parameters.getDef("paramF31") * 12 - parameters.getDef("paramF32")) )

  }

}, ["indF83", "indF84"]);



registerFormula("indT33", function(def_val, factors, parameters, indicatorsValues) {

	// =indT31_def x indT31 + indT32_def x indT32

	return parameters.getDef("indT31") * i(indicatorsValues, "indT31") + parameters.getDef("indT32") * i(indicatorsValues, "indT32")

}, ["indT31", "indT32"]);



registerFormula("indT34", function(def_val, factors, parameters, indicatorsValues) {

	// =(indGl2 - indGl2_min) / (indGl2_max - indGl2_min)

	return (i(indicatorsValues, "indGl2") - parameters.getMin("indGl2")) / (parameters.getMax("indGl2") - parameters.getMin("indGl2"))

}, ["indGl2"]);



registerFormula("indT35", function(def_val, factors, parameters, indicatorsValues) {

	// =IF(indF49 < paramF38_min, 1, IF(indF49 > paramF38_max, 0, 1 - (indF49 - paramF38_min) / (paramF38_max - paramF38_min)))

  if(i(indicatorsValues, "indF49") < parameters.getMin("paramF38")) {

    return 1

  } else if(i(indicatorsValues, "indF49") > parameters.getMax("paramF38")) {

    return 0

  } else {

    return (1 - (i(indicatorsValues, "indF49") - parameters.getMin("paramF38")) / (parameters.getMax("paramF38") - parameters.getMin("paramF38")))

  }

}, ["indF49"]);



registerFormula("indT36", function(def_val, factors, parameters, indicatorsValues) {

	// =indT33_def x indT33 + indT34_def x indT34 + indT35_def x indT35

	return parameters.getDef("indT33") * i(indicatorsValues, "indT33") + parameters.getDef("indT34") * i(indicatorsValues, "indT34") + parameters.getDef("indT35") * i(indicatorsValues, "indT35")

}, ["indT33", "indT34", "indT35"]);



registerFormula("indT37", function(def_val, factors, parameters, indicatorsValues) {

  // =indT30_def x indT30 + indT36_def x indT36

  return parameters.getDef("indT30") * i(indicatorsValues, "indT30") + parameters.getDef("indT36") * i(indicatorsValues, "indT36")

}, ["indT30", "indT36"]);



registerFormula("indT38", function(def_val, factors, parameters, indicatorsValues) {

	// =IF(indEc5 / paramF33_def < paramF41_min x paramF6_def, 0, IF(indEc5 / paramF33_def > paramF41_max x paramF6_def, 1, (indEc5 / paramF33_def - paramF41_min x paramF6_def) / (paramF41_max x paramF6_def - paramF41_min x paramF6_def)))



  if(i(indicatorsValues, "indEc5") / parameters.getDef("paramF33") < parameters.getMin("paramF41") * parameters.getDef("paramF6")) {

    return 0

  } else if (i(indicatorsValues, "indEc5") / parameters.getDef("paramF33") > parameters.getMax("paramF41") * parameters.getDef("paramF6")) {

    return 1

  } else {

    return (i(indicatorsValues, "indEc5") / parameters.getDef("paramF33") - parameters.getMin("paramF41") * parameters.getDef("paramF6")) / (parameters.getMax("paramF41") * parameters.getDef("paramF6") - parameters.getMin("paramF41") * parameters.getDef("paramF6"))

  }

}, ["indEc5"]);



registerFormula("indT39", function(def_val, factors, parameters, indicatorsValues) {

	// =IF((indF41 + indF42) > indF44, indF44 / (indF41 + indF42 + indF44) x 2, (indF41 + indF42) / (indF41 + indF42 + indF44) x 2)

  if((i(indicatorsValues, "indF41") + i(indicatorsValues, "indF42")) > i(indicatorsValues, "indF44")) {

	  return i(indicatorsValues, "indF44") / (i(indicatorsValues, "indF41") + i(indicatorsValues, "indF42") + i(indicatorsValues, "indF44")) * 2

  } else {

	  return (i(indicatorsValues, "indF41") + i(indicatorsValues, "indF42")) / (i(indicatorsValues, "indF41") + i(indicatorsValues, "indF42") + i(indicatorsValues, "indF44")) * 2

  }

}, ["indF41", "indF42", "indF44"]);



registerFormula("indT40", function(def_val, factors, parameters, indicatorsValues) {

	// =(indF41 + indF42 + indF44 - indF40 - indF43 - indF45 - indF46 - indF47) / (indF41 + indF42 + indF44)

	return (i(indicatorsValues, "indF41") + i(indicatorsValues, "indF42") + i(indicatorsValues, "indF44") - i(indicatorsValues, "indF40") - i(indicatorsValues, "indF43") - i(indicatorsValues, "indF45") - i(indicatorsValues, "indF46") - i(indicatorsValues, "indF47")) / (i(indicatorsValues, "indF41") + i(indicatorsValues, "indF42") + i(indicatorsValues, "indF44"))

}, ["indF41", "indF42", "indF44", "indF40", "indF43", "indF45", "indF46", "indF47", "indF41", "indF42", "indF44"]);



registerFormula("indT41", function(def_val, factors, parameters, indicatorsValues) {

  // =IF(indF90 > paramF40_max x paramF33_def, 1,

  // IF(indF90 < paramF40_min x paramF33_def, 0,

  // (indF90 - paramF40_min x paramF33_def) / (paramF40_max x paramF33_def - paramF40_min x paramF33_def)))



  if(i(indicatorsValues, "indF90") > parameters.getMax("paramF40") * parameters.getDef("paramF33")) {

    return 1

  } else if(i(indicatorsValues, "indF90") < parameters.getMin("paramF40") * parameters.getDef("paramF33")) {

    return 0

  } else {

    return (i(indicatorsValues, "indF90") - parameters.getMin("paramF40") * parameters.getDef("paramF33")) / (parameters.getMax("paramF40") * parameters.getDef("paramF33") - parameters.getMin("paramF40") * parameters.getDef("paramF33"))

  }

}, ["indF90"]);



registerFormula("indT42", function(def_val, factors, parameters, indicatorsValues) {

	// =indT38_def x indT38 + indT39_def x indT39 + indT40_def x indT40 + indT41_def x indT41

	return parameters.getDef("indT38") * i(indicatorsValues, "indT38") + parameters.getDef("indT39") * i(indicatorsValues, "indT39") + parameters.getDef("indT40") * i(indicatorsValues, "indT40") + parameters.getDef("indT41") * i(indicatorsValues, "indT41")

}, ["indT38", "indT39", "indT40", "indT41"]);



registerFormula("indT43", function(def_val, factors, parameters, indicatorsValues) {

	// =indT24_def x indT24 + indT37_def x indT37 + indT42_def x indT42

	return parameters.getDef("indT24") * i(indicatorsValues, "indT24") + parameters.getDef("indT37") * i(indicatorsValues, "indT37") + parameters.getDef("indT42") * i(indicatorsValues, "indT42")

}, ["indT24", "indT37", "indT42"]);



registerFormula("indT44", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {

  // =sum of the first n years of indT42

  if(yearNumber == 0) {

    return i(indicatorsValues, "indT42")

  } else {

    return prevIndValues["indT44"] + i(indicatorsValues, "indT42")

  }

}, ["indT42"]);



registerFormula("indT45", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {

  // =sum of the first n years of indT24

  if(yearNumber == 0) {

    return i(indicatorsValues, "indT24")

  } else {

    return prevIndValues["indT45"] + i(indicatorsValues, "indT24")

  }

}, ["indT24"]);



registerFormula("indT46", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {

  // =sum of the first n years of indT37

  if(yearNumber == 0) {

    return i(indicatorsValues, "indT37")

  } else {

    return prevIndValues["indT46"] + i(indicatorsValues, "indT37")

  }

}, ["indT37"]);



registerFormula("indT47", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {

  // =min(indT44 / n; indT45 / n; indT46 / n) x 10000

  if(yearNumber == 0) {

	  return 0

  } else {

	  return prevIndValues["indT47"] + Math.round(Math.min(i(indicatorsValues, "indT42"), i(indicatorsValues, "indT24"), i(indicatorsValues, "indT37")) * 10000)

  }

}, ["indT42", "indT24", "indT37"]);

registerFormula("indYearNumber", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {
  // +1 car l'incrementation de l'année est faite après la MAJ des indicators
  return yearNumber + 1
}, [])


registerFormula("indF91inf0", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {
  if(i(indicatorsValues, "indF91") >= 0) {
    return 0
  } else {
    return i(prevIndValues, "indF91inf0") + 1
  }
}, ["indF91"])

/************************************
les indicateurs pour le nombre de victoires
mis à jour via le code, et non par les formules (car en fonction de la victoire ou non)
donc ces formules renvoient toujours la valeur précédente
/************************************/


registerFormula("indNbWonGames", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {
  return i(prevIndValues, "indNbWonGames")
}, [])


registerFormula("indNbWonGames_fr", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {
  return i(prevIndValues, "indNbWonGames_fr")
}, [])
registerFormula("indNbWonGames_be", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {
  return i(prevIndValues, "indNbWonGames_be")
}, [])
registerFormula("indNbWonGames_it", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {
  return i(prevIndValues, "indNbWonGames_it")
}, [])
registerFormula("indNbWonGames_pl", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {
  return i(prevIndValues, "indNbWonGames_pl")
}, [])


registerFormula("indF207", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevValues, selectedAeps) {

  if(yearNumber == 0 && AepSelected(selectedAeps, "G.1.2")) {

    return 1

  }

  if(AepSelected(selectedAeps, "G.1.2")) {

    return prevValues["indF207"] + 1

  } else {

    return 0

  }

}, []);


// GLOBAL type 2 (end) ////////////////////////////////////////////////////////////////////////////////

// ALEAS

registerFormula("indF93", function(def_val, factors, parameters, indicatorsValues, yearNumber, prevIndValues) {

  const isHappening = Math.random() < parameters.getDef("paramF42")
  console.log("isHappening", isHappening)
  if(!prevIndValues["indF93"] && isHappening) {
    // on passe de false à true : on applique l'effet
    parameters.get("paramAn1").def += parameters.getDef("paramF43")

  }

  if(prevIndValues["indF93"] && !isHappening) {
    // on passe de true à false : on désapplique l'effet
    parameters.get("paramAn1").def -= parameters.getDef("paramF43")

  }



  return isHappening
}, []);
