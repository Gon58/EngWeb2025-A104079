var Book = require('../models/book')

module.exports.list = () => {
    return Book
    .find()
    .sort({title : 1})
    .exec()
}

module.exports.listByCharacter = character => {
    return Book
        .find({ characters: { $regex: character, $options: 'i' }})
        .exec()
}

module.exports.listByGenre = genre => {
    return Book
        .find({
            genres: {
                $regex: genre,
                $options: 'i'
            }
        })
        .sort({ title: 1 })
        .exec()
}

module.exports.listByAuthor = author => {
    return Book
        .find({
            author: {
                $regex: author,
                $options: 'i'
            }
        })
        .sort({ title: 1 })
        .exec()
}

module.exports.getGenres = () => {
    return Book
        .find({}, { genres: 1, _id: 0 })            
        .exec()
        .then(books => {
            // Extract all genres and flatten them
            let allGenres = books.reduce((acc, book) => {
                if (book.genres) {
                    // Parse the string array and clean it
                    let genreArray = book.genres.toString()
                        .replace(/[\[\]']/g, '')  // Remove brackets and quotes
                        .split(',')
                        .map(g => g.trim());  // Clean up whitespace
                    acc.push(...genreArray);
                }
                return acc;
            }, []);
            
            // Remove duplicates and sort
            return [...new Set(allGenres)].sort();
        });
}

module.exports.getCharacters = () => {
    return Book
        .find({}, { characters: 1, _id: 0 })
        .exec()
        .then(books => {
            // Extract all characters and flatten them
            let allCharacters = books.reduce((acc, book) => {
                if (book.characters) {
                    // Parse the string array and clean it
                    let characterArray = book.characters.toString()
                        .replace(/[\[\]']/g, '')  // Remove brackets and quotes
                        .split(',')
                        .map(c => c.trim());  // Clean up whitespace
                    acc.push(...characterArray);
                }
                return acc;
            }, []);
            
            // Remove duplicates and sort
            return [...new Set(allCharacters)].sort();
        });
}

module.exports.findById = id => {
    return Book
        .findOne({bookId: id})
        .exec()
}

module.exports.insert = book => {
    // Generate _id from bookId if not provided
    if (!book._id && book.bookId) {
        book._id = book.bookId;
    }
    return Book.create(book)
}

module.exports.update = (id, book) => {
    return Book
        .findOneAndUpdate({bookId: id}, book, {new: true})
        .exec()
}

module.exports.remove = id => {
    return Book
        .findOneAndDelete({bookId: id})
        .exec()
}