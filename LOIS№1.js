/////////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа №1 по дисциплине ЛОИС
//  Ахроров Мирафзал
// Вариант F: Проверить является ли формула ДНФ
// Основные методы и правила для работы с Regexp взяты из ресурса: https://learn.javascript.ru/
// Алгоритм упрощения формулы взят у студента гр. 721702 Икбаева Егора

var resultFieldInputMod;
var formulaFieldInputMod;
var resultFieldTestingMod;
var formulaFieldTestingMod;
var repeatedSymbol;
const BINARY_FORMULA = "B";
const DISJUNCTION_SYMBOL = "|";
const VALID_VARIABLES_SYMBOLS = "[A-Z]";
const ATOMIC_SYMBOL_PATTERN = `(${VALID_VARIABLES_SYMBOLS}|\\(!${VALID_VARIABLES_SYMBOLS}\\))`;
const DISJUNCTION_PATTERN = `\\(${ATOMIC_SYMBOL_PATTERN}&${ATOMIC_SYMBOL_PATTERN}\\)`;
const CONJUCTION_PATTERN = `\\(${ATOMIC_SYMBOL_PATTERN}\\|${ATOMIC_SYMBOL_PATTERN}\\)`;
const SAVE_PATTERN = `\\(!${CONJUCTION_PATTERN}\\)|\\(!${DISJUNCTION_PATTERN}\\)`

const ALL_SYMBOLS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const ALL_RELATIONS = ["&", "|"];

function myMain(){
	resultFieldInputMod = document.getElementById("result");
	formulaFieldInputMod = document.getElementById("formula");
	formulaFieldTestingMod = document.getElementById("formulaForTesting");
	var formula = formulaFieldInputMod.value;
	var result = checkFormula(formula);
	if (result){
		resultFieldInputMod.innerText = "DNF";
	} else {
		resultFieldInputMod.innerText = "Not a DNF";
	}
}

function checkFormula(formula){
	var formulaSave = checkValidation(formula, SAVE_PATTERN);
	if (formulaSave != formula) return false
	var singleLetter = checkValidation(formula, VALID_VARIABLES_SYMBOLS);
	if (singleLetter == BINARY_FORMULA) return true
	var simplifiedDisjunctions = checkValidation(formula, DISJUNCTION_PATTERN);
	if (simplifiedDisjunctions == BINARY_FORMULA) return true
	var simplifiedConjunctions = checkValidation(simplifiedDisjunctions, CONJUCTION_PATTERN);
	return simplifiedConjunctions == BINARY_FORMULA;
}

function testKnowledge(obj){
	resultFieldTestingMod = document.getElementById("resultTesting");
	formulaFieldTestingMod = document.getElementById("formulaForTesting");
	var formula = formulaFieldTestingMod.textContent;
	var result = checkFormula(formula);
	if(result == true && obj.id == "btnYes"){
		resultFieldTestingMod.innerText = "Right"
	} else if (result == false && obj.id == "btnNo") {
		resultFieldTestingMod.innerText = "Right"
	} else {
		resultFieldTestingMod.innerText = "Wrong"
	}
}

function checkValidation(formula, pattern) {
	var previousFormula;
	while (1){
		previousFormula = formula;
		formula = formula.replace(new RegExp(pattern), BINARY_FORMULA);
		if (previousFormula == formula) break;
	}
	return formula;
}

function createFormula(){
	resultFieldTestingMod.innerText = "";
	var formula = createSimpleFormula();
	createFormulaRecursion(formula);
}

function createSimpleFormula(){
	var firstSymbol = ALL_SYMBOLS[getRandomInt(ALL_SYMBOLS.length)];
	var secondSymbol = ALL_SYMBOLS[getRandomInt(ALL_SYMBOLS.length)];
	var relation = ALL_RELATIONS[getRandomInt(ALL_RELATIONS.length)];
	var formula = "(" + firstSymbol + relation + secondSymbol + ")";
	return formula;
}

function createFormulaRecursion(formula){
	var arrayAfterSplit = formula.split("");
	var arrayOfSymbols = arrayAfterSplit.filter(element => element.match(VALID_VARIABLES_SYMBOLS) != null);
	var elementToReplace = arrayOfSymbols[getRandomInt(arrayOfSymbols.length)];
	formula = formula.replace(elementToReplace, createSimpleFormula);
	if (getRandomInt(2) == 0){
		formulaFieldTestingMod.innerText = formula;
	} else {
		createFormulaRecursion(formula);
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
