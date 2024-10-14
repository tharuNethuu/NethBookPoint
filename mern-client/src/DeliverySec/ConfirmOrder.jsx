/* import React, { useState } from 'react';

const ConfirmOrder = () => {
    const [isSelected, setSelection] = useState(false);

    const handleCheckboxChange = (event) => {
        setSelection(event.target.checked);
    };

    return (
        <div style={styles.container}>
            <div style={styles.checkboxContainer}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    style={styles.checkbox}
                />
                <label style={styles.label}>Mark as Delivered</label>
            </div>
            <p>Status: {isSelected ? '👍' : '👎'}</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'left',
        marginTop: '10px',
        
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: '10px',
    },
    label: {
        margin: '8px',
    },
};

export default ConfirmOrder;
 */


import React, { useState } from 'react';

const ConfirmOrder = ({ orderId, delivered, onUpdateDeliveryStatus }) => {
    const [isSelected, setSelection] = useState(delivered);

    const handleCheckboxChange = async (event) => {
        const newValue = event.target.checked;
        setSelection(newValue);
        onUpdateDeliveryStatus(orderId, newValue);
    };

    return (
        <div style={styles.container}>
            <div style={styles.checkboxContainer}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    style={styles.checkbox}
                />
                <label style={styles.label}>Mark as Delivered</label>
            </div>
            <p>Status: {isSelected ? '👍' : '👎'}</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'left',
        marginTop: '10px',
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: '10px',
    },
    label: {
        margin: '8px',
    },
};

export default ConfirmOrder;
