exports.formatDates = list => {
  return list.map(element => {
    let newObj = { ...element };
    newObj.created_at = new Date(newObj.created_at);
    // console.log(newObj);
    return newObj;
  });
};

exports.makeRefObj = (list, key, value) => {
  return list.reduce((refObj, curVal) => {
    refObj[curVal[key]] = curVal[value];
    return refObj;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    let newObj = { ...comment };

    newObj.author = comment.created_by;
    delete newObj.created_by;

    newObj.article_id = articleRef[comment.belongs_to];
    delete newObj.belongs_to;

    newObj.created_at = new Date(newObj.created_at);
    // console.log(newObj);

    return newObj;
  });
};
