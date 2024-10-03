interface ObjectSearch {
    keyword: string,
    regex?: RegExp
}

const searchHelper = (query: Record<string, any>): ObjectSearch => {//Record là kiểu tạo bảng ghi mới
    let objectSearch: ObjectSearch = {
        keyword: ""
    }

    if (query.keyword) {           //Chức năng tìm kiếm
        objectSearch.keyword = query.keyword;

        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }

    return objectSearch;
}

export default searchHelper;