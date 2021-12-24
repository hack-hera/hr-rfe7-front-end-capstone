import axios from 'axios';

const { github_token, campus } = require('./env/config.js');

const headers = {
  headers: {
    'Authorization': `${github_token}`
  }
};

const host = `https://app-hrsei-api.herokuapp.com/api/fec2/${campus}`;

const api = {

  /******************************
   * GET Routes
   ****************************/

  // Parameter	Type	Description
  // page	integer	Selects the page of results to return. Default 1.
  // count	integer	Specifies how many results per page to return. Default 5.
  getProducts: () => {
    return axios.get(host + '/products', headers)
      .then(res => res.data)
      .catch(err => { throw new Error(err); });
  },

  // Parameter	Type	Description
  // product_id	integer	Required ID of the Product requested
  getProduct: ({ id }) => {
    return axios.get(host + '/products/' + id, headers)
      .then(res => res.data)
      .catch(err => { throw new Error(err); });
  },


  // Parameter	Type	Description
  // product_id	integer	Required ID of the Product requested
  getProductStyles: ({ id }) => {
    return axios.get(host + '/products/' + id + '/styles', headers)
      .then(res => res.data)
      .catch(err => { throw new Error(err); });
  },

  // Parameter	Type	Description
  // product_id	integer	Required ID of the Product requested
  getRelatedProducts: ({ id }) => {
    return axios.get(host + '/products/' + id + '/related', headers)
      .then(res => res.data)
      .catch(err => { throw new Error(err); });
  },

  // Returns a list of reviews for a particular product. This list does not include any reported reviews.
  // page	integer	Selects the page of results to return. Default 1.
  // count	integer	Specifies how many results per page to return. Default 5.
  // sort	text	Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
  // product_id	integer	Specifies the product for which to retrieve reviews.
  getReviews: ({ page, count, sort, id }) => {
    return axios.get(host + '/reviews?product_id=' + id, headers)
      .then(res => res.data)
      .catch(err => { throw new Error(err); });
  },

  // Returns review metadata for a given product.
  // product_id	integer	Required ID of the product for which data should be returned
  getReviewMeta: ({ id }) => {
    return axios.get(host + '/reviews/meta?product_id=' + id, headers)
      .then(res => res.data)
      .catch(err => { throw new Error(err); });
  },

  // GET /qa/questions Retrieves a list of questions for a particular product. This list does not include any reported questions.
  // Parameter	Type	Description
  // product_id	integer	Specifies the product for which to retrieve questions.
  // page	integer	Selects the page of results to return. Default 1.
  // count	integer	Specifies how many results per page to return. Default 5.

  getQuestions: ({ id, page, count }) => {
    return axios.get(host + '/qa/questions?product_id=' + id, headers)
      .then(res => res.data)
      .catch(err => { throw new Error(err); });
  },


  // Returns answers for a given question. This list does not include any reported answers.
  // GET /qa/questions/:question_id/answers
  // Parameter	Type	Description
  // question_id	integer	Required ID of the question for wich answers are needed
  getAnswers: ({ question_id }) => {
    return axios.get(host + '/qa/questions/' + question_id + '/answers', headers)
      .then(res => res.data)
      .catch(err => { throw new Error(err); });
  },

  // Retrieves list of products added to the cart by a user.
  getCart: () => {
    return axios.get(host + '/cart', headers)
      .then(res => res.data)
      .catch(err => { throw new Error(err); });
  },

  /******************************
   * POST/PUT Routes
   ****************************/

  // Adds a review for the given product.
  //  product_id	integer	Required ID of the product to post the review for
  //  rating	int	Integer (1-5) indicating the review rating
  //  summary	text	Summary text of the review
  //  body	text	Continued or full text of the review
  //  recommend	bool	Value indicating if the reviewer recommends the product
  //  name	text	Username for question asker
  //  email	text	Email address for question asker
  //  photos	[text]	Array of text urls that link to images to be shown
  //  characteristics	object	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}
  postReview: () => {
    //TODO - complete this
  },

  // Updates a review to show it was found helpful.
  // PUT /reviews/:review_id/helpful

  // Parameter	Type	Description
  // reveiw_id	integer	Required ID of the review to update
  markReviewAsHelpful: () => {
    //TODO - complete this
  },

  // Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.
  // PUT /reviews/:review_id/report
  // Parameter	Type	Description
  // review_id	integer	Required ID of the review to update

  reportReview: () => {
    //TODO - complete this
  }

};

export default api;