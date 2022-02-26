class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }
        // remove Feilds fro query
        const removeFeilds = ['keyword']
        removeFeilds.forEach(el => delete queryCopy[el])
        console.log(queryCopy)
        this.query = this.query.find(queryCopy)
        return this
    }

    // pagination(resPerPage) {
    //     const currentPage = Number(this.queryStr.page) || 1
    //     const skip = resPerPage * (currentPage - 1)

    //     this.query = this.query.limit(resPerPage).skip(skip)
    //     return this
    // }
}

export default APIFeatures