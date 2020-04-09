import React from 'react';
import Particles from 'react-particles-js';
import './Particles.css';

const particleOptions = {
    particles: {
        number: {
            value: 40,
            density: {
                enable: true,
                value_area: 1000
            }
        }
    }
}

const particlesComponent = () => {
    return <Particles className="Particles" params={particleOptions} />
};

export default particlesComponent;