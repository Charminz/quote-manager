import axios from "axios";

const QuoteAPI = axios.create({
	baseURL: "https://quotesondesign.com/wp-json"
});

export default QuoteAPI