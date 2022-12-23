class SearchSort {
  constructor(query, queryString) {
    this.query = query; //product.find()
    this.queryString = queryString; //{keyword:'Laptop'}
    //prosuct.find({"name":"Laptop"})
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword, //laptop Laptop LAPTOP HP Laptop
            $options: "i",
          },
        }
      : {}; //{"asd": "aaaa", "ajddksj"} ==> "asd": "aaaa", "ajddksj"}
    this.query = this.query.find({ ...keyword }); //product.find()
    return this;
  }

  filter(){
    const queryCopy = { ...this.queryString};
    console.log(queryCopy);

    const removeFields= ["keyword", "page", "limit"];
    removeFields.forEach((key)=> delete queryCopy[key])

    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(
        /\b(gt|gte|lt|lte)\b/g,
        (key)=> `$${key}`
    );

    this.query =  this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(resultPerPage){ //10
    const currentPage = Number(this.queryString.page)|| 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = SearchSort;
