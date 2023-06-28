const addSchedule = async (req, res) => {
    return res.status(201).json({
        success:true, message:"welcome"
    })
}

module.exports = {
    addSchedule
}