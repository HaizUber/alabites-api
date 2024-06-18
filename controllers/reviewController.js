exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(`Fetching reviews for product ID: ${productId}`); // Log the product ID
        const reviews = await Review.find({ productId });
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this product.' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error); // Log the error
        res.status(500).json({ error: 'Server Error' });
    }
};
