const Comment = require('../models/comment');
const Article = require('../models/article');
const User = require('../models/user');

async function showArticles(userId, nameOptions){
    let articles
    switch (nameOptions) {
        case 'dashboard':
            articles = await Article
            .find({$or:[{User:userId},{status:'public'}]})
            .sort({ updatedAt: -1 })
            break;
    
        case 'onlyUser':
            articles = await Article
            .find({$or:[{User:userId}]})
            // .populate([{path:'Comment'}])
            .sort({ updatedAt: -1 })
            break;
    }
    
    for(let i=0; i<articles.length; i++){
      let user_art = await User.findById(articles[i].User)
      articles[i].User = user_art
      // console.log("ua",user_art);
      let cmt = await Comment.find({ article: articles[i]._id.toString() });
      // let user_cmt = await User.find({_id:cmt.User})
      // console.log("cmmm",cmt);
      for(let j=0; j<cmt.length;j++){
        // console.log(cmt);
        let user_cmt = await User.find({_id:cmt[j].User})
        // if(user_cmt)
  //      {
          cmt[j].User = user_cmt[0]
        // }
      }
      (articles[i]).comment_list = cmt;
    }
    console.log(typeof(articles),"poiu");
    return (articles);
    // console.log("checkkkk",userId === undefined);
    }
    
module.exports = {showArticles}