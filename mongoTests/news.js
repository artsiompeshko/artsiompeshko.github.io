function clear() {
    db.articles.drop();
    db.authors.drop();
}

function printResult(cursor) {
    while(cursor.hasNext()) {
        printjson(cursor.next());
    }
}

clear();
db.createCollection('articles');
db.articles.createIndex({
    createdAt: 1
});

db.createCollection('authors');
db.authors.createIndex({
    name: 1
});

db.articles.insertMany([
    {
        _id: 'news1',
        title: 'News 1',
        author: 'author1',
        comments: [
            {
                _id: 'comment1',
                author: 'author_2',
                createdAt: Date(),
                text: 'Hello'
            }
        ],
        text: 'Hello guys',
        likes_count: 0,
        createdAt: Date()
    },
    {
        _id: 'news2',
        title: 'News  2',
        author: 'author2',
        comments: [
            {
                _id: 'comment1',
                author: 'author_4',
                createdAt: Date(),
                text: 'Hello'
            },
            {
                _id: 'comment2',
                author: 'author_2',
                createdAt: Date(),
                text: 'Hello 2'
            }
        ],
        text: 'Hello guys 2',
        likes_count: 0,
        createdAt: Date()
    },
    {
        _id: 'news3',
        title: 'News  3',
        author: 'author3',
        comments: [],
        text: 'Hello guys 3',
        likes_count: 0,
        createdAt: Date()
    }
]);

db.authors.insertMany([
    {
        _id: 'author1',
        name: 'artsiom_peshko',
        position: 'chief'
    },
    {
        _id: 'author2',
        name: 'vanya_dymouski',
        position: 'chief'
    },
    {
        _id: 'author3',
        name: 'evgeni_zhuk',
        position: 'chief'
    }
]);

var result = db.articles.aggregate([
    {
        $lookup: {
            from: 'authors',
            localField: 'author',
            foreignField: '_id',
            as: 'author'
        }
    },
    {
        $unwind:  {
            path: '$author',
            preserveNullAndEmptyArrays: true
        }
    }
]);

print('GET ALL ARTICLES AND JOIN IT WITH AUTHORS');
printResult(result);


result = db.articles.aggregate([
    {
        $match: {
            _id: 'news1'
        }
    }
]);

print('GET ARTICLE BY ID="news1"');
printResult(result);


print('ADD NEW AUTHOR BY ID="author5"');
db.authors.insertOne({
    _id: 'author5',
    name: 'jhon_smith',
    position: 'chief'
});
