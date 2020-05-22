import React, { useState, useEffect } from 'react';

import { brandsService } from '../../services/brands.service';

import BrandFilter from '../../components/brand-filter/brand-fitler.component';
import PriceFilter from '../../components/price-filter/price-filter.component';

const HomePage = () => {
    const [brands, setBrands] = useState([]);
    const [price, setPrice] = useState({ min: 0, max: 0 });

    useEffect(() => {
        const fetchBrands = async () => {
            const brandsRaw = await brandsService.getAll();
            const brands = brandsRaw.map(brand => ({ ...brand, toggle: false }));
            setBrands(brands);
        }

        fetchBrands();
    }, []);

    const handleToggleBrand = brand => {
        const brandsArray = brands.map(_brand => (brand.name === _brand.name ? Object.assign({}, _brand, { toggle: !brand.toggle }) : _brand));
        setBrands(brandsArray);
    }

    const handleChangePrice = (min, max) => {
        setPrice({ min, max });
    }

    return (
        <div>
            <div style={{ width: "20%" }}>
                <BrandFilter brands={brands} onToggleBrand={handleToggleBrand} />
                <PriceFilter min={price.min} max={price.max} onChangePrice={handleChangePrice} />
            </div>
        </div>
    )
}

export default HomePage;
