const loggerMiddleware = (store) => (next) => (action) => {
    console.log("action", action);
    // next(action);
};

export default loggerMiddleware;