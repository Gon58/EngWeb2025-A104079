var Aluno = require('../models/aluno')

module.exports.list = () => {
    return Aluno
    .find()
    .sort({nome : 1})
    .exec()
}

module.exports.findById = id => {
    return Aluno
    .findOne({_id : id})
    .exec()
}

module.exports.insert = async (aluno) => {
    try {
        const existing = await Aluno.findOne({ _id: aluno._id }).exec();
        if (!existing) {
            var newAluno = new Aluno(aluno);
            return newAluno.save();
        }
        return false;
    } catch (error) {
        console.error('Error inserting aluno:', error);
        throw error;
    }
};

module.exports.update = (id, aluno) => {
    return Aluno.findByIdAndUpdate(id, aluno, { new: true })
        .exec();
}

module.exports.remove = (id) => {
    return Aluno.findByIdAndDelete(id)
        .exec();
}

module.exports.invertTpc = async (id, idTpc) => {
    try {
        const aluno = await Aluno.findOne({ '_id': id }).exec();
        if (aluno) {
            const tpc = `tpc${idTpc}`;
            aluno[tpc] = !aluno[tpc];
            return Aluno.findByIdAndUpdate(id, aluno, { new: true }).exec();
        }
        return null;
    } catch (error) {
        console.error('Error inverting TPC:', error);
        throw error;
    }
}