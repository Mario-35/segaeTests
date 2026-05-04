var aepAvailabilitiesRules = {}

function registerAvailabilityRule(aepId, message, rule) {
  if(aepAvailabilitiesRules[aepId] === undefined) aepAvailabilitiesRules[aepId] = []
  aepAvailabilitiesRules[aepId].push({
    func: rule,
    message: message
  })
}


window.applyAvailabilityRules = function (aepId, allActionsIds, currentSelectedActions, translateFunc) {
  var rules = aepAvailabilitiesRules[aepId]
  var available = true
  var msg = []
  if(aepAvailabilitiesRules[aepId] !== undefined) {
    rules.forEach(({func, message}) => {
      var ruleAvail = func(allActionsIds, currentSelectedActions)
      console.log("#####################################################");
      console.log(typeof func);
      console.log(func);
      console.log(typeof message);
      console.log(message);
      
      if(!ruleAvail) msg.push(message(translateFunc))

      available = available && ruleAvail
    })
  }
  return {available, msg}
}



/*****************************************/

{
  var msgFunc = (t) => (t("region_not_allowed"))
  var ruleFunc = (allActionsIds) => {
    return (allActionsIds[0].indexOf("C.2.1") === -1)
  }
  registerAvailabilityRule("C.2.2", msgFunc, ruleFunc)
}

{
  var msgFunc = (t) => (t("region_not_allowed"))
  var ruleFunc = (allActionsIds) => {
    var result = (allActionsIds[0].indexOf("C.2.2") === -1)
    return result
  }
  registerAvailabilityRule("C.2.1", msgFunc , ruleFunc)
}




/** UNIQUE CHANGES ***************************************/
function _canChangeOneTime(allActionsIds, concernedIds) {
  var arr = []
  allActionsIds.forEach(selActions => {
    selActions.forEach(id => {
      if(concernedIds.indexOf(id) > -1) {
        arr.push(id)
      }
    })
  })
  // remove duplicates
  arr = arr.filter((item, i) => arr.indexOf(item) === i )
  return arr.length < 2
}

// helper function: used when a group of aeps can only be changed once
function _registerUniqChange(aepId, index, arr) {

  var msgfunc = (t) =>{
    var name = t(aepId)
    return `<b>${name}</b> ${t("one_change")}`
  }


  registerAvailabilityRule(aepId, msgfunc, (allActionsIds, currentSelectedActions) => {
    return _canChangeOneTime(allActionsIds, arr)
  })
}

// G.1.x, can only be changed once during the game
["G.1.1", "G.1.2"].forEach(_registerUniqChange);

// A.1.x can only be changed once during the game
["A.1.1","A.1.2","A.1.3"].forEach(_registerUniqChange);

// A.4.x can only be changed once during the game
["A.4.1", "A.4.2", "A.4.3", "A.4.4", "A.4.5"].forEach(_registerUniqChange);

// A.5.x can only be changed once during the game
["A.5.1", "A.5.2", "A.5.3"].forEach(_registerUniqChange);

// C.15.x can only be changed once during the game
["C.15.1", "C.15.2"].forEach(_registerUniqChange);

/***********************************************************/

// helper function : permet de gérer la dispo d'une aep en fonction dune autre, et aussi de gérer les contreparties
function _availabilityDependsOf(id, other, otherInGroup) {

  var msgFunc = (t) => {
    var o = t(other)
    var msg = t("only_available_if")
    var name = t(id)
    return `<b>${name}</b> ${msg} <b>${o}</b>`
  }


  registerAvailabilityRule(id, msgFunc,  (allActionsIds, currentSelectedActions) => {
    return currentSelectedActions.indexOf(other) > -1
  })
  // ici on register aussi les contreparties
  otherInGroup.forEach( oId => {

    var msgFunc = (t) => {
      var o = t(oId)
      var msg = t("only_available_if_not")
      var name = t(id)
      return `<b>${o}</b> ${msg} <b>${name}</b>`
    }

    registerAvailabilityRule(oId, msgFunc,  (allActionsIds, currentSelectedActions) => {
      return currentSelectedActions.indexOf(id) === -1
    })
  })
}

// C.2.3, only available if C.1.3
_availabilityDependsOf("C.2.3", "C.1.3", ["C.1.1", "C.1.2"]);

// C.4.1, only available if G.1.1
_availabilityDependsOf("C.4.1", "G.1.1", ["G.1.2"]);

// C.5.1 and C.5.2, only available if G.1.1
_availabilityDependsOf("C.5.1", "G.1.1", ["G.1.2"]);
_availabilityDependsOf("C.5.2", "G.1.1", ["G.1.2"]);

// C.6.1 and C.6.2, only available if G.1.1
_availabilityDependsOf("C.6.1", "G.1.1", ["G.1.2"]);
_availabilityDependsOf("C.6.2", "G.1.1", ["G.1.2"]);

// C.7.1 and C.7.2, only available if G.1.1
_availabilityDependsOf("C.7.1", "G.1.1", ["G.1.2"]);
_availabilityDependsOf("C.7.2", "G.1.1", ["G.1.2"]);

