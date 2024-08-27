const IncomeSchema= require("../models/incomeModel")

const addIncome = async (req, res) => {
    const {title, amount, category, description, id, date}  = req.body

    const income = IncomeSchema({
        user : id,
        title,
        amount,
        date,
        category,
        description,
    })

    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        console.log(error.message)
        throw new Error("Server Error")
    }

}

const getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find({ user: req.body.id }).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        console.log(error.message)
        throw new Error("Server Error")
    }
}
const updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id,
            { title, amount, category, description, date },
            { new: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json(updatedIncome);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteIncome = async (req, res) =>{
    const {id} = req.params
    
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            console.log(error.message)
            throw new Error("Server Error")
        })
}

module.exports = {
    addIncome,
    getIncomes,
    updateIncome,
    deleteIncome,
}