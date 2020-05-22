import React, { useState, useEffect } from 'react';

import { brandsService } from '../../services/brands.service';

import BrandFilter from '../../components/brand-filter/brand-fitler.component';

const HomePage = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            const brandsRaw = await brandsService.getAll();
            const brands = brandsRaw.map(brand => ({ ...brand, toggle: false }));
            setBrands(brands);
        }

        fetchBrands();
    }, []);

    const onToggleBrand = brand => {
        const brandsArray = brands.map(_brand => (brand.name === _brand.name ? Object.assign({}, _brand, { toggle: !brand.toggle }) : _brand));
        setBrands(brandsArray);
    }

    return (
        <div>
            <div style={{ width: "20%" }}>
                <BrandFilter brands={brands} onToggleBrand={onToggleBrand} />
            </div>
        </div>
    )
}

export default HomePage;
