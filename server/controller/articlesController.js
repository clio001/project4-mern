import Articles from "../models/articleModel.js";

// * Function to retrieve all articles from MongoDB

const findAllArticles = async (request, response) => {
  try {
    const articles = await Articles.find({}).populate({ path: "author" });
    response.status(200).json(articles);
    console.log("All articles: ", articles);
  } catch (error) {
    response.status(400).json({
      error: error,
      message: "Unable to retrieve all articles from '/articles' endpoint",
    });
  }
};

export { findAllArticles };
