const express = require('express')
const router = express.Router()

const {addIncome, getIncomes, updateIncome,deleteIncome}=require('../controllers/incomeController')
const {addExpense, getExpense, updateExpense,deleteExpense}=require('../controllers/expenseController')
const { addGoal, getGoals,updateGoal, deleteGoal } = require('../controllers/goalController')

router.post('/add-income',addIncome)
router.get('/get-income', getIncomes)
router.put('/update-income/:id', updateIncome)
router.delete('/delete-income/:id', deleteIncome)

router.post('/add-expense',addExpense)
router.get('/get-expense', getExpense)
router.put('/update-expense/:id', updateExpense)
router.delete('/delete-expense/:id', deleteExpense)

router.post('/add-goal',addGoal)
router.get('/get-goal', getGoals)
router.put('/update-goal/:id', updateGoal)
router.delete('/delete-goal/:id', deleteGoal)

module.exports = router