const Product = require('../models/product');
const Category = require('../models/category');

const productController = {
    async getAllProducts(req, res) {
        try {
            let { page, pageSize } = req.query;
            
            page = parseInt(page);
            pageSize = parseInt(pageSize);

            const offset = (page - 1) * pageSize;

            const products = await Product.findAll({
                offset: offset,
                limit: pageSize,
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }]
            });

            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    async getProductById(req, res) {
        const productId = req.params.id;
        try {
            const product = await Product.findByPk(productId, { include: 'category' });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createProduct(req, res) {
        const { name, categoryId } = req.body;
        try {
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            const newProduct = await Product.create({ 
                name, 
                categoryId, 
                categoryName: category.name // Populate categoryName based on category name
            });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async updateProduct(req, res) {
        const productId = req.params.id;
        const { name, categoryId } = req.body;
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            // Update product and populate categoryName based on category name
            await product.update({ 
                name, 
                categoryId, 
                categoryName: category.name 
            });
            res.json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    async deleteProduct(req, res) {
        const productId = req.params.id;
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await product.destroy();
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController;


