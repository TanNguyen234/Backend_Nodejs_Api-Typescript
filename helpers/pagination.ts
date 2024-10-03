interface ObjectPagination {
    currentPage: number;
    limitItem: number;
    skip?: number | any;
    totalPage?: number;
}

const paginationHelper = (objectPagination: ObjectPagination, query: Record<string, any>, countTasks: number): ObjectPagination => {
    if(query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    if(query.limit) {
        objectPagination.limitItem = parseInt(query.limit)
    }

    objectPagination.skip = ((objectPagination.currentPage - 1) * objectPagination.limitItem);

    objectPagination.totalPage = Math.ceil(countTasks/objectPagination.limitItem);

    return objectPagination;
}

export default paginationHelper;