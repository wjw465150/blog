
function ContentFacade() { }
ContentFacade._path = '/dwr';

ContentFacade.findReviewById = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'findReviewById', p0, callback);
}

ContentFacade.selectReviewByUsername = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'selectReviewByUsername', p0, callback);
}

ContentFacade.selectReviewByType = function(p0, p1, p2, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'selectReviewByType', p0, p1, p2, callback);
}

ContentFacade.selectReviewByOidAndType = function(p0, p1, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'selectReviewByOidAndType', p0, p1, callback);
}

ContentFacade.removeReviewByIds = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'removeReviewByIds', p0, callback);
}

ContentFacade.removeReviewById = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'removeReviewById', p0, callback);
}

ContentFacade.removeReviewByOidAndType = function(p0, p1, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'removeReviewByOidAndType', p0, p1, callback);
}

ContentFacade.setContentService = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'setContentService', p0, callback);
}

ContentFacade.setCommonService = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'setCommonService', p0, callback);
}

ContentFacade.setPointConfig = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'setPointConfig', p0, callback);
}

ContentFacade.setMessageSourceAccessor = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'setMessageSourceAccessor', p0, callback);
}

ContentFacade.articleVote = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'articleVote', p0, callback);
}

ContentFacade.insertReviewAndReturn = function(p0, callback) {
    DWREngine._execute(ContentFacade._path, 'ContentFacade', 'insertReviewAndReturn', p0, callback);
}
