"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelper = (objectPagination, query, countTasks) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objectPagination.limitItem = parseInt(query.limit);
    }
    objectPagination.skip = ((objectPagination.currentPage - 1) * objectPagination.limitItem);
    objectPagination.totalPage = Math.ceil(countTasks / objectPagination.limitItem);
    return objectPagination;
};
exports.default = paginationHelper;
