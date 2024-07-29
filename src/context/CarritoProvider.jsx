import { useReducer } from "react";
import { CarritoContext } from "./CarritoContext";

const initialState = [];

export const CarritoProvider = ({ children }) => {
  const comprasReducer = (state = initialState, action = {}) => {
    console.log("Action dispatched:", action);
    switch (action.type) {
      case "[CARRITO] Agregar Compra":
        return [...state, action.payload];
      case "[CARRITO] Aumentar Cantidad Compra":
        return state.map((item) => {
          if (item.id === action.payload) {
            return { ...item, cantidad: item.cantidad + 1 };
          }
          return item;
        });
      case "[CARRITO] Disminuir Cantidad Compra":
        return state.map((item) => {
          if (item.id === action.payload && item.cantidad > 1) {
            return { ...item, cantidad: item.cantidad - 1 };
          }
          return item;
        });
      case "[CARRITO] Eliminar Compra":
        return state.filter((compra) => compra.id !== action.payload);
      default:
        return state;
    }
  };

  const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

  const agregarCompra = (compra) => {
    compra.cantidad = 1;
    const action = {
      type: "[CARRITO] Agregar Compra",
      payload: compra,
    };
    console.log("Dispatching action:", action);
    dispatch(action);
  };

  const aumentarCantidad = (id) => {
    const action = {
      type: "[CARRITO] Aumentar Cantidad Compra",
      payload: id,
    };
    console.log("Dispatching action:", action);
    dispatch(action);
  };

  const disminuirCantidad = (id) => {
    const action = {
      type: "[CARRITO] Disminuir Cantidad Compra",
      payload: id,
    };
    console.log("Dispatching action:", action);
    dispatch(action);
  };

  const eliminarCompra = (id) => {
    const action = {
      type: "[CARRITO] Eliminar Compra",
      payload: id,
    };
    console.log("Dispatching action:", action);
    dispatch(action);
  };

  console.log("Current state:", listaCompras);

  return (
    <CarritoContext.Provider
      value={{
        listaCompras,
        agregarCompra,
        aumentarCantidad,
        disminuirCantidad,
        eliminarCompra,
      }}>
      {children}
    </CarritoContext.Provider>
  );
};
