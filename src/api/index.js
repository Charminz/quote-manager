import axios from "axios";

const QuoteAPI = axios.create({
	baseURL: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"
});

export default QuoteAPI