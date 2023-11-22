export interface IPostRepositoryReturnType {
    createPost: (p: any) => Promise<any>;
    updatePost: (v: any, c: any) => Promise<any>;
    getPost: (c: any) => Promise<any>;
}

export interface IRedisCacheReturnType {
    getCache: (k: string) => Promise<any>;
    getHash: (k: string, f: any) => Promise<any>;
    deleteHash: (k: string, f: any) => Promise<any>;
    deleteRedisKey: (k: string) => Promise<any>;
    setHash: (k: string, f: any) => Promise<any>;
    getAllHash: (v: any) => Promise<any>;
    getValueFromZAdd: (k: string, v: any) => Promise<any>;
    getListFromCache: (k: string) => Promise<any>;
    LPushCache: (k: string, e: any) => Promise<any>;
    setCache: (k: string, v: any) => Promise<any>;
    removeFromZAddCache: (k: string, ui: string) => Promise<any>;
    deleteRedisKeysPattern: (p: string) => Promise<any>;
    setListInCache: (k: string, e: any) => Promise<any>;
    setZAddCache: (k: string, s: any, v: any) => Promise<any>;
    removeElementFromList: (k: string, e: any) => Promise<any>;
    setCacheWithExpiry: (k: string, ex: number, v: any) => Promise<any>;
    setInUserFeedCache: (v: any) => Promise<any>;
    fetchUserPostIdsFromRedis: (r: any, u: number, p: number, l: number) => Promise<any>;
    removeFromUserPostIds: (p: number, u: number) => Promise<any>;
    fetchNoiseAdminPostIdsFromRedis: (r: any, p: number, l: number) => Promise<any>;
    setInNoiseAdminFeedCache: (v: any) => Promise<any>;
    removeFromAdminFeedPostIds: (v: any) => Promise<any>;
    checkNoiseAdminPostsInRedis: () => Promise<any>;
    fetchLikesCount: (r: any, p: number) => Promise<any>;
    fetchCommentCount: (r: any, p: number) => Promise<any>;
    setCount: (v: any, r: string) => Promise<any>;
    CountIncrBy: (p: number, s: number, type: string) => Promise<any>;
    updateUserFeeds: (f: number[], u: number) => Promise<any>;
    fetchUserDashboardPostIdsFromRedis: (u: number, p: number, l: number, i: any) => Promise<any>;
    removePostIdFromUsersDashboardFeeds: (u: number[], p: number) => Promise<any>;
    setInUserLikeFeedCache: (v: any) => Promise<any>;
    setInUserViralPostFeedCache: (v: any) => Promise<any>;
    setInUserDashboardFeed: (v: any) => Promise<any>;
    getHashByPage(v: string, limit: number, cursor: number): Promise<any>;
    getHashLength(v: string): Promise<any>;
    keyExits(v: string): Promise<any>;
    hashKeyExists(v: string, f: string): Promise<any>;
}
