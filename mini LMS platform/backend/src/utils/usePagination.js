const usePagination = async (
  req,
  Model,
  {
    query = {},
    select = '-password',
    sort = {},
    populate = '',
    lean = false,
  } = {}
) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
  const skip = (page - 1) * limit;

  let mongooseQuery = Model.find(query)
    .select(select)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  if (populate) {
    mongooseQuery = mongooseQuery.populate(populate);
  }

  if (lean) {
    mongooseQuery = mongooseQuery.lean();
  }

  const [data, totalItems] = await Promise.all([
    mongooseQuery,
    Model.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    meta: {
      totalItems,
      count: data.length,
      currentPage: page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    },
  };
};

module.exports = usePagination;
