import React, { useState, useEffect } from 'react';

import { brandService } from '../../services/brand.service';
import { categoryService } from '../../services/category.service';

import PriceFilter from '../../components/price-filter/price-filter.component';
import CheckboxFilter from '../../components/checkbox-filter/checkbox-filter.component';
import ProductsView from '../../components/products-view/products-view.component';

const HomePage = () => {
    const [price, setPrice] = useState({ min: 0, max: 0 });
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterOptions, setFilterOptions] = useState({});

    useEffect(() => {
        const fetchBrands = async () => {
            const brandsRaw = await brandService.getAll();
            const brands = brandsRaw.map(brand => ({ ...brand, toggle: false }));
            setBrands(brands);
        }

        const fetchCategories = async () => {
            const categoriesRaw = await categoryService.getAll();
            const categories = categoriesRaw.map(category => ({ ...category, toggle: false }));
            setCategories(categories);
        }

        fetchBrands();
        fetchCategories();
    }, []);

    useEffect(() => {
        const filterOptions = {
            minPrice: price.min,
            maxPrice: price.max,
            brandIds: brands.filter(brand => (brand.toggle)).map(brand => (brand._id)),
            categoryIds: categories.filter(category => (category.toggle)).map(category => (category._id))
        };

        setFilterOptions(filterOptions);

    }, [price, brands, categories])

    const handleToggleBrand = brand => {
        const brandArray = brands.map(_brand => (brand.name === _brand.name ? Object.assign({}, _brand, { toggle: !brand.toggle }) : _brand));
        setBrands(brandArray);
    }

    const handleToggleCategory = category => {
        const categoryArray = categories.map(_category => (category.name === _category.name ? Object.assign({}, category, { toggle: !category.toggle }) : _category));
        setCategories(categoryArray);
    }

    const handleChangePrice = (min, max) => {
        setPrice({ min, max });
    }

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{ width: "20%", margin: "16px" }}>
                <PriceFilter min={price.min} max={price.max} onChangePrice={handleChangePrice} />
                <CheckboxFilter title="Brands" items={brands} onToggle={handleToggleBrand} />
                <CheckboxFilter title="Category" items={categories} onToggle={handleToggleCategory} />
            </div>
            <div style={{ width: "80%", margin: "16px" }}>
                <ProductsView filterOptions={filterOptions} />
            </div>
        </div>
    )
}

export default HomePage;