// TODO attention cette regle est surement à revoir, ou alors il faut préciser les contreparties
// C.9.1, C.9.2, C.9.3, only available if C.12.6, C.12.7, C.12.8, C.12.9, C.13.6, C.13.7, C.13.8 or C.13.9
function _oneIdSelected(ids, currentSelectedActions) {
  var sel = false
  ids.forEach(id => {
    sel = sel || currentSelectedActions.indexOf(id) > -1
  })
  return sel
}
registerAvailabilityRule("C.9.1", (t) => t("C9x"), (allActionsIds, currentSelectedActions) => {
    return _oneIdSelected(["C.12.6", "C.12.7", "C.12.8", "C.12.9", "C.13.6", "C.13.7", "C.13.8", "C.13.9"], currentSelectedActions)
  }
);
registerAvailabilityRule("C.9.2", (t) => t("C9x"), (allActionsIds, currentSelectedActions) => {
    return _oneIdSelected(["C.12.6", "C.12.7", "C.12.8", "C.12.9", "C.13.6", "C.13.7", "C.13.8", "C.13.9"], currentSelectedActions)
  }
);
registerAvailabilityRule("C.9.3", (t) => t("C9x"), (allActionsIds, currentSelectedActions) => {
    return _oneIdSelected(["C.12.6", "C.12.7", "C.12.8", "C.12.9", "C.13.6", "C.13.7", "C.13.8", "C.13.9"], currentSelectedActions)
  }
);


// C.10.x can only increase (C.10.1 to C.10.2 or C.10.3; C.10.2 to C.10.3)
registerAvailabilityRule("C.10.1", (t) => t("C10x"), (allActionsIds, currentSelectedActions) => {
  // valide seulement si déja selectionné
  return allActionsIds[allActionsIds.length - 1].indexOf("C.10.1") !== -1
});

registerAvailabilityRule("C.10.2", (t) => t("C10x"), (allActionsIds, currentSelectedActions) => {
  // valide seulement si 10.1 ou déja selectionné
  var onC10_1 = allActionsIds[allActionsIds.length - 1].indexOf("C.10.1") !== -1
  var onC10_2 = allActionsIds[allActionsIds.length - 1].indexOf("C.10.2") !== -1
  return onC10_1 || onC10_2
});



// G.1.2, only available if not C.5.1 and C.5.2 and C.6.1 and C.6.2 and C.7.1 and C.7.2
// NOTE : déja mis en place par les "_availabilityDependsOf" précédentes !

/*
G.1.2, only available
if not A.2.2
AND if not A.4.1, A.4.3, A.4.5
AND if not A.5.1
AND if not A.6.1, A.6.2, A.6.3, A.6.4, A.6.10
AND if not A.7.2
AND if not A.8.1
AND if not A.9.1, A.9.2
AND if not 10.1, 10.2
AND if not A.11.1
AND if not LU / ha UAA (ind???) ≤ 2
AND if not Feed autonomy (ind???) < 0.5

autrement dit
==> A.2.2 seulement si G.1.1
==> A.4.1 seulement si G.1.1
==> A.4.3 seulement si G.1.1
==> A.4.5 seulement si G.1.1
==> A.5.1 seulement si G.1.1
==> A.6.1 seulement si G.1.1
==> A.6.2 seulement si G.1.1
==> A.6.3 seulement si G.1.1
==> A.6.4 seulement si G.1.1
==> A.6.10 seulement si G.1.1
==> A.7.2 seulement si G.1.1
==> A.8.1 seulement si G.1.1
==> A.9.1 seulement si G.1.1
==> A.9.2 seulement si G.1.1
==> A.10.1 seulement si G.1.1
==> A.10.2 seulement si G.1.1
==> A.11.1 seulement si G.1.1
*/


;["A.2.2", "A.4.1", "A.4.3", "A.4.5", "A.5.1", "A.6.1", "A.6.2", "A.6.3", "A.6.4", "A.6.10", "A.7.2", "A.8.1", "A.9.1", "A.9.2", "A.10.1", "A.10.2", "A.11.1"].forEach(id => {
  _availabilityDependsOf(id, "G.1.1", ["G.1.2"])
})


/* If player selects G.1.2,
C.5.1 and C.5.2 and C.6.1 and C.6.2 and C.7.1 and C.7.2 are forbidden;
A.2.2 and A.4.1, A.4.3, A.4.5 and
A.5.1 and
A.6.1, A.6.2, A.6.3, A.6.4, A.6.10 and
A.7.2 and
A.8.1 and
A.9.1, A.9.2 and
A.10.1, A.10.2 and
A.11.1 are forbidden

[what about LU / ha UAA; feed autonomy?]

*/
// devrait etre ok avec les règles précédentes


// A.10.3, only available if one of A.8.2, A.8.3, A.8.4, A.8.6, A.8.7, A.8.8
var requiredA8s = ["A.8.2", "A.8.3", "A.8.4", "A.8.6", "A.8.7", "A.8.8"]

registerAvailabilityRule("A.10.3", (t)=>t('A10.3'), (allActionsIds, currentSelectedActions) => {
    return _oneIdSelected(requiredA8s, currentSelectedActions)
  }
)
// la contrepartie
{
  var msgFunc = (t) => t("heifers_immunized")
  var ruleFunc = (allActionsIds, currentSelectedActions) => currentSelectedActions.indexOf("A.10.3") === -1

  registerAvailabilityRule("A.8.1", msgFunc, ruleFunc)
  registerAvailabilityRule("A.8.5", msgFunc, ruleFunc)
}


/**************************************************************************

REGLES DE SELECTION AUTOMATIQUE: un changement d'AEP va induire un autre changement automatique

NOTE : on annule ceci

**************************************************************************/
