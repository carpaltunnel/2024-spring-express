export const getWidgets = async (req, res, next) => {
    console.log('Controller : getWidgets()');
    res.status(200).json([]);
};

export const createWidget = async (req, res, next) => {
    console.log('Controller : createWidget()');
    res.status(200).json({});
};