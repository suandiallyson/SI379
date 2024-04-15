import React from 'react';

function ToggleBlock() {
    const [isRed, setIsRed] = useState(false);

    const toggleColor = () => {
        setIsRed(!isRed);
    };

    return (
        <div 
            onClick={toggleColor} 
            style={{
                width: '250px',
                height: '250px',
                backgroundColor: isRed ? 'red' : 'blue'
            }}
        />
    );
}

export default ToggleBlock;