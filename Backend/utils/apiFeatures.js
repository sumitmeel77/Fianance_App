class apiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.querstr = queryStr
    }

    serach() {
        const keyword = this.querstr.keyword ? { //teneray condition 
            name: {
                $regex: this.querstr.keyword, //mongo db operator
                $options: "i" // i for small case sensitive 
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this // returning same class
    }
    // appying filter
    filter() {
        const querycopy = { ...this.querstr } // for copying use destructor method else any change in querycopy will effect this.querstr
        // console.log(querycopy)
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach((item) => delete querycopy[item]) // removing  some fields from querycopy
        // console.log(querycopy)
        // this.query = this.query.find(querycopy); // applying filter to final fields remaing in querycopy


        let queryStr = JSON.stringify(querycopy); // conervting into string
        // console.log(queryStr)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        // console.log(queryStr)
        this.query = this.query.find(JSON.parse(queryStr)); // converting into object and then searching

        return this
    }

    pagination(number) {
        const currentPage = this.querstr.page || 1 // defautlt page number is 1

        const skipdata = (number) * (currentPage - 1)

        this.query = this.query.limit(number).skip(skipdata)

        return this
    }
}

module.exports = apiFeatures