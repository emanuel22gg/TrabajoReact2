import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { useNotification } from './useNotification';

// 📝 Definir las acciones que puede hacer el carrito
const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM', 
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    TOGGLE_CART: 'TOGGLE_CART'
};

// 🏁 Estado inicial del carrito
const initialState = {
    items: [],           // Array de productos
    isOpen: false,       // Si el carrito está abierto
    total: 0,           // Total en dinero
    itemCount: 0        // Cantidad de productos
};

// 🔄 Reducer: función que maneja los cambios de estado
function cartReducer(state, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            // Buscar si el producto ya existe
            const existingItem = state.items.find(item => item.id === action.payload.id);
            
            let newItems;
            if (existingItem) {
                // Si existe, aumentar cantidad
                newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existe, agregarlo
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            }

            // Calcular nuevo total y cantidad
            const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }

        case CART_ACTIONS.REMOVE_ITEM: {
            const newItems = state.items.filter(item => item.id !== action.payload);
            const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }

        case CART_ACTIONS.UPDATE_QUANTITY: {
            const { id, quantity } = action.payload;
            
            // Si la cantidad es 0 o menor, eliminar el producto
            if (quantity <= 0) {
                return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: id });
            }

            const newItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }

        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                items: [],
                total: 0,
                itemCount: 0
            };

        case CART_ACTIONS.TOGGLE_CART:
            return {
                ...state,
                isOpen: !state.isOpen
            };

        default:
            return state;
    }
}

// 🌍 Crear el contexto
const CartContext = createContext();

// 🪝 Hook personalizado para usar el contexto
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de CartProvider');
    }
    return context;
};

// 🏪 Provider del carrito
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const cartRef = useRef(null);              // Referencia al carrito
    const timeoutRef = useRef(null);           // Referencia para timeouts
    const { showNotification } = useNotification();

    // 👆 Cerrar carrito al hacer click fuera (useEffect + useRef)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                dispatch({ type: CART_ACTIONS.TOGGLE_CART });
            }
        };

        if (state.isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [state.isOpen]);

    // 📦 Funciones del carrito
    const addToCart = (product) => {
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
        
        // Mostrar notificación
        showNotification(`${product.title} agregado al carrito`, 'success', 2000);
        
        // Auto-abrir carrito por 2 segundos
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        if (!state.isOpen) {
            dispatch({ type: CART_ACTIONS.TOGGLE_CART });
            timeoutRef.current = setTimeout(() => {
                dispatch({ type: CART_ACTIONS.TOGGLE_CART });
            }, 2000);
        }
    };

    const removeFromCart = (productId) => {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
        showNotification('Carrito vaciado', 'info', 1500);
    };

    const toggleCart = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        dispatch({ type: CART_ACTIONS.TOGGLE_CART });
    };

    // 📋 Valor que se comparte con toda la aplicación
    const value = {
        ...state,           // items, isOpen, total, itemCount
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        cartRef
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